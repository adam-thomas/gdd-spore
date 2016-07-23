// Depends on environment.js being declared before it in order to have access to the
// list of sizes.
var currentSize = 0;

function grow() {
    // Grow the player's size up to match the next set of spheres up.

    // If we're already at the largest size, grow no further.
    if (currentSize + 1 >= sizes.length) {
        return;
    }

    // We need to multiply the player's apparent size.
    // The amount we need to scale is equal to the next size up divided by the current
    // size.
    var currentScale = sizes[currentSize];
    currentSize++;
    var nextScale = sizes[currentSize];
    scalingFactor = nextScale / currentScale;

    // Actually multiplying the size of the player isn't really a thing, so we have to
    // scale down the environment instead!  We do this by dividing the radius and
    // position values of all the spheres by an amount equal to the scaling factor.
    var spheres = document.querySelectorAll('a-sphere');
    for (i = 0; i < spheres.length; i++) {
        sphere = spheres[i];
        position = sphere.getAttribute('position');
        position.x /= scalingFactor;
        position.y /= scalingFactor;
        position.z /= scalingFactor;
        sphere.setAttribute('position', position);
        sphere.setAttribute('radius', sphere.getAttribute('radius') / scalingFactor);
    }

    // Divide the player's y position too.
    var camera = document.querySelector('[camera]');
        position = camera.getAttribute('position');
        position.y /= scalingFactor;
        camera.setAttribute('position', position);
}
