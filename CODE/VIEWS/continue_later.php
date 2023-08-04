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




/* -------------------------------------------------------------------------- */
/*                                ENVOI DU MAIL                               */
/* -------------------------------------------------------------------------- */

$to = $email;
$subject = "Votre album photo - PrintShop Crea";

$mail = file_get_contents("../components/email_continue_later.html");
$message = str_replace("LIEN_VERS_ALBUM", $url, $mail);

$headers = "Content-Type: text/html; charset=utf-8\r\n";
$headers .= "From: noreply.printshopcrea@gmail.com\r\n";

$success = true;

if(mail($to, $subject, $message, $headers)){
    $message = "Vous avez reçu un mail !";
    $success = true;

}else{
    $Message = "Erreur lors de l'envoi";
    $success = false;

}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Continuer plus tard</title>

    <!-- Appel header -->
    <?php require '../components/header.php' ?>

    <link rel="stylesheet" href="CODE/CSS/accueil.css">


</head>
<body>

    <main>
        <div class="card">

            <a href="printshopcrea.com">
                <img width="400px" src="https://printshopcrea.com/wp-content/uploads/2023/08/logo_png.png" alt="logo">
            </a>

            <h1><?php echo $message ?></h1>

            <?php 
                if($success){
                    echo "<p>Vous trouverez un lien pour reprendre votre album dans votre boite mail !</p>";
                }else{
                    echo "<p>Veuillez nous excusez pour la gène occasionnée</p>";
                }
            ?>

        </div>

        <!-- /* --------------------------------- CONTACT -------------------------------- */ -->
        <section>
            <div class="secondHeader">
                <h3>Des questions ?</h3>
                <div class="hr"></div>
            </div>
            
            <p>Contactez notre support client !</p>

            <div class="list_infos">
                <div>
                    <a href="mailto:prod@printshopcrea.com" class="info">
                        <p>Email : <b> prod@printshopcrea.com</b></p>
                    </a>
                </div>
                <div>
                    <a href="tel:02 97 14 47 63" class="info">
                        <p>Tél: <b> 02 97 14 47 63</b></p>
                    </a>
                </div>
            </div>
        </section>


    </main>

    
</body>

</html>