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


    <!-- jquery -->
    <script src="js/libs/jquery/jquery.js"></script>

    <!-- modernizr -->
    <script src="js/libs/modernizr/modernizr.js"></script>

    <!-- underscore -->
    <script src="js/libs/underscore/underscore.js"></script>

    <!-- backbone -->
    <script src="js/libs/backbone/backbone.js"></script>

    <!-- app -->
    <script src="js/models/instrument.js"></script>
    <script src="js/models/instruments/basicsynth.js"></script>
    <script src="js/collections/conductor.js"></script>

    <script>
 
 
var note = null;

synth = new BasicSynth('synth')
console.log(synth);
setInterval(function() {
  
synth.play(250, 'C3', 127);
  
}, 500);

      var conductor = new Conductor();
/*
      var conductor = new Conductor();
      conductor.add( synth );
        conductor .buffer('synth', 'C3', 'q', 64) ;
                .play('synth', 'rest', 'q', 64)
                .play('synth', ['Eb3', 'G3'], 'q', 64)  
                .play('synth', 'G3', 'q', 64)  
                .restMeaure('synth');
*/
//                .play('synth', 'G3', [{'et', 'et'}, 'et', 'e', 'e','e', 'e','e', 'e'], [127, 64]);  
    </script>

  </body>
</html>
