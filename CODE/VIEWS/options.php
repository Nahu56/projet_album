<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <!-- Appel header -->
    <?php include('../components/header.php') ?>

    <link rel="stylesheet" href="CODE/CSS/accueil.css">
</head>
<body>

    <div id="notifications"></div>

    <a class="btn_retour" href="./">
        <img src="ASSETS\img\fleche_retour.svg" alt="" srcset="">
        Retour
    </a>
    
    <main>
        <form action="./editeur" method="post">

            <!-- --------------------------------------------------------------------------  -->
            <!--                                  SECTION 1                                  -->
            <!-- --------------------------------------------------------------------------  -->
            <section id="section1">
                <header>
                    <h2>Pour commencer,</h2>

                    <p>sélectionnez les options pour votre album photo :</p>
                </header>

                <div class="secondHeader">
                    <h3>Reliure et couverture</h3>
                    <div class="hr"></div>
                </div>

                <fieldset id="choix_reliures">
                    <div>
                        <label for="wireo">
                            <img src="ASSETS\img\image.jpg" alt="">
                            <input type="radio" id="wireo" name="reliure" value="wireo" required="required" >
                            <p>Reliure WIRE O -&nbsp<span class="cellule_prix"></span>€</p>
                        </label>
                    </div>

                    <div>
                        <label for="coil">
                            <img src="ASSETS\img\image.jpg" alt="">
                            <input type="radio" id="coil" name="reliure" value="coil" required="required" >
                            <p>Reliure COIL -&nbsp<span class="cellule_prix"></span>€</p>
                        </label>
                    </div>

                    <div>
                        <label for="dos_carre">
                            <img src="ASSETS\img\image.jpg" alt="">
                            <input type="radio" id="dos_carre" name="reliure" value="dos_carre" required="required" >
                            <p>Reliure DOS CARRE -&nbsp<span class="cellule_prix"></span>€</p>
                        </label>
                    </div>
                </fieldset>

                <fieldset>
                    <div>
                        <label for="wireo">
                            <input type="radio" id="couverture_carton" name="reliure" value="wireo" required="required" >
                            <p>Couverture 350g</p>
                        </label>
                    </div>

                    <div>
                        <label for="coil">
                            <input type="radio" id="couverture_papier" name="reliure" value="coil" required="required" >
                            <p>Couverture cartonnée 1mm</p>
                        </label>
                    </div>
                    <div>
                        <label for="dos_carre">
                            <input type="radio" id="couverture_papier" name="reliure" value="dos_carre" required="required" >
                            <p>Couverture rigide (bande dessinnée)</p>
                        </label>
                    </div>
                </fieldset>


                <div class="secondHeader">
                    <h3>Format</h3>
                    <div class="hr"></div>
                </div>

                <fieldset>
                    <div>
                        <label for="FormatA4">
                            <img src="ASSETS\img\image.jpg" alt="">
                            <input type="radio" id="FormatA4" name="format" value="a4" required="required" >
                            <p>Format A4</p>
                        </label>
                    </div>

                    <div>
                        <label for="FormatA5">
                            <img src="ASSETS\img\image.jpg" alt="">
                            <input type="radio" id="FormatA5" name="format" value="a5" required="required" >
                            <p>Format A5</p>
                        </label>
                    </div>
                </fieldset>
                
            </section>

            <!-- --------------------------------------------------------------------------  -->
            <!--                                  SECTION 2                                  -->
            <!-- --------------------------------------------------------------------------  -->
            <section id="section2">
                <header>
                    <p>Pour finir,</p>
                    <h2>donnez vie à votre album !</h2>

                    <p>Le choix du thème implique la couleur de fond des pages, ainsi que le typographie d'écriture de l'album</p>
                </header>

                <!-- --------------------------------------------------------------------------  -->
                <!--                                    THEMES                                   -->
                <!-- --------------------------------------------------------------------------  -->

                <fieldset>

                    <div>
                        <label for="classique">
                            <img src="ASSETS\img\themes\classique.png" alt="">

                            <input type="radio" id="classique" name="theme" value="classique" required="required" >
                            <p>Classique</p>
                        </label>
                    </div>

                    <div>
                        <label for="dejavusansmono">
                            <img src="ASSETS\img\themes\simple.png" alt="">

                            <input type="radio" id="dejavusansmono" name="theme" value="dejavusansmono#FFF9D4" required="required" >
                            <p>Dejavu Sans Mono</p>
                        </label>
                    </div>

                    <div>
                        <label for="times">
                            <img src="ASSETS\img\themes\charme.png" alt="">

                            <input type="radio" id="times" name="theme" value="times#e9f5ff" required="required" >
                            <p>Times New Roman</p>
                        </label>
                    </div>
                </fieldset>
                
            </section>

            <!-- <button type="submit" class="main_btn">Passer à l'éditeur</button> -->
            <button onclick="checkOptions()" class="main_btn">Passer à l'éditeur</button>

        </form>
    </main>
</body>
</html>

<script src="CODE/JS/general.js"></script>


<script>

    // Récupère les prix des reliure
    // Insère les prix
    get_prix();


    sessionStorage.setItem("options", "");

    //ajoute la class selected
    document.querySelectorAll("fieldset").forEach(fieldset => {

        fieldset.addEventListener("change", function(){

            fieldset.querySelectorAll("input").forEach(input => {
                let htmlFor = input.parentNode.htmlFor;

                // input.parentNode.parentNode.classList.add("selected");
                document.querySelectorAll('label[for="' + htmlFor + '"]').forEach(element => {
                    element.parentNode.classList.remove("selected")
                });


                
                if(input.checked){
                    let htmlFor = input.parentNode.htmlFor;

                    // input.parentNode.parentNode.classList.add("selected");
                    document.querySelectorAll('label[for="' + htmlFor + '"]').forEach(element => {
                        element.parentNode.classList.add("selected")
                    });
                }
            });
        })
    });

    //vérifie le formulaire
    function checkOptions(){
        var form = document.querySelector("form");

        if (form.checkValidity()) {
            // Tous les champs requis ont été remplis, vous pouvez exécuter d'autres actions ici

            // Par exemple, soumettre le formulaire
            form.submit();
        } else {
            notifications(false, "Veuillez sélectionner toutes les options.");
        }
    }

    // Récupère les prix des reliure
    // Insère les prix
    function get_prix(){
        fetch("ASSETS/json/variables_prix.json")
            .then(response => response.json())
            .then(function(json){

                let labels = document.querySelectorAll("#choix_reliures>div>label");
                labels.forEach(label => {
                    
                    //attribue le prix qui correspond dans la cellule span de prix
                    label.querySelector(".cellule_prix").textContent = json["reliure"][label.htmlFor];
                });

            });
    }

</script>