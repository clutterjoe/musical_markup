var Conductor = Backbone.Collection.extend({
  ac: null,         // AudioContext
  masterVolume: 100,
  bufferSize: 1024,
  numOutputs: 2, 
  numInputs: 1, // Works properly in Safari 6 
  node: null,
  model: Instrument,
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
  song: {},
  song_timer: {
  },
  currentMeasure: 0,
  currentBeat: 1,
  currentTime: null,
  tempo: 120,
  timeSignature: { 
    top: 4, 
    bottom: 4 
  },
  noteBuffer: [],
  initialize: function() {
    
    this.ac = new (window.AudioContext || window.webkitAudioContext);
    this.node = this.ac.createJavaScriptNode(this.bufferSize, this.numInputs, this.numOutputs);
    this.node.connect(this.ac.destination);

    // Overcome scope.
    var $this = this;
    // Specify the audio generation function
    this.node.onaudioprocess = function() {
      $this.generateAudio();
    };
  },
  generateAudio: function() {
console.log(this.ac.currentTime);    
  },
  start: function() {
    if (this.currentTime == null) {
      this.currentTime = new Date().getTime();
    }
  },
  pause: function() {
    
  },
  play: function() {
        
  },
  // Loads notes into a buffer to be played at the appropriate time.
  buffer: function(model_id, pitches, note_duration, velocity, automation) {

    var model = null;
    for(i = 0; i < this.models.length; i++) {
      if (this.models[i].id == model_id) {
        model = this.models[i];
      }
    }
    if (model == null) {
      return false;
    }
    console.log(this.models);

  }

});
