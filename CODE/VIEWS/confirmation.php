<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmation de commande</title>
    
    <?php 
        include('../controller.php');


        destroyIMG_SESSION();
        destroy_album_continue_later();

    
    ?>
    <link rel="stylesheet" href="../../CODE/CSS/accueil.css">
    <link rel="stylesheet" href="../../CODE/CSS/general.css">

</head>
<body>

    <main>
        <div class="card">

            <a href="printshopcrea.com">
                <img width="400px" src="https://printshopcrea.com/wp-content/uploads/2023/08/logo_png.png" alt="logo">
            </a>

            <h1>Votre commande à bien été confirmée !</h1>

            <p>Vous serez recontacté par notre équipe lorsqu'elle sera prête !</p>

        </div>

        <!-- /* --------------------------------- CONTACT -------------------------------- */ -->
        <section>
            <div class="secondHeader">
                <h3>Des questions ?</h3>
                <div class="hr"></div>
            </div>
            
            <p>Contactez notre support client !</p>

            <div class="list_infos">
                <div>
                    <a href="mailto:prod@printshopcrea.com" class="info">
                        <p>Email : <b> prod@printshopcrea.com</b></p>
                    </a>
                </div>
                <div>
                    <a href="tel:02 97 14 47 63" class="info">
                        <p>Tél: <b> 02 97 14 47 63</b></p>
                    </a>
                </div>
            </div>
        </section>


    </main>

</body>
</html>