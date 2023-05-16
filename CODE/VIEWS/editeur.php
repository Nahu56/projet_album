<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="stylesheet" href="CODE/CSS/editeur.css">

    <script>
        // A decocher plus tard

        // window.addEventListener("beforeunload", function(event) {
        //     event.preventDefault(); // Annule la fermeture de la page
        //     event.returnValue = ""; // Requiert une chaîne vide pour les navigateurs plus anciens
        //     alert("Êtes-vous sûr de vouloir quitter cette page ?"); // Affiche l'alerte
        // });
    </script>

</head>
<body id="editeur">
    
    <!-- ------------------------------------------------------------------------ */
    /*                                   GAUCHE                                   */
    /* ------------------------------------------------------------------------- -->
    <section id="apercu">
        <header>
            <h2>Aperçu</h2>
            <p>de votre album</p>
        </header>
        <main>

        <!-- apercu de l'album -->

        </main>
        <footer>
            <button class="main_btn">
                + page
            </button>
        </footer>
    </section>


    <!-- ------------------------------------------------------------------------ */
    /*                                    PAGE                                    */
    /* ------------------------------------------------------------------------- -->


    <!-- ------------------------------------------------------------------------ */
    /*                                   DROITE                                   */
    /* ------------------------------------------------------------------------- -->
    <div>
        <!-- Mise en page -->
        <section>
            <header>
                <h2>Mise en page</h2>
            </header>
            <main>

            </main>
        </section>

        <!-- Edition d'image -->
        <section>
            <header>
                <h2>Edition d'image</h2>
            </header>
            <main>

            </main>
            <footer>

            </footer>
        </section>

        <!-- Edition d'image -->
        <section>
            <header>
                <h2>Edition de texte</h2>
            </header>
            <main>

            </main>
            <footer>
                
            </footer>
        </section>
        
        
        <!-- /* ----------------------------- panier ---------------------------- */ -->
        <section id="panier">
            <div>
                <h2>Panier</h2>
            </div>
            <div>
                <img src="" alt=""> <!-- fleche qui monte en svg -->
            </div>
        </section>
    </div>

</body>
</html>

<script src="CODE/JS/editeur.js"></script>

<script>
    /* -------------------------------------------------------------------------- */
    /*                          RECUPERATION DES OPTIONS                          */
    /* -------------------------------------------------------------------------- */

    // Créer un tableau vide
    var variables = [];

    // Récupérer les valeurs des variables PHP et les ajouter au tableau
    variables.push('<?php echo $_POST["reliure"]; ?>');
    variables.push('<?php echo $_POST["format"]; ?>');
    variables.push('<?php echo $_POST["theme"]; ?>');

    // Convertir le tableau en une chaîne JSON
    var variablesJSON = JSON.stringify(variables);

    // Enregistrer la chaîne JSON dans le sessionStorage
    sessionStorage.setItem('variables', variablesJSON);
</script>