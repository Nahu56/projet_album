<?php
    
    // Charger le fichier JSON
    $json_string = file_get_contents('../../ASSETS/json/commandes.json');
    // On enregistre les informations du json dans data
    $data = json_decode($json_string, true);



    /* -------------------------------------------------------------------------- */
    /*                    ON TESTE SI UN AFFICHAGE EST ATTENDUE                   */
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
            

            $result = array();
            foreach ($dateObjects as $dateObject) {
                $formattedDate = $dateObject->format('d/m/Y');
                foreach ($data[$formattedDate] as $key => $value) {
                    $result[$formattedDate][$key] = $value;
                }

            }
            
            // Afficher le tableau trié
            $data = array();
            $data = $result;
            
            foreach ($data as $date => &$values) {

                foreach ($values as $key => $tab) {
                    if ($tab['deja_telecharge'] == false and $tab['supprime'] == false) {
                    }else {
                        unset($values[$key]);
                        if ($data[$date]==array()) {
                            unset($data[$date]);
                        }
                    }
                }
            }

            print_r($data);
            
        }else {
            // Si c'est le tout on change rien
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
        

        $result = array();
        foreach ($dateObjects as $dateObject) {
            $formattedDate = $dateObject->format('d/m/Y');
            foreach ($data[$formattedDate] as $key => $value) {
                $result[$formattedDate][$key] = $value;
            }

        }
        
        // Afficher le tableau trié
        $data = array();
        $data = $result;
            
        foreach ($data as $date => &$values) {
            foreach ($values as $key => $tab) {
                if ($tab['deja_telecharge'] == true or $tab['supprime'] == true) {
                    unset($values[$key]);
                    if ($data[$date] == []) {
                        unset($data[$date]); 
                    }
                }
            }
        }
    }



    /* -------------------------------------------------------------------------- */
    /*                         FONCTION TELECHARGER UN PDF                        */
    /* -------------------------------------------------------------------------- */
    function telechargerFichier($date, $key) {

        // On met à jour les informations dans le json 
        $json_string = file_get_contents('../../ASSETS/json/commandes.json');
        $tableau = json_decode($json_string, true);
        $tableau[$date][$key]['deja_telecharge'] = true;
        $newJsonString = json_encode($tableau);
        file_put_contents('../../ASSETS/json/commandes.json', $newJsonString);
    
        // Chemin du fichier
        $cheminFichier = '../../STOCKAGE/PDF_commandes/'.$key.'.pdf';
    
        // Nom du fichier à télécharger
        $nomFichier = $key.'.pdf';
    
        // Définit le type de contenu de la réponse
        header('Content-Type: application/pdf');
    
        // Définit le nom du fichier dans la réponse
        header('Content-Disposition: attachment; filename="' . $nomFichier . '"');
    
        // Lit le contenu du fichier et l'envoie dans la réponse
        readfile($cheminFichier);
    

    }
    


    /* -------------------------------------------------------------------------- */
    /*                           FONCTION SUPPRIMER PDF                           */
    /* -------------------------------------------------------------------------- */
    function supprimerFichier($date, $key) {

        // On met à jour les informations dans le json 
        $json_string = file_get_contents('../../ASSETS/json/commandes.json');
        $tableau = json_decode($json_string, true);
        $tableau[$date][$key]['supprime'] = true;
        $newJsonString = json_encode($tableau);
        file_put_contents('../../ASSETS/json/commandes.json', $newJsonString);


        // Méthode pour supprimer le fichier (peut etre ajouter vérifiation)
        if(unlink('../../STOCKAGE/PDF_commandes/'.$key.'.pdf')) {
            echo '<script> alert("Fichier supprimer"); </script>';
        } else {
            echo '<script> alert("Erreur"); </script>';
        }
    }
    

    /* -------------------------------------------------------------------------- */
    /*                          LANCER FONCTIONS DES PDF                          */
    /* -------------------------------------------------------------------------- */
    if (isset($_POST['action'])) {
        if($_POST['action']=="telecharger") {
            telechargerFichier( $_POST['date'], $_POST['key']);
        }
        if($_POST['action']=="supprime") {
            supprimerFichier( $_POST['date'], $_POST['key']);
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

    <!----------------------------------------------------------------------------->
    <!--                                 LISTE FONTS                             -->
    <!----------------------------------------------------------------------------->

    <!-- Space Grotesk -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300&display=swap" rel="stylesheet">




</head>
<body>
    <header>
        <h2>Commandes album photo</h2>
        <form class="style" onchange="window.location.href = '?affichage=' + document.getElementById('affichage_info').value;">
            <label>Affichage :</label>
            <select name="affichage" id="affichage_info">
                <option value="en_attente" <?php  if (isset($_GET['affichage'])) { if ($_GET['affichage']=='en_attente'){echo 'selected';}} ?> > <div style="width:15px; height: 15px; background-color:red;"></div> Status : En attente </option>
                <option value="tout"  <?php if (isset($_GET['affichage'])) { if ($_GET['affichage']=='tout'){echo 'selected';}} ?> > TOUT </option>
            </select>
        </form>


    </header>
    <div id="commande" >
        <?php
        
        foreach ($data as $date => $values) {

            echo '<div class="date"> 

                <h3>'.$date.'</h3>';
                
                

                foreach ($values as $key => $tab) {
                    echo '

                    <div class="album" onclick="afficher_cache(this)">';

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
                                <div>
                                    <p>Téléphone </p>
                                    <p> 01 23 45 67 89 </p>
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
                        if (($tab['supprime']==true) ) {
                            echo '
                            <div class="pdf_supprime">
                                <p>PDF supprimé</p>
                            </div>
                            </div>';
                        }else {
                            echo '   
                            <div class="visible">
                                <form class="btn_telechargement" method="POST">
                                    <input type="hidden" name="key" value="'.$key.'">
                                    <input type="hidden" name="date" value="'.$date.'">

                                    <input type="hidden" name="action" value="telecharger">
                                    <input type="image" class="ico_telecharger" src="ASSETS/img/icone/download.svg" alt="icone telechargement"/>
                                </form>




                                <a href="STOCKAGE/PDF_commandes/'.$key.'.pdf" target="_bank">
                                    <img class="ico_ouvrir" src="ASSETS/img/icone/eye-open.svg" alt="icone ouvrir"/>
                                </a>
                            </div>
                               <form class="cache"  method="POST">
                                       <input type="hidden" name="key" value="'.$key.'">
                                       <input type="hidden" name="date" value="'.$date.'">

                                       <input type="hidden" name="action" value="supprime">
                                       <button type="submit">
                                           Supprimer
                                           <img src="ASSETS/img/icone/trash.svg" alt="icone poubelle"/>
                                       </button>
                                   
                               </form>
                           
                           </div>';
                        }
                        
                    echo '
                        </div>
                    ';
                    

                }

            echo '</div>';
        }

        ?>
    </div>
    <script>
        function afficher_cache(element) {
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
    </script>

    
</body>
</html>