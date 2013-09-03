var SceneView = Backbone.View.extend({
  events: {
    'resize': 'sceneResize'
  },
  initialize: function() {
    this.window = window;
    this.scene = new THREE.Scene();
    $this = this;
    $(window).bind('resize', function() {
      $this.sceneResize();
    });
  },
  // Resize the view
  sceneResize: function() {
    

  }
  
});

