var PlanetCollection = Backbone.Collection.extend(
  {
  model: PlanetModel,
  animate: function(seconds_per_year, rotation_ratio, fps) {
    for(i=0; i< this.models.length;i++) {
      m = this.models[i];
      m.animate(seconds_per_year, rotation_ratio, fps);
//      rot_inc = fps * ;
//      orbit_inc = fps * ;
    }
  },
  getPlanet: function(planet_id) {
    for(var planet_key in this.models) {
      if (this.models[planet_key].planet_id == planet_id) {
        return this.models[planet_key];
      }
    }
  return null;
  },
  addPlanetsToScene: function(scene) {
    for(var planet_key in this.models) {
//console.log(this.models[planet_key].planet_id + ' = ' + this.models[planet_key].parent_planet);
      if (this.models[planet_key].parent_planet == null) {
        scene.add(this.models[planet_key].vector);
      }
      else {
        this.models[planet_key].parent_planet.vector.add(this.models[planet_key].vector);
console.log('goo');
console.log(this.models[planet_key].parent_planet);
      }
    }    
  }
});
