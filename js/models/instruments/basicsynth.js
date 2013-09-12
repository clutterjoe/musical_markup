var BasicSynth = Instrument.extend({
  id: null,
  oscillators: [],
  initialize: function(id) {
    this.id = id;
  },
});