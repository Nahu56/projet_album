<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editeur</title>

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
        <section id="templates" style="display:block;">
            <header class="header_section">
                <h3>Mise en page</h3>
            </header>
            <main id="box_templates"> </main>
        </section>

        <!-- Edition d'image -->
        <section id="edit_image" >
            <header class="header_section" >
                <h3>Edition d'image</h3>
            </header>
            <main>
                <div>
                    <p>Insérer une image</p>
                    <div class="inserer_image">
                        
                        <label for="inserer_image">
                            Ouvrir un fichier
                            <input type="file" name="inserer_image" id="inserer_image" value="Inserer une image"  onchange="setBackground(event)">

                        </label>
                    </div>
                    <div class="image_actuel" style="display:none;">

                    </div>
                </div>
                <div>
                    <p>Placer l'image</p>

                    <button onclick="place_img(event)" id="img_top">Haut</button>
                    <button onclick="place_img(event)" id="img_bottom">Bas</button>
                    <button onclick="place_img(event)" id="img_center">centre</button>
                    <button onclick="place_img(event)" id="img_left">Gauche</button>
                    <button onclick="place_img(event)" id="img_right">Droite</button>
                </div>

            </main>
            <footer class="footer_section" >
                <button class="main_btn" onclick="afficher_edit_templates()">
                    Terminer  <br> <span>et revenir à la mise en page</span>
                </button>
            </footer>
        </section>

        <!-- Edition du texte -->
        <section id="edit_texte" >
            <header class="header_section" >
                <h3>Edition de texte</h3>
            </header>
            <main>
                <div>
                    <h6>Texte</h6>
                    <textarea rows="4" cols="50" id="textarea_edit_texte" oninput="textarea_edit()"></textarea>
                </div>
            </main>
            <footer class="footer_section">
                <button class="main_btn" onclick="afficher_edit_templates()">
                    Terminer  <br> <span>et revenir à la mise en page</span>
                </button>
            </footer>
        </section>

    </div>
    


    <!-- ------------------------------------------------------------------------ */
    /*                                    PAGE                                    */
    /* ------------------------------------------------------------------------- -->
    


    
    <div id="centre"></div>



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
                <button class="main_btn" onclick="ajout_page()">
                    + page
                </button>
            </footer>
        </section>

        
        
        <!-- /* ----------------------------- panier ---------------------------- */ -->
        <section id="panier" class="roll">

            <header onclick="wrap_panier()">
                <div>
                    <h3>Panier</h3>
                </div>
                <div>
                    <img src="ASSETS/img/icones/arrow.svg" alt=""> <!-- fleche qui monte en svg -->
                </div>
            </header>
            <main>

                <header>
                    <h6>Titre de l'album</h6>

                    <input type="text" placeholder="Mon album">
                </header>
                <main>
                    <div id="options_album">
                        <div>
                            <p>Base</p>
                            <span id=""> 9,90€</span>
                        </div>
                        <div>
                            <p>Reliure</p>
                            <span id=""> 6,50€</span>
                        </div>
                        <div>
                            <p>Format</p>
                            <span id=""> 2,00€</span>
                        </div>
                        <div>
                            <p>Pages x24</p>
                            <span id=""> 12,00€</span>
                        </div>
                    </div>

                    <div>
                        <p>Album</p>
                        <span>30,40€</span>
                    </div>
                </main>
                <footer>
                    <div>
                        <button> + </button>
                        <p>2</p>
                        <button> - </button>
                    </div>

                    <div>
                        <div>
                            <span>63,80€</span>
                            <p>-10%</p>
                        </div>
                        <p>54,72€</p>
                    </div>
                </footer>
            </main>

            <footer>
                <button onclick="go_checkout()" class="black_btn">Terminer</button>
            </footer>
        </section>
    </div>


    <div id="modal_final" class="">
        <main>
            <header>
                <div>
                    <h2>Récapitulatif</h2>
                    <button class="btn_retour" onclick="open_modal_final()">
                        Retour
                        <img src="ASSETS/img/retour_haut.svg" alt="">
                    </button>
                </div>
                <p>Voici un récapitulatif de votre album. Prenez soin de vérifier toutes les pages avant de continuer !</p>
            </header>

            <main>
                -- Ici les miniatures des pages --
            </main>

            <footer>
                <h3>Votre panier</h3>

                <div>
                    album
                </div>

                <button> << Paypal >> </button>
            </footer>
        </main>
    </div>

</body>
</html>

<script src="CODE/JS/editeur.js"></script>
<script src="CODE/JS/editeur_gestion-template.js"></script>

<script>
    /* -------------------------------------------------------------------------- */
    /*                          RECUPERATION DES OPTIONS                          */
    /* -------------------------------------------------------------------------- */

    // Créer un tableau vide
    var options = [];

    // Récupérer les valeurs des options de l'album et les ajouter au tableau
    options.push('<?php echo $_POST["reliure"]; ?>');
    options.push('<?php echo $_POST["format"]; ?>');
    options.push('<?php echo $_POST["theme"]; ?>');

    // Convertir le tableau en une chaîne JSON
    var optionsJSON = JSON.stringify(options);

    // Enregistrer la chaîne JSON dans le sessionStorage
    sessionStorage.setItem('options', optionsJSON);
</script>