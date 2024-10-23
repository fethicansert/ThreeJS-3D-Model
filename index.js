
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xadd8e6);
renderer.setPixelRatio(window.devicePixelRatio);


document.body.appendChild(renderer.domElement)


//Sahne yaratiyoruz
const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

camera.position.set(-4, 10, 25);




const controls = new OrbitControls(camera, renderer.domElement);
// controls.maxDisdance = 5;
// controls.minDistance = 20;



const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);

// groundGeometry.rotateX(-Math.PI / 2);

const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x555555,
    side: THREE.DoubleSide
});

const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
// scene.add(groundMesh);


//LIGHTSSS

const spotLight = new THREE.SpotLight(0xffffff, 3, 200, 0.2, 0.5);
spotLight.position.set(0, 25, 0)
// scene.add(spotLight)


const ambientLight = new THREE.AmbientLight(0xD3D3D3, 0.1)
scene.add(ambientLight);

const dl = new THREE.DirectionalLight(0xff0000, .7);
const dlHelper = new THREE.DirectionalLightHelper(dl, 3)
dl.position.set(0, 7, 4)
scene.add(dl, dlHelper);


const loader = new GLTFLoader();

loader.load('./modal/ImageToStl.com_untitled.gltf',
    (gltf) => {
        const mesh = gltf.scene;
        mesh.scale.set(0.01, 0.01, 0.01)
        // mesh.rotateY(100)
        mesh.rotateX(30);
        mesh.position.set(-5, 0, 0);
        scene.add(mesh);
    },
    (xhr) => console.log((xhr.loaded / xhr.total * 100) + '% loaded'),
    (error) => console.log(error))



function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}

animate();
