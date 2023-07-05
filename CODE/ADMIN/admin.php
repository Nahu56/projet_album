<?php
    
    // Charger le fichier JSON
    $json_string = file_get_contents('../../ASSETS/json/commandes.json');
    // On enregistre les informations du json dans data
    $data = json_decode($json_string, true);


    /* -------------------------------------------------------------------------- */
    /*                    ON TESTE SI UN AFFICHAGE EST ATTENDU                    */
    /* -------------------------------------------------------------------------- */
    if (isset($_GET['affichage'])) {
        // Un affichage attendue on teste si c'est bien le en_attente
        if ($_GET['affichage'] == 'en_attente') {

            // Extraire les dates du tableau d'origine
            $dates = array_keys($data);
            

            // Convertir les dates en objets DateTime
            $dateObjects = array_map(function ($date) {
                return DateTime::createFromFormat('d/m/Y', $date);
            }, $dates);
            

            // Trier les dates du plus ancien au plus récent
            asort($dateObjects);
            
            // On remet les valeurs de data avec les dates trié dans le fichier $result
            $result = array();
            foreach ($dateObjects as $dateObject) {
                $formattedDate = $dateObject->format('d/m/Y');
                foreach ($data[$formattedDate] as $key => $value) {
                    $result[$formattedDate][$key] = $value;
                }

            }
            
            // On enleve les commandes qui ont déjà été téléchargé ou supprimé 
            $data = array();
            $data = $result;
            
            foreach ($data as $date => $values) {
                foreach ($values as $key => $tab) {

                    if ($tab['deja_telecharge'] == false and $tab['supprime'] == false) {
                    } else {
                        unset($data[$date][$key]);

                        // Si la date est vide alors on l'enleve du tableau 
                        if (empty($data[$date])) {
                            unset($data[$date]);
                        }
                    }
                }
            }

            
            
        }else {
            // Extraire les dates du tableau d'origine
            $dates = array_keys($data);


            // Convertir les dates en objets DateTime
            $dateObjects = array_map(function ($date) {
                return DateTime::createFromFormat('d/m/Y', $date);
            }, $dates);
            

            // Trier les dates du plus ancien au plus récent
            asort($dateObjects);
            
            // On remet les valeurs de data avec les dates trié dans le fichier $result
            $result = array();
            foreach ($dateObjects as $dateObject) {
                $formattedDate = $dateObject->format('d/m/Y');
                foreach ($data[$formattedDate] as $key => $value) {
                    $result[$formattedDate][$key] = $value;
                }

            }
            $result = array_reverse($result, true);

            // On enleve les commandes qui ont déjà été téléchargé ou supprimé 
            $data = array();
            $data = $result;
        }
    }else {
        // Si aucun affichage attendue on met le en_attente
        // Extraire les dates du tableau d'origine
        $dates = array_keys($data);


        // Convertir les dates en objets DateTime
        $dateObjects = array_map(function ($date) {
            return DateTime::createFromFormat('d/m/Y', $date);
        }, $dates);
        

        // Trier les dates du plus ancien au plus récent
        asort($dateObjects);
        
        // On remet les valeurs de data avec les dates trié dans le fichier $result
        $result = array();
        foreach ($dateObjects as $dateObject) {
            $formattedDate = $dateObject->format('d/m/Y');
            foreach ($data[$formattedDate] as $key => $value) {
                $result[$formattedDate][$key] = $value;
            }

        }
        
        // On transfert les données de $result dans $data
        $data = array();
        $data = $result;
            
        // On enleve les commandes qui ont déjà été téléchargé ou supprimé 
        foreach ($data as $date => $values) {

            foreach ($values as $key => $tab) {
                if ($tab['deja_telecharge'] == false and $tab['supprime'] == false) {
                } else {
                    unset($data[$date][$key]);
                    // Si la date est vide alors on l'enleve du tableau 
                    if (empty($data[$date])) {
                        unset($data[$date]);
                    }
                }
            }
        }
    }


    /* -------------------------------------------------------------------------- */
    /*                         FONCTION TELECHARGER UN PDF                        */
    /* -------------------------------------------------------------------------- */
    function telechargerFichier($date, $key,$affichage) {
        
        // Chemin relatif vers le répertoire de destination
        $cheminFichier = __DIR__ . '/../../STOCKAGE/PDF_commandes/'. $key .'.pdf';

        if (file_exists($cheminFichier)) {

            // On met à jour les informations dans le json 
            $json_string = file_get_contents('../../ASSETS/json/commandes.json');
            $tableau = json_decode($json_string, true);
            $tableau[$date][$key]['deja_telecharge'] = true;
            $newJsonString = json_encode($tableau);
            file_put_contents('../../ASSETS/json/commandes.json', $newJsonString);

            if (isset($affichage)) {
                if ($affichage!=null) {
                    header("Refresh:0; url=admin?affichage=".$affichage."&action_telechargement=reload&key=".$key."");
                }else {
                    header("Refresh:0; url=admin?action_telechargement=reload&key=".$key."");
                }
            }
            else {
                header("Refresh:0; url=admin?action_telechargement=reload&key=".$key."");
            }

        }else {
            // On met à jour les informations dans le json 
            $json_string = file_get_contents('../../ASSETS/json/commandes.json');
            $tableau = json_decode($json_string, true);
            $tableau[$date][$key]['supprime'] = true;
            $newJsonString = json_encode($tableau);
            file_put_contents('../../ASSETS/json/commandes.json', $newJsonString);


            if (isset($affichage)) {
                if ($affichage!=null) {
                    header("Refresh:0; url=admin?affichage=".$affichage."&notification=fichier");
                }else {
                    header("Refresh:0; url=admin?notification=fichier");
                }
            }else {
                header("Refresh:0; url=admin?notification=fichier");
            }
        }

    }




    if (isset($_GET['action_telechargement'])) {
        if ($_GET['action_telechargement']== 'reload') {
            if (isset($_GET['affichage'])) {
                if ($_GET['affichage']!=null) {
                    header("Refresh:0; url=admin?affichage=".$_GET['affichage']."&action_telechargement=telecharger&key=".$_GET['key']."");
                }else {
                    header("Refresh:0; url=admin?action_telechargement=telecharger&key=".$_GET['key']."");
                }
            }else {
                header("Refresh:0; url=admin?action_telechargement=telecharger&key=".$_GET['key']."");
            }

        }
        if ($_GET['action_telechargement']=='telecharger') {
            
            // Chemin du fichier
            $cheminFichier = '../../STOCKAGE/PDF_commandes/'.$_GET['key'].'.pdf';

            // Nom du fichier à télécharger
            $nomFichier = $_GET['key'].'.pdf';
        
            // Efface la sortie tamponnée
            ob_clean();
        
            // Définit le type de contenu de la réponse
            header('Content-Type: application/pdf');
        
            // Définit le nom du fichier dans la réponse
            header('Content-Disposition: attachment; filename="' . $nomFichier . '"');
        
            // Lit le contenu du fichier et l'envoie dans la réponse
            readfile($cheminFichier);

        }
    }



    /* -------------------------------------------------------------------------- */
    /*                           FONCTION FICHIER OUVERT                          */
    /* -------------------------------------------------------------------------- */
    function ouvrirFichier($date, $key){

        // On met à jour les informations dans le json 
        $json_string = file_get_contents('../../ASSETS/json/commandes.json');
        $tableau = json_decode($json_string, true);
        $tableau[$date][$key]['deja_telecharge'] = true;
        $newJsonString = json_encode($tableau);
        file_put_contents('../../ASSETS/json/commandes.json', $newJsonString);


        // Chemin relatif vers le répertoire de destination
        $cheminFichier = __DIR__ .'/../../STOCKAGE/PDF_commandes/'. $key .'.pdf';
        echo $cheminFichier;
        echo file_exists($cheminFichier);

        if (file_exists($cheminFichier)) {

            // header("Location: $cheminFichier"); //ouvre le fichier PDF

            header("Content-type: application/pdf");
            header("Content-Disposition: inline; filename=filename.pdf");
            @readfile($cheminFichier);

        }else{
            // // On met à jour les informations dans le json 
            // $json_string = file_get_contents('../../ASSETS/json/commandes.json');
            // $tableau = json_decode($json_string, true);
            // $tableau[$date][$key]['supprime'] = true;
            // $newJsonString = json_encode($tableau);
            // file_put_contents('../../ASSETS/json/commandes.json', $newJsonString);


            // if (isset($affichage)) {
            //     if ($affichage!=null) {
            //         header("Refresh:0; url=admin?affichage=".$affichage."&notification=fichier");
            //     }else {
            //         header("Refresh:0; url=admin?notification=fichier");
            //     }
            // }else {
            //     header("Refresh:0; url=admin?notification=fichier");
            // }
        }

    }
    


    /* -------------------------------------------------------------------------- */
    /*                           FONCTION SUPPRIMER PDF                           */
    /* -------------------------------------------------------------------------- */
    function supprimerFichier($date, $key,$affichage) {
        
        // On met à jour les informations dans le json 
        $json_string = file_get_contents('../../ASSETS/json/commandes.json');
        $tableau = json_decode($json_string, true);
        $tableau[$date][$key]['supprime'] = true;
        $newJsonString = json_encode($tableau);
        file_put_contents('../../ASSETS/json/commandes.json', $newJsonString);


        // Méthode pour supprimer le fichier (peut etre ajouter vérifiation)
        if(unlink('../../STOCKAGE/PDF_commandes/'.$key.'.pdf')) {

            // On redirige 
            if ($affichage != null) {
                header("Location: admin?notification=valid&affichage=".$affichage);
            }else{
                header("Location: admin?notification=valid");
            }

        } else {

            if ($affichage != null) {
                header("Location: admin?notification=erreur&affichage=".$affichage);
            }else{
                header("Location: admin?notification=erreur");
            }     

        }
    }
    
    /* -------------------------------------------------------------------------- */
    /*                          LANCER FONCTIONS DES PDF                          */
    /* -------------------------------------------------------------------------- */
    // On vérifie que action existe     
    if (isset($_POST['action'])) {

        if($_POST['action']=="telecharger") {
            telechargerFichier( $_POST['date'], $_POST['key'],$_POST['affichage']);
        }

        if($_POST['action']=="supprime") {    
            supprimerFichier( $_POST['date'], $_POST['key'],$_POST['affichage']);
        }
    }else if(isset($_GET["action"])){

        if($_GET['action']=="ouvert") {    

            ouvrirFichier( $_GET['date'], $_GET['key']);
        }
    }


    /* -------------------------------------------------------------------------- */
    /*                           FONCTION NOTIFICATIONS                           */
    /* -------------------------------------------------------------------------- */

    function notifications($etat){
        if ($etat == 'valid') {
            echo '
            <div class="valid">
                <p>Fichier supprimé avec <span> succès </span> ! </p> <img src="ASSETS/img/Partying_Face.png" alt="smiley fête"/>
            </div>
            ';
        }elseif ($etat == 'erreur') {
            echo '
            <div class="erreur">
                <p> <span> Erreur</span>  lors de la suppression du fichier </p> <img src="ASSETS/img/Warning.png" alt="warning"/>
            </div>
            ';
        }elseif ($etat == 'fichier') {
            echo '
            <div class="erreur">
                <p> <span> Erreur</span>, fichier introuvable </p> <img src="ASSETS/img/Warning.png" alt="warning"/>
            </div>
            ';
        }
    }

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin</title>
    <link rel="stylesheet" href="CODE/CSS/admin.css">

    <!-- Appel header -->
    <?php require '../components/header.php' ?>

</head>
<body>
    

    <div id="notifications">
        <?php
        if (isset($_GET['notification'])) {
            notifications($_GET['notification']);
        }
        ?>
    </div>


    <header>
        <h1>Commandes album photo</h1>
        <form class="style" onchange="window.location.href = '?affichage=' + document.getElementById('affichage_info').value;">
            <label>Affichage&nbsp:</label>
            <select name="affichage" id="affichage_info">
                <option value="en_attente" <?php  if (isset($_GET['affichage'])) { if ($_GET['affichage']=='en_attente'){echo 'selected';}} ?> > <div style="width:15px; height: 15px; background-color:red;"></div> Status : En attente </option>
                <option value="tout"  <?php if (isset($_GET['affichage'])) { if ($_GET['affichage']=='tout'){echo 'selected';}} ?> > TOUT </option>
            </select>
        </form>
 
    </header>
    <div id="commande" >

        <?php
        if ($data == array()) {

            echo '
            <div class="pas_de_commande">
                <img src="ASSETS/img/waiting.svg" alt="Rien pour le moment">
                <h2>Aucune commande en attente</h2>
            </div>
            
            
            ';
        }else {
            
            
        
        
        foreach ($data as $date => $values) {
            

            echo '<div class="date"> 

                <h3>'.$date.'</h3>';
                
                

                foreach ($values as $key => $tab) {
                    echo '

                    <div id="'.$key.'" class="album" onclick="afficher_cache(this)">';

                    if (($tab['deja_telecharge']==false) and ($tab['supprime']==false) ) {
                        echo '
                        <div class="etat_commande">
                            <div style="background-color: #FF9900;"></div> <p> Status : En attente </p> 
                        </div>';
                    }
                    if (($tab['deja_telecharge']==true) and ($tab['supprime']==false) ) {
                        echo '
                        <div class="etat_commande">
                            <div style="background-color: #028A20;"></div> <p> Status : Déjà téléchargé </p> 
                        </div>';
                    }
                    if (($tab['supprime']==true) ) {
                        echo '
                        <div class="etat_commande">
                            <div style="background-color: #C20000;"></div> <p> Status : Supprimé </p> 
                        </div>';
                    }
                    

                    
                    echo '
                        <div class="info_vendeur">
                            <div class="visible">
                                <p>'.$tab['prenom'].' '.$tab['nom'] .' </p>
                            </div>

                            <div class="cache">
                                <div>
                                    <p>Adresse mail </p>
                                    <p> '.$tab['email'] .' </p>
                                </div>
                            </div>
                            
                        
                        </div>
                        <hr>
                        

                        <div class="info_album">
                            <div class="visible">

                                <div>
                                    <p class="nom_alb">'.$tab['nom_album'].'</p>
                                    <p class="qtt_alb">x'.$tab['qtt_album'].' exemplaires</p>
                                </div>

                                <p class="prx_totale">'.number_format($tab['total'],2,',').'€</p>

                            </div>

                            <div class="cache">

                                <div>
                                    <p>Reliure </p>
                                    <p> '.$tab['reliure'].' </p>
                                </div>

                                <div>
                                    <p>Format </p>
                                    <p> Feuilles '.$tab['format'].' </p>
                                </div>

                                <div>
                                    <p>Nb Pages </p>
                                    <p>'.$tab['pages'].' pages </p>
                                </div>


                            </div>

                        
                        </div>
                        <hr>

                        <div class="action_pdf">  ';                  
                        if (($tab['supprime']==true) || (is_readable("STOCKAGE/PDF_commandes/'.$key.'.pdf")) ) {
                            echo '
                            <div class="pdf_supprime">
                                <p>PDF supprimé</p>
                            </div>
                            </div>';
                        }else {
                            echo '   
                            <div class="visible">
                                <form action="" class="btn_telechargement" method="POST">
                                    <input type="hidden" name="key" value="'.$key.'">
                                    <input type="hidden" name="date" value="'.$date.'">';

                            if (isset($_GET['affichage'])) {
                                echo ' <input type="hidden" name="affichage" value="'.$_GET['affichage'].'">';
                            }


                            echo '        <input type="hidden" name="action" value="telecharger">
                                    <input type="image" class="ico_telecharger" src="ASSETS/img/icones/download.svg" alt="icones telechargement"/>
                                </form>




                                <a onclick="lancer_fichierOuvert(`'. $date .'`, `'. $key .'`)" target="_bank">
                                    <img class="ico_ouvrir" src="ASSETS/img/icones/eye-open.svg" alt="icones ouvrir"/>
                                </a>
                            </div>
                            
                            <form class="cache" method="POST" onsubmit="return confirmSuppression();">
                                <input type="hidden" name="key" value="'.$key.'">
                                <input type="hidden" name="date" value="'.$date.'">';

                                if (isset($_GET['affichage'])) {
                                    echo ' <input type="hidden" name="affichage" value="'.$_GET['affichage'].'">';
                                }
    
    
                                echo '
                            
                                <input type="hidden" name="action" value="supprime">
                                <button type="submit">
                                    Supprimer
                                    <img src="ASSETS/img/icones/trash.svg" alt="icones poubelle"/>
                                </button>
                            </form>
                        
                            <script>
                                function confirmSuppression() {
                                    var val = confirm("Êtes-vous sûr de vouloir supprimer le pdf ?");
                                    return val;
                                }
                            </script>
                        
                           
                           </div>';
                        }
                        
                    echo '
                        </div>
                    ';
                    

                }

            echo '</div>';
        }
        }

        ?>
    </div>


    <script>

        function lancer_fichierOuvert(date, key){

            window.location.href = "admin?action=ouvert&date=" + date + "&key=" + key;

        }

        function scrollToAnchorWithOffset(id) {
            const anchorElement = document.getElementById(id);
            const offset = window.innerHeight * 0.5;

            const rect = anchorElement.getBoundingClientRect();
            const scrollPosition = rect.top + window.pageYOffset - offset;

            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
        }




        function afficher_cache(element) {
            let allCache = document.getElementsByClassName('cache');


            for (var i = 0; i < allCache.length; i++) {
                allCache[i].style.display = 'none';
            }


            // Trouver tous les éléments avec la classe "cache" à l'intérieur de l'élément parent
            var elementsCache = element.getElementsByClassName('cache');

            // Parcourir tous les éléments avec la classe "cache"
            for (var i = 0; i < elementsCache.length; i++) {
                var cache = elementsCache[i];
                
                // Changer la propriété "display" pour afficher ou cacher l'élément
                if (cache.style.display === 'none') {
                cache.style.display = 'flex'; // Afficher l'élément
                } else {
                cache.style.display = 'none'; // Cacher l'élément
                }
            }
        }


        <?php 

        if(!isset($_GET['action'])){
            if (isset($_GET['key'])) {
                ?>
                scrollToAnchorWithOffset('<?php echo $_GET['key']; ?>');
                
                <?php
            }
        }


        ?>


    </script>

    
</body>
</html>