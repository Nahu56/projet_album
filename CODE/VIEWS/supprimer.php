<?php 

// On charger le fichier JSON
$json_string = file_get_contents('../../ASSETS/json/commandes.json');

// On enregistre les informations du json dans data
$data = json_decode($json_string, true);

// On récupere les dates du json
$dates = array_keys($data);

// On transforme les dates des clées en format DateTime
$dateObjects = array_map(function ($date_bis) {
    return DateTime::createFromFormat('d/m/Y', $date_bis);
}, $dates);

// On récupére la date aujourd'hui et on lui enleve 30 jours
$date_limite = new DateTime('now');
$date_limite->modify('-30 days');

// On parcourt toutes les dates du tableau 
foreach ($dateObjects as $date) {

    // On vérifie si la date est inferieur à $date_limite
    if ($date < $date_limite) {

        // On transforme le formar DateTime au format dans le tableau
        $formattedDate = $date->format('d/m/Y');
        
        foreach ($data[$formattedDate] as $key => $value) {
            
            // On vérifie si le fichier a pas déjà été supprimé
            if ($value['supprime'] == false) {

                // On met à jour les informations dans le json 
                $json_string = file_get_contents('../../ASSETS/json/commandes.json');
                $tableau = json_decode($json_string, true);
                $tableau[$formattedDate][$key]['supprime'] = true;
                $newJsonString = json_encode($tableau);
                file_put_contents('../../ASSETS/json/commandes.json', $newJsonString);

                // On supprime le fichier dans le dossier
                unlink('../../STOCKAGE/PDF_commandes/'.$key.'.pdf');
            }
        }
    }
}

?>