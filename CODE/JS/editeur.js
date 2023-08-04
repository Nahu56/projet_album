/** --------- VARIABLES IMPORTANTES ---------
 * Variables essentielles 
 */

var focus = "page_0";
var nb_pages = 0;
var element_focus = null;
var qtt = 1 ; // Quantité d'albums : par défaut à zéro
var theme = "classique";

var prix_total = 0;
var prix_album = 0;

var nom_album = "Album photo";

//vide le sessionStorage
sessionStorage.setItem("album", "");



document.onreadystatechange = function () {
    if (document.readyState == "complete") {

        lancement();

        // if(!sessionStorage.getItem("id") && sessionStorage.getItem("id") !== "" && sessionStorage.getItem("id") !== null){
        //     lancement();
        // }
    }
}


/**
 * --------------- FONCTION DE LANCEMENT ------------------
 * -> récupère les prix
 * -> initialise les variables de session prix et reduc
 * -> ajoute une page si besoin
 */
function lancement(){
    /** --------------------- RECUPERE LES PRIX ---------------------
     *
     *   DOIT RECUPERER LES PRIX AVANT DE LANCER QUOI QUE CE SOIT
     *  
     *  -> lance les fonctions liées au prix
     *  -> focus la première page pour édition
     */
    fetch("ASSETS/json/variables_prix.json")
        .then(response => response.json())
        .then(function(json){

            var options = [];

            // A un ID => récupère un album
            if(sessionStorage.getItem("id")){
                let ID = sessionStorage.getItem("id");

                //vérifie si l'ID est vide
                if(options === null || ID == null || ID === ""){

                    window.location.href = "options";            
                }else{
                    options = JSON.parse(sessionStorage.getItem("options"));

                }
            

            // A des options => crée un album
            }else if(sessionStorage.getItem("options")){

                options = JSON.parse(sessionStorage.getItem("options"));
            
            //ni l'un ni l'autre => retour aux options
            }else{

                window.location.href = "options";

            }

            var PRIX = {
                "base": json["base"]["1"],
                "page": json["page"][ options[0] ],
                "reliure": json["reliure"][ options[1] ],
                "couverture": json["couverture"][ options[2] ]
            }

            //crée une variable de session avec les prix
            sessionStorage.setItem("PRIX", JSON.stringify(PRIX));

            //crée une variable de session pour les réductions
            sessionStorage.setItem("reducs", JSON.stringify(json["reductions"]));


            if( ! sessionStorage.getItem("id")){
                ajout_page();
                focus_page("page_1", "pages");
            }

            affichage_options_album();
            maj_prix_album();
            maj_prix_total();


    })
}


var centre = document.getElementById("centre");
centre.addEventListener('click',afficher_edit_templates)


//bouton de retour aux options
function retour_verification(){
    document.querySelector("#retour_options .secondaire").style.display = "block";

    document.querySelector("#retour_options .primaire p").innerHTML = "Retour aux options";

    document.querySelector("#retour_options").addEventListener("mouseleave", function(){
        document.querySelector("#retour_options .secondaire").style.display = "none";
        document.querySelector("#retour_options .primaire p").innerHTML = "Retour";

    })
}

//feature vue degagee
function vue_degagee(){

    let display = document.querySelector("#gauche").style.display;

    if(display !== "none"){

        document.querySelector("#gauche").style.display = "none";
        document.querySelector("#droite").style.display = "none";
        document.querySelector("#retour_options").style.display = "none";

        document.querySelector("#vue_degagee p").innerHTML = "Afficher l'éditeur";



    }else{
        document.querySelector("#gauche").style.display = "block";
        document.querySelector("#droite").style.display = "flex";
        document.querySelector("#retour_options").style.display = "block";

        document.querySelector("#vue_degagee p").innerHTML = "Vue dégagée";
    }
}


/** CHARGE LES OPTIONS DU THEME
 * -> charge la typo afin de l'appliquer sur toutes les pages
 * -> charge la couleur de fond
 */
function charge_theme(){
    let options = JSON.parse(sessionStorage.getItem("options"));

    theme = options[3];

    if(theme !== "classique"){ //si c'est le theme classique, prendre en compte différement (blanc)

        let typo = theme.split("#")[0];
        let couleur = theme.split("#")[1];
    
        // ----- TYPO -----
        //retrouve la typo correspondante (pour la vue)
        
        switch (theme.split("#")[0]) {
            case "classique":
                typo = "";

                break
            case "dejavusansmono":
                typo = '"Noto Sans Vithkuqi", sans-serif';

                break;
            case "times": 
                typo = '"Times New Roman"';
        
                break;
            default:
                break;
        }
        
        
        
        //ajoute une balise style dans le body, avec la font appliquée aux btn des feuilles
        document.querySelector("body").insertAdjacentHTML('beforebegin', 
            "<style>.vignette_page, .feuille, .miniature_page{background-color: #"+ couleur +" !important ;} .feuille button{font-family : "+ typo +" ;}</style>"
        );
    }

}




/** ----- FONCTIONS AFFICHAGE PAGES D'EDITION -----
 * Fonction qui permet d'afficher ou de cacher la partie edit
 * 
 * -> Met à jour le tableau
 */
function afficher_edit_templates() {
    // !! Mise à jour du tableau !!


    // La fonction correspond majoritairement à l'animation d'affichage de l'élément lorsqu'on clique dessus 
    var template = document.querySelector("#templates");
    if (template.style.display !== "block") {

        // on enleve la bordure de l'ancien l'élément séléctionné et on met element_focus à null
        element_focus.classList.remove("selected");
        element_focus.classList.remove("border-none");
        element_focus = null

        rm_apercue_image(); // On enleve l'apercue de l'image
        
        template.style.display ="block";

        var hauteur = 100;
        template.style.top = hauteur+"%";

        var edit_image = document.querySelector("#edit_image");
        var edit_texte = document.querySelector("#edit_texte");

        function afficher_edit() {
            if (hauteur > 0) {
                setTimeout(function() {
                    hauteur-=2;
                    template.style.top = -hauteur + "%";
                    edit_image.style.top = ((100-hauteur) - 3) +"%";
                    edit_texte.style.top = ((100-hauteur) - 3) +"%";

                    afficher_edit();
                }, 1);
            }else{
                edit_image.style.top= 0;
                edit_texte.style.top= 0;
                edit_image.style.display ="none";
                edit_texte.style.display ="none";
            }
        }
        
        afficher_edit();

    }

}
function afficher_edit_image(element_focus_param) {

    if (element_focus_param != element_focus) {

        if (element_focus!=null) {
            element_focus.classList.remove("selected"); // On enleve la bordure de l'ancien élément séléctionné 

            rm_apercue_image(); // On enleve l'apercue de l'image
        }

        element_focus = element_focus_param; // On met à jour l'élément séléctionné

        // On test si il y a une image dans l'élément séléctionné et si c'est le cas on affiche l'apercue
        if (element_focus.style.backgroundImage =="none" || element_focus.style.backgroundImage=="" || element_focus.style.backgroundImage == "unset") {}else{
            apercue_image() 
        }
        element_focus.classList.add("selected"); // On affiche la bordure sur l'élément séléctionné
    }

    // On réinitialise la valeur du input 
    const fileInput = document.querySelector("#inserer_image");
    fileInput.value = "";

    // Le reste de la fonction correspond à l'animation d'affichage de l'élément lorsqu'on clique dessus 
    var edit_image = document.querySelector("#edit_image");
    if (edit_image.style.display !== "block") {

        edit_image.style.display ="block";

        var hauteur = 100;
        edit_image.style.top = hauteur+"%";

        var template = document.querySelector("#templates");
        var edit_texte = document.querySelector("#edit_texte");

        function afficher_edit() {
            if (hauteur > 0) {
                setTimeout(function() {
                    hauteur-=2;
                    edit_image.style.top = hauteur + "%";
                    template.style.top = (-(100-hauteur) - 3) +"%";
                    edit_texte.style.top = (-(100-hauteur) - 3) +"%";

                    afficher_edit();
                }, 1);
            }else{
                template.style.top= 0;
                edit_texte.style.top= 0;
                template.style.display ="none";
                edit_texte.style.display ="none";
            }
        }
        afficher_edit();
    }

}
function afficher_edit_texte(element_focus_param) {
    if (element_focus_param != element_focus) {
        if (element_focus!=null) {
            element_focus.classList.remove("selected"); // On enleve la bordure si l'élément avant était un image 
            rm_apercue_image(); // On enleve en même temps l'apercue de l'image 
        }

        element_focus = element_focus_param; // On met à jour la valeur de element_focus

    }

    // Le reste de la fonction correspond à l'animation d'affichage de l'élément lorsqu'on clique dessus 
    var edit_texte = document.querySelector("#edit_texte");
    if (edit_texte.style.display !== "block") {        

        edit_texte.style.display ="block";

        var textarea_edit_texte = document.getElementById("textarea_edit_texte");
        textarea_edit_texte.focus(); // On focus le la textarea 
        
        var hauteur = 100;
        edit_texte.style.top = hauteur+"%";

        var template = document.querySelector("#templates");
        var edit_image = document.querySelector("#edit_image");


        function afficher_edit() {
            if (hauteur > 0) {
                setTimeout(function() {
                    hauteur-=2;
                    edit_texte.style.top = hauteur + "%";
                    template.style.top = (-(100-hauteur) - 3) +"%";
                    edit_image.style.top = (-(100-hauteur) - 3) +"%";

                    afficher_edit();
                }, 1);
            }else{
                template.style.top= 0;
                edit_image.style.top= 0;
                template.style.display ="none";
                edit_image.style.display ="none";
            }
        }

        afficher_edit();

    }

    
}

/** ------------- MAJ TEXTAREA -------------
 * Cette fonction permet d'initialiser dans le textarea les valeurs qui sont dans l'élément séléctionné
 * @param {string} id // Cette fonction n'utilise pas element_focus car elle est lancé avant avant la fct afficher_edit_texte()
 */
function maj_textarea(element_focus_param) {
    var textarea_edit_texte = document.getElementById("textarea_edit_texte");
    textarea_edit_texte.value = element_focus_param.textContent;
}



// permet de récup l'historique du code avant erreur
function getStackTrace() {
    const error = new Error();
    if (error.stack) {
      return error.stack;
    }
    return 'Stack trace not available.';
}



/** ------------- FOCUS PAGE & COUVERTURES -------------
 * fonction qui affiche la page avec l'id qui est mis en paramètre 
 * @param {string} id // Identifiant de la page que l'ont veut mettre en evidence 
 */
function focus_page(id, context = "pages"){
    var centre = document.getElementById("centre");
    let centre_couv = document.getElementById("centre_couv");

    if(context == "pages"){ //  -> si on focus une page

        // ------- flex les pages & none les couvertures --------
        centre.style.display = "flex";
        centre_couv.style.display = "none";

        correct_templates(2);
        unfocus_apercu();

    }else if(context == "couv"){ // -> si on focus une couverture

        // ------- flex les couvertures & none les pages --------
        centre.style.display = "none";
        centre_couv.style.display = "flex";

        centre = centre_couv; // -> la div couv devient le "centre"

        correct_templates(1);
        unfocus_apercu();
    }



    // On récupère les éléments 
    var page = document.getElementById(id);

    // On scroll jusque l'élément visé
    centre.scrollTo({
        top: 0,
        left: page.offsetLeft - window.innerWidth * 0.35,
        behavior: "smooth"
    });




    // On créée le voile
    var voile = document.createElement('div');
    voile.className = 'voile';


    // On récupère les pages de l'album / ou les couvertures, en fonction de "centre"
    var pages = centre.getElementsByClassName('page');

    var passe = false;


    Array.from(pages).forEach(element => {

        var id_apercu;
        if(context == "pages"){
            id_apercu = element.id.substring(5);
        }else{
            id_apercu = element.id;
        }

        // On vérifie si c'est pas l'élément focus 
        if (element.getAttribute('id') !== id) {

            var feuilleElement = element.querySelector('.feuille');
            var hasVoile = feuilleElement.querySelector('.voile') !== null;

            // On place le texte en fct de si le focus est passé ou pas 
            if (passe) { 
                element.querySelector('p').style.textAlign="left";
            }else{
                element.querySelector('p').style.textAlign="right";
            }

            // Si il n'a pas de voile on lui en rajoute un 
            if (!hasVoile) { 

                element.querySelector('.feuille').appendChild(voile);
                
                element.querySelector('.feuille .voile').onclick = function(){

                    focus_page(element.id, context);
                };

                // l'aperçu est géré au début de focus_page

                if(context == "pages"){
                    var suppr_page = document.querySelector('#apercue_'+id_apercu +' .suppr_page')
                    suppr_page.style.display='none';
                }

            }

        // Si c'est l'élément focus 
        }else {

            passe = true;
            element.querySelector('p').style.textAlign="center";

            // On enleve le voile 
            if (element.querySelector('.feuille div.voile')) { 
                divVoile = element.querySelector('.feuille .voile');
                divVoile.remove();
            }

            //gestion de l'apercu de la page selectionnée
            var div_apercu = document.querySelector('#apercu main');
        

            var bloc_apercu = document.querySelector('#apercu main .apercue_'+id_apercu)

            var apercue = document.querySelector('#apercue_'+id_apercu)
            apercue.classList.remove("unselected");
            apercue.classList.add("selected");

            if(context == "pages"){
                var suppr_page = document.querySelector('#apercue_'+id_apercu +' .suppr_page')
                suppr_page.style.display='block';
            }

            // On met a jour le placement de la page dans l'apercue
            div_apercu.scrollTo({
                top: bloc_apercu.offsetTop - div_apercu.clientHeight * 0.25, // Le pourcentage peut être modifié 
                behavior: 'smooth'
            });
            

        }

    });

    // On raffiche edit_templates
    afficher_edit_templates()

    sessionStorage.setItem("currentpage", id); // -> assignation de la nouvelle page courante

}


function correct_templates(context = 2){
    //context == 1 -> template de couverture
    //context == 2 -> template de page

    let div_template = document.querySelectorAll("#templates main a");
    let sous_titre = document.querySelector("#templates .header_section .sous-titre");

    if(context == 1){
        sous_titre.textContent = "des couvertures";
    }else{
        sous_titre.innerHTML = "";
    }

    div_template.forEach(element => {

        element.style.display = "none"; // tout en none

        if(context == 1 && element.id.startsWith("couv")){ //affiche si on choisi couv et c'est une couv
            element.style.display = "block";

        }else if(context == 2 && element.id.startsWith("id")){ //affiche si on choisi page et c'est une page
            element.style.display = "block";
        }

    })
}

// enleve le focus sur toutes les pages / couvertures de l'apercu
function unfocus_apercu(){
    let liste_pages = document.querySelectorAll("#apercu>main .vignette_page");

    liste_pages.forEach(element => {
        element.classList.remove("selected");
        element.classList.add("unselected");
    })
}




/** ------------- AJOUT PAGE -------------
 * fonction qui permet d'ajouter une div dans #centre et de la focus 
 */
function ajout_page() {

    let PRIX = JSON.parse(sessionStorage.getItem("PRIX"));

    nb_pages += 1;

    // On met à jour la ligne dans le panier 
    var prix_pages_prx = document.querySelector('#panier main main #options_album .prix_pages span');
    prix_pages_prx.textContent= (nb_pages*PRIX["page"]).toFixed(2).replace('.', ',')+'€' ;
    var prix_pages_txt = document.querySelector('#panier main main #options_album .prix_pages p');
    prix_pages_txt.textContent= 'Pages x'+nb_pages;

    // On met a jour dans le panier modal 
    var prix_pages_prx_modal = document.querySelector('#panier_modal .prix_pages span');
    prix_pages_prx_modal.textContent= (nb_pages*PRIX["page"]).toFixed(2).replace('.', ',')+'€' ;
    var prix_pages_txt_modal = document.querySelector('#panier_modal .prix_pages p');
    prix_pages_txt_modal.textContent= 'Pages x'+nb_pages;

    // On met a jour le prix de l'album
    maj_prix_album();
    maj_prix_total()
    
    

    // Création de l'élément div avec l'ID "page_1" et la classe "page"
    var divPage = document.createElement("div");
    divPage.id = "page_"+nb_pages;
    divPage.className = "page";

    // Création de l'élément p avec le numéro de page
    var pElement = document.createElement("p");
    pElement.textContent = "Page "+nb_pages;
    divPage.appendChild(pElement);

    // Création de l'élément div (la feuille) vide à l'intérieur de divPage
    var divElement = document.createElement("div");
    divElement.className = "feuille";

    // //Création de la zone d'édit de la feuille et ajout a cette dernière
    // var divZone = document.createElement("div");
    // divZone.className = "zone"; 
    // divElement.appendChild(divZone);

    divPage.appendChild(divElement);

    if(nb_pages % 2 === 1 ){
        divPage.style.marginRight= "100px";

        if(nb_pages > 1){
            var icone = document.createElement("img");
            icone.src = "ASSETS/img/icones/liaison_page.svg";
            icone.alt = "icone liaison entre les pages";
            divPage.appendChild(icone);
        }
    }

    // Ajout de divPage1 à la page
    var centre = document.getElementById("centre");
    centre.appendChild(divPage);
    ajout_page_apercue();

    focus_page("page_"+(nb_pages));

}

function ajout_page_apercue() {

    //si nb_pages est pair
    if (nb_pages % 2 === 0) {

        // Création de l'élément <div> avec la classe "bloc_page"
        var blocPage = document.createElement("div");
        blocPage.className = "bloc_page";
        blocPage.classList.add( "bloc_pages_"+nb_pages+"_"+(nb_pages+1));
        blocPage.classList.add( "apercue_"+nb_pages);


        // Création de l'élément <header> avec la classe "ligne_page"
        var header = document.createElement("header");
        header.className = "ligne_page";

        // Création des éléments <div> avec la classe "hr" pour les séparateurs horizontaux
        var hr1 = document.createElement("div");
        hr1.className = "hr";
        var hr2 = document.createElement("div");
        hr2.className = "hr";

        // Création de l'élément <div> avec la classe "num_page" pour afficher le numéro de page
        var numPage = document.createElement("div");
        numPage.className = "num_page";
        numPage.textContent = "page " + nb_pages;

        // Ajout des éléments <div class="hr"> et <div class="num_page"> à l'élément <header>
        header.appendChild(hr1);
        header.appendChild(numPage);
        header.appendChild(hr2);

        // Ajout de l'élément <header> au <div class="bloc_page">
        blocPage.appendChild(header);

        // Création de l'élément <div> pour les pages
        var pagesDiv = document.createElement("div");

        // Création de la première vignette de page
        var vignettePage= document.createElement("div");
        vignettePage.className = "vignette_page";
        vignettePage.id = "apercue_"+nb_pages;

        const i = nb_pages;
        vignettePage.onclick = null;
        vignettePage.onclick = function(){
            focus_page('page_'+i);
        };

        var suppr_page = document.createElement('img');
        suppr_page.src = 'ASSETS/img/suppr_page.svg'
        suppr_page.classList.add('suppr_page')  

        suppr_page.onclick = function(e) {

            if (confirm("Êtes-vous sûr de vouloir supprimer cette page ?")) {
              supprimer_page(i);

              txt = "Supprimer";
            }else{
              txt = "annuler";

            }

            // évite qu'au clic de la croix, la vignette soit sélectionnée
            // et donc focus page appélé sur une page inexistante
            e.stopPropagation();
          };        

        vignettePage.appendChild(suppr_page);


        // Ajout des vignettes de page à l'élément <div> pour les pages
        pagesDiv.appendChild(vignettePage);

        // Ajout de l'élément <div> pour les pages au <div class="bloc_page">
        blocPage.appendChild(pagesDiv);

        // Ajout du bloc de page à la page HTML
        var apercue_main = document.querySelector('#apercu main .list_pages')
        apercue_main.appendChild(blocPage);

    }else{

        var blocPage = document.querySelector('#apercu main .bloc_pages_'+(nb_pages-1)+'_'+nb_pages);

        if(nb_pages == 1){
            blocPage = document.querySelector('#apercu main .bloc_pages_'+ nb_pages);
        }

        blocPage.classList.add("apercue_"+(nb_pages))

        var texte = blocPage.querySelector("header .num_page");

        if(nb_pages > 1){
            texte.textContent = texte.textContent+"/"+nb_pages;
        }


        var div_page = blocPage.lastElementChild;        
        // Création de la première vignette de page
        var vignettePage = document.createElement("div");
        vignettePage.className = "vignette_page";
        vignettePage.id = ("apercue_"+nb_pages);

        const i = nb_pages;
        vignettePage.onclick = null;
        vignettePage.onclick = function(){
            focus_page('page_'+i);
        };

        var suppr_page = document.createElement('img');
        suppr_page.src = 'ASSETS/img/suppr_page.svg'
        suppr_page.classList.add('suppr_page')  

        
        suppr_page.onclick = function(e) {
            if (confirm("Êtes-vous sûr de vouloir supprimer cette page ?")) {
              supprimer_page(i);

              txt = "Supprimer";
            }else{
              txt = "annuler";

            }

            // évite qu'au clic de la croix, la vignette soit sélectionnée
            // et donc focus page appélé sur une page inexistante
            e.stopPropagation();

          };

        vignettePage.appendChild(suppr_page);

        div_page.appendChild(vignettePage);

    }

    

}


/** ------------- SET BACKGROUND -------------
 * Cette fonction modifie le fond de l'élément element_focus qui est initialisé dans l'apparition de la page edit 
 * RAF : 
 *  - sauvegarde de l'image 
 *  - Initialisation de la position de l'image a center dans le tableau
 */
function setBackground(event) {

    const file = event.target.files[0];
    const reader = new FileReader();
                    
    reader.addEventListener('load', () => {
        element_focus.classList.remove("vide"); // -> supprime l'icone img

        element_focus.style.backgroundImage = `url(${reader.result})`;
        element_focus.value = file.name;

        // défini les variables
        var id_page = element_focus.parentElement.parentElement.id;
        var num_page = element_focus.parentElement.parentElement.id.substring(5);

        // récupère les éléments
        var img_apercue = document.querySelector('#apercue_' + id_page +' .'+element_focus.classList[0])

        if(id_page.startsWith("page")){
            var img_apercue = document.querySelector('#apercue_' + num_page +' .'+element_focus.classList[0])
        }

        // ajoute l'image de fond
        img_apercue.style.backgroundImage = `url(${reader.result})`;

        element_focus.parentNode.classList.add("editee");


        rm_apercue_image();
        apercue_image();
    });

    reader.readAsDataURL(file);
}

/** ------------- TEXTAREA EDIT -------------
 * Modifie le texte dans element_focus
 */
function textarea_edit() {
    var textarea_edit_texte = document.getElementById("textarea_edit_texte");

    if(element_focus.classList.contains == "border-none"){
        setTimeout(() => {
            element_focus.classList.remove("border-none");
        }, 1000);
    }else{
        element_focus.classList.add("border-none");

    }

    element_focus.parentNode.classList.add("editee");

    element_focus.textContent = textarea_edit_texte.value;

}



/** ------------- APERCUE IMAGE -------------
 * Cette fonction affiche les infos de l'image 
 */
function apercue_image(){

    // Création du premier div à l'intérieur de divImageActuel
    var div1 = document.createElement("div");

    // Création de l'élément img avec l'attribut src et alt
    var img = document.createElement("div");
    img.className = "image";
    img.style.backgroundImage = element_focus.style.backgroundImage ;
    

    // Ajout de l'élément img à l'intérieur de div1
    div1.appendChild(img);

    // Création de l'élément div avec la classe "info"
    var divInfo = document.createElement("div");
    divInfo.className = "info";

    // Création de l'élément h4 et p à l'intérieur de divInfo
    var h4 = document.createElement("h4");
    h4.textContent = "Image actuelle";

    var p = document.createElement("p");
    if (element_focus.value.length > 18) {
        p.textContent = element_focus.value.substring(0,18,-4) + '...';
    }else{
        p.textContent = element_focus.value;
    }
    

    // Ajout des éléments h4 et p à l'intérieur de divInfo
    divInfo.appendChild(h4);
    divInfo.appendChild(p);

    // Ajout de l'élément divInfo à l'intérieur de div1
    div1.appendChild(divInfo);


    // Création de l'élément img pour le bouton de suppression
    var btnSupprimeImage = document.createElement("img");
    btnSupprimeImage.src = "ASSETS/img/croix.svg";
    btnSupprimeImage.alt = "bouton pour supprimé l'image";

    btnSupprimeImage.addEventListener('click',()=>{

        // On réinitialise la valeur du input 
        const fileInput = document.querySelector("#inserer_image");
        fileInput.value = "";

        // On remet la couleur en background
        element_focus.style.backgroundImage = "unset";
        element_focus.classList.add("vide");

        // défini les variables
        var id_page = element_focus.parentElement.parentElement.id;
        var num_page = element_focus.parentElement.parentElement.id.substring(5);

        // récupère les éléments
        var img_apercue = document.querySelector('#apercue_' + id_page +' .'+element_focus.classList[0])

        if(id_page.startsWith("page")){
            var img_apercue = document.querySelector('#apercue_' + num_page +' .'+element_focus.classList[0])
        }

        // ajoute l'image de fond
        img_apercue.style.backgroundImage = "none";

        notifications(true,'Image supprimée');

        rm_apercue_image()
    })


    // Ajout de divImageActuel à un élément existant dans le document (par exemple, le body)
    var image_actuel = document.querySelector(".image_actuel");
    image_actuel.appendChild(div1);
    image_actuel.appendChild(btnSupprimeImage);

    image_actuel.style.display = 'flex';
}

/** ------------- SUPPR APERCUE IMAGE -------------
 * Cette fonction permet de supprimer la partie apercue le d'image 
 * Elle sera utilisé surtout dans les cas ou on lance les fct afficher_edit_templates() ou afficher_edit_texte()
 */
function rm_apercue_image() {
    
    var image_actuel = document.querySelector(".image_actuel");

    if (image_actuel.childElementCount != 0) {
        var div = document.querySelector(".image_actuel div");

        var btnSupprimeImage = document.querySelector(".image_actuel img");
        image_actuel.style.display = 'none';
        
        image_actuel.removeChild(div);
        image_actuel.removeChild(btnSupprimeImage);
    }

}



/** ------------- PLACE IMAGE -------------
 * Permet de fixer l'image d'un coté du cadre
 * (Haut, bas, centre, gauche et droite)
 */
function place_img(event){
    let button = event.target;
    let choix = button.id.split("_")[1];

    // défini les variables
    var id_page = element_focus.parentElement.parentElement.id;
    var num_page = element_focus.parentElement.parentElement.id.substring(5);

    // récupère les éléments
    let element = document.querySelector("button.selected");
    var img_apercue = document.querySelector('#apercue_' + id_page + ' .'+element_focus.classList[0]);
    
    if(id_page.startsWith("page")){
        var img_apercue = document.querySelector('#apercue_' + num_page +' .'+element_focus.classList[0])
    }

    //supprime la class existante
    let list_choix = ["top", "bottom", "center", "left", "right"];
    list_choix.forEach(option => {
        element.classList.remove("img_" + option);
        img_apercue.classList.remove("img_" + option);

    })

    element.classList.add("img_" + choix);
    img_apercue.classList.add("img_" + choix);


}

/** ------------- SUPPRIMER PAGE -------------
 * Permet de supprimer une page dans le #centre et dans l'apercu 
 * @param {integer} num_page est le numéro de la que l'on veut supprimer 
 */
function supprimer_page(num_page) {

    // 1) -> supprimer la page dans le centre
    // 2) -> focus la page correcte
    // 3) ext] supprimer la page dans l'aperçu
    // 4) ext] supprimer la mniniature
    // 5) -> mise à jour du panier
    // 6) -> mise à jour du panier modal
    // 7) -> notification



    let PRIX = JSON.parse(sessionStorage.getItem("PRIX"));

    // On enleve la page dans le centre 
    var centre = document.getElementById('centre')
    var element = document.getElementById('page_'+num_page)
    centre.removeChild(element)

    // On replace les éléments dans le centre
    for (let i = num_page; i < nb_pages; i++) {

        let i_bis = +i + 1 ;
        var page = document.getElementById('page_'+(i_bis));
        page.id = 'page_'+i;

        if (i % 2 === 0) {
            page.style.marginRight = '0px';
            var icone = page.querySelector('img');
            page.removeChild(icone)
        }else{
            page.style.marginRight = '100px';

            if(i > 1){
                var icone = document.createElement("img");
                icone.src = "ASSETS/img/icones/liaison_page.svg";
                icone.alt = "icone liaison entre les pages";
                page.appendChild(icone);
            }
        }

        var page_texte = page.querySelector('p');
        page_texte.textContent = 'Page '+i;

        var voile = page.querySelector('.voile');


        voile.onclick = null;
        voile.onclick = function(){

            let num_page = i - 1;
            focus_page('page_'+num_page);
        };

    }



    // --------- APERCU ---------- 
    supprimer_page_apercu(num_page);


    // Supprime la page du décompte !
    nb_pages -= 1 ;


    // On met à jour la ligne dans le panier 
    var prix_pages_prx = document.querySelector('#panier main main #options_album .prix_pages span ');
    prix_pages_prx.textContent= (nb_pages*PRIX["page"]).toFixed(2).replace('.', ',')+'€' ;
    var prix_pages_txt = document.querySelector('#panier main main #options_album .prix_pages p ');
    prix_pages_txt.textContent= 'Pages x'+nb_pages;

    // On met a jour dans le panier modal 
    var prix_pages_prx_modal = document.querySelector('#panier_modal .prix_pages span');
    prix_pages_prx_modal.textContent= (nb_pages*PRIX["page"]).toFixed(2).replace('.', ',')+'€' ;
    var prix_pages_txt_modal = document.querySelector('#panier_modal .prix_pages p');
    prix_pages_txt_modal.textContent= 'Pages x'+nb_pages;


    // On met a jour le prix de l'album
    maj_prix_album();
    maj_prix_total()


    notifications(true,'Page supprimée');
    // En fonction du nombre de page on change l'action (derniere page -> on reviens a celle d'avant, page milieu -> on reste sur la page, page 0 -> on ajoute une nouvelle page )
    if (nb_pages == 0) {
        ajout_page()
    }else{
        if (nb_pages + 1 == num_page) {

            focus_page('page_'+(+num_page-1))
        }else{

            focus_page('page_'+(num_page))
        }
    }
}
function supprimer_page_apercu(num_page){
    // On enleve l'élément dans l'apercu
    
    var apercu_icone = document.querySelector('#apercu main .bloc_page #apercue_'+num_page)
    var parent_apercu = apercu_icone.parentElement;
    parent_apercu.removeChild(apercu_icone);

    
    // Réorganisation des éléments
    for (let i = num_page; i < nb_pages; i++) {
        let i_bis = +i + 1; //page d'après
        const apercue_suivant = document.querySelector('#apercu main .bloc_page #apercue_'+(i_bis));

        apercue_suivant.id='apercue_'+i;

        apercue_suivant.onclick = null;
        apercue_suivant.onclick = function(){
            focus_page('page_'+i);
        };
        

        apercue_suivant.querySelector('img').onclick = null;
        apercue_suivant.querySelector('img').onclick = function(e) {
            if (confirm("Êtes-vous sûr de vouloir supprimer cette page ?")) {
              supprimer_page(i);

              txt = "Supprimer";
            }else{
              txt = "annuler";

            }

            // évite qu'au clic de la croix, la vignette soit sélectionnée
            // et donc focus page appélé sur une page inexistante
            e.stopPropagation();

        };
        

        if (!apercue_suivant.parentElement.classList.contains(apercue_suivant.id)) {
            var new_parent = document.querySelector('#apercu main .'+apercue_suivant.id)

            new_parent.lastElementChild.appendChild(apercue_suivant);
        }

    }


    
    // On change le dernier élément de l'apercu en fonction 
    if (nb_pages % 2 == 0) {
        var liste_apercu = document.querySelector('#apercu main .list_pages')
        var dernier_element = document.querySelector('#apercu main .list_pages').lastChild
        liste_apercu.removeChild(dernier_element); 
    }else{
        var txt_dernier_element = document.querySelector('#apercu main .list_pages').lastChild.querySelector('.num_page');

        //corrige numéros de page
        let num_page_moins_un = nb_pages - 1;
        txt_dernier_element.textContent = "page " + num_page_moins_un;
    }
}


/* -------------------------------------------------------------------------- */
/*                                  MINIATURE                                 */
/* -------------------------------------------------------------------------- */

/** Génère les miniatures après go_checkout
 *  Crée une copie de l'apercu, dans la liste des miniatures
 */

function charge_miniatures(){

    /* ----------------------- MINIATURES DES COUVERTURES ----------------------- */

    // ---- premiere de couverture ---- 
    let vignette_premiere = document.querySelector("#apercue_couv_1"); //récupère la vignette
    let minia_premiere = document.querySelector("#miniature_couv_1 .miniature_page"); //récupère la miniature

    //clone les éléments de la vignette vers la minia
    vignette_premiere.querySelectorAll("div").forEach(obj => {
        minia_premiere.appendChild(obj.cloneNode("true"));
    })


    // ---- dernière de couverture ---- 
    let vignette_derniere = document.querySelector("#apercue_couv_2");
    let minia_derniere = document.querySelector("#miniature_couv_2 .miniature_page");

    vignette_derniere.querySelectorAll("div").forEach(obj => {
        minia_derniere.appendChild(obj.cloneNode("true"));
    })





    /* -------------------------- MINIATURES DES PAGES -------------------------- */

    let blocs_pages = document.querySelectorAll("#apercu main .list_pages .bloc_page"); //liste des blocs pages de l'apercu
    let minia_pages = document.querySelector("#minia_pages"); //section miniatures
    minia_pages.innerHTML = "";


    //boucle sur les doubles pages de l'apercu
    blocs_pages.forEach(bloc_page => {    
        let double_page = document.createElement("div");
        double_page.classList.add("double_page"); //Création de la double page

        //boucle sur les vignettes dans cette double page (une ou deux)
        let vignettes = bloc_page.querySelectorAll("div .vignette_page");        
        vignettes.forEach(vignette => {
            let num_page_vignette = vignette.id.split("_")[1]; //récupère le numéro de page de la vignette

            let bloc_miniature = document.createElement("div"); //crée le bloc de la miniature
            bloc_miniature.id = "miniature_page_" + num_page_vignette;

            let numero_page = document.createElement("p"); //ajoute le numéro de page
            numero_page.textContent = "page " + num_page_vignette;
            let miniature = document.createElement("div"); //crée la div miniature
            miniature.classList.add("miniature_page");

            vignette.querySelectorAll("div").forEach(element => {
                miniature.appendChild(element.cloneNode("true"));
            });


            bloc_miniature.appendChild(numero_page);
            bloc_miniature.appendChild(miniature);

            double_page.appendChild(bloc_miniature);
        })


        minia_pages.appendChild(double_page)
    });

    
    //creation de la page disabled => bloc_page_disabled
    let bloc_page_disabled = document.createElement("div");
    let page_disabled = document.createElement("div");
    page_disabled.classList.add("miniature_page");
    page_disabled.classList.add("page_disabled");
    bloc_page_disabled.appendChild(page_disabled);

    let bloc_page_dis_2 = bloc_page_disabled.cloneNode(true); //clonage du bloc
    
    //ajout en deuxieme de couverture
    let deuxieme_couv = minia_pages.querySelector(".double_page:first-child");
    deuxieme_couv.prepend(bloc_page_disabled);
    
    //ajout en troisieme de couverture
    let troisieme_couv = minia_pages.querySelector(".double_page:last-child");
    troisieme_couv.appendChild(bloc_page_dis_2);
};



/* -------------------------------------------------------------------------- */
/*                                 MAJ TABLEAU                                */
/* -------------------------------------------------------------------------- */
/** Tableau contenant tout l'album -> voir "tableau_rendu.md"
 * Scan toutes les pages, et récupère toutes les informations sur chacune d'elle
 */
function saveAlbum(){
    let feuilles = document.querySelectorAll(".feuille");
    var album = [];
    var tab_feuille = [""];
    var derniere_page = [""];
  
    //boucle sur toutes les feuilles == pages
    feuilles.forEach(page => {

        let buttons = page.querySelectorAll("button");
        let id_template = page.classList[1];

        if(id_template !== null){ // -> si ce n'est pas une page blanche

            tab_feuille = [id_template];
  
            buttons.forEach(obj => {


                if(obj.classList.contains("img")){ // -> c'est une image
    
                    let code_img = obj.style.backgroundImage;
                    const img64 = code_img.substring(5, code_img.length - 2); // -> garde uniquement le code en base 64 de l'image

                    //trouver placement de l'image
                    let placement_image = "C";
                    let list_classes = obj.classList;
                    list_classes.forEach(classe => {

                        if(classe.startsWith("img_")){

                            placement_image = classe.split("_")[1].toUpperCase()[0];

                        };
                    })

                    tab_feuille.push(placement_image + "#" + img64); // -> garde l'img64
    
                }else if(obj.classList.contains("txt")){ // -> c'est un texte
                    
                    //récupération du texte
                    tab_feuille.push(obj.innerHTML);
                }
            })

        }


        if(page.parentNode.id == "couv_2"){ // permet de passer la dernière de couverture en dernier

            derniere_page = tab_feuille;

        }else{
            album.push(tab_feuille);
        }

    })

    album.push(derniere_page); // -> ajoute la derniere de couverture a la fin
  
    return album;
  
}


 /** ------------------ VARIABLES PANIER ------------------
 * Ici vous trouverez les variables qui permettent l'ouverture et la fermeture du panier 
 */

/* -------------------------------------------------------------------------- */
/*                                   PANIER                                   */
/* -------------------------------------------------------------------------- */


var panier_ouvert = false; // Pour savoir si le panier est ouvert ou fermer

function gestion_panier(){
    let panier = document.querySelector("#panier");

    // On vérifie si le panier est ouvert
    if (panier.classList.contains("roll")) { 
        open_panier();
    }else{
        close_panier();
    }
}




/** -------------------- WRAP PANIER --------------------
 * Permet de dérouler / enrouler le panier
 */
function open_panier() {
    let panier = document.querySelector("#panier");

    panier.classList.remove("roll");
    panier.classList.add("unrolled");

    panier.querySelector("img").classList.add("reverse");
    panier.classList.add("shadow");

    panier_ouvert = true;

}
function close_panier() {
    let panier = document.querySelector("#panier");

    panier.classList.remove("unrolled");
    panier.classList.add("roll");

    panier.querySelector("img").classList.remove("reverse");
    panier.classList.remove("shadow"); 

    panier_ouvert = false;
}


/* -------------------------------------------------------------------------- */
/*                               CONTINUE LATER                               */
/* -------------------------------------------------------------------------- */
//ouvre le modal, et vérifie si le formulaire (email) est valide, en direct
function continue_later(){
    let modal = document.querySelector("#modal_continue_later");
    modal.style.display = "block";

    let form = modal.querySelector("form");

    form.querySelector("div input").addEventListener("input", function(){

        if(form.checkValidity()){
            form.querySelector("input[type=submit]").classList.add("valid");

        }else{
            form.querySelector("input[type=submit]").classList.remove("valid");

        }
    })

    
    // --- OPTIONS ---
    let options = sessionStorage.getItem("options");
    document.querySelector("#liste_options_album").value = options;

    // --- CONTENU ---
    let album = saveAlbum();
    document.querySelector("#contenu_album").value = JSON.stringify(album);
}
function close_continue_modal(){
    let modal = document.querySelector("#modal_continue_later");

    modal.style.display = "none";
}


/* -------------------------------------------------------------------------- */
/*                                  CHECKOUT                                  */
/* -------------------------------------------------------------------------- */

/** -------------- GO CHECKOUT --------------
 * Fonction appelée au clic du bouton "terminer" dans le panier
 * 
 * Vérifications avant validation de l'album
 *  -> Edition des couvertures
 *  -> Nombre de pages suppérieur ou  égal à X
 *  -> Nombre de pages impair
 */
function go_checkout() {


    let contenu_couv_1 = document.querySelector("#couv_1 .feuille").innerHTML;
    let contenu_couv_2 = document.querySelector("#couv_2 .feuille").innerHTML;

    let nb_pages_mini = 4; //TODO

    //vérifie que la 1ere de couverture n'est pas vierge
    if(contenu_couv_1 === "" || contenu_couv_1 === '<div class="voile"></div>'){
        notifications(false,"Vous n\'avez pas édité la première de couverture !")

    //vérifie que la dernière de couverture n'est pas vierge
    }else if(contenu_couv_2 === "" || contenu_couv_2 === '<div class="voile"></div>'){
        notifications(false,"Vous n\'avez pas édité la dernière de couverture !")
        
    //vérifie que le nombre de pages est supérieur ou égal a X
    }else if(nb_pages < nb_pages_mini){
        notifications(false,"L'ablum doit contenir "+ nb_pages_mini +" pages au minimum")

    //vérifie que le nombre de pages est impaire
    }else if(nb_pages % 2 == 1){
        notifications(false,'Il vous manque une page')


    //Tout est ok, on ouvre le modal
    }else{

        open_modal_final();
        charge_miniatures();

    }
}


/** ------------- MODAL FINAL -------------
 * Permet de faire apparaitre le modal récapitulatif
 */
function open_modal_final(){
    let modal = document.querySelector("#modal_final");

    modal.addEventListener("click", function(event){
        if (event.target !== this) {
            return; // Ignore le clic sur les éléments enfants de #modal_final
        }

        body.addEventListener('click', close_panier);

        modal.classList.remove('actif');
        setTimeout(function() {
            modal.style.display = "none";
        }, 600); // Délai de 600 millisecondes (0,6 seconde)
    })

    if(modal.classList.contains('actif')){

        document.querySelector("body").classList.add("no-scroll");

        modal.classList.remove('actif');
        setTimeout(function() {
            modal.style.display = "none";
        }, 600); // Délai de 600 millisecondes (0,6 seconde)
        body.addEventListener('click', close_panier);
    } else {

        document.querySelector("body").classList.remove("no-scroll");

        modal.style.display = "block";
        setTimeout(function() {
            modal.classList.add('actif');
        }, 100); // D
        

    }
}


/** ------------- FONCTION MAJ PRIX TOTAL -------------
 * Cette fonction met à jour les informations 
 */
function maj_prix_total(){
    let reducs = JSON.parse(sessionStorage.getItem("reducs")); //-> récupère la liste de réductions
    var reduction = 0;

    // ------- CALCUL DE LA REDUCTION APPLIQUEE ---------
    
    // Parcourir les seuils de réduction dans l'ordre décroissant
    for (var key in reducs) {

        if (qtt >= parseInt(key)) {

            reduction = reducs[key];
        }
    }

    // reduction -> variable contenant le % de réduction
    total_avant_reduc = prix_album * qtt; // -> prix avant réduction
    prix_total = total_avant_reduc - (total_avant_reduc * reduction / 100) ; // -> prix apres réduction


    //Affichage du calcul de réduction si il y en une
    if(reduction >= 10){
        document.querySelector('#panier .total>div').style.display = "flex";
    }else{
        document.querySelector('#panier .total>div').style.display = "none";
    }


    // ----- PANIER -----
    var txt_prix_total = document.querySelector('#panier .total .avant-reduc')
    txt_prix_total.textContent = total_avant_reduc.toFixed(2).replace('.', ',')+'€';

    var txt_prix_total = document.querySelector('#panier .total .reduc')
    txt_prix_total.textContent = "-" + reduction + "%";

    var txt_prix_total = document.querySelector('#panier .total .apres-reduc')
    txt_prix_total.textContent = prix_total.toFixed(2).replace('.', ',')+'€';



    // ----- MODAL FINAL -----
    var txt_prix_total_modal = document.querySelector('#panier_modal .total')
    txt_prix_total_modal.textContent = 'Total : '+prix_total.toFixed(2).replace('.', ',')+'€';

}
function maj_prix_album(){
    let PRIX = JSON.parse(sessionStorage.getItem("PRIX"));

    prix_album = PRIX["base"] + (nb_pages * PRIX["page"]) + PRIX["reliure"] + PRIX["couverture"] ;
    

    var txt_prix_album = document.querySelector('#panier main main .txt_prix_album span')
    txt_prix_album.textContent = prix_album.toFixed(2).replace('.', ',')+'€';

    var txt_prix_album_modal = document.querySelector('#panier_modal .txt_prix_album span')
    txt_prix_album_modal.textContent = prix_album.toFixed(2).replace('.', ',')+'€';

}






/** ------------- FONCTION CHANGER QTT  -------------
 * Cette fonction change la quantité à l'aide des boutons et met a jour le prix 
 */
function changer_qtt(nb){
    qtt = qtt + nb;
    if (qtt > 0) {
        var texte = document.querySelector('#panier main footer .qtt p')
        texte.textContent = qtt;

        var texte_modal = document.querySelector('#panier_modal  .exemplaires')
        texte_modal.textContent = qtt+' Exemplaires';
    }else{
        qtt = 1;
    }

    maj_prix_total()
}


function affichage_options_album(){
    let PRIX = JSON.parse(sessionStorage.getItem("PRIX"));

    // Pour le panier 
    var prx_base = document.querySelector('#options_album .prix_base span');
    prx_base.textContent = PRIX["base"].toFixed(2).replace('.', ',')+'€';

    var prx_reliure = document.querySelector('#options_album .prix_reliure span');
    prx_reliure.textContent = PRIX["reliure"].toFixed(2).replace('.', ',')+'€';

    var prx_couverture = document.querySelector('#options_album .prix_couverture span');
    prx_couverture.textContent = PRIX["couverture"].toFixed(2).replace('.', ',')+'€';


    // Pour le panier du modal
    var prx_base_modal = document.querySelector('#panier_modal .options .prix_base span');
    prx_base_modal.textContent = PRIX["base"].toFixed(2).replace('.', ',')+'€';

    var prx_reliure_modal = document.querySelector('#panier_modal .options .prix_reliure span');
    prx_reliure_modal.textContent = PRIX["reliure"].toFixed(2).replace('.', ',')+'€';

    var prx_couverture_modal = document.querySelector('#panier_modal .options .prix_couverture span');
    prx_couverture_modal.textContent = PRIX["couverture"].toFixed(2).replace('.', ',')+'€';
}