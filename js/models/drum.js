var DrumModel = Backbone.Model.extend({
  defaults: {
    audio_context: null,
    sound_files: [],
    audio: [],
    ready: []
  },
  constructor: function(audio_context, sound_files) {
    this.audio_context = audio_context;
    this.sound_files = sound_files;
    this.audio = [];
    this.ready = false;
    var callback = [];
    var $this = this;
    for (i=0;i<this.sound_files.length;i++) {
      this.loadSound(this.sound_files[i], i);
    }
  },
  isReady: function() {
    return this.ready;
  },
  loadSound: function(sound_file, index) {

  var request = new XMLHttpRequest();
  var $this = this;
  request.open('GET', sound_file, true);
  request.responseType = 'arraybuffer';
  
  // Decode asynchronously
  request.onload = function() {
    audio_context.decodeAudioData(request.response, function(buffer) {
      $this.audio[index] = buffer;
      if ($this.audio.length == $this.sound_files.length) {
        $this.ready = true;
      }
    });
  }
  request.send();
  },
  playSound: function (velocity) {
    audio_key = 0; // Math.floor(velocity / Math.floor(127 / this.audio.length));
  audio_key = Math.floor(Math.random() * this.audio.length);
    var source = audio_context.createBufferSource(); // creates a sound source
    source.buffer = this.audio[audio_key];                    // tell the source which sound to play
    source.connect(audio_context.destination);       // connect the source to the context's destination (the speakers)
    source.start(0);                           // play the source now  
  }
});
