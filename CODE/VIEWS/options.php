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
        <form action="">

            <!-- --------------------------------------------------------------------------  -->
            <!--                                  SECTION 1                                  -->
            <!-- --------------------------------------------------------------------------  -->
            <section id="">
                <header>
                    <h2>Pour commencer,</h2>

                    <p>sélectionnez la reliure ainsi que le format d’album photo duquel vous souhaitez partir :</p>
                </header>

                <fieldset>
                    <div>
                        <label for="huey">
                            <input type="radio" id="huey" name="drone" value="huey" >
                            Huey
                        </label>
                    </div>

                    <div>
                        <label for="dewey">
                            <input type="radio" id="dewey" name="drone" value="dewey">
                            Dewey
                        </label>
                    </div>
                </fieldset>

                <hr>

                <fieldset>
                    <div>
                        <label for="formatA">
                            <input type="radio" id="formatA" name="truc" value="huey" >
                            formatA
                        </label>
                    </div>

                    <div>
                        <label for="formatB">
                            <input type="radio" id="formatB" name="truc" value="dewey">
                            formatB
                        </label>
                    </div>
                </fieldset>

                <hr>

                <fieldset>
                    <div>
                        <label for="choixA">
                            <img src="ASSETS\img\image.jpg" alt="">

                            <input type="radio" id="choixA" name="choix" value="huey" >
                            choixA
                        </label>
                    </div>

                    <div>
                        <label for="choixB">
                            <img src="ASSETS\img\image.jpg" alt="">

                            <input type="radio" id="choixB" name="choix" value="dewey">
                            choixB
                        </label>
                    </div>
                </fieldset>
                
            </section>

            <!-- --------------------------------------------------------------------------  -->
            <!--                                  SECTION 2                                  -->
            <!-- --------------------------------------------------------------------------  -->
            <section id="">
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

                            <input type="radio" id="theme1" name="theme" value="huey">
                            theme1
                        </label>
                    </div>

                    <div>
                        <label for="theme2">
                            <img src="ASSETS\img\image.jpg" alt="">

                            <input type="radio" id="theme2" name="theme" value="dewey">
                            theme2
                        </label>
                    </div>

                    <div>
                        <label for="theme3">
                            <img src="ASSETS\img\image.jpg" alt="">

                            <input type="radio" id="theme3" name="theme" value="dewey">
                            theme3
                        </label>
                    </div>

                    <div>
                        <label for="theme4">
                            <img src="ASSETS\img\image.jpg" alt="">

                            <input type="radio" id="theme4" name="theme" value="dewey">
                            theme4
                        </label>
                    </div>

                    <!-- --------------------------------------------------------------------------  -->
                    <!--                              THEMES PRINCIPAUX                              -->
                    <!-- --------------------------------------------------------------------------  -->

                    <div>
                        <label for="theme5">
                            <img src="ASSETS\img\image.jpg" alt="">

                            <input type="radio" id="theme5" name="theme" value="dewey">
                            theme5
                        </label>
                    </div>

                    <div>
                        <label for="theme6">
                            <img src="ASSETS\img\image.jpg" alt="">

                            <input type="radio" id="theme6" name="theme" value="dewey">
                            theme6
                        </label>
                    </div>
                </fieldset>
                
            </section>

            <a href="./editeur" class="main_btn">Passer à l'éditeur</a>

        </form>
    </main>
</body>
</html>