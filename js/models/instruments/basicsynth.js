var BasicSynth = Instrument.extend({
  defaults: {
    ac: null,
    id: null,
    oscillators: [],
    vco: null,
    vca: null,
    frequency: 0
  },
  initialize: function() {
    this.ac = arguments[0].ac;
    this.id = arguments[0].id;

    this.vco = this.ac.createOscillator();
    this.vco.type = this.vco.SINE;
    this.vco.frequency.value = 0;
    this.vco.start(0);
    this.vco.connect(this.ac.destination);
    
/*
    // VCA 
    this.vca = this.ac.createGain();
    this.vca.gain.value = 1;
//    this.play(0,0,0);
//    this.vca.gain.setValueAtTime(0, 0); 
    // Connections 
    this.vco.connect(this.vca);
    this.vca.connect(this.ac.destination);
    this.vca = this.ac.createGain();
//    this.vca.gain.value = 1;
*/    

  },
  play: function(note, duration, velocity, automation) {
      this.vco.frequency.setValueAtTime(0, duration);

      var gain = velocity / 127;
      
      this.vco.frequency.value = this.pitches[note];
//      this.vco.gain.value = gain;
//      this.vco.gain.setValueAtTime(0, duration);
  }
});


