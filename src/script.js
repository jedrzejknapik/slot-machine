import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();

const texture9 = textureLoader.load("/textures/9.png");
const texture9connect = textureLoader.load("/textures/9_connect.png");
const texture10 = textureLoader.load("/textures/10.png");
const texture10connect = textureLoader.load("/textures/10_connect.png");
const textureA = textureLoader.load("/textures/A.png");
const textureAconnect = textureLoader.load("/textures/A_connect.png");
const textureBonus = textureLoader.load("/textures/BONUS.png");
const textureH1 = textureLoader.load("/textures/H1.png");
const textureH1connect = textureLoader.load("/textures/H1_connect.png");
const textureH2 = textureLoader.load("/textures/H2.png");
const textureH2connect = textureLoader.load("/textures/H2_connect.png");
const textureH3 = textureLoader.load("/textures/H3.png");
const textureH3connect = textureLoader.load("/textures/H3_connect.png");
const textureH4 = textureLoader.load("/textures/H4.png");
const textureH4connect = textureLoader.load("/textures/H4_connect.png");
const textureH5 = textureLoader.load("/textures/H5.png");
const textureH5connect = textureLoader.load("/textures/H5_connect.png");
const textureH6 = textureLoader.load("/textures/H6.png");
const textureH6connect = textureLoader.load("/textures/H6_connect.png");
const textureJ = textureLoader.load("/textures/J.png");
const textureJconnect = textureLoader.load("/textures/J_connect.png");
const textureK = textureLoader.load("/textures/K.png");
const textureKconnect = textureLoader.load("/textures/K_connect.png");
const textureM1 = textureLoader.load("/textures/M1.png");
const textureM1connect = textureLoader.load("/textures/M1_connect.png");
const textureM2 = textureLoader.load("/textures/M2.png");
const textureM2connect = textureLoader.load("/textures/M2_connect.png");
const textureM3 = textureLoader.load("/textures/M3.png");
const textureM3connect = textureLoader.load("/textures/M3_connect.png");
const textureM4 = textureLoader.load("/textures/M4.png");
const textureM4connect = textureLoader.load("/textures/M4_connect.png");
const textureM5 = textureLoader.load("/textures/M5.png");
const textureM5connect = textureLoader.load("/textures/M5_connect.png");
const textureM6 = textureLoader.load("/textures/M6.png");
const textureM6connect = textureLoader.load("/textures/M6_connect.png");
const textureQ = textureLoader.load("/textures/Q.png");
const textureQconnect = textureLoader.load("/textures/Q_connect.png");

const symbols = [
  { name: "9", texture: texture9, connectTexture: texture9connect },
  { name: "10", texture: texture10, connectTexture: texture10connect },
  { name: "A", texture: textureA, connectTexture: textureAconnect },
  { name: "BONUS", texture: textureBonus, connectTexture: textureBonus },
  { name: "H1", texture: textureH1, connectTexture: textureH1connect },
  { name: "H2", texture: textureH2, connectTexture: textureH2connect },
  { name: "H3", texture: textureH3, connectTexture: textureH3connect },
  { name: "H4", texture: textureH4, connectTexture: textureH4connect },
  { name: "H5", texture: textureH5, connectTexture: textureH5connect },
  { name: "H6", texture: textureH6, connectTexture: textureH6connect },
  { name: "J", texture: textureJ, connectTexture: textureJconnect },
  { name: "K", texture: textureK, connectTexture: textureKconnect },
  { name: "M1", texture: textureM1, connectTexture: textureM1connect },
  { name: "M2", texture: textureM2, connectTexture: textureM2connect },
  { name: "M3", texture: textureM3, connectTexture: textureM3connect },
  { name: "M4", texture: textureM4, connectTexture: textureM4connect },
  { name: "M5", texture: textureM5, connectTexture: textureM5connect },
  { name: "M6", texture: textureM6, connectTexture: textureM6connect },
  { name: "Q", texture: textureQ, connectTexture: textureQconnect },
];

const BOARD_WIDTH = 5;
const BOARD_HEIGHT = 3;

const symbolGeometry = new THREE.BoxGeometry(1, 1, 1);
const rows = new Map();

for (let i = 0; i < BOARD_WIDTH; i++) {
  for (let j = 0; j < BOARD_HEIGHT; j++) {
    const symbolMaterial = new THREE.MeshBasicMaterial();
    const cube = new THREE.Mesh(symbolGeometry, symbolMaterial);
    cube.position.y = j - BOARD_HEIGHT / 2 + 0.5;
    cube.position.x = i - BOARD_WIDTH / 2 + 0.5;

    if (!rows[j]) {
      rows[j] = {};
    }

    if (!rows[j].elements?.length) {
      rows[j].elements = [];
    }

    rows[j].elements.push({ symbol: null, mesh: cube });
    scene.add(cube);
  }
}

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

camera.position.set(0, 0, 7);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();

const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();

const rotationSpeed = Math.PI * 0.1;
const targetRotation = Math.PI * 4;

const spin = () => {
  let currentRotation = 0;

  const animate = () => {
    currentRotation += rotationSpeed;

    for (const row in rows) {
      rows[row].elements.forEach((element) => {
        element.mesh.rotation.x = currentRotation;
      });
    }

    if (currentRotation < targetRotation) {
      requestAnimationFrame(animate);
    }

    renderer.render(scene, camera);
  };

  animate();
};

const findRandomSymbol = () => {
  const randomIndex = Math.floor(Math.random() * symbols.length);
  return symbols[randomIndex];
};

const randomizeElements = () => {
  for (const row in rows) {
    rows[row].elements.forEach((element) => {
      const randomSymbol = findRandomSymbol();
      element.symbol = randomSymbol.name;
      element.mesh.material.map = randomSymbol.texture;
      element.mesh.material.needsUpdate = true;
    });
  }
};

randomizeElements();

const START_SCORE = 500;
const REWARD_SYSTEM = {
  threeSymbols: 200,
  fourSymbols: 500,
  fiveSymbols: 1500,
};

let score = START_SCORE;
const scoreElement = document.getElementById("score");
scoreElement.textContent = `${score} $`;
const spinScoreElement = document.getElementById("spinScore");
spinScoreElement.textContent = "SPIN TO WIN";

const spinButton = document.getElementById("spinButton");

const gethighestOccurrences = (array) => {
  const count = array.reduce((acc, currentValue) => {
    acc[currentValue] = (acc[currentValue] || 0) + 1;
    return acc;
  }, {});

  let maxCount = 0;
  let maxElement = "";
  for (const key in count) {
    if (count.hasOwnProperty(key)) {
      if (count[key] > maxCount) {
        maxCount = count[key];
        maxElement = key;
      }
    }
  }

  return { element: maxElement, occurrences: maxCount };
};

const getScore = () => {
  let spinScore = 0;

  const highestOccurances = new Map();

  for (const row in rows) {
    const rowSymbols = [];

    rows[row].elements.forEach((element) => {
      rowSymbols.push(element.symbol);
    });

    highestOccurances[row] = gethighestOccurrences(rowSymbols);
  }

  for (const row in highestOccurances) {
    const occurances = highestOccurances[row].occurrences;
    const symbolName = highestOccurances[row].element;

    if (occurances >= 3) {
      rows[row].elements.forEach((element) => {
        if (element.symbol == symbolName) {
          element.mesh.material.map = symbols.find(
            (s) => s.name === symbolName
          ).connectTexture;
        }
      });

      if (occurances === 3) {
        spinScore += REWARD_SYSTEM.threeSymbols;
      }

      if (occurances === 4) {
        spinScore += REWARD_SYSTEM.fourSymbols;
      }

      if (occurances === 5) {
        spinScore += REWARD_SYSTEM.fiveSymbols;
      }
    }
  }

  spinScoreElement.textContent = `Spin score: +${spinScore} $`;
  score += spinScore;
};

spinButton.addEventListener("click", () => {
  spinButton.disabled = true;
  score -= 20;
  randomizeElements();
  spin();
  getScore();
  scoreElement.textContent = `${score} $`;
  setTimeout(() => {
    spinButton.disabled = false;
  }, 400);
});
