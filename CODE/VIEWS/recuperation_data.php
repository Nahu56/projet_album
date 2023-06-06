<?php

// // Lire le contenu du fichier JSON
$json = file_get_contents('../../ASSETS/json/commandes.json');

// Convertir le JSON en un tableau associatif en PHP
$commandes = json_decode($json, true);

if (isset($commandes[$_GET['date']][$_GET['id']])) {

    $commandes[$_GET['date']][$_GET['id']]['nom'] = $_GET['nom'];
    $commandes[$_GET['date']][$_GET['id']]['prenom'] = $_GET['prenom'];
    $commandes[$_GET['date']][$_GET['id']]['email'] = $_GET['email'];

    $commandes[$_GET['date']][$_GET['id']]['nom_album'] = $_GET['nom_album'];
    $commandes[$_GET['date']][$_GET['id']]['qtt_album'] = (int)$_GET['qtt_album'];
    $commandes[$_GET['date']][$_GET['id']]['reliure'] = $_GET['reliure'];
    $commandes[$_GET['date']][$_GET['id']]['format'] = $_GET['format'];
    $commandes[$_GET['date']][$_GET['id']]['pages'] = (int)$_GET['pages'];
    $commandes[$_GET['date']][$_GET['id']]['total'] = (float)$_GET['total'];

    $commandes[$_GET['date']][$_GET['id']]['deja_telecharge'] = false;
    $commandes[$_GET['date']][$_GET['id']]['supprime'] = false;


} else {
    $commandes[$_GET['date']][$_GET['id']] = array(
        'nom' => $_GET['nom'],
        'prenom' => $_GET['prenom'],
        'email' => $_GET['email'],

        'nom_album' => $_GET['nom_album'],
        'qtt_album' => (int)$_GET['qtt_album'],
        'reliure' => $_GET['reliure'],
        'format' => $_GET['format'],
        'pages' => (int)$_GET['pages'],
        'total' => (float)$_GET['total'],

        'deja_telecharge' => false,
        'supprime' => false
    );
}

// Convertir le tableau associatif en JSON
$json = json_encode($commandes, JSON_PRETTY_PRINT);

// Enregistrer le JSON dans le fichier
file_put_contents('../../ASSETS/json/commandes.json', $json);

// header('Location: ../');



?>