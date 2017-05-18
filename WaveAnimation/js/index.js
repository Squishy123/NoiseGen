
var camera, scene, renderer, geometry, material;
var terrain, vertices, mesh, data;

var worldWidth = 16, worldDepth = 16,
    worldHalfWidth = worldWidth / 2, worldHalfDepth = worldDepth / 2;

init();
animate();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 100000);
    //camera.position.y = data[worldHalfWidth + worldHalfDepth * worldWidth] * 10 + 500;
    camera.position.y = 5000;
    scene.add(camera);

    var light = new THREE.AmbientLight(0x404040);
    scene.add(light);

    geometry = new THREE.CubeGeometry(200, 200, 200);
    material = new THREE.MeshNormalMaterial();
    material.wireframe = true;

    terrain = new THREE.PlaneBufferGeometry(7500, 7500, worldWidth - 1, worldDepth - 1);
    //terrain = new THREE.PlaneGeometry(7500, 7500, worldWidth - 1, worldDepth - 1);
    terrain.rotateX(- Math.PI / 2);
    vertices = terrain.attributes.position.array;
    //vertices = terrain.vertices;
    data = generateHeight(worldWidth, worldDepth);

    for (var i = 0, j = 0; i < vertices.length; i++ , j += 3) {
        vertices[j + 1] = data[i] * 10 * 0.25;
    }

    mesh = new THREE.Mesh(terrain, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

}

function animate() {


    requestAnimationFrame(animate);
    render();

}

function render() {
    var timer = new Date().getTime() * 0.00005;
    //var geo = new THREE.Geometry().fromBufferGeometry(terrain);
    vertices = terrain.attributes.position.array;
    console.log(terrain.attributes.position.array[2]);
    for (var a = 0, b = 0; a < vertices.length; a++ , b += 3) {
        //geo.vertices[a + 1] = Math.floor(Math.cos(timer) * geo.vertices[a + 1]);
        terrain.attributes.position.array[b + 1] = Math.floor(0.25 * Math.cos(timer * 100) * terrain.attributes.position.array[a]);
        //terrain.geometry.vertices.needUpdate = true;
        //terrain.attributes.position.array = geo.vertices;
        terrain.attributes.position.needsUpdate = true;
        terrain.computeBoundingSphere();
        mesh.geometry.verticesNeedUpdate = true;
    }

    // *** Update the scene ***

    // Set the camera to always point to the centre of our scene, i.e. at vector 0, 0, 0
    camera.lookAt(scene.position);

    // Move the camera in a circle with the pivot point in the centre of this circle...
    // ...so that the pivot point, and focus of the camera is on the centre of our scene.

    camera.position.x = Math.floor(Math.cos(timer) * 7500);
    camera.position.z = Math.floor(Math.sin(timer) * 7500);
    //redraw();


    renderer.render(scene, camera);
}

function generateHeight(width, height) {
    var data = new Uint8Array(width * height);
    for (var j = 0; j < 100; j++) {
        for (var i = 0; i < width * height; i++) {
            data[i] += Math.random() * 100;

        }
    }

    return data;

}

