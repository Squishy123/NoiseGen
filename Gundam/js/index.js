var camera, scene, renderer, geometry, material, mesh, control;

var worldWidth = 32, worldDepth = 32,
    worldHalfWidth = worldWidth / 2, worldHalfDepth = worldDepth / 2;

init();
animate();
function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 100000);
    controls = new OrbitControls(camera);
    control = new OrbitControls(camera);
    camera.position.z = 100;
    //camera.position.y = data[worldHalfWidth + worldHalfDepth * worldWidth] * 10 + 500;
    scene.add(camera);

    var light = new THREE.AmbientLight(0x404040);
    scene.add(light);

    geometry = new THREE.CubeGeometry(500, 500, 500);
    material = new THREE.MeshNormalMaterial();
    //material.wireframe = false;

    //mesh = new THREE.Mesh(geometry, material);
    //scene.add(mesh);
    var loader = new THREE.JSONLoader();
    loader.load('res/models/gundam.json', function (geometry, materials) {
        //var material = materials[0];
        mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(10, 10, 10);
        mesh.position.set(0, 0, 0);
        scene.add(mesh);
    });

    if(webglAvailable()) {
    renderer = new THREE.WebGLRenderer();
        console.log("WEBGL RENDERER ENABLED");
    renderer.setSize(window.innerWidth, window.innerHeight);
    } else {
     renderer = new THREE.CanvasRenderer();   
        console.log("WEBGL IS NOT AVAILABLE. USING CANVAS RENDERER");
    }
    document.body.appendChild(renderer.domElement);

}

function animate() {


    requestAnimationFrame(animate);
    render();
}

function render() {


    // *** Update the scene ***

    // Set the camera to always point to the centre of our scene, i.e. at vector 0, 0, 0
    //camera.lookAt(new THREE.Vector3(0,0,0));

    // Move the camera in a circle with the pivot point in the centre of this circle...
    // ...so that the pivot point, and focus of the camera is on the centre of our scene.
    // timer = new Date().getTime() * 0.00005;

    //camera.position.x = Math.floor(Math.cos(timer) * 7500);
    //camera.position.z = Math.floor(Math.sin(timer) * 7500);

    renderer.render(scene, camera);
}

window.addEventListener('resize', onWindowResize, false);

//On window resize resize the camera view
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

//If webgl is available use webgl renderer else, fallback to canvas renderer
function webglAvailable() {
    try {
        var canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
    } catch(e) {
        return false;
    }
}


