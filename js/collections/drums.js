var DrumSet = Backbone.Collection.extend(
  {
  model: DrumModel,
  isReady: function() {
    var ready = true;
    for(i=0;i<this.models.length;i++) {
      if (!this.models[i].isReady()) {
        ready = false;
      }
    }
    return ready;
  },
  play: function(cur_beat, measure, cur_char, cur_tag) {
    var play_sounds = {};
    
    var tom_tags = {} ;
    var ride_tags = {} ;

    ride_tags['meta'] = true;

    tom_tags['script'] = true;
    tom_tags['link'] = true;
    tom_tags['img'] = true;
    tom_tags['style'] = true;
    
    if (cur_beat == 1) {
      play_sounds['kik'] = true;
      if (measure == 1) {
        play_sounds['crash'] = true;
      }
    }

    if (cur_beat == 5 || cur_beat == 13) {
      play_sounds['snr'] = true;
    }
    if (cur_beat == 9) {
      play_sounds['kik'] = true;
    }

    rexp = /[\.,-\/#$%\^&\*;:=\-_`~]/;
    
    if (rexp.test(cur_char)) {
      play_sounds['snr'] = true;
    }
    if (cur_char == '!') {
      play_sounds['crash'] = true;
    }

    rexp = /[\(\)\{\}]/;
    if (rexp.test(cur_char)) {
      play_sounds['crash'] = true;
    }



//    if (cur_char == '=' || cur_char == '"' || cur_char == ':') {
//    }
    if (cur_char == '<' ||  cur_char == '>' ||  cur_char == '"') {
     play_sounds['kik'] = true;
    }

    rexp = /^[0-9a-zA-Z]+$/
    if(rexp.test(cur_char)){
      if (tom_tags[cur_tag]) {
        if (Math.floor(cur_beat / 2) != cur_beat / 2) {
        rexp = /^[a-z]+$/
        if(rexp.test(cur_char)){
          play_sounds['tom_floor'] = true;
        }
        else {
          play_sounds['tom1'] = true;
        }
        }
      }
      else {
      if (ride_tags[cur_tag]) {
        play_sounds['ride'] = true;
      }
      else {
        play_sounds['hh'] = true;
      }

      }
    }    
    rexp = /\s/;

    if(rexp.test(cur_char)){
     play_sounds = {}; 
    }
   if (play_sounds['snr']) {
     play_sounds['kik'] = false;
   }
   for(drum in play_sounds) {
     if (play_sounds[drum]) {
       this.getModel(drum).playSound(); 
     }
   }

  },
  getModel: function(drum) {

    for(i=0;i<this.models.length;i++) {
      if (this.models[i].drum == drum) {

        return this.models[i];
      }
    }

  }
});
