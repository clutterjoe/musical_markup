var CameraView = Backbone.View.extend({
  model: CameraModel,
  initialize: function() {
    this.perspective = this.model.perspective;


  },
  trackMouseMovement: function(domElement) {
/*
    $this = this;
    radius = this.model.distance;

    
    $(domElement).mousedown(function(e) {
      $this.model.onMouseDownPosition.x = e.clientX;
			$this.model.onMouseDownPosition.y = e.clientY;

      $this.model.onMouseDownTheta = $this.model.theta;
			$this.model.onMouseDownPhi = $this.model.phi;

      $(this).mousemove(function(e) {
        
        xAmt = e.clientX - $this.model.onMouseDownPosition.x;
        yAmt = e.clientY - $this.model.onMouseDownPosition.y;
        radius = $this.model.distance;
        
				theta = - ( ( xAmt ) * 0.5 ) + $this.model.onMouseDownTheta;
				phi = ( ( yAmt ) * 0.5 ) + $this.model.onMouseDownPhi;
				$this.model.perspective.position.x = $this.model.perspective.position.x + radius * Math.sin( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
				$this.model.perspective.position.y = $this.model.perspective.position.y + radius * Math.sin( phi * Math.PI / 360 );
				$this.model.perspective.position.z = $this.model.perspective.position.z + radius * Math.cos( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
				$this.model.perspective.updateMatrix();

      });
    });
    $(domElement).mouseup(function(e) {
      $(this).unbind('mousemove');
    });
*/
  },
  animate: function(event) {
    this.model.updateLookAt();
  },
  updateLookAt: function(lookAtObject) {
    this.model.setLookAt(lookAtObject);
//    console.log(lookAtObject);
  }
  
});
