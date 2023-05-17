<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="stylesheet" href="CODE/CSS/editeur.css">
    
    <!-- Appel header -->
    <?php require '../components/header.php' ?>

    <script>
        // TODO : A decocher plus tard

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

    <div id="gauche">

        <!-- Mise en page -->
        <section id="templates">
            <header class="header_section">
                <h3>Mise en page</h3>
            </header>
            <main> </main>
        </section>

        <!-- Edition d'image -->
        <section id="edit_image">
            <header class="header_section" >
                <h3>Edition d'image</h3>
            </header>
            <main>
                <div>
                    <p>Insérer une image</p>
                    <input type="file" name="image" id="image" value="Inserer une image">
                </div>
                <div>
                    <p>Placer l'image</p>

                </div>

            </main>
            <footer class="footer_section">
                <button class="main_btn">
                    Terminer  <br> <span>et revenir à la mise en page</span>
                </button>
            </footer>
        </section>

        <!-- Edition d'image -->
        <section id="edit_texte">
            <header class="header_section" >
                <h3>Edition de texte</h3>
            </header>
            <main>
                <div>
                    <p>Texte</p>
                    <textarea rows="4" cols="50"></textarea>
                </div>

            </main>
            <footer class="footer_section">
                <button class="main_btn">
                    Terminer  <br> <span>et revenir à la mise en page</span>
                </button>
            </footer>
        </section>

    </div>
    


    <!-- ------------------------------------------------------------------------ */
    /*                                    PAGE                                    */
    /* ------------------------------------------------------------------------- -->
    
    <div id="centre">
            
            <button id="btn_image">
                image
            </button>
            <button id="temp">
                template
            </button>
            <button id="btn_txt">
                texte
            </button>
            
    </div>

    <!-- ------------------------------------------------------------------------ */
    /*                                   DROITE                                   */
    /* ------------------------------------------------------------------------- -->
    <div id="droite">

        <section id="apercu">
            <header class="header_section">
                <h3>Aperçu</h3>
                <p>de votre album</p>
            </header>
            <main>

            <!-- apercu de l'album -->

                <div class="bloc_page">
                    <header class="ligne_page">
                        <div class="hr"></div>
                        <div class="num_page"> page 1 / 2 </div>
                        <div class="hr"></div>
                    </header>

                    <div>
                        <!-- pages -->
                        <div class="vignette_page">
                            <div style="width:85%; height: 90%; margin: 10px"></div>
                        </div>
                        <div class="vignette_page">
                            <div style="width:85%; height: 40%; margin: 10px"></div>
                            <div style="width:85%; height: 40%; margin: 10px"></div>
                        </div>
                    </div>
                </div>

                <div class="bloc_page">
                    <header class="ligne_page">
                        <div class="hr"></div>
                        <div class="num_page"> page 3 / 4 </div>
                        <div class="hr"></div>
                    </header>

                    <div>
                        <!-- pages -->
                        <div class="vignette_page">
                            <div style="width:85%; height: 90%; margin: 10px"></div>
                        </div>
                        <div class="vignette_page">
                            <div style="width:85%; height: 40%; margin: 10px"></div>
                            <div style="width:85%; height: 40%; margin: 10px"></div>
                        </div>
                    </div>
                </div>
                <div class="bloc_page">
                    <header class="ligne_page">
                        <div class="hr"></div>
                        <div class="num_page"> page 3 / 4 </div>
                        <div class="hr"></div>
                    </header>

                    <div>
                        <!-- pages -->
                        <div class="vignette_page">
                            <div style="width:85%; height: 90%; margin: 10px"></div>
                        </div>
                        <div class="vignette_page">
                            <div style="width:85%; height: 40%; margin: 10px"></div>
                            <div style="width:85%; height: 40%; margin: 10px"></div>
                        </div>
                    </div>
                </div>
                <div class="bloc_page">
                    <header class="ligne_page">
                        <div class="hr"></div>
                        <div class="num_page"> page 3 / 4 </div>
                        <div class="hr"></div>
                    </header>

                    <div>
                        <!-- pages -->
                        <div class="vignette_page">
                            <div style="width:85%; height: 90%; margin: 10px"></div>
                        </div>
                        <div class="vignette_page">
                            <div style="width:85%; height: 40%; margin: 10px"></div>
                            <div style="width:85%; height: 40%; margin: 10px"></div>
                        </div>
                    </div>
                </div>

            </main>
            <footer class="footer_section">
                <button class="main_btn">
                    + page
                </button>
            </footer>
        </section>

        
        
        <!-- /* ----------------------------- panier ---------------------------- */ -->
        <section id="panier">
            <header onclick="wrap_panier()" class="roll">
                <div>
                    <h3>Panier</h3>
                </div>
                <div>
                    <img src="ASSETS/img/icones/arrow.svg" alt=""> <!-- fleche qui monte en svg -->
                </div>
            </header>
            <main>

            </main>
        </section>
    </div>

</body>
</html>

<script src="CODE/JS/editeur_gestion-template.js"></script>
<script src="CODE/JS/editeur_edition.js"></script>
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