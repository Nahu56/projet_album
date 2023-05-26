/** --------- VARIABLES IMPORTANTES ---------
 * Variables essentiels 
 */

var focus = "page_0";
var nb_pages = 0;
var element_focus = null;



/** ----- FONCTIONS AFFICHAGE PAGES EDIT -----
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



/** ------------- FOCUS PAGE -------------
 * fonction qui affiche la page avec l'id qui est mis en paramètre 
 * @param {string} id // Identifiant de la page que l'ont veut mettre en evidence 
 */
function focus_page(id){

    var page = document.getElementById(id);
    var centre = document.getElementById('centre');

    

    centre.scrollTo({
        top: 0,
        left: page.offsetLeft - window.innerWidth * 0.35,
        behavior: 'smooth'
    });

    
    var voile = document.createElement('div');
    voile.className = 'voile';

    var pages = document.getElementsByClassName('page');

    
    var passe = false;
    Array.from(pages).forEach(element => {

        if (element.getAttribute('id') !== id) {

            var feuilleElement = element.querySelector('.feuille');
            var hasVoile = feuilleElement.querySelector('.voile') !== null;

            if (!hasVoile) { 

                if (passe) {
                    element.querySelector('p').style.textAlign="left";
                }else{
                    element.querySelector('p').style.textAlign="right";
                }

                element.querySelector('.feuille').appendChild(voile);
                
                element.querySelector('.feuille .voile').addEventListener('click',()=>{
                    focus_page(element.id);
                });

            }

      }else {

        passe = true;
        element.querySelector('p').style.textAlign="center";

        if (element.querySelector('.feuille').hasChildNodes(voile)) { 

            remove = element.querySelector('.feuille .voile');
            remove.remove();
            
        }

      }

    });


    afficher_edit_templates()
    sessionStorage.setItem("currentpage", id); // -> assignation de la nouvelle page courante

}



/** ------------- AJOUT PAGE -------------
 * fonction qui permet d'ajouter une div dans #centre et de la focus 
 */
function ajout_page() {

    nb_pages += 1;

    // Création de l'élément div avec l'ID "page_1" et la classe "page"
    var divPage = document.createElement("div");
    divPage.id = "page_"+nb_pages;
    divPage.className = "page";

    // Création de l'élément p à l'intérieur de divPage1
    var pElement = document.createElement("p");
    pElement.textContent = "Page "+nb_pages;
    divPage.appendChild(pElement);

    // Création de l'élément div vide à l'intérieur de divPage1
    var divElement = document.createElement("div");
    divElement.className = "feuille";
    divPage.appendChild(divElement);

    if(nb_pages % 2 === 0 ){
        divPage.style.marginRight= "100px";

        var icone = document.createElement("img");
        icone.src = "ASSETS/img/icones/liaison_page.svg";
        icone.alt = "icone liaison entre les pages";
        divPage.appendChild(icone);
    }

    // Ajout de divPage1 à la page (body dans cet exemple)
    var centre = document.getElementById("centre");
    centre.appendChild(divPage);

    focus_page("page_"+(nb_pages));

    ajout_page_apercue();

}


function ajout_page_apercue() {

    if (nb_pages % 2 !== 0 ) {
        // Création de l'élément <div> avec la classe "bloc_page"
        var blocPage = document.createElement("div");
        blocPage.className = "bloc_page";

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
        numPage.textContent = "page 1 / 2";

        // Ajout des éléments <div class="hr"> et <div class="num_page"> à l'élément <header>
        header.appendChild(hr1);
        header.appendChild(numPage);
        header.appendChild(hr2);

        // Ajout de l'élément <header> au <div class="bloc_page">
        blocPage.appendChild(header);

        // Création de l'élément <div> pour les pages
        var pagesDiv = document.createElement("div");

        // Création de la première vignette de page
        var vignettePage1 = document.createElement("div");
        vignettePage1.className = "vignette_page";


        // Création de la deuxième vignette de page
        var vignettePage2 = document.createElement("div");
        vignettePage2.className = "vignette_page";



        // Ajout des vignettes de page à l'élément <div> pour les pages
        pagesDiv.appendChild(vignettePage1);
        pagesDiv.appendChild(vignettePage2);

        // Ajout de l'élément <div> pour les pages au <div class="bloc_page">
        blocPage.appendChild(pagesDiv);

        // Ajout du bloc de page à la page HTML
        var apercue_main = document.querySelector('#apercu main ')
        apercue_main.appendChild(blocPage);
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
        element_focus.style.backgroundImage = `url(${reader.result})`;
        element_focus.value = file.name;

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
    element_focus.textContent  = textarea_edit_texte.value;
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
    p.textContent = element_focus.value;

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
        element_focus.style.backgroundImage = "none";

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

    let element = document.querySelector("button.selected");

    //supprime la class existante
    let list_choix = ["top", "bottom", "center", "left", "right"];
    list_choix.forEach(option => {
        element.classList.remove("img_" + option);
    })

    element.classList.add("img_" + choix);
}


ajout_page();

focus_page('page_1');

var centre = document.getElementById("centre");

centre.addEventListener('click',afficher_edit_templates)


// RAF : 
// - Petit apercu image
// - Ajouter plusieurs fois la même image
// - 





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

        let num_page = page.parentNode.id.split("_")[1]; // -> numéro de page
        //   let id_template = page.parentNode.classList;
        let id_template = page.classList[1];

        let tab_feuille = [id_template];
  
        buttons.forEach(obj => {
            if(obj.classList.contains("img")){ // -> c'est une image

                let code_img = obj.style.backgroundImage;
                const img64 = code_img.substring(5, code_img.length - 2); // -> garde uniquement le code en base 64 de l'image

                //trouver placement de l'image
                let placement_image = "C";
                let list_classes = obj.classList;
                list_classes.forEach(classe => {
                    if(classe.split("_")[1]){
                        
                        //récupère la premiere lettre, soit T, B, C, L ou R
                        placement_image = classe.split("_")[1].toUpperCase()[0]; 
                    };
                })

                tab_feuille.push(placement_image + "#" + img64);

            }else if(obj.classList.contains("txt")){ // -> c'est un texte
                
                //récupération du texte
                tab_feuille.push(obj.innerHTML);
            }
        })

        album.push(tab_feuille);
    })
  
    console.log("TABLEAU ALBUM", album);
    sessionStorage.setItem("album", JSON.stringify(album));
  
  }




/** ------------- WRAP PANIER -------------
 * Permet de dérouler / enrouler le panier
 */
function wrap_panier(){
    let panier = document.querySelector("#panier");

    if(panier.classList.contains('roll')){
        panier.classList.remove("roll");
        panier.classList.add("unrolled");

        panier.querySelector("img").classList.add("reverse");
        panier.classList.add("shadow");
    }else{
        panier.classList.remove("unrolled");
        panier.classList.add("roll");

        panier.querySelector("img").classList.remove("reverse");
        panier.classList.remove("shadow");
    }
}


/** -------------- GO CHECKOUT --------------
 * Fonction appelée au clic du bouton "terminer" dans le panier
 */
function go_checkout(){

    saveAlbum(); // -> sauvegarde l'album dans le sessionStorage

    open_modal_final();
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
        modal.classList.remove('actif');
    });

    if(modal.classList.contains('actif')){
        modal.classList.remove('actif');
    }else{
        modal.classList.add('actif');
    }
}