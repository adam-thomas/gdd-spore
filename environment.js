function setup_environment() {
    var sizes = [1.3, 4, 16, 64];
    var distances = [15, 60, 180, 3000];
    var colours = ["#4CC3D9", "#2CA3B9", "#0C8399", "#066379"]

    var sphere = document.querySelector('#sphere');
    var scene = document.querySelector('a-scene');

    for (s = 0; s < sizes.length; s++) {
        sizeFactor = sizes[s]
        distanceFactor = distances[s];
        centreFactor = distanceFactor / 2;
        displacementFactor = distanceFactor / 10;

        for (i = 0; i < 20; i++) {
            var newSphere = sphere.cloneNode();
            height = sizeFactor;

            xPos = Math.random() * distanceFactor - centreFactor;
            zPos = Math.random() * distanceFactor - centreFactor;
            yPos = 1 + Math.random() * displacementFactor - (displacementFactor / 2);
            position = xPos + ' ' + yPos + ' ' + zPos;

            newSphere.setAttribute('position', position);
            newSphere.setAttribute('radius', height / 2);
            newSphere.setAttribute('color', colours[s]);
            scene.appendChild(newSphere);
        }
    }

    scene.removeChild(sphere);
}

window.onload = setup_environment;
