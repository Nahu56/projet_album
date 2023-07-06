/** ------------- FONCTION NOTIFICATIONS  -------------
 * Permet de faire apparaitre le modal récapitulatif
 * @param {bool} etat true -> c'est une notification positive || false -> c'est une notification d'erreur
 * @param {string} texte correspond au texte qui sera affiché sur le message de notification 
 */
function notifications(etat,texte){

    if (etat == false) {
        // Sélectionner l'élément avec l'ID "notifications"
        var notificationsElement = document.getElementById("notifications");

        // Créer un nouvel élément div
        var erreurElement = document.createElement("div");
        erreurElement.classList.add("erreur");

        // Créer un élément de paragraphe
        var pElement = document.createElement("p");
        pElement.textContent = "Erreur : " + texte;

        // Créer un élément d'image
        var imgElement = document.createElement("img");
        imgElement.setAttribute("src", "ASSETS/img/Warning.png");
        imgElement.setAttribute("alt", "warning");

        // Ajouter les éléments au div erreurElement
        erreurElement.appendChild(pElement);
        erreurElement.appendChild(imgElement);

        // Ajouter le div erreurElement à l'élément notificationsElement
        notificationsElement.appendChild(erreurElement);

        setTimeout(function() {
            notificationsElement.removeChild(erreurElement);
        }, 5000); 


    }else{
        // Sélectionner l'élément avec l'ID "notifications"
        var notificationsElement = document.getElementById("notifications");

        // Créer un nouvel élément div
        var erreurElement = document.createElement("div");
        erreurElement.classList.add("valid");

        // Créer un élément de paragraphe
        var pElement = document.createElement("p");
        pElement.textContent = texte;

        // Créer un élément d'image
        var imgElement = document.createElement("img");
        imgElement.setAttribute("src", "ASSETS/img/Partying_Face.png");
        imgElement.setAttribute("alt", "smiley fête");

        // Ajouter les éléments au div erreurElement
        erreurElement.appendChild(pElement);
        erreurElement.appendChild(imgElement);

        // Ajouter le div erreurElement à l'élément notificationsElement
        notificationsElement.appendChild(erreurElement);

        setTimeout(function() {
            notificationsElement.removeChild(erreurElement);
        }, 5000); 

    }

}