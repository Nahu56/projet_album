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
                <div class="bloc_couv">
                    <header class="ligne_page">
                        <div class="hr"></div><div class="num_page">1ère couverture</div><div class="hr"></div>
                    </header>
                    <div>
                    <div class="vignette_page" id="" style=""></div>
                    </div>
                </div>

                <div class="list_pages">
                    
                    <!-- apercu de l'album -->

                </div>


                <div class="bloc_couv">
                    <header class="ligne_page">
                        <div class="hr"></div><div class="num_page">Dernière couverture</div><div class="hr"></div>
                    </header>
                    <div>
                    <div class="vignette_page" id="" style=""></div>
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
                <button onclick="test_validation()" class="black_btn">TEST</button>
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
                <script src="https://www.paypal.com/sdk/js?client-id=<?php echo CLIENT_ID ?>&currency=EUR&locale=fr_FR"></script>
                <script>

                    function test_validation(){

                        var reliure_album = "Gold";
                        var pages_album = 52 ;
                        var format_album = "A4"; 

                        // Afficher les details de la transaction dans la console
                        details  = {"id": "87L258710V175744D", "intent": "CAPTURE", "status": "COMPLETED", "purchase_units": [ { "reference_id": "default", "amount": { "currency_code": "EUR", "value": "1.99", "breakdown": { "item_total": { "currency_code": "EUR", "value": "1.99" }, "shipping": { "currency_code": "EUR", "value": "0.00" }, "handling": { "currency_code": "EUR", "value": "0.00" }, "insurance": { "currency_code": "EUR", "value": "0.00" }, "shipping_discount": { "currency_code": "EUR", "value": "0.00" } } }, "payee": { "email_address": "sb-kxgpb20393803@business.example.com", "merchant_id": "V5Q2F8SMUFXMW" }, "description": "Album Photo", "items": [ { "name": "Album Photo", "unit_amount": { "currency_code": "EUR", "value": "1.99" }, "tax": { "currency_code": "EUR", "value": "0.00" }, "quantity": "1", "description": "Un album photo de qualité ", "image_url": "" } ], "shipping": { "name": { "full_name": "John Doe" }, "address": { "address_line_1": "Av. de la Pelouse, 87648672 Mayet", "admin_area_2": "Paris", "admin_area_1": "Alsace", "postal_code": "75002", "country_code": "FR" } }, "payments": { "captures": [ { "id": "2NJ45344AE7044432", "status": "COMPLETED", "amount": { "currency_code": "EUR", "value": "1.99" }, "final_capture": true, "disbursement_mode": "INSTANT", "seller_protection": { "status": "ELIGIBLE", "dispute_categories": [ "ITEM_NOT_RECEIVED", "UNAUTHORIZED_TRANSACTION" ] }, "create_time": "2023-06-06T12:09:59Z", "update_time": "2023-06-06T12:09:59Z" } ] } } ], "payer": { "name": { "given_name": "John", "surname": "Doe" }, "email_address": "sb-43zoiv25000455@personal.example.com", "payer_id": "YHBQKJAZCGALY", "address": { "country_code": "FR" } }, "create_time": "2023-06-06T12:09:51Z", "update_time": "2023-06-06T12:09:59Z", "links": [ { "href": "https://api.sandbox.paypal.com/v2/checkout/orders/87L258710V175744D", "rel": "self", "method": "GET" } ]}

                        // Récupérer la date 
                        const dateStr = details.update_time;
                        var date = new Date(dateStr);
                        var date = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;

                        var tableau_commande = []; 

                        tableau_commande[0] = date;
                        tableau_commande[1] = details.id;
                        tableau_commande[2] = details.payer.name.surname;
                        tableau_commande[3] = details.payer.name.given_name;
                        tableau_commande[4] = details.payer.email_address;
                        
                        tableau_commande[5] = details.purchase_units[0].items[0].name;
                        tableau_commande[6] = details.purchase_units[0].items[0].quantity;
                        tableau_commande[7] = reliure_album;
                        tableau_commande[8] = format_album;
                        tableau_commande[9] = pages_album;

                        tableau_commande[10] = details.purchase_units[0].amount.value;


                        let tableau_album = sessionStorage.getItem("album"); // -> tableau de l'album


                        /* -------------------------------------------------------------------------- */
                        /*                                REQUETE AJAX                                */
                        /* -------------------------------------------------------------------------- */
                        /** Requete AJAX permettant de passer les informations de commande, ainsi que le tableau contenant l'album
                         * @param {array} tableau_commande //date, id, nom, prenom, email nom_album, qtt_album, reliure, format, nb_page, total
                         * @param {array} tableau_album //tableau de l'album
                        */
                        
                        // Création d'un objet XMLHttpRequest
                        let xhr = new XMLHttpRequest();

                        xhr.open("POST", 'CODE/controller.php?function=validation_commande');
                        xhr.responseType = "json";

                        // Création d'un objet FormData
                        let formData = new FormData();
                        formData.append('tableau_commande', JSON.stringify(tableau_commande));
                        formData.append('tableau_album', tableau_album);

                        xhr.onload = function() {
                        // Si le statut HTTP n'est pas 200...
                        if (xhr.status !== 200) { 
                            // ...On affiche le statut et le message correspondant
                            alert("Erreur " + xhr.status + " : " + xhr.statusText);
                        } else {
                            // Si le statut HTTP est 200, on affiche la réponse
                            alert("Réussi ! -> " + xhr.response);
                        }
                        };

                        // Envoi des données avec la méthode send()
                        xhr.send(formData);

                    }

            
                    /* -------------------------------------------------------------------------- */
                    /* -------------------------------------------------------------------------- */
                    /* -------------------------------------------------------------------------- */



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
                                    unit_amount : { value : 1.99, currency_code : "EUR" }
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