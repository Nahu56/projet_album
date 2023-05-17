<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body{
            overflow: hidden;

        }
        body>div{
            scroll-behavior: smooth;
            width: 400%; 
            height:50vh; 
            background-color: red; 
            display:flex;
            justify-content:space-around; 
            align-items:center;
        }
        body>div>*{
            width: 40vh; height:40vh; background-color: white;
        }
        section{

            position:fixed;
            bottom: 15px;
            left:5vw;
        }
    </style>
</head>
<body>
<h1>TEST</h1>

<div >
    <div id="1" >
        test 1 
    </div>

    <div id="2" >
        test 2
    </div>

    <div id="3" >
        test 3
    </div>
</div>

<section>
    <a href="#1" onclick="smoothScroll('#1')">1</a>
    <a href="#2" onclick="smoothScroll('#2')">2</a>
    <a href="#3" onclick="smoothScroll('#3')">3</a>
</section>


<script>
    function smoothScroll(target) {
        const element = document.querySelector(target);
        element.scrollIntoView({ behavior: 'smooth' });
    }
</script>


</body>
</html>