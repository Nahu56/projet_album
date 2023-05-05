<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        window.addEventListener("beforeunload", function(event) {
            event.preventDefault(); // Annule la fermeture de la page
            event.returnValue = ""; // Requiert une chaîne vide pour les navigateurs plus anciens
            alert("Êtes-vous sûr de vouloir quitter cette page ?"); // Affiche l'alerte
        });
    </script>
</head>
<body>
    editeur
</body>
</html>