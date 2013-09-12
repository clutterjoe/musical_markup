var Conductor = Backbone.Collection.extend({

  // Begin object-scope variables.

  // Backbone-required model setting.
  model: Instrument,                  // Custom instrument, part of the package

  // AudioContext object.
  ac: null,                           // AudioContext

  // Computer time values.
  playTimer: 0,                       // the actual amount of time that has elapsed from the beginning of play
  previousSampleTime: null,           // the amount of time between each loop around onaudioprocess. Gets set on play

  // Both these values must be true in order to play the song.
  currentlyPlaying: false,            // Is the song currently playing?
  readyToPlay: false,                 // Are all the instruments ready to play? (may need to load samples)

  // Song time values
  tempo: 120,                         // Default tempo
  timeSignature: {                    // Default time signature is 4/4
    top: 4, 
    bottom: 4 
  },

  // AudioContext required values
  masterVolume: 100,                  // The master volume
  bufferSize: 1024,                   // The audio buffer, in samples
  numOutputs: 2,                      // The number of audio outputs (stereo)
  numInputs: 1,                       // The number of inputs, mandatory to avoid horrible noises 
  
  // This value may need to be changed so that all instruments have their own node. Currently all instruments share the same.
  node: null,                         // AudioContext.createJavaScriptNode

  // Play buffers hold all the notes that have been or are remaining to be played.

  playBuffer: {},     // Items remaining to be played playBuffer[model.id] = [{... play buffer values ...}]
  playBufferDone: {}, // Once played, items move from the playBuffer to here, restore to playBuffer on rewind

  // Duration of notes as defined by the length of a meaure.
  // This may need to be re-thought for alternate time signatures.
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

  // End object-scope variables.

  // Constructor
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

  // This is the function that plays audio
  generateAudio: function() {
    // check the play buffer for notes to be played
    if (this.currentlyPlaying && this.isReadyToPlay) {
    curTime = new Date().getTime();
    this.playTimer = this.playTimer + (curTime - this.previousSampleTime);
console.log(this.ac.currentTime + ' ' + this.playTimer);    
      
    }
    this.previousSampleTime = new Date().getTime();
  },

  pause: function() {
    this.currentlyPlaying = false; 
  },


  play: function() {
    this.previousSampleTime = new Date().getTime();
    this.currentlyPlaying = true; 
  },


  setTempo: function() {
    // When changing the tempo, you must shorten or 
    // lengthen the notes currently playing.
  },


  // Loads notes into a buffer to be played at the appropriate time.
  loadBuffer: function(model_id, pitches, note_duration, velocity, automation) {
    
    // Load the model specified in the arguments
    var model = null;
    for(i = 0; i < this.models.length; i++) {
      if (this.models[i].id == model_id) {
        model = this.models[i];
      }
    }
    // If this is not a valid model, just return, we aren't playing anything.
    if (model == null) {
      return this;
    }
    // If there is currently no buffer set for this instrument, make one.
    if (typeof(this.playBuffer[model.id]) != 'object') {
      this.playBuffer[model.id] = [];
      stTime = 0;
    }
    else {
      lastItem = this.playBuffer[model.id][this.playBuffer[model.id].length-1];
      stTime = lastItem.endTime;
    }
    endTime = stTime + this.notes[note_duration];
    this.playBuffer[model.id][this.playBuffer[model.id].length] = {
      stTime: stTime,
      endPlayTime: endTime - model.getArticulationGap(),
      endTime: endTime,
      pitch: pitches,
      velocity: velocity
    };
console.log(this.playBuffer[model.id]);
  return this;
  },
  
  // poll all the instruments to check if the band is ready
  isReadyToPlay: function() {
    this.readyToPlay = true;
    return this.readyToPlay;
  },
  setTimeSignature: function(top, bottom) {
    this.timeSignature.top = top;
    this.timeSignature.bottom = bottom;
  }

});
