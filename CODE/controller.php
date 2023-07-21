<?php
    session_start();

    $_SESSION["theme"] = "classique";

/* -------------------------------------------------------------------------- */
/*                                   ROUTEUR                                  */
/* -------------------------------------------------------------------------- */

if (isset($_GET['function'])) {

    switch ($_GET['function']) {

        case 'part1':

            creation_commande();
            tab64toIMG();
            break;

        case 'part2':
        
            generationPDF();
            
            // -> Images détruites à la page confirmation destroyIMG_SESSION();
            header("Location: ./VIEWS/confirmation.php");
            break;

        case 'destroyIMG':

            destroyIMG_SESSION();
            break;
        
        default:
            
            echo "Erreur, aucune fonction appelée";

            break;
    }
}



/* -------------------------------------------------------------------------- */
/*                                  FONCTIONS                                 */
/* -------------------------------------------------------------------------- */


function creation_commande(){
    
    /* -------------------------- CREATION COMMANDE ------------------------- */
    
    $tableau_commande = json_decode($_POST["tableau_commande"]);
    $_SESSION['id_commande'] = $tableau_commande[1];

    //gestion de la date
    $nonformated_date = DateTime::createFromFormat('d/n/Y', $tableau_commande[0]);
    $date = $nonformated_date->format('d/m/Y');

    //récupération du thème
    $_SESSION["typo"] = $tableau_commande[11];
    $_SESSION["couleur"] = $tableau_commande[12];


    // Lire le contenu du fichier JSON
    $json = file_get_contents('../ASSETS/json/commandes.json');

    // Convertir le JSON en un tableau associatif en PHP
    $commandes = json_decode($json, true);

    
    //vérifie si le tableau commandes existe
    if (isset($commandes[$date][$tableau_commande[1]])) {

        $commandes[$date][$tableau_commande[1]]['nom'] = $tableau_commande[2];
        $commandes[$date][$tableau_commande[1]]['prenom'] = $tableau_commande[3];
        $commandes[$date][$tableau_commande[1]]['email'] = $tableau_commande[4];

        $commandes[$date][$tableau_commande[1]]['nom_album'] =$tableau_commande[5];
        $commandes[$date][$tableau_commande[1]]['qtt_album'] = (int)$tableau_commande[6];
        $commandes[$date][$tableau_commande[1]]['reliure'] = $tableau_commande[7];
        $commandes[$date][$tableau_commande[1]]['format'] = $tableau_commande[8];
        $commandes[$date][$tableau_commande[1]]['pages'] = (int)$tableau_commande[9];
        
        $commandes[$date][$tableau_commande[1]]['total'] = (float)$tableau_commande[10];

        $commandes[$date][$tableau_commande[1]]['deja_telecharge'] = false;
        $commandes[$date][$tableau_commande[1]]['supprime'] = false;


    } else {
        $commandes[$date][$tableau_commande[1]] = array(
            'nom' => $tableau_commande[2],
            'prenom' => $tableau_commande[3],
            'email' => $tableau_commande[4],

            'nom_album' => $tableau_commande[5],
            'qtt_album' => (int)$tableau_commande[6],
            'reliure' => $tableau_commande[7],
            'format' => $tableau_commande[8],
            'pages' => (int)$tableau_commande[9],
            'total' => (float)$tableau_commande[10],

            'deja_telecharge' => false,
            'supprime' => false
        );
    }

    // Convertir le tableau associatif en JSON
    $json = json_encode($commandes, JSON_PRETTY_PRINT);

    // Enregistrer le JSON dans le fichier
    file_put_contents('../ASSETS/json/commandes.json', $json);

}


/* ---------------------------- TAB BASE64 TO IMG --------------------------- */
/** - Permet d'enregistrer les images base64 du tableau dans le répertoire
 *  - Leur donner un identifiant
 *  - Ajouter cet identifiant à la place du code base64 de l'image
 */
function tab64toIMG(){
    $album = json_decode($_POST['tableau_album']);

    foreach ($album as $key_page => $page) {
        
        foreach($page as $key_element => $element){

            //vérifie si c'est une image
            if($element[1] == "#" && isset($element[2])){

                $image64 = explode("#", $element)[1];
                $image = base64_decode($image64); // Décodage de l'image en base64

                // Extraire l'extension de l'image
                $extension = explode("/", explode(";", $image64)[0])[1];

                $filename = uniqid() . "." . $extension; // Génération d'un nom de fichier unique avec l'extension
                $filepath = '../STOCKAGE/IMG_temporaires/' . $filename;

                //enlève les métadonnées en préfixe pour garder que le code de l'image
                $image_parts = explode(";base64,", $image64);
                $image_en_base64 = base64_decode($image_parts[1]);


                //Ajoute de nouveau le préfixe avec le placement de l'image, et
                //change la valeur base64 dans le tableau par le chemin vers l'image
                $page[$key_element] = explode("#", $element)[0] . "#" . $filepath;


                file_put_contents($filepath, $image_en_base64); // Enregistrement de l'image décodée dans le fichier  

            }
            
        }

        $album[$key_page] = $page;
    }

    $_SESSION["album"] = $album;
}


/* ---------------------------- GENERATION DU PDF --------------------------- */
function generationPDF(){

    $tableau = $_SESSION["album"];
    echo json_encode($tableau);


    //récupère la liste des templates
    $json_data = file_get_contents('../ASSETS/json/templates_a4.json');

    $data = json_decode($json_data, true);
    $templates = [];

    //Crée un tableau clé = valeur des templates
    foreach ($data as $id => $value) {
        $templates[$id] = $value;
    }
    ob_start();


    // -------- Génération du PDF --------
    require('../TCPDF/tcpdf.php');

    // parametres
    $unicode = true;
    $format = "UTF-8";
    $pdf = new TCPDF('P', 'px', 'A4', true, 'UTF-8', false);

    $pdf->SetPrintHeader(false);
    $pdf->SetPrintFooter(false);
    $pdf->SetAutoPageBreak(false, 0);


    // -------- AJOUT DE LA FONT --------
    
    // $pdf->SetFontSize(60);


    $font = 'timesbi';
    $pdf->SetFont($font, '', 200); 

    
    // $pdf->AddFont("Lumanosimo", "", "..\ASSETS\fonts\Lumanosimo.ttf", "");
    // $fontname = $pdf->addTTFfont('path/myfont.ttf', '', '', 32);




    // Boucle pour créer chaque page 
    foreach ($tableau as $key => $page) {

        $pdf->AddPage('P', array(2480 , 3508));

        $pdf->SetY(100);
        $pdf->SetX(200);

        $pdfWidth = $pdf->getPageWidth();
        $pdfHeight = $pdf->getPageHeight();

        //  Ajouter couleur de fond au pdf
        if($_SESSION["couleur"] == ""){
            $couleur = "FFFFFF";
        }else{
            $couleur = $_SESSION["couleur"];
        }
        
        // Extraire les valeurs RVB de la chaîne hexadécimale
        $red = hexdec(substr($couleur, 0, 2));
        $green = hexdec(substr($couleur, 2, 2));
        $blue = hexdec(substr($couleur, 4, 2));

        //ajoute la couleur de fond aux pages
        $pdf->Rect(0,0,$pdfWidth,$pdfHeight,'F','',$fill_color = array($red, $green, $blue)); 


        //Vérifie que la feuille n'est pas blanche 
        if($page[0] !== ""){

            foreach ($page as $obj => $element) {
            
                if (!str_starts_with($element, "id")) {
                    
                    if ($templates[$page[0]]['obj_'.$obj]['type']=='img') {
                    
                        $chemin = explode("#", $element)[1];
                        if ($chemin != null) {
                            cropImage(
                                $chemin,
                                $element[0],
                                ($templates[$page[0]]['obj_'.$obj]['data']['w'] / 100)*$pdfWidth,
                                ($templates[$page[0]]['obj_'.$obj]['data']['h'] / 100)*$pdfHeight
                            );
                                
                            $pdf->Image(
                                $chemin, //chemin
                                ($templates[$page[0]]['obj_'.$obj]['data']['x'] / 100)*$pdfWidth, // position X
                                ($templates[$page[0]]['obj_'.$obj]['data']['y'] / 100)*$pdfHeight, // position Y
                                ($templates[$page[0]]['obj_'.$obj]['data']['w'] / 100)*$pdfWidth, // Largeur
                                ($templates[$page[0]]['obj_'.$obj]['data']['h'] / 100)*$pdfHeight, // Hauteur
                                '', '', '', 
                                true, // Resize
                                150, // résolution DPI
                                '', false, false, 0, false, false, $fitonpage=false
                            );
                        }
                        
                    }elseif ($templates[$page[0]]['obj_'.$obj]['type']=='txt') {
    
                        // $pdf->SetXY(0, ( $templates[$page[0]]['obj_'.$obj]['data']['y'] / 100)*$pdfHeight);
                        // $pdf->Cell($pdfWidth, 0 , $element, 0, 1, 'C', 0, '', 0);

                        $html='<span style="font-family:'. $font . ' ;font-weight:bold">my text in bold</span>: my normal text';
                        $pdf->writeHTMLCell($w=0,$h=0,$x=200,$y=201,$html,$border=0,$ln=0,$fill=false,$reseth=true,$align='L',$autopadding=false);
    
                    }
                }   
            }
        }
    }

    
    //Défini le nom du fichier
    $nom = $_SESSION['id_commande'] . ".pdf";

    // Chemin relatif vers le répertoire de destination
    $chemin = __DIR__ . '/../STOCKAGE/PDF_commandes/';

    // Générer le fichier PDF sur le serveur
    $pdf->Output($chemin . $nom, 'F');
    


}



/* ------------------------------ Crop Image ------------------------------ */
function cropImage($imagePath,$placement,$template_w,$template_h){



    // Extension de l'image
    $imageFileType = strtolower(pathinfo($imagePath,PATHINFO_EXTENSION));
    

    // Ouvre l'image avec la fonction correspondante selon son extension
    switch($imageFileType) {
        case "jpg":
        case "jpeg":
            $image = imagecreatefromjpeg($imagePath);
            break;
        case "png":
            $image = imagecreatefrompng($imagePath);
            break;
        case "gif":
            $image = imagecreatefromgif($imagePath);
            break;
    }
            
    /* -------------------------------------------------------------------------- */
    /*                                 CROP IMAGE                                 */
    /* -------------------------------------------------------------------------- */


    $w = $template_w; //largeur de l'image finale;
    $h = $template_h; //hauteur de l'image finale;
    $ratio_frame = $w / $h;

    // Récupère la taille de l'image
    $width = imagesx($image);
    $height = imagesy($image);
    $ratio_img = $width / $height;


    // --- PAYSAGE [0] / PORTRAIT [1] ---
    if($ratio_img > $ratio_frame){
        //si l'image est en paysage [0]
        $resized_image = imagescale($image, $h * $ratio_img, $h);
        $width = imagesx($resized_image);

        $y = 0;

        $orientation = 0;
    }else{
        //si l'image est en portrait [1]
        $resized_image = imagescale($image, $w, $w / $ratio_img);
        $height = imagesy($resized_image);

        $x = 0;

        $orientation = 1;
    }


    if($placement == "T" || $placement == "B"){
        //placement en vertical - horizontal centré

        if($placement == "T"){
            $y = 0;
        }else if($placement == "B"){
            $y = $height - $h;
        }

    }else if($placement == "L" || $placement == "R"){
        //placement en horizontal - vertical centré

        if($placement == "L"){
            $x = 0;
        }else if($placement == "R"){
            $x = $width - $w;
        }

    }else if($placement == "C"){
        //placement centré

        if($orientation == 0){
            //paysage

            $x = ($width / 2) - ($w / 2) ;
        }else{
            //portrait

            $y = ($height / 2) - ($h / 2);
        }

    }else{
        echo "error placement";
    }



    // Effectue le recadrage de l'image
    $cropped_image = imagecrop($resized_image, ['x' => $x, 'y' => $y, 'width' => $w, 'height' => $h]);

    // Enregistre l'image recadrée avec un nouveau nom
    imagejpeg($cropped_image, $imagePath);

    // Libère la mémoire utilisée par les images
    imagedestroy($image);
    imagedestroy($cropped_image);
}



/* ------------------ SUPPRESSION DES IMAGES APRES CREA PDF ----------------- */
function destroyIMG_SESSION(){

    $album = $_SESSION['album'];

    foreach ($album as $num_page => $page) {
        foreach ($page as $num_element => $element) {

            //vérifie si element existe
            if(isset($element[1])){

                //puis si elle contient un # (=> c'est une image), et si la route existe
                if($element[1] == "#" && isset($element[2])){
                    $chemin = explode("#", $element)[1];

                    //corrige le chemin pour trouver le fichier depuis confirmation.php
                    $newchemin = str_replace("..", "../..", $chemin);

                    //vérification et suppression du fichier
                    if (file_exists($newchemin)) {

                        unlink($newchemin);
                    }
                }
            }
        }
    }

    //destruction de la session
    session_destroy();
}