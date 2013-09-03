window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audio_context = new AudioContext();

var kik =       new DrumModel(audio_context, ['audio/kik1.mp3']);
var snr =       new DrumModel(audio_context, ['audio/snr1.mp3','audio/snr2.mp3']);
var hh =        new DrumModel(audio_context, ['audio/hh1.mp3','audio/hh1.mp3','audio/hh1.mp3','audio/hh2.mp3','audio/hh3.mp3']);
var tom1 =      new DrumModel(audio_context, ['audio/tom1.mp3', 'audio/tom2.mp3']);
var tom_floor = new DrumModel(audio_context, ['audio/tom_floor1.mp3', 'audio/tom_floor2.mp3']);
var crash =     new DrumModel(audio_context, ['audio/crash1.mp3', 'audio/crash2.mp3']);


var currentPlayTime = 0;
var totalPlayTime = 0;
var bpm = 110;

var cur_beat = 1;
var char_count = 0;
var interval = Math.floor((1000 / 16) * (60 / bpm) * 4);
var measure = 1;
var play_state = true;

function play() {
  setTimeout(function() {
    interval = Math.floor((1000 / 16) * (60 / bpm) * 4);
    if (play_state == true) {
        
      char_count += 1;
      currentPlayTime += interval;
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
      cur_beat++;
      if (cur_beat > 16) {
        cur_beat = 1;
        measure++;
        if (measure > 4) {
          measure = 1;
        }
        
      }
    }
  play();
  }, interval);   
}

function init() {
  
  setTimeout(function() {
    if (kik.isReady() && snr.isReady() && hh.isReady() && crash.isReady() && tom1.isReady() && tom_floor.isReady()) {
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
