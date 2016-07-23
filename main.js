/**
 * Created by Tom Firth on 23/07/2016.
 */
// var position = 0;

var scene = document.querySelector('#main-scene');
var sphere = document.querySelector('#sphere');


for (var i = 0; i <= 100; i++) {
	var sphereClone = sphere.cloneNode(true);
	var x = Math.random()*100;
	var y = Math.random()*5;
	var z = Math.random()*100;

	var position = x + " " + y + " " + z;
	var radius = Math.random()*2;
	sphereClone.setAttribute("position", position);
	sphereClone.setAttribute("radius", radius);
	scene.appendChild(sphereClone);
}

// document.querySelector('[camera]').addEventListener('componentchanged', function(evt) {
// 	if (evt.detail.name === 'position') {
// 		console.log(evt.detail.newData);
// 	}
// });


var coordinates = AFRAME.utils.coordinates;
AFRAME.registerComponent('cell', {
	schema: {
		position: {
			default: '0 0 0'
		},
		radius: {
			default: '1'
		},
		color: {
			default: '#333'
		}
	},
	update: function() {
		console.log("hello");
	},
	tick: function() {
		console.log("hello!");
		console.log(this);
	},
	remove: function() {
		this.el.removeObject3D()
	}
});