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
    

   <?php  $CLIENT_ID = "AZPGXAEFcPRSHidHeDpKxinr5THwSIrBZ-Oj8vfA_RaKU4ZTO-lBQzYKMYXOb6lW48ZBK0PF_lDpnLyl"; ?>


    

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
                    <div class="image_actuel" style="display:none;"></div>
                </div>
                <div class="placer_image">
                    <p>Placer l'image</p>

                    <div>
                        <img src="ASSETS/img/fleche_triangle.svg" alt="fleche haut" height="30" onclick="place_img(event)" id="img_top">

                        <div>
                            <img src="ASSETS/img/fleche_triangle.svg" style="transform:rotate(-90deg);" alt="fleche bas" height="30" onclick="place_img(event)" id="img_left">

                            <div onclick="place_img(event)" id="img_center"></div>

                            <img src="ASSETS/img/fleche_triangle.svg" style="transform:rotate(90deg);" alt="fleche bas" height="30" onclick="place_img(event)" id="img_right">
                        </div>

                        <img src="ASSETS/img/fleche_triangle.svg" style="transform:rotate(180deg);" alt="fleche bas" height="30" onclick="place_img(event)" id="img_bottom">
                    </div>

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

            </main>
            <footer class="footer_section">
                <button class="main_btn" onclick="ajout_page()">
                    + page
                </button>
            </footer>
        </section>

        
        
        <!-- /* ----------------------------- panier ---------------------------- */ -->
        <section id="panier" class="roll">

            <header >
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

                
                <!-- Le conteneur des boutons PayPal -->
                <div id="paypal-boutons"></div>

                <!-- Importation de la SDK JavaScript PayPal -->
                <script src="https://www.paypal.com/sdk/js?client-id=<?php echo $CLIENT_ID ?>&currency=EUR&locale=fr_FR"></script>
                <script>
                    var reliure_album = "Gold";
                    var pages_album = 52 ;
                    var format_album = "A4";

                    // 2. Afficher le bouton PayPal
                    paypal.Buttons({

                        style: {
                            layout: 'vertical',
                            color:  'gold',
                            shape:  'pill',
                            label:  'paypal'
                        },

                        // Configurer la transaction
                        createOrder : function (data, actions) {

                            // Les produits à payer avec leurs details
                            var produits = [
                                {
                                    name : "Album Photo",
                                    quantity : 1,
                                    description : "Un album photo de qualité ",
                                    unit_amount : { value : 79.99, currency_code : "EUR" }
                                }
                            ];

                            // Le total des produits
                            var total_amount = produits.reduce(function (total, product) {
                                return total + product.unit_amount.value * product.quantity;
                            }, 0);

                            // La transaction
                            return actions.order.create({
                                purchase_units : [{
                                    items : produits,
                                    amount : {
                                        value : total_amount,
                                        currency_code : "EUR",
                                        breakdown : {
                                            item_total : { value : total_amount, currency_code : "EUR" }
                                        }
                                    },
                                }]
                            });
                        },

                        // Capturer la transaction après l'approbation de l'utilisateur
                        onApprove : function (data, actions) {
                            return actions.order.capture().then(function(details) {

                                // Afficher les details de la transaction dans la console
                                console.log(details);

                                // Récupérer la date 
                                const dateStr = details.update_time;
                                var date = new Date(dateStr);
                                var date = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;


                                $_SESSION['date'] = date;
                                $_SESSION['id'] = details.id;
                                $_SESSION['nom'] = details.payer.name.surname;
                                $_SESSION['prenom'] = details.payer.name.given_name;
                                $_SESSION['email'] = details.payer.email_address;
                                
                                $_SESSION['nom_album'] = details.purchase_units[0].items[0].name;
                                $_SESSION['qtt_album'] = details.purchase_units[0].items[0].quantity;
                                $_SESSION['reliure'] = reliure_album;
                                $_SESSION['format'] = format_album;
                                $_SESSION['pages'] = pages_album;

                                $_SESSION['total'] = details.purchase_units[0].amount.value;

                                // Envoie des infos 
                                window.location.href = "recuperation_data.php";

                                // On affiche un message de succès
                                // alert(details.payer.name.given_name + ' ' + details.payer.name.surname + ', votre transaction est effectuée. Vous allez recevoir une notification très bientôt lorsque nous validons votre paiement.');

                            });
                        },

                        // Annuler la transaction
                        onCancel : function (data) {
                            alert("Transaction annulée !");
                        }

                    }).render("#paypal-boutons");

                </script>
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