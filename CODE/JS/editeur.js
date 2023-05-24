/** --------- VARIABLES IMPORTANTES ---------
 * Variables essentiels 
 */

var focus = "page_0";
var nb_pages = 0;




/** ----- FONCTIONS AFFICHAGE PAGES EDIT -----
 * Fonctions qui permet d'afficher ou de cacher la partie edit
 */

function afficher_edit_templates() {
    var template = document.querySelector("#templates");
    if (template.style.display !== "block") {
        
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
function afficher_edit_image() {
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
function afficher_edit_texte() {

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

    // page.addEventListener('click',()=>{
    //     afficher_edit_templates()
    // })

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
    }

    // Ajout de divPage1 à la page (body dans cet exemple)
    var centre = document.getElementById("centre");
    centre.appendChild(divPage);

    focus_page("page_"+nb_pages);

}



var textarea_edit_texte = document.getElementById("textarea_edit_texte");
var test_texte = document.getElementById("test_texte");

textarea_edit_texte.addEventListener("input", function(){
    test_texte.textContent  = textarea_edit_texte.value;
})

ajout_page()
focus_page('page_1');


// TODO : a enlever 
// var btn_centre = document.getElementById("btn_image");
// btn_centre.addEventListener("click", () => {
//     afficher_edit_image();
// });
// var btn_centre_2 = document.getElementById("btn_txt");
// btn_centre_2.addEventListener("click", () => {
//     afficher_edit_texte();
// });
// var btn_centre_3 = document.getElementById("temp");
// btn_centre_3.addEventListener("click", () => {
//     afficher_edit_templates();
// });

// var btn_lien = document.getElementById("btn_lien");
// btn_lien.addEventListener("click", () => {
//     focus_page("page_4");
// });






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

/** ------------- MODAL FINAL -------------
 * Permet de faire apparaitre le modal récapitulatif
 */
function open_modal_final(){
    let modal = document.querySelector("#modal_final");

    if(modal.classList.contains('actif')){
        modal.classList.remove('actif');
    }else{
        modal.classList.add('actif');
    }
}