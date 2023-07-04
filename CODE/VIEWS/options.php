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
                            <input type="radio" id="reliure_plastique" name="reliure" value="plastique" required="required" >
                            Reliure plastique
                        </label>
                    </div>

                    <div>
                        <label for="reliure_metallique">
                            <input type="radio" id="reliure_metallique" name="reliure" value="metallique" required="required" >
                            Reliure métallique
                        </label>
                    </div>
                </fieldset>

                <hr>

                <fieldset>
                    <div>
                        <label for="FormatA4">
                            <img src="ASSETS\img\image.jpg" alt="">

                            <input type="radio" id="FormatA4" name="format" value="a4" required="required" >
                            Format A4
                        </label>
                    </div>

                    <div>
                        <label for="FormatA5">
                            <img src="ASSETS\img\image.jpg" alt="">

                            <input type="radio" id="FormatA5" name="format" value="a5" required="required" >
                            Format A5
                        </label>
                    </div>
                </fieldset>

                <hr>

                <fieldset>
                    <div>
                        <label for="couverture_carton">
                            <img src="ASSETS\img\image.jpg" alt="">

                            <input type="radio" id="couverture_carton" name="couverture" value="carton" required="required" >
                            Couverture cartonnée
                        </label>
                    </div>

                    <div>
                        <label for="couverture_papier">
                            <img src="ASSETS\img\image.jpg" alt="">

                            <input type="radio" id="couverture_papier" name="couverture" value="papier" required="required" >
                            Couverture papier
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
                        <label for="theme1">
                            <img src="ASSETS\img\image.jpg" alt="">

                            <input type="radio" id="theme1" name="theme" value="theme1" required="required" >
                            theme1
                        </label>
                    </div>

                    <div>
                        <label for="theme2">
                            <img src="ASSETS\img\image.jpg" alt="">

                            <input type="radio" id="theme2" name="theme" value="theme2" required="required" >
                            theme2
                        </label>
                    </div>

                    <div>
                        <label for="theme3">
                            <img src="ASSETS\img\image.jpg" alt="">

                            <input type="radio" id="theme3" name="theme" value="theme3" required="required" >
                            theme3
                        </label>
                    </div>

                    <div>
                        <label for="theme4">
                            <img src="ASSETS\img\image.jpg" alt="">

                            <input type="radio" id="theme4" name="theme" value="theme4" required="required" >
                            theme4
                        </label>
                    </div>

                    <!-- --------------------------------------------------------------------------  -->
                    <!--                              THEMES PRINCIPAUX                              -->
                    <!-- --------------------------------------------------------------------------  -->

                    <div>
                        <label for="theme5">
                            <img src="ASSETS\img\image.jpg" alt="">

                            <input type="radio" id="theme5" name="theme" value="theme5" required="required" >
                            theme5
                        </label>
                    </div>

                    <div>
                        <label for="theme6">
                            <img src="ASSETS\img\image.jpg" alt="">

                            <input type="radio" id="theme6" name="theme" value="theme6" required="required" >
                            theme6
                        </label>
                    </div>
                </fieldset>
                
            </section>

            <button type="submit" class="main_btn">Passer à l'éditeur</button>

        </form>
    </main>
</body>
</html>