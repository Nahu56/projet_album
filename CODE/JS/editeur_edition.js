

var btn_centre = document.getElementById("btn_image");

btn_centre.addEventListener("click", () => {
    var template = document.querySelector("#templates");
    template.style.display ="none";

    var edit_texte = document.querySelector("#edit_texte");
    edit_texte.style.display ="none";


    var edit_image = document.querySelector("#edit_image");
    edit_image.style.display ="block";


});
  

var btn_centre_2 = document.getElementById("btn_txt");

btn_centre_2.addEventListener("click", () => {
    var template = document.querySelector("#templates");
    template.style.display ="none";

    var edit_image = document.querySelector("#edit_image");
    edit_image.style.display ="none";


    var edit_texte = document.querySelector("#edit_texte");
    edit_texte.style.display ="block";


});


var btn_centre_3 = document.getElementById("temp");
btn_centre_3.addEventListener("click", () => {
    var template = document.querySelector("#templates");
    template.style.display ="block";

    var edit_image = document.querySelector("#edit_image");
    edit_image.style.display ="none";


    var edit_texte = document.querySelector("#edit_texte");
    edit_texte.style.display ="none";


});



/** ------------- WRAP PANIER -------------
 * Permet de dérouler / enrouler le panier
 */
function wrap_panier(){
    let panier = document.querySelector("#panier");

    if(panier.classList.contains('roll')){
        panier.classList.remove("roll");
        panier.classList.add("unrolled");
    }else{
        panier.classList.remove("unrolled");
        panier.classList.add("roll");
    }
}