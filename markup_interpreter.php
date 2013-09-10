<?php 

$str = '';

?>
<!DOCTYPE html>
<!--[if lt IE 7]> <html class="lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html lang="en"> <!--<![endif]-->
  <head>
    <title>Musical Markup</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

    <!-- Viewport Scale -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />


    <!-- CSS -->
    <link rel="stylesheet" href="css/screen.css" />
  </head>
  <body>
<div id="display_char">
  
  
</div>
<span class="play_control">Pause</span>

<textarea placeholder="Paste the markup here..." id="markup_content"><?php echo htmlspecialchars($str); ?></textarea><input type="button" value="SUBMIT" />

    <!-- jquery -->
    <script src="js/libs/jquery/jquery.js"></script>


    <script src="js/markup_interpreter.js"></script>

  </body>
</html>
