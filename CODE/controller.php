<?php

/* -------------------------------------------------------------------------- */
/*                                   ROUTEUR                                  */
/* -------------------------------------------------------------------------- */

if (isset($_GET['function'])) {

    switch ($_GET['function']) {
        case 'validation_commande':
            validation_commande();
            break;
        
        case 'generationPDF':
            generationPDF();
            break;
            
        default:
            
            echo "Erreur, aucune fonction appelée";

            break;
    }
}



/* -------------------------------------------------------------------------- */
/*                                  FONCTIONS                                 */
/* -------------------------------------------------------------------------- */


/* ----------------------- PROCESS VALIDATION COMMANDE ---------------------- */
function validation_commande(){

    // $_POST["tableau_commande"]
    // $_POST["tableau_album"]

    // creation_commande();

    tab64toIMG();

   
}

function creation_commande(){
    
    /* -------------------------- CREATION COMMANDE ------------------------- */
    $tableau_commande = json_decode($_POST["tableau_commande"]);

    $date = date('d/m/Y', strtotime($tableau_commande[0]));


    // Lire le contenu du fichier JSON
    $json = file_get_contents('../ASSETS/json/commandes.json');

    // Convertir le JSON en un tableau associatif en PHP
    $commandes = json_decode($json, true);

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

    foreach ($album as $key => $page) {

        foreach($page as $key => $element){

            //vérifie si c'est une image
            if($value[1] == "#"){
                echo json_encode($element);

            }
        }
        // if($value[2]){

        // }

        // if (str_contains('#', $value)){
        //     //sauvegarde l'image sur le serveur
        //     //remplace le code64 par l'url de l'image

        //     // Récupérer l'image en base64
        //     // $data = $value; // Récupération de l'image en base64 depuis la requête POST

        //     // $decodedData = base64_decode($data); // Décodage de l'image en base64




        //     // $filename = uniqid() . '.jpg'; // Génération d'un nom de fichier unique avec l'extension .jpg
        //     // $filepath = '/' . $filename;
            
        //     // file_put_contents($filepath, $decodedData); // Enregistrement de l'image décodée dans le fichier  

        //     // echo json_encode("hello");
        // }


    }
    
    echo json_encode("hello");

}


/* ---------------------------- GENERATION DU PDF --------------------------- */
function generationPDF(){

}


/* ------------------------- COMPRESSION DES IMAGES ------------------------- */
function compressionIMG(){

    try{
        \Tinify\setKey(API_KEY);
        \Tinify\validate();
    
        $source = \Tinify\fromFile("path/to/unoptimized.jpg"); // -> image originale
        $source->toFile("path/to/optimized.jpg"); // -> image compressée

    }catch(\tinify\Exception $e){
        echo "Erreur concernant la clé API";
    }
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


    if($placement == "H" || $placement == "B"){
        //placement en vertical - horizontal centré

        if($placement == "H"){
            $y = 0;
        }else if($placement == "B"){
            $y = $height - $h;
        }

    }else if($placement == "G" || $placement == "D"){
        //placement en horizontal - vertical centré

        if($placement == "G"){
            $x = 0;
        }else if($placement == "D"){
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
    imagejpeg($cropped_image, $imagePath.'_bis.jpg');

    // Libère la mémoire utilisée par les images
    imagedestroy($image);
    imagedestroy($cropped_image);
}