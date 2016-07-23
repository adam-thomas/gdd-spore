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

    // Find our animation objects.
    var moveAnim = document.querySelector('#growMove');
    var scaleAnim = document.querySelector('#growScale');

    // Actually multiplying the size of the player isn't really a thing, so we have to
    // scale down the environment instead!  We do this by dividing the radius and
    // position values of all the spheres by an amount equal to the scaling factor.
    var spheres = document.querySelectorAll('a-sphere');
    for (i = 0; i < spheres.length; i++) {
        sphere = spheres[i];

        // Clear all animations currently on the sphere
        anims = sphere.querySelectorAll('a-animation');
        for (j = 0; j < anims.length; j++) {
            sphere.removeChild(anims[j]);
        }

        // Add a new move animation
        move = moveAnim.cloneNode();
        position = sphere.getAttribute('position');
        move.setAttribute('from', position.x + ' ' + position.y + ' ' + position.z)
        position.x /= scalingFactor;
        position.y /= scalingFactor;
        position.z /= scalingFactor;
        move.setAttribute('to', position.x + ' ' + position.y + ' ' + position.z);
        sphere.appendChild(move);

        // Add a new scaling animation
        radius = sphere.getAttribute('radius');
        target = radius / scalingFactor;
        scale = scaleAnim.cloneNode();
        console.log(radius + " => " + target);
        scale.setAttribute('to', target);
        sphere.appendChild(scale);

        move.emit('growEvent');
        scale.emit('growEvent');
    }
}
