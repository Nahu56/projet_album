window.onload = () =>{
    recuperation_templates();
}


function recuperation_templates() {
    // Chargement du fichier JSON
    return fetch('ASSETS/json/templates_a4.json')
        .then(response => response.json())
        .then(templates => {

            for(const template in templates){
                let div_template = document.querySelector("#templates main");
                let card = document.createElement("a");

                card.id = template;
                div_template.appendChild(card);
                loadElement("#templates main #" + template, templates[template]);
            }


            let box_templates = document.querySelector("#box_templates"); // -> liste de templates

            // ajoute listener sur le choix du template
            box_templates.querySelectorAll("a").forEach(div_template => {

              div_template.addEventListener('click', function() {
                let num_page = sessionStorage.getItem("currentpage").split("_")[1];

                document.querySelector("#page_" + num_page + ">div").innerHTML = ""; // clear la page actuelle

                loadElement("#page_" + num_page + " .feuille", templates[div_template.id], 1);
              });
            })

        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors du chargement du fichier JSON :', error);
        });
}




/** ----------------- LOAD ELEMENTS ----------------- 
 * Crée les éléments et les place dans le template
 * @param {string} query_target //querySelector pour trouver la div où ajouter les objets
 * @param {Array} template_obj_list //Object template, contenant tous les éléments du template
 * @param {bool} type //défini ce qui est inséré dans la div
 *      0 => ce sont des div, avec class IMG et TXT
 *      1 => ce sont des input, type image et type texte
 */
function loadElement(query_target, template, type = 0){
    let template_obj_list = Object.values(template); // object -> tableau (crée une liste des éléments)
    let div_template = document.querySelector(query_target); // cherche la div où seront ajoutés les objets
  
    let count = 0;

    // boucle sur les objets du template
    template_obj_list.forEach(obj => {
      let element;
      count += 1;

      // Création de l'objet
      if(type == 1){
        element = document.createElement("button"); // -> INPUT fonctionnel

        // element.id = 
        // console.log(div_template.parentNode.id)
  
        if(obj.type == "img"){
          element.onclick = function(){ // -> Met l'image upload au background de l'input

            element.style.border = "1px solid green";
            afficher_edit_image(this);
          }
  
        }else if(obj.type == "txt"){
          element.onclick = function(){ // -> Met l'image upload au background de l'input
            afficher_edit_texte(this);
          }
  
        }
  
        majTableau();

      }else{
        element = document.createElement("div"); // -> DIV pour affichage
  
      }
  
    
  
      // vérifie le type de l'objet (IMG / TXT)
      switch (obj.type) {
        case "img":
          element.classList.add("img");
  
          //-> set dimensions
          element.style.width = obj.data.w + "%";
          element.style.height = obj.data.h + "%";
  
          break;
        case "txt":
          element.classList.add("txt");
  
          break;
        default:
          break;
      }
  
      //-> set position de l'objet
      element.style.left = obj.data.x + "%";
      element.style.top = obj.data.y + "%";
  
      div_template.appendChild(element);
    })
  
}



/* -------------------------------------------------------------------------- */
/*                                 MAJ TABLEAU                                */
/* -------------------------------------------------------------------------- */
/** Tableau contenant tout l'album -> voir "tableau_rendu.md"
 * @param {int} num_page // numéro de la page à modifier
 * @param {string} id_template // id du template choisi
 * @param {array} objs_page // tableau des objets de la page
 *  -> ["Le troisième jour de vacances", "#id_img"]
 * @param {bool} modif // modification ou ajout d'une page
 */
function majTableau(){
  let num_page = 1;
  let id_template = 2;
  let objs_page = ["Le troisième jour de vacances", "#2"];

  if(sessionStorage.getItem("album") === null){
    var tableau = [];
  }else{
    var tableau = sessionStorage.getItem("album");
  }

  tableau = [id_template];

  objs_page.forEach(obj => {
    tableau.push(obj);
  })

  console.log(tableau)

}




/** ----------------- ADD IMG BACKGROUND -----------------
 * Permet de mettre les images upload au background de l'input
 * @param {object} element //objet HTML de type input de fichier
 */
function addImageBg(element) {
    // On crée une instance de FileReader pour lire les données du fichier
    var reader = new FileReader();
  
    // Quand la lecture est terminée, on exécute cette fonction
    reader.onload = function (e) {
  
      //reader.result -> permet de tranformer l'image en base64
      // On définit la propriété background-image de l'élément avec l'URL du fichier
      element.style.backgroundImage = 'url(' + reader.result + ')';
    };
    // On lit les données du premier fichier de l'élément
    reader.readAsDataURL(element.files[0]);
  }
  