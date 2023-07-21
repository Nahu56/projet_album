<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <!-- Appel header -->
    <?php require '../components/header.php' ?>

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

                <fieldset>
                    <div>
                        <label for="reliure_plastique">
                            <img src="ASSETS\img\image.jpg" alt="">
                            <input type="radio" id="reliure_plastique" name="reliure" value="plastique" required="required" >
                            <p>Reliure plastique</p>
                        </label>
                    </div>

                    <div>
                        <label for="reliure_metallique">
                            <img src="ASSETS\img\image.jpg" alt="">
                            <input type="radio" id="reliure_metallique" name="reliure" value="metallique" required="required" >
                            <p>Reliure metallique</p>
                        </label>
                    </div>
                </fieldset>

                <hr>

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

                <hr>

                <fieldset>
                    <div>
                        <label for="couverture_carton">
                            <input type="radio" id="couverture_carton" name="couverture" value="carton" required="required" >
                            <p>Couverture cartonnée</p>
                        </label>
                    </div>

                    <div>
                        <label for="couverture_papier">
                            <input type="radio" id="couverture_papier" name="couverture" value="papier" required="required" >
                            <p>Couverture papier</p>
                        </label>
                    </div>
                </fieldset>
                
            </section>

            <!-- --------------------------------------------------------------------------  -->
            <!--                                  SECTION 2                                  -->
            <!-- --------------------------------------------------------------------------  -->
            <section id="section2">
                <header>
                    <p>Maintenant,</p>
                    <h2>choisissez le thème</h2>

                    <p>Voici une liste de thèmes qui donneront vie à votre album photo !</p>
                </header>

                <fieldset>

                    <!-- --------------------------------------------------------------------------  -->
                    <!--                              THEMES SECONDAIRES                             -->
                    <!-- --------------------------------------------------------------------------  -->
                    <div>
                        <label for="classique">
                            <img src="ASSETS\img\themes\classique.png" alt="">

                            <input type="radio" id="classique" name="theme" value="classique" required="required" >
                            <p>Classique</p>
                        </label>
                    </div>

                    <!-- <div>
                        <label for="theme2">
                            <img src="ASSETS\img\image.jpg" alt="">

                            <input type="radio" id="theme2" name="theme" value="theme2" required="required" >
                            <p>theme2</p>
                        </label>
                    </div>

                    <div>
                        <label for="theme3">
                            <img src="ASSETS\img\image.jpg" alt="">

                            <input type="radio" id="theme3" name="theme" value="theme3" required="required" >
                            <p>theme3</p>
                        </label>
                    </div>

                    <div>
                        <label for="theme4">
                            <img src="ASSETS\img\image.jpg" alt="">

                            <input type="radio" id="theme4" name="theme" value="theme4" required="required" >
                            <p>theme4</p>
                        </label>
                    </div> -->

                    <!-- --------------------------------------------------------------------------  -->
                    <!--                              THEMES PRINCIPAUX                              -->
                    <!-- --------------------------------------------------------------------------  -->

                    <div>
                        <label for="Lumanosimo">
                            <img src="ASSETS\img\themes\lumanosimo.png" alt="">

                            <input type="radio" id="Lumanosimo" name="theme" value="Lumanosimo#FFF9D4" required="required" >
                            <p>Lumanosimo</p>
                        </label>
                    </div>

                    <div>
                        <label for="PlayfairDisplay">
                            <img src="ASSETS\img\themes\playfairdisplay.png" alt="">

                            <input type="radio" id="PlayfairDisplay" name="theme" value="PlayfairDisplay#D5E1EC" required="required" >
                            <p>Playfair Display</p>
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
    sessionStorage.setItem("options", "");

    //ajoute la class selected
    document.querySelectorAll("fieldset").forEach(fieldset => {

        fieldset.addEventListener("change", function(){

            fieldset.querySelectorAll("input").forEach(input => {
                input.parentNode.parentNode.classList.remove("selected");

                if(input.checked){
                    input.parentNode.parentNode.classList.add("selected");
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

</script>