var Instrument = Backbone.Model.extend({
  sound: new BasicSynth(),
  notes: {
    w: 1,
    hd: 0.75, // dotted half
    h: 0.5, // half note
    qd: 0.375, //dotted quarter
    ht: 0.33333334, // triplet half
    q: 0.25, // quarter note
    ed: 0.1875, // dotted eighth
    qt: 0.166666667, // quarter triplet
    e: 0.125, // eighth
    sd: 0.09375, // dotted sixteenth
    et: 0.083333333, // eighth note triplet
    s: 0.0625, // sixteenth note
    st: 0.041666667, // triplet sixteenth
    th: 0.03125 // thirty-second note
  },
  setSound: function(sound) {
    this.sound = sound;
  }
  play(duration, note, velocity) {
    
  } 
});