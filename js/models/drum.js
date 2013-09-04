var DrumModel = Backbone.Model.extend({
  defaults: {
    audio_context: null,
    sound_files: [],
    audio: [],
    ready: []
  },
  constructor: function(drum, audio_context, sound_files) {
    this.drum = drum;
    this.audio_context = audio_context;
    this.sound_files = sound_files;
    this.audio = [];
    this.ready = false;
    this.gainNode = audio_context.createGain();
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
    // humanize the beat
    min_delay = 0;
    max_delay = 17;
    delay = Math.floor(Math.random() * max_delay);
    max_gain = 1;
    min_gain = 0.0;
    gain = Math.random() * (max_gain - min_gain ) + min_gain;
    gainNode = audio_context.createGain();
    gainNode.gain.value = gain;

    audio_key = 0; // Math.floor(velocity / Math.floor(127 / this.audio.length));
    audio_key = Math.floor(Math.random() * this.audio.length);
    var source = audio_context.createBufferSource(); // creates a sound source
    source.buffer = this.audio[audio_key];                    // tell the source which sound to play
    source.connect(audio_context.destination);       // connect the source to the context's destination (the speakers)
    source.connect(gainNode);
    setTimeout(function() {
      source.start(0);                           // play the source now  
    }, delay);
  }
});
