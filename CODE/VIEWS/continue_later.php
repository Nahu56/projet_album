<?php

// Récupérer les données de $_POST
$email = $_POST["email"];
$options = json_decode($_POST["options"]);
$contenu_album = json_decode($_POST["contenu_album"]);





/* -------------------------------------------------------------------------- */
/*                            AJOUTER ALBUM AU JSON                           */
/* -------------------------------------------------------------------------- */

// Charger le contenu actuel du fichier JSON
$jsonFile = '../../ASSETS/json/albums_clients.json';
$contents = file_get_contents($jsonFile);
$albums = json_decode($contents, true);


// Créer un nouvel élément associatif avec l'email et le contenu_album
$newElement = array(
    "email" => $email,
    "options" => $options,
    "contenu_album" => $contenu_album
);


// Générer un identifiant aléatoire
$newId = uniqid();

// Ajouter le nouvel élément à la variable contenant le contenu JSON avec l'identifiant comme clé
$albums[$newId] = $newElement;

// Enregistrer la variable mise à jour dans le fichier "albums_clients.json"
file_put_contents($jsonFile, json_encode($albums, JSON_PRETTY_PRINT));



/* ----------------------------- GENERATION URL ----------------------------- */
$domaine = "localhost/projet_album/editeur";
$url = $domaine . "?id=" . $newId;

echo $url;



/* -------------------------------------------------------------------------- */
/*                                ENVOI DU MAIL                               */
/* -------------------------------------------------------------------------- */

$to = "nahueldev56@gmail.com";
$subject = "Test MAIL album photo";
$message = "Salut, comment ça va ? éét oui c'est moi ton ami jérome ";

$headers = "Content-Type: text/plain; charset=utf-8\r\n";
$headers .= "From: telessar56@gmail.com\r\n";

if(mail($to, $subject, $message, $headers)){
    echo "evnoyé";

}else{
    echo "erreur envoi";

}