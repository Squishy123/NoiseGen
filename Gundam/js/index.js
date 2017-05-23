
var camera, scene, renderer, geometry, material, mesh;

var worldWidth = 32, worldDepth = 32,
    worldHalfWidth = worldWidth / 2, worldHalfDepth = worldDepth / 2;

init();
animate();
function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 100000);
    camera.y = 25;
    //camera.position.y = data[worldHalfWidth + worldHalfDepth * worldWidth] * 10 + 500;
    scene.add(camera);

    var light = new THREE.AmbientLight(0x404040);
    scene.add(light);

    geometry = new THREE.CubeGeometry(500, 500, 500);
    material = new THREE.MeshNormalMaterial();
    material.wireframe = true;

    //mesh = new THREE.Mesh(geometry, material);
    //scene.add(mesh);
    var loader = new THREE.JSONLoader();
    loader.load('gundam.json', function(geometry) {
        mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(1, 1, 1);
        mesh.position.set(0,0,0);
        scene.add(mesh);
    });


    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

}

function animate() {


    requestAnimationFrame(animate);
    render();
}

function render() {


    // *** Update the scene ***

    // Set the camera to always point to the centre of our scene, i.e. at vector 0, 0, 0
    camera.lookAt(new THREE.Vector3(0,0,0));

    // Move the camera in a circle with the pivot point in the centre of this circle...
    // ...so that the pivot point, and focus of the camera is on the centre of our scene.
    timer = new Date().getTime() * 0.0005;
   // mesh.rotation.y =timer;

    renderer.render(scene, camera);
}
