<!-- /* ------------------------------ TAILLES TEXTE ----------------------------- */ -->

<link rel="stylesheet" href="CODE/CSS/general.css">

<!-- /* ------------------------------- APPEL FONTS ------------------------------ */ -->

<!-- Space Grotesk -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&display=swap" rel="stylesheet">

<?php 
include('../controller.php');
include('variables.php');

require_once("../../vendor/autoload.php");


/* -------------------------------------------------------------------------- */
/*                                   TinyPNG                                  */
/* -------------------------------------------------------------------------- */
require_once("../../vendor/tinify/tinify/lib/Tinify/Exception.php");
require_once("../../vendor/tinify/tinify/lib/Tinify/ResultMeta.php");
require_once("../../vendor/tinify/tinify/lib/Tinify/Result.php");
require_once("../../vendor/tinify/tinify/lib/Tinify/Source.php");
require_once("../../vendor/tinify/tinify/lib/Tinify/Client.php");
require_once("../../vendor/tinify/tinify/lib/Tinify.php");
?>