<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editeur</title>

    <link rel="stylesheet" href="CODE/CSS/editeur.css">
    
    <!-- Appel header -->
    <?php 
    require '../components/header.php' ;
    ?>

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

    <div id="notifications">
        
    </div>
    
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
                            <input type="file" accept=".jpeg, .jpg, .png, .svg" name="inserer_image" id="inserer_image" value="Inserer une image"  onchange="setBackground(event)">

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
    /*                                    PAGES                                   */
    /* ------------------------------------------------------------------------- -->
    
    <!---------- COUVERTURES ---------->

    <div id="centre_couv" class="centre">
        <div id="couv_2" class="page">
            <p style="text-align: center;">Dernière couverture</p>
            <div class="feuille"></div>
        </div>

        <div id="couv_1" class="page">
            <p style="text-align: center;">Première couverture</p>
            <div class="feuille"></div>
        </div>


    </div>

    <!------------ PAGES ------------>
    
    <div id="centre" class="centre"></div>



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
                <div class="bloc_couv apercue_couv_1">
                    <header class="ligne_page">
                        <div class="hr"></div><div class="num_page">1ère couverture</div><div class="hr"></div>
                    </header>
                    <div>
                        <div class="vignette_page " id="apercue_couv_1" style="" onclick="focus_page('couv_1', 'couv')">
                        </div>
                    </div>
                </div>

                <div class="list_pages">
                    
                    <!-- apercu de l'album -->

                </div>


                <div class="bloc_couv apercue_couv_2">
                    <header class="ligne_page">
                        <div class="hr"></div><div class="num_page">Dernière couverture</div><div class="hr"></div>
                    </header>
                    <div>
                        <div class="vignette_page" id="apercue_couv_2" style="" onclick="focus_page('couv_2', 'couv')">
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

                    <input type="text" placeholder="Mon album" oninput="nom_album = this.value; document.getElementById('nom_album_modal').textContent = nom_album;">
                </header>
                <main>
                    <div id="options_album">
                        <div class="prix_base">
                            <p>Base</p>
                            <span id=""> </span>
                        </div>
                        <div class="prix_reliure">
                            <p>Reliure</p>
                            <span id=""> </span>
                        </div>
                        <div class="prix_couverture">
                            <p>Couverture</p>
                            <span id=""> </span>
                        </div>
                        <div class="prix_pages">
                            <p></p>
                            <span id=""></span>
                        </div>
                    </div>

                    <div class="txt_prix_album">
                        <p>Album</p>
                        <span></span>
                    </div>
                </main>
                <footer>
                    <div class="qtt">
                        <button onclick="changer_qtt(-1)" > - </button>
                        <p>1</p>
                        <button onclick="changer_qtt(1)" > + </button>
                    </div>

                    <div class="total">
                        <!-- <div>
                            <span>63,80€</span>
                            <p>-10%</p>
                        </div> -->
                        <p></p>
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
                <h3>Couverture de l'album</h3>
                <div id="minia_couvertures">

                    <div id="miniature_couv_2">
                        <p>Dernière</p>
                        <div class="miniature_page"></div>
                    </div>
                    <div id="miniature_couv_1">
                        <p>Première</p>
                        <div class="miniature_page"></div>
                        <img src="ASSETS/img/icones/liaison_page.svg" alt="icone liaison entre les pages">
                    </div>
                </div>

                <h3>Pages de l'album</h3>

                <div id="minia_pages">

                </div>
            </main>

            <footer>
                <h3>Votre panier</h3>

                <div id="panier_modal">
                    <p id="nom_album_modal">Album photo</p>
                    <div class="options">
                        <div class="prix_base">
                            <p>Base</p>
                            <span></span>
                        </div>
                        <div class="prix_reliure">
                            <p>Reliure</p>
                            <span></span>
                        </div>
                        <div class="prix_couverture">
                            <p>Couverture</p>
                            <span></span>
                        </div>
                        <div class="prix_pages">
                            <p>Page x10</p>
                            <span></span>
                        </div>
                        <div class="txt_prix_album">
                            <p>Album</p>
                            <span></span>
                        </div>
                    </div>
                    <div class="qtt_total">
                        <p class="exemplaires"> 1 Exemplaires </p>
                        <p class="total"></p>
                    </div>
                </div>

                
                <!-- Le conteneur des boutons PayPal -->
                <div class="paypal" id="paypal-boutons"></div>

                <!-- Importation de la SDK JavaScript PayPal -->
                <script src="https://www.paypal.com/sdk/js?client-id=<?php echo CLIENT_ID ?>&currency=EUR&locale=fr_FR"></script>
                <script>

                    var reliure_album = "Gold";
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
                                    name : nom_album,
                                    quantity : qtt,
                                    description : "Album photo made in Print Shop CREA ",
                                    // unit_amount : { value : prix_album.toFixed(2) , currency_code : "EUR" }
                                    unit_amount : { value : 1 , currency_code : "EUR" } // TODO à supprimer et garder le commentaire au dessus
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

                                // Récupérer la date 
                                const dateStr = details.update_time;
                                var date = new Date(dateStr);
                                var date = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;

                                console.log(date);

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
                                tableau_commande[9] = nb_pages;

                                tableau_commande[10] = details.purchase_units[0].amount.value;

                                let tableau_album = saveAlbum();
                                console.log("LE TABLEAU", tableau_album)
                                // let tableau_album = sessionStorage.getItem("album"); // -> tableau de l'album


                                /* -------------------------------------------------------------------------- */
                                /*                                REQUETE AJAX                                */
                                /* -------------------------------------------------------------------------- */
                                /** Requete AJAX permettant de passer les informations de commande, ainsi que le tableau contenant l'album
                                 * @param {array} tableau_commande //date, id, nom, prenom, email nom_album, qtt_album, reliure, format, nb_page, total
                                 * @param {array} tableau_album //tableau de l'album
                                */
                                
                                // Création d'un objet XMLHttpRequest
                                let xhr = new XMLHttpRequest();

                                xhr.open("POST", 'CODE/controller.php?function=part1');
                                xhr.responseType = "json";

                                // Création d'un objet FormData
                                let formData = new FormData();
                                formData.append('tableau_commande', JSON.stringify(tableau_commande));
                                formData.append('tableau_album', JSON.stringify(tableau_album));

                                xhr.onload = function() {
                                // Si le statut HTTP n'est pas 200...
                                if (xhr.status !== 200) { 
                                    // ...On affiche le statut et le message correspondant
                                    console.log("Erreur " + xhr.status + " : " + xhr.statusText);

                                } else {
                                    // Si le statut HTTP est 200, on affiche la réponse
                                    console.log("Réussite " + xhr.response);
                                    
                                    //et on renvoie vers la suite
                                    window.location = 'CODE/controller.php?function=part2';
                                }
                                };

                                // Envoi des données avec la méthode send()
                                xhr.send(formData);




                            });
                        },

                        // Annuler la transaction
                        onCancel : function (data) {
                            notifications(false,' transaction annulée ');
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