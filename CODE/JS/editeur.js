/** --------- VARIABLES IMPORTANTES ---------
 * Variables essentielles 
 */

var focus = "page_0";
var nb_pages = 0;
var element_focus = null;
var qtt = 1 ; // Quantité d'albums : par défaut à zéro

var prix_total = 0;
var prix_album = 0;

var nom_album = "Album photo";

//vide le sessionStorage
sessionStorage.setItem("album", "");



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

        let options = JSON.parse(sessionStorage.getItem("options"));
        if(options === null){
            window.location.href = "options";
        }


        //Création d'un tableau contenant tous les prix
        let PRIX = {
            "base": json["base"]["1"],
            "page": json["page"][ options[0] ],
            "reliure": json["reliure"][ options[1] ],
            "couverture": json["couverture"][ options[2] ]
        }

        //crée une variable de session avec les prix
        sessionStorage.setItem("PRIX", JSON.stringify(PRIX));

        //crée une variable de session pour les réductions
        sessionStorage.setItem("reducs", JSON.stringify(json["reductions"]));


        ajout_page();
        affichage_options_album();
        maj_prix_album();
        maj_prix_total();

        focus_page("page_1", "pages");

    })

var centre = document.getElementById("centre");
centre.addEventListener('click',afficher_edit_templates)



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
        if (element_focus.style.backgroundImage =="none" || element_focus.style.backgroundImage=="") {}else{
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
        behavior: 'smooth'
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
    ajout_page_miniature();
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
            console.log(i)

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

function ajout_page_miniature(){

    let minia_pages = document.querySelector("#minia_pages");

    // Créer un élément div
    var miniature = document.createElement("div");
    miniature.id = "miniature_page_"+nb_pages;

    // Créer un élément p
    var paragraphe = document.createElement("p");
    paragraphe.textContent = "Page "+nb_pages;

    // Créer un élément div avec la classe "miniature_page"
    var page = document.createElement("div");
    page.className = "miniature_page";

    // Ajouter le paragraphe à la div principale
    miniature.appendChild(paragraphe);

    // Ajouter la div enfant à la div principale
    miniature.appendChild(page);

    var double_page = "";

    //si nb_pages est impair
    if (nb_pages % 2 !== 0) {
        double_page = minia_pages.querySelector("#minia_pages>div:last-child");

        if(nb_pages != 1){

            var icone = document.createElement("img");
            icone.src = "ASSETS/img/icones/liaison_page.svg";
            icone.alt = "icone liaison entre les pages";
            miniature.appendChild(icone);


            if(double_page.querySelector(".page_disabled")){

                let troisieme_couv = double_page.querySelector(".page_disabled").parentElement;
                troisieme_couv.remove();
            }
        }

        double_page.appendChild(miniature);
    }else{
        //creation de la double page
        double_page = document.createElement("div");
        double_page.classList.add("double_page");

        //creation d'une page disabled a la fin
        let page_disabled = document.createElement("div");
        page_disabled.classList.add("miniature_page");
        page_disabled.classList.add("page_disabled");

        let div_simple = document.createElement("div");
        div_simple.appendChild(page_disabled);

        //ajout des pages à double_page
        double_page.appendChild(miniature);
        double_page.appendChild(div_simple);
    }

    minia_pages.appendChild(double_page);















    // if (nb_pages % 2 == 1){
    //     page.style.borderLeft = 'none'

    //     var icone = document.createElement("img");
    //     icone.src = "ASSETS/img/icones/liaison_page.svg";
    //     icone.alt = "icone liaison entre les pages";
    //     miniature.appendChild(icone);

    // }
    // if (nb_pages % 4 == 2) {
    //     miniature.style.marginRight = '60px';


    // }

    // let main_miniature = document.querySelector('#modal_final #minia_pages');

    // Ajouter la div principale à un élément existant de la page (par exemple, le body)
    // main_miniature.appendChild(miniature);


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
        var img_miniature = document.querySelector('#miniature_' + id_page +' .miniature_page .'+element_focus.classList[0])

        if(id_page.startsWith("page")){
            var img_apercue = document.querySelector('#apercue_' + num_page +' .'+element_focus.classList[0])
        }

        // ajoute l'image de fond
        img_apercue.style.backgroundImage = `url(${reader.result})`;
        img_miniature.style.backgroundImage = `url(${reader.result})`;

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
    // element_focus.classList.add("border-none");
    
    // setTimeout(() => {
    //     element_focus.classList.remove("border-none");
    // }, 5000);


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
    btnSupprimeImage.src = "ASSETS/img/btn_supprime_image.svg";
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
        var img_miniature = document.querySelector('#miniature_' + id_page +' .miniature_page .'+element_focus.classList[0])

        if(id_page.startsWith("page")){
            var img_apercue = document.querySelector('#apercue_' + num_page +' .'+element_focus.classList[0])
        }

        // ajoute l'image de fond
        img_apercue.style.backgroundImage = "none";
        img_miniature.style.backgroundImage = "none";

        notifications(true,'Image supprimée');

        rm_apercue_image()
    })


    // Ajout de divImageActuel à un élément existant dans le document (par exemple, le body)
    var image_actuel = document.querySelector(".image_actuel");
    image_actuel.appendChild(div1);
    image_actuel.appendChild(btnSupprimeImage);

    image_actuel.style.display = 'flex';
}

/** ------------- PRP APERCUE IMAGE -------------
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
    var img_miniature = document.querySelector('#miniature_' + id_page + ' .miniature_page .'+element_focus.classList[0])
    
    if(id_page.startsWith("page")){
        var img_apercue = document.querySelector('#apercue_' + num_page +' .'+element_focus.classList[0])
    }

    //supprime la class existante
    let list_choix = ["top", "bottom", "center", "left", "right"];
    list_choix.forEach(option => {
        element.classList.remove("img_" + option);
        img_apercue.classList.remove("img_" + option);
        img_miniature.classList.remove("img_" + option);

    })

    element.classList.add("img_" + choix);
    img_apercue.classList.add("img_" + choix);
    img_miniature.classList.add("img_" + choix);


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

            var icone = document.createElement("img");
            icone.src = "ASSETS/img/icones/liaison_page.svg";
            icone.alt = "icone liaison entre les pages";
            page.appendChild(icone);
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

    // -------- MINIATURE -------- 
    supprimer_page_miniature(num_page);


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
        
        if (apercue_suivant.parentElement.parentElement.classList.contains(apercue_suivant.id)) { }else{
            var new_parent = document.querySelector('#apercu main .'+apercue_suivant.id)
            new_parent.querySelector('.vignette_page').parentElement.appendChild(apercue_suivant);
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
function supprimer_page_miniature(num_page){
    // On enleve la page dans la miniature

    document.getElementById('miniature_page_'+num_page).remove();




    for (let i = num_page; i < nb_pages; i++) {
        let i_bis = +i + 1; //page d'après

        const apercue_suivant = document.querySelector('#minia_pages .double_page #miniature_page_'+(i_bis));


        if (apercue_suivant.parentElement.parentElement.classList.contains(apercue_suivant.id)) { }else{

            console.log(apercue_suivant)

            var new_parent = document.querySelector('#minia_pages .'+apercue_suivant.id)
            new_parent.querySelector('.vignette_page').parentElement.appendChild(apercue_suivant);
        }
    }

    // // Réorganisation des éléments
    // for (let i = num_page; i < nb_pages; i++) {
    //     let i_bis = +i + 1 ;
    //     var miniature = document.getElementById('miniature_page_'+(i_bis));

    //     miniature.id = 'miniature_'+i;

    //     console.log(miniature)


    //     // si c'est une page pair (->il faut la changer de double page)
    //     if (i % 2 === 0) {

    //         let previous_parent = miniature.parentElement.previousSibling;
    //         console.log(previous_parent)


    //     }else{ //sinon, pas besoin

    //         //supprimer l'icone de liaison
    //         //changer le nom de la page
    //     }


    //     // if (apercue_suivant.parentElement.parentElement.classList.contains(apercue_suivant.id)) { }else{
    //     //     var new_parent = document.querySelector('#apercu main .'+apercue_suivant.id)
    //     //     new_parent.querySelector('.vignette_page').parentElement.appendChild(apercue_suivant);
    //     // }






    //     // if (i % 2 !== 0) {
    //     //     var icone = miniature.querySelector('img');
    //     //     miniature.removeChild(icone)

    //     //     let miniature_page = miniature.querySelector('.miniature_page');
    //     //     miniature_page.style.borderLeft = '2px solid #18574A'
    //     // }else{

    //     //     var icone = document.createElement("img");
    //     //     icone.src = "ASSETS/img/icones/liaison_page.svg";
    //     //     icone.alt = "icone liaison entre les pages";
    //     //     miniature.appendChild(icone);

    //     //     let miniature_page = miniature.querySelector('.miniature_page');
    //     //     miniature_page.style.borderLeft = 'none'
    //     // }

    //     // var miniature_texte = miniature.querySelector('p');
    //     // miniature_texte.textContent = 'Page '+i;
    // }
}







/* -------------------------------------------------------------------------- */
/*                                 MAJ TABLEAU                                */
/* -------------------------------------------------------------------------- */
/** Tableau contenant tout l'album -> voir "tableau_rendu.md"
 * Scan toutes les pages, et récupère toutes les informations sur chacune d'elle
 */
function saveAlbum(){
    let feuilles = document.querySelectorAll(".feuille");
    var album = [];
  
    //boucle sur toutes les feuilles == pages
    feuilles.forEach(page => {
        let buttons = page.querySelectorAll("button");

        let id_template = page.classList[1];
        var tab_feuille = [""];

        if(id_template !== null){ // -> si ce n'est pas une page blanche

            let tab_feuille = [id_template];
  
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
                    // tab_feuille.push(placement_image + "#"); //ne garde pas l'img64 car il n'est pas possible de tout stocker
    
                }else if(obj.classList.contains("txt")){ // -> c'est un texte
                    
                    //récupération du texte
                    tab_feuille.push(obj.innerHTML);
                }
            })

        }

        album.push(tab_feuille);
    })
  
    return album;
  
}


 /** ------------------ VARIABLES PANIER ------------------
 * Ici vous trouverez les variables qui permettent l'ouverture et la fermeture du panier 
 */
var panier_ouvert = false; // Pour savoir si le panier est ouvert ou fermer

var panier = document.querySelector('#panier'); // On récupère l'élément panier 
panier.addEventListener('click',(event)=>{
    event.stopPropagation();
})

var btn_panier = document.querySelector('#panier header'); // On récupère le btn pour ouvrir le panier 
btn_panier.addEventListener('click',(event)=>{
    event.stopPropagation();

    // On vérifie si le panier est ouvert
    if (panier_ouvert) { 
        close_panier();
    }else{
        open_panier();
    }
});

var body = document.querySelector('body'); // On récupère l'élément body pour le que panier ce ferme quand on clique en dehors de celui ci 
body.addEventListener('click',close_panier);

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


/** -------------- GO CHECKOUT --------------
 * Fonction appelée au clic du bouton "terminer" dans le panier
 * 
 * Vérifications avant validation de l'album
 *  -> Edition des couvertures
 *  -> Nombre de pages suppérieur ou  égal à X
 *  -> Nombre de pages impair
 */
function go_checkout() {

    open_modal_final(); //TODO

    // let contenu_couv_1 = document.querySelector("#couv_1 .feuille").innerHTML;
    // let contenu_couv_2 = document.querySelector("#couv_2 .feuille").innerHTML;

    // let nb_pages_mini = 4; //TODO

    // //vérifie que la 1ere de couverture n'est pas vierge
    // if(contenu_couv_1 === "" || contenu_couv_1 === '<div class="voile"></div>'){
    //     notifications(false,"Vous n\'avez pas édité la première de couverture !")

    // //vérifie que la dernière de couverture n'est pas vierge
    // }else if(contenu_couv_2 === "" || contenu_couv_2 === '<div class="voile"></div>'){
    //     notifications(false,"Vous n\'avez pas édité la dernière de couverture !")
        
    // //vérifie que le nombre de pages est supérieur ou égal a X
    // }else if(nb_pages < nb_pages_mini){
    //     notifications(false,"L'ablum doit contenir "+ nb_pages_mini +" pages au minimum")

    // //vérifie que le nombre de pages est impaire
    // }else if(nb_pages % 2 == 1){
    //     notifications(false,'Il vous manque une page')


    // //Tout est ok, on ouvre le modal
    // }else{
    //     open_modal_final();
    // }
}


/** ------------- MODAL FINAL -------------
 * Permet de faire apparaitre le modal récapitulatif
 */
function open_modal_final(){
    let modal = document.querySelector("#modal_final");

    body.removeEventListener('click', close_panier);

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
        modal.classList.remove('actif');
        setTimeout(function() {
            modal.style.display = "none";
        }, 600); // Délai de 600 millisecondes (0,6 seconde)
        body.addEventListener('click', close_panier);
    } else {
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