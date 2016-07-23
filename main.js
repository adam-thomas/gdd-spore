/**
 * Created by Tom Firth on 23/07/2016.
 */

var scene = document.querySelector('#main-scene');
var sphere = document.querySelector('#sphere');


for (var i = 0; i <= 1; i++) {
	var sphereClone = sphere.cloneNode(true);
	var x = Math.random()*100;
	// var y = Math.random()*5;
	var y = 0;
	var z = Math.random()*100;

	var position = x + " " + y + " " + z;
	var radius = Math.random()*2;
	sphereClone.setAttribute("position", position);
	sphereClone.setAttribute("radius", radius);
	scene.appendChild(sphereClone);
}

document.querySelector('[camera]').addEventListener('componentchanged', function(evt) {
	if (evt.detail.name === 'position') {
		myPosition = (evt.detail.newData);
	}
});


var coordinates = AFRAME.utils.coordinates;
AFRAME.registerComponent('cell', {
	schema: {},
	multiple: true,
	update: function() {
		console.log(this.el.components.position.data);
	},
	tick: function() {
		var objPosition = this.el.components.position.data;
		if (objPosition == myPosition) {
			console.log('grow!');
		}
	},
	remove: function() {

	}
});