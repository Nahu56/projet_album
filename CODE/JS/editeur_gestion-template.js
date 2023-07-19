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

                if(template.startsWith("couv")){ // -> c'est un template de couverture

                  card.style.display = "none";
                }else if(template.startsWith("id")){ // -> c'est un template de page

                  card.style.display = "block";
                }

                div_template.appendChild(card);
                loadElement("#templates main #" + template, templates[template]);
            }


            let box_templates = document.querySelector("#box_templates"); // -> liste de templates

            // ajoute listener sur le choix du template
            box_templates.querySelectorAll("a").forEach(div_template => {

              div_template.addEventListener('click', function() {

                // définition des variables

                let id_page = sessionStorage.getItem("currentpage");
                let page = document.querySelector("#" + id_page + " .feuille");

                let verif_chang_template = document.querySelector("#verif_chang_template");

                //vérifie si la page n'est pas vide
                if(page.classList.contains("editee")){

                  verif_chang_template.style.display = "flex";

                  //clic sur annuler
                  verif_chang_template.querySelector(".cancel").addEventListener("click", function(){
                    verif_chang_template.style.display = "none";

                  })

                  //clic sur continuer
                  verif_chang_template.querySelector(".continue").addEventListener("click", function(){
                    charge_template(templates, div_template);

                    verif_chang_template.style.display = "none";
                  })

                }else{ // la page est vide
                  charge_template(templates, div_template);
                }


              });
            })

        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors du chargement du fichier JSON :', error);
        });
}

/** CHARGE LE TEMPLATE DEMANDE
 * 
 * @param {*} div_template 
 */
function charge_template(templates, div_template){
  let id_page = sessionStorage.getItem("currentpage");

  let num_page = id_page.split("_")[1];
  let page = document.querySelector("#" + id_page + " .feuille");
  var apercue = document.querySelector("#apercue_" + id_page);


  if(id_page.startsWith("page")){
    apercue = document.querySelector("#apercue_" + num_page);
  }


  // --------- GESTION DE LA PAGE

  page.innerHTML = ""; // clear la page actuelle
  loadElement("#" + id_page + " .feuille", templates[div_template.id], 1);


  // --------- GESTION DE L'APERCU

  apercue.innerHTML = ""; // clear la page actuelle

  if(id_page.startsWith("couv")){

    loadElement("#apercue_" + id_page , templates[div_template.id]);
  }else if(id_page.startsWith("page")){

    let num_page = id_page.split("_")[1];

    var suppr_page = document.createElement('img');
    suppr_page.src = 'ASSETS/img/suppr_page.svg';
    suppr_page.classList.add('suppr_page');

    suppr_page.onclick = function(e) {
      if (confirm("Êtes-vous sûr de vouloir supprimer cette page ?")) {
        supprimer_page(num_page);

        txt = "Supprimer";
      }else{
        txt = "annuler";

      }

      // évite qu'au clic de la croix, la vignette soit sélectionnée
      // et donc focus page appélé sur une page inexistante
      e.stopPropagation(); 

    };

    apercue.appendChild(suppr_page);
    loadElement("#apercue_" + num_page , templates[div_template.id]);
  }


  //attribution de l'id template a la page (en class)
  page.className = "";
  page.classList.add("feuille");
  page.classList.add(div_template.id);
}




/** ----------------- LOAD ELEMENTS ----------------- 
 * Crée les éléments et les place dans le template
 * @param {string} query_target //querySelector pour trouver la div où ajouter les objets
 * @param {Array} template_obj_list //Object template, contenant tous les éléments du template
 * @param {bool} type //défini ce qui est inséré dans la div
 *      0 => ce sont des div, avec class IMG et TXT
 *      1 => ce sont des btns, avec class IMG et TXT
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
        element.classList.add("vide");
        element.classList.add('obj_'+count)

  
        if(obj.type == "img"){
          
          element.onclick = function(event){ // -> Met l'image upload au background de l'input
            event.stopPropagation();
            afficher_edit_image(this);
          }          
          

  
        }else if(obj.type == "txt"){

          element.onclick = function(event){ // -> Met l'image upload au background de l'input
            event.stopPropagation();
            maj_textarea(this);
            afficher_edit_texte(this);
          }

  
        }

      }else{
        element = document.createElement("div"); // -> DIV pour affichage
        element.classList.add('obj_'+count)
  
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




// /** ----------------- ADD IMG BACKGROUND -----------------
//  * Permet de mettre les images upload au background de l'input
//  * @param {object} element //objet HTML de type input de fichier
//  */
// function addImageBg(element) {
//     // On crée une instance de FileReader pour lire les données du fichier
//     var reader = new FileReader();
  
//     // Quand la lecture est terminée, on exécute cette fonction
//     reader.onload = function (e) {
  
//       //reader.result -> permet de tranformer l'image en base64
//       // On définit la propriété background-image de l'élément avec l'URL du fichier
//       element.style.backgroundImage = 'url(' + reader.result + ')';
//     };

//     console.log(element.parentNode)
//     element.parentNode.classList.add("editee");

//     // On lit les données du premier fichier de l'élément
//     reader.readAsDataURL(element.files[0]);
//   }
  