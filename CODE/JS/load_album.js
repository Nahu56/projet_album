function load_album(id){
    console.log("CHARGE ALBUM")

    fetch("ASSETS/json/albums_clients.json")
        .then(response => response.json())
        .then(function(json){

            if(json[id]){
                re_load_options(json[id]["options"]);
                re_load_album(json[id]["contenu_album"]);


            }else{ // -> vérifie si l'ID est connu ou non
                console.log("RETOUR OPTIONS")
                // window.location.href = "options"; TODO
            }
        })
}

/** Recharge les options de l'album
 * 
 * @param {array} options //options de l'album récupérées dans le json 
 */
function re_load_options(options){

    sessionStorage.setItem("options", JSON.stringify(options));
    charge_theme();
}


/** ----- RECHARGE LES PAGES ------
 * -> Récupère les templates 
 * -> ajoutes les pages
 * -> applique les templates aux pages
 * 
 * @param {array} contenu //tableau du contenu de l'album (récupéré dans le json)
 */
function re_load_album(contenu){

    //récupère la liste des templates
    return fetch('ASSETS/json/templates_a4.json')
        .then(response => response.json())
        .then(templates => {

            //La premiere et derniere sont des couvertures
            let nb_pages = contenu.length -1;
            var num_page = 1;

            //boucle sur toutes les pages
            for (let i = 0; i < contenu.length; i++) {
                var couv = 0; // 0 -> page / 1 -> premiere / 2 -> derniere

                // ------------------ PAGES ------------------- 
                var page = "#page_" + num_page + " .feuille";
                var vignette = "#apercue_" + num_page;
                
                if(i == 0){
                    // ----------------- PREMIERE ----------------- 
                    page = "#couv_1 .feuille";
                    vignette = "#apercue_couv_1";

                    couv = 1;
                    
                }else if(i == nb_pages){
                    // ----------------- DERNIERE ----------------- 
                    page = "#couv_2 .feuille";
                    vignette = "#apercue_couv_2";
                    couv = 2;
                    
                }else{

                    ajout_page();
                }
                
                // ------------ AJOUTE LE TEMPLATE A LA PAGE ------------ 
                //vérifie si la page contient un template
                if(contenu[i][0] !== null){

                    let feuille = document.querySelector(page);
                    feuille.classList.add("editee");
                    feuille.classList.add(contenu[i][0]);

                    console.log(templates)
                    console.log(contenu, i)

                    loadElement(page, templates[contenu[i][0]], 1);
                    loadElement(vignette, templates[contenu[i][0]], 0);
    
    
                    // ------------------ CHARGE IMG OU XT ------------------
                    // -> boucle sur tous les obj
                    // -> vérifie si c'est IMG ou TXT
                    // -> appelle la fonction correspondante
    
                    for (let x = 1; x < contenu[i].length; x++) {
                        let obj = contenu[i][x]; //le contenu
                        let element = document.querySelector(page + " .obj_" + x) //l'element où le placer
                        element_focus = element;
    
                        if(obj.includes("#")){ 
                            // => IMAGE

                            let placement = obj.split("#")[0];
                            let img64 = obj.split("#")[1];
                            var img_apercue = document.querySelector("#apercue_"+ num_page + " .obj_" + x);

                            if(couv > 0){
                                img_apercue = document.querySelector("#apercue_couv_"+ couv + " .obj_" + x);
                            }
    
                            if(img64 != ""){
                                element.style.backgroundImage = "";
                                element.classList.remove("vide")
                                element.style.backgroundImage = 'url(' + img64 + ')';

                                img_apercue.style.backgroundImage = 'url(' + img64 + ')';

                                // rm_apercue_image();
                                // apercue_image();

                                var choix = "center";

                                switch (placement) {
                                    case "T":
                                        choix = "top";
                                        break;
                                    case "B":
                                        choix = "bottom";
                                        break;
                                    case "L":
                                        choix = "left";
                                        break;
                                    case "R":
                                        choix = "right";
                                        break;
                                    default :
                                        choix = "center";
                                        break;
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
    
                        }else{
                            // => TEXTE
                            element.textContent = obj;
                        }
                        
                    }
                }
                
                
                // si une page vient d'être traitée, incrémenter le numéro de page courante
                if(i !== 0 && i !== nb_pages){
                    num_page ++;
                };
            }
    });
}