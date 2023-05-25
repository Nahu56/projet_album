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


    var template = document.querySelector("#templates");
    if (template.style.display !== "block") {

        element_focus.classList.remove("border");
        element_focus = null
        
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
            // element_focus.style.border = "none";
            element_focus.classList.remove("border");
        }
        element_focus = element_focus_param;
        // element_focus.style.border = "4px solid green";
        element_focus.classList.add("border");
    }
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

function maj_textarea(element_focus_param) {
    var textarea_edit_texte = document.getElementById("textarea_edit_texte");
     
    // console.log(textarea_edit_texte.value);
    textarea_edit_texte.value = textarea_edit_texte.defaultValue;
    textarea_edit_texte.value = element_focus_param.textContent ;
}

function afficher_edit_texte(element_focus_param) {
    if (element_focus_param != element_focus) {
        if (element_focus!=null) {
            // element_focus.style.border = "none";
            element_focus.classList.remove("border");
        }
        element_focus = element_focus_param;


        
        
        
        // element_focus.style.border = "1px solid green";
    }

    var edit_texte = document.querySelector("#edit_texte");
    if (edit_texte.style.display !== "block") {

        

        edit_texte.style.display ="block";
        
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

    focus_page("page_"+nb_pages);

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
    });
                    
    reader.readAsDataURL(file);
    
}

/** ------------- TEXTAREA EDIT -------------
 * Modifie le texte dans element_focus
 * RAF :
 *  - sauvegarde du texte 
 *  - changement du texte du input quand on change de div
 */
function textarea_edit() {
    var textarea_edit_texte = document.getElementById("textarea_edit_texte");
    element_focus.textContent  = textarea_edit_texte.value;
}




ajout_page()
focus_page('page_1');

var centre = document.getElementById("centre");

centre.addEventListener('click',afficher_edit_templates)


// RAF : 
// - sauvegarde du texte 
// - Petit apercu image
// - Ajouter plusieurs fois la même image
// - 










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

    majTableau(); // -> sauvegarde l'album dans le sessionStorage

    open_modal_final();
}


/** ------------- MODAL FINAL -------------
 * Permet de faire apparaitre le modal récapitulatif
 */
function open_modal_final(){
    let modal = document.querySelector("#modal_final");

    modal.addEventListener("click", function(element){
        element.querySelector("main").stopPropagation();
        modal.classList.remove('actif');
    })

    if(modal.classList.contains('actif')){
        modal.classList.remove('actif');
    }else{
        modal.classList.add('actif');
    }
}