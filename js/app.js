window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audio_context = new AudioContext();

var kik =       new DrumModel('kik', audio_context, ['audio/kik1.mp3']);
var snr =       new DrumModel('snr', audio_context, ['audio/snr1.mp3','audio/snr2.mp3']);
var hh =        new DrumModel('hh', audio_context, ['audio/hh1.mp3','audio/hh2.mp3','audio/hh3.mp3']);
var tom1 =      new DrumModel('tom1', audio_context, ['audio/tom1.mp3', 'audio/tom2.mp3']);
var tom_floor = new DrumModel('tom_floor', audio_context, ['audio/tom_floor1.mp3', 'audio/tom_floor2.mp3']);
var crash =     new DrumModel('crash', audio_context, ['audio/crash1.mp3', 'audio/crash2.mp3']);
var ride =     new DrumModel('ride', audio_context, ['audio/ride1.mp3', 'audio/ride2.mp3']);

var drumSet = new DrumSet();
drumSet.add(kik);
drumSet.add(snr);
drumSet.add(hh);
drumSet.add(tom1);
drumSet.add(tom_floor);
drumSet.add(crash);
drumSet.add(ride);

var currentPlayTime = 0;
var totalPlayTime = 0;
var bpm = 110;

var cur_beat = 1;
var char_count = 0;
var char_tot = 0;
var markup = '';
var interval = Math.floor((1000 / 16) * (60 / bpm) * 4);
var measure = 1;
var play_state = true;
var cur_char = '';
var cur_tag = '';

function play() {

  markup = $('#markup_content').val();
  char_tot = markup.length;
  if (markup == '') {
    play_state = false;
    return;
  }

  setTimeout(function() {

    interval = Math.floor((1000 / 16) * (60 / bpm) * 4);
    if (play_state == true) {
      
        
      char_count += 1;
      if (char_count >= char_tot) {
        play_state = false;
        return;
      }

      cur_char = '';
      cur_char = markup.substring(char_count, char_count+1);
      if (cur_char == '<') {
        a = markup.substring(char_count + 1, markup.length).split(/[^A-Za-z]/);
        cur_tag = a[0];
console.log(cur_tag);
      }
      
      $('#display_char').html(cur_char);

      currentPlayTime += interval;
      drumSet.play(cur_beat, measure, cur_char, cur_tag);
      cur_beat++;
      if (cur_beat > 16) {
        cur_beat = 1;
        measure++;
        if (measure > 4) {
          measure = 1;
        }
        
      }

  play();

      }


/*
      if (cur_beat == 1 && measure == 1) {
      crash.playSound();
      }
      else {
      hh.playSound();
      }
      if (cur_beat == 1 || cur_beat == 9) {
        kik.playSound();
      }
  
      if (cur_beat == 5 || cur_beat == 13 || cur_beat == 14) {
        snr.playSound();
      }
      if (measure == 4){
        if (cur_beat >= 10) {
          rndm = Math.random();
          if (rndm < 0.25) {
            tom1.playSound();
          } 
          else {
            if (rndm < 0.5) {
              tom_floor.playSound();
            }
            else {
              if (rndm < 0.75) {
                crash.playSound();
              }
            }
          } 
        }      
      }
    }
*/
  }, interval);   
}

function init() {
  
  setTimeout(function() {
    if (drumSet.isReady()) {
      play();
    } else {
      console.log('drums not ready');
      init();
    }
  }, 20);
}
init();

$(document).ready(function() {
  $('.play_control').click(function () {
    if ($(this).html() == 'Pause') {
      $(this).html('Play');
      play_state = false;
    }
    else {
      $(this).html('Pause');
      play_state = true;
    }
  });

  $('#cur_bpm').html(bpm);
  $('#set_bpm').val(bpm);
  $('#set_bpm').change(function() {
   bpm = $(this).val();
   $('#cur_bpm').html($(this).val());
  });
});

/*
hh = new DrumModel(audio_context, ['audio/kik1.mp3']);
snr = new DrumModel(audio_context, ['audio/kik1.mp3']);
tom1 = new DrumModel(audio_context, ['audio/kik1.mp3']);
tom_floor = new DrumModel(audio_context, ['audio/kik1.mp3']);
*/
