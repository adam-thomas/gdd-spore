// Configuration!
var sizes = [1.3, 4, 16, 64, 150];
var distances = [15, 50, 130, 1500, 4000];
var materials = ["planet1", "planet2", "planet3", "planet4", "planet5"];

var numNearSpheres = 30;
var furtherSpreadSpheresFactor = 100;


function get_distance(distanceFactor, minDistance) {
    // Return a distance at which to position an object, relative to (0,0,0).
    // Start with a random multiple of the potential total distance.
    var distance = Math.random() * distanceFactor;

    // Centre the distance on 0,0,0.
    distance = distance - (distanceFactor / 2);

    // Ensure the object is at least minDistance away from 0,0,0.
    if (distance > 0) {
        distance += minDistance;
    } else {
        distance -= minDistance;
    }

    return distance;
}


function createSphere(baseSphere, material, sizeFactor, distanceFactor, minDistance, yDisplacementFactor) {
    // Spawn a sphere.
    // Parameters are:
    //    baseSphere - an <a-sphere> object to clone. (Generating from scratch is hard.)
    //    colour - a hexadecimal RGB code used to colour it.
    //    sizeFactor - a number relating to the object's size (its diameter).
    //    distanceFactor - a number relating to the object's distance from (0,0,0).
    //    minDistance - the closest the object can spawn to (0,0,0).
    //    yDisplacementFactor - a number relating to how far the object can be displaced
    //        above or below the horizontal plane.
    var newSphere = baseSphere.cloneNode();

    // Calculate its position. xPos and zPos are coordinates in the horizontal plane;
    // y is nice-looking vertical displacement.
    xPos = get_distance(distanceFactor, minDistance);
    zPos = get_distance(distanceFactor, minDistance);
    yPos = Math.random() * yDisplacementFactor - (yDisplacementFactor / 2);
    position = xPos + ' ' + yPos + ' ' + zPos;

    // Apply attributes to the (cloned) AFrame object.
    newSphere.setAttribute('position', position);
    newSphere.setAttribute('radius', sizeFactor / 2);
    newSphere.setAttribute('material', "src: #" + material);

    return newSphere;
}


function setup_environment() {
    // Tie it all together.
    // Spawn a number of increasingly large entities to fill up the world!
    // They are positioned largely at random.
    var sphere = document.querySelector('#planetObject');
    var scene = document.querySelector('a-scene');
    scene.removeChild(sphere);

    for (s = 0; s < sizes.length; s++) {
        sizeFactor = sizes[s];
        distanceFactor = distances[s];
        displacementFactor = distanceFactor / 10;
        material = materials[s];

        // Create 30 spheres near where the player starts out, but no closer than
        // sizeFactor to prevent anything spawning on/blocking the player.
        for (i = 0; i < numNearSpheres; i++) {
            sphere = createSphere(sphere, material, sizeFactor, distanceFactor, sizeFactor, displacementFactor);
            scene.appendChild(sphere);
        }

        // Create more spheres spread further afield.
        // The number of these is inversely proportional to their size.
        furtherSpreadSpheres = Math.floor(furtherSpreadSpheresFactor / sizeFactor);
        for (i = 0; i < furtherSpreadSpheres; i++) {
            sphere = createSphere(sphere, material, sizeFactor, distanceFactor * 8, distanceFactor, displacementFactor * 2);
            scene.appendChild(sphere);
        }
    }
}

window.onload = setup_environment;
