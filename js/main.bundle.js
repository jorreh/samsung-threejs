/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/js/banner/RoundedBoxGeometry.js":
/*!*********************************************!*\
  !*** ./app/js/banner/RoundedBoxGeometry.js ***!
  \*********************************************/
/*! exports provided: RoundedBoxGeometry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoundedBoxGeometry", function() { return RoundedBoxGeometry; });
/* harmony import */ var _build_three_min_custom_jorre__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../build/three.min-custom-jorre */ "./app/js/build/three.min-custom-jorre.js");
/* harmony import */ var _build_three_min_custom_jorre__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_build_three_min_custom_jorre__WEBPACK_IMPORTED_MODULE_0__);
// import {
// 	BoxGeometry,
// 	Vector3
// } from '../build/three.module.js';
// import {
// 	BoxGeometry,
// 	Vector3
// } from 'three';
// import { BoxGeometry } from '../three/geometries/BoxGeometry';
// import { Vector3 } from '../three/math/Vector3';

const tempNormal = new _build_three_min_custom_jorre__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();

function getUv(faceDirVector, normal, uvAxis, projectionAxis, radius, sideLength) {
  const totArcLength = 2 * Math.PI * radius / 4; // length of the planes between the arcs on each axis

  const centerLength = Math.max(sideLength - 2 * radius, 0);
  const halfArc = Math.PI / 4; // Get the vector projected onto the Y plane

  tempNormal.copy(normal);
  tempNormal[projectionAxis] = 0;
  tempNormal.normalize(); // total amount of UV space alloted to a single arc

  const arcUvRatio = 0.5 * totArcLength / (totArcLength + centerLength); // the distance along one arc the point is at

  const arcAngleRatio = 1.0 - tempNormal.angleTo(faceDirVector) / halfArc;

  if (Math.sign(tempNormal[uvAxis]) === 1) {
    return arcAngleRatio * arcUvRatio;
  } else {
    // total amount of UV space alloted to the plane between the arcs
    const lenUv = centerLength / (totArcLength + centerLength);
    return lenUv + arcUvRatio + arcUvRatio * (1.0 - arcAngleRatio);
  }
}

class RoundedBoxGeometry extends _build_three_min_custom_jorre__WEBPACK_IMPORTED_MODULE_0__["BoxGeometry"] {
  constructor(width = 1, height = 1, depth = 1, segments = 2, radius = 0.1) {
    // ensure segments is odd so we have a plane connecting the rounded corners
    segments = segments * 2 + 1; // ensure radius isn't bigger than shortest side

    radius = Math.min(width / 2, height / 2, depth / 2, radius);
    super(1, 1, 1, segments, segments, segments); // if we just have one segment we're the same as a regular box

    if (segments === 1) return;
    const geometry2 = this.toNonIndexed();
    this.index = null;
    this.attributes.position = geometry2.attributes.position;
    this.attributes.normal = geometry2.attributes.normal;
    this.attributes.uv = geometry2.attributes.uv; //

    const position = new _build_three_min_custom_jorre__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    const normal = new _build_three_min_custom_jorre__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    const box = new _build_three_min_custom_jorre__WEBPACK_IMPORTED_MODULE_0__["Vector3"](width, height, depth).divideScalar(2).subScalar(radius);
    const positions = this.attributes.position.array;
    const normals = this.attributes.normal.array;
    const uvs = this.attributes.uv.array;
    const faceTris = positions.length / 6;
    const faceDirVector = new _build_three_min_custom_jorre__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    const halfSegmentSize = 0.5 / segments;

    for (let i = 0, j = 0; i < positions.length; i += 3, j += 2) {
      position.fromArray(positions, i);
      normal.copy(position);
      normal.x -= Math.sign(normal.x) * halfSegmentSize;
      normal.y -= Math.sign(normal.y) * halfSegmentSize;
      normal.z -= Math.sign(normal.z) * halfSegmentSize;
      normal.normalize();
      positions[i + 0] = box.x * Math.sign(position.x) + normal.x * radius;
      positions[i + 1] = box.y * Math.sign(position.y) + normal.y * radius;
      positions[i + 2] = box.z * Math.sign(position.z) + normal.z * radius;
      normals[i + 0] = normal.x;
      normals[i + 1] = normal.y;
      normals[i + 2] = normal.z;
      const side = Math.floor(i / faceTris);

      switch (side) {
        case 0:
          // right
          // generate UVs along Z then Y
          faceDirVector.set(1, 0, 0);
          uvs[j + 0] = getUv(faceDirVector, normal, 'z', 'y', radius, depth);
          uvs[j + 1] = 1.0 - getUv(faceDirVector, normal, 'y', 'z', radius, height);
          break;

        case 1:
          // left
          // generate UVs along Z then Y
          faceDirVector.set(-1, 0, 0);
          uvs[j + 0] = 1.0 - getUv(faceDirVector, normal, 'z', 'y', radius, depth);
          uvs[j + 1] = 1.0 - getUv(faceDirVector, normal, 'y', 'z', radius, height);
          break;

        case 2:
          // top
          // generate UVs along X then Z
          faceDirVector.set(0, 1, 0);
          uvs[j + 0] = 1.0 - getUv(faceDirVector, normal, 'x', 'z', radius, width);
          uvs[j + 1] = getUv(faceDirVector, normal, 'z', 'x', radius, depth);
          break;

        case 3:
          // bottom
          // generate UVs along X then Z
          faceDirVector.set(0, -1, 0);
          uvs[j + 0] = 1.0 - getUv(faceDirVector, normal, 'x', 'z', radius, width);
          uvs[j + 1] = 1.0 - getUv(faceDirVector, normal, 'z', 'x', radius, depth);
          break;

        case 4:
          // front
          // generate UVs along X then Y
          faceDirVector.set(0, 0, 1);
          uvs[j + 0] = 1.0 - getUv(faceDirVector, normal, 'x', 'y', radius, width);
          uvs[j + 1] = 1.0 - getUv(faceDirVector, normal, 'y', 'x', radius, height);
          break;

        case 5:
          // back
          // generate UVs along X then Y
          faceDirVector.set(0, 0, -1);
          uvs[j + 0] = getUv(faceDirVector, normal, 'x', 'y', radius, width);
          uvs[j + 1] = 1.0 - getUv(faceDirVector, normal, 'y', 'x', radius, height);
          break;
      }
    }
  }

}



/***/ }),

/***/ "./app/js/banner/banner.js":
/*!*********************************!*\
  !*** ./app/js/banner/banner.js ***!
  \*********************************/
/*! exports provided: initBanner */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initBanner", function() { return initBanner; });
/* harmony import */ var _models3D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models3D */ "./app/js/banner/models3D.js");

let models;
function initBanner() {
  const bannerContainer = document.querySelector('.banner');
  const classes = Array.from(bannerContainer.classList);
  models = new _models3D__WEBPACK_IMPORTED_MODULE_0__["Models3D"](document.querySelector('.container3D'));
  const debug = true;
  /*
  models.addModel("75.1, 159.9, 8.4", 0x1c1c1c, './images/A52/A52_black_front.jpg', './images/A52/A52_black_back.jpg');
  models.addModel("75.1, 159.9, 8.4", 0x86b6d8, './images/A52/A52_blue_front.jpg', './images/A52/A52_blue_back.jpg');
  models.addModel("75.1, 159.9, 8.4", 0xb9b7d2, './images/A52/A52_violet_front.jpg', './images/A52/A52_violet_back.jpg');
  models.addModel("75.1, 159.9, 8.4", 0xecece7, './images/A52/A52_white_front.jpg', './images/A52/A52_white_back.jpg');
  models.init(init, 0, 0, 2, true, debug);
  */

  if (classes.includes('s21')) {
    models.addModel("76.6, 165.1, 8.9", '#181819', './images/S21Ultra_black_front.jpg', './images/S21Ultra_black_back.jpg');
    models.addModel("75.6, 165.1, 8.9", '#c4d1da', './images/S21Ultra_silver_front.jpg', './images/S21Ultra_silver_back.jpg');
    models.init(init, 0, 0, 2, true, debug);
  } else if (classes.includes('s21plus')) {
    models.addModel("75.6, 161.5, 7.8", '#e0baaa', './images/S21Plus_violet_front.jpg', './images/S21Plus_violet_back.jpg');
    models.addModel("75.6, 161.5, 7.8", '#181819', './images/S21Plus_black_front.jpg', './images/S21Plus_black_back.jpg');
    models.addModel("75.6, 161.5, 7.8", '#c4d1da', './images/S21Plus_silver_front.jpg', './images/S21Plus_silver_back.jpg');
    models.init(init, 0, .1, 1.5, true, debug);
  } else if (classes.includes('s21ultra')) {
    models.addModel("71.2, 151.7, 7.9", '#e0baaa', './images/S21_violet_front.jpg', './images/S21_violet_back.jpg');
    models.addModel("71.2, 151.7, 7.9", '#616367', './images/S21_gray_front.jpg', './images/S21_gray_back.jpg');
    models.addModel("71.2, 151.7, 7.9", '#cecece', './images/S21_white_front.jpg', './images/S21_white_back.jpg');
    models.addModel("71.2, 151.7, 7.9", '#e0baaa', './images/S21_pink_front.jpg', './images/S21_pink_back.jpg');
    models.init(init, 0, 0, 1.2, false, debug);
  }
}

function init() {
  models.show();
  let carousel = new Carousel(models);
  const rotate = document.querySelector('.rotate');
  rotate.addEventListener('click', models.flipObject.bind(models));
}

class Carousel {
  constructor(models) {
    this.models = models;
    this.callback = models.showObject.bind(models);
    const leftArrow = document.querySelector('.arrow--left');
    leftArrow.addEventListener('click', this.leftHandler.bind(this));
    const rightArrow = document.querySelector('.arrow--right');
    rightArrow.addEventListener('click', this.rightArrow.bind(this));
    this.index = 0;
    this.total = this.models.models.length;
  }

  leftHandler() {
    if (!this.models.isTweening) {
      this.index--;
      this.setIndex('back');
    }
  }

  rightArrow() {
    if (!this.models.isTweening) {
      this.index++;
      this.setIndex('forward');
    }
  }

  setIndex(direction) {
    if (this.index < 0) this.index += this.total;
    if (this.index >= this.total) this.index -= this.total;
    this.callback(this.index, direction);
  }

}

/***/ }),

/***/ "./app/js/banner/models3D.js":
/*!***********************************!*\
  !*** ./app/js/banner/models3D.js ***!
  \***********************************/
/*! exports provided: Models3D */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Models3D", function() { return Models3D; });
/* harmony import */ var _build_three_min_custom_jorre__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../build/three.min-custom-jorre */ "./app/js/build/three.min-custom-jorre.js");
/* harmony import */ var _build_three_min_custom_jorre__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_build_three_min_custom_jorre__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _RoundedBoxGeometry_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RoundedBoxGeometry.js */ "./app/js/banner/RoundedBoxGeometry.js");
// import * as THREE from '../build/three.module.js';
// import * as THREE from './js/three.module.js';
// import {
//   Scene,
//   Group,
//   PerspectiveCamera,
//   Color,
//   AmbientLight,
//   DirectionalLight,
//   WebGLRenderer,
//   LoadingManager,
//   TextureLoader,
//   MeshPhongMaterial,
//   Mesh,
//   PlaneGeometry,
//   MeshBasicMaterial,
//   DoubleSide
// } from 'three';
// import {Scene} from '../three/scenes/Scene';
// import {Group} from '../three/objects/Group';
// import { PerspectiveCamera} from '../three/cameras/PerspectiveCamera';
// import { Color} from '../three/math/Color';
// import { AmbientLight} from '../three/lights/AmbientLight';
// import { DirectionalLight} from '../three/lights/DirectionalLight';
// import { WebGLRenderer} from '../three/renderers/WebGLRenderer';
// import { LoadingManager} from '../three/loaders/LoadingManager';
// import { TextureLoader} from '../three/loaders/TextureLoader';
// import { MeshPhongMaterial} from '../three/materials/MeshPhongMaterial';
// import { Mesh} from '../three/objects/Mesh';
// import { PlaneGeometry} from '../three/geometries/PlaneGeometry';
// import { MeshBasicMaterial} from '../three/materials/MeshBasicMaterial';
// import { DoubleSide } from '../three/constants';


class Models3D {
  constructor(container, isHorizontal) {
    this.container = container;
    this.index = 0;
    this.flipped = false;
    this.moveDistance = 1.5;
    this.models = [];
  }

  addModel(dimensions, color, frontTexture, backTexture) {
    const dimensionsArray = dimensions.split(",");
    const realWidth = Number(dimensionsArray[0]);
    const realHeight = Number(dimensionsArray[1]);
    const realDepth = Number(dimensionsArray[2]);
    const model = {
      width: Number(dimensionsArray[0]),
      height: Number(dimensionsArray[1]),
      depth: Number(dimensionsArray[2]),
      color: color,
      frontTexture: frontTexture,
      backTexture: backTexture
    };
    this.models.push(model);
  }

  init(callback, x, y, z, isHorizontal, debug) {
    this.callback = callback;
    this.isHorizontal = isHorizontal;
    this.initScene(x, y, z);
    this.addObjects(x, y, z, debug);
    this.animate();
  }

  initScene(x, y, z) {
    this.group = new _build_three_min_custom_jorre__WEBPACK_IMPORTED_MODULE_0__["Group"]();
    let camera = new _build_three_min_custom_jorre__WEBPACK_IMPORTED_MODULE_0__["PerspectiveCamera"](50, 10, 0.1, 10);
    camera.position.z = z;
    let scene = new _build_three_min_custom_jorre__WEBPACK_IMPORTED_MODULE_0__["Scene"]();
    scene.background = new _build_three_min_custom_jorre__WEBPACK_IMPORTED_MODULE_0__["Color"](0xffffff);
    const ambientLight = new _build_three_min_custom_jorre__WEBPACK_IMPORTED_MODULE_0__["AmbientLight"](0xffffff, .9);
    scene.add(ambientLight);
    const light = new _build_three_min_custom_jorre__WEBPACK_IMPORTED_MODULE_0__["DirectionalLight"](0xAAAAAA, .3);
    light.position.set(-.35 * z + x, -.3 * z + y, z * .9);
    scene.add(light);
    scene.add(camera);
    camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
    camera.updateProjectionMatrix();
    let renderer = new _build_three_min_custom_jorre__WEBPACK_IMPORTED_MODULE_0__["WebGLRenderer"]();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    this.container.appendChild(renderer.domElement);
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
  }

  addObjects(x, y, z, debug) {
    this.objects = [];
    const manager = new _build_three_min_custom_jorre__WEBPACK_IMPORTED_MODULE_0__["LoadingManager"]();
    manager.onLoad = this.objectLoadHandler.bind(this);
    const loader = new _build_three_min_custom_jorre__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"](manager);
    const shininess = 80;
    const specular = 0x333333;

    for (var i = 0; i < this.models.length; i++) {
      var model = this.models[i];
      const materials = [new _build_three_min_custom_jorre__WEBPACK_IMPORTED_MODULE_0__["MeshPhongMaterial"]({
        color: model.color,
        transparent: true,
        shininess: shininess,
        specular: specular
      }), //RIGHT
      new _build_three_min_custom_jorre__WEBPACK_IMPORTED_MODULE_0__["MeshPhongMaterial"]({
        color: model.color,
        transparent: true,
        shininess: shininess,
        specular: specular
      }), //LEFT
      new _build_three_min_custom_jorre__WEBPACK_IMPORTED_MODULE_0__["MeshPhongMaterial"]({
        color: model.color,
        transparent: true,
        shininess: shininess,
        specular: specular
      }), //TOP
      new _build_three_min_custom_jorre__WEBPACK_IMPORTED_MODULE_0__["MeshPhongMaterial"]({
        color: model.color,
        transparent: true,
        shininess: shininess,
        specular: specular
      }), //BOTTOM
      new _build_three_min_custom_jorre__WEBPACK_IMPORTED_MODULE_0__["MeshPhongMaterial"]({
        map: loader.load(model.frontTexture),
        transparent: true,
        shininess: shininess,
        specular: 0x888888
      }), //FRONT
      new _build_three_min_custom_jorre__WEBPACK_IMPORTED_MODULE_0__["MeshPhongMaterial"]({
        map: loader.load(model.backTexture),
        transparent: true,
        shininess: 30,
        specular: 0x111111
      }) //BACK
      ];
      const width = 1 / model.height * model.width;
      const height = 1;
      const depth = 1 / model.height * model.depth;
      const depthFactor = 1.6; //1.2;

      const geometry = new _RoundedBoxGeometry_js__WEBPACK_IMPORTED_MODULE_1__["RoundedBoxGeometry"](width, height, depth * depthFactor, 10, .3);
      let mesh = new _build_three_min_custom_jorre__WEBPACK_IMPORTED_MODULE_0__["Mesh"](geometry, materials);
      mesh.visible = false;
      mesh.scale.set(1, 1, 1 / depthFactor); //setOpacity(mesh, 0);

      this.group.add(mesh);
      this.objects.push(mesh);
    }

    this.scene.add(this.group);
    this.group.position.x = x;
    this.group.position.y = y;

    if (debug) {
      const geo = new _build_three_min_custom_jorre__WEBPACK_IMPORTED_MODULE_0__["PlaneGeometry"](1, 1, 1);
      const mat = new _build_three_min_custom_jorre__WEBPACK_IMPORTED_MODULE_0__["MeshBasicMaterial"]({
        color: 0xffff00,
        side: _build_three_min_custom_jorre__WEBPACK_IMPORTED_MODULE_0__["DoubleSide"]
      });
      const plane = new _build_three_min_custom_jorre__WEBPACK_IMPORTED_MODULE_0__["Mesh"](geo, mat);
      this.group.add(plane);
    }
  }

  objectLoadHandler() {
    this.callback();
  }

  showObject(index, direction) {
    this.isTweening = true;

    if (this.flipped) {
      let object = this.objects[this.index];
      TweenMax.to(object.rotation, .8, {
        onComplete: this.continueObject.bind(this),
        onCompleteParams: [index, direction],
        ease: Power3.easeInOut,
        y: 0
      });
    } else {
      this.continueObject(index, direction);
    }

    this.flipped = false;
  }

  continueObject(index, direction) {
    let speed = 1.25;
    let sign = 1;
    if (direction == 'back') sign = -1; //new object

    let object = this.objects[index];
    object.visible = true;
    object.rotation.y = -Math.PI * 1.5 * sign;

    if (this.isHorizontal) {
      object.position.x = this.moveDistance * sign;
      TweenMax.to(object.position, speed + .1, {
        delay: 0,
        ease: Power3.easeOut,
        x: 0
      });
    } else {
      object.position.y = this.moveDistance * sign;
      TweenMax.to(object.position, speed + .1, {
        delay: 0,
        ease: Power3.easeOut,
        y: 0
      });
    }

    TweenMax.to(object.rotation, speed, {
      onComplete: this.showObjectHandler.bind(this),
      delay: .1,
      ease: Power3.easeOut,
      y: 0
    }); //old object

    object = this.objects[this.index];

    if (this.isHorizontal) {
      TweenMax.to(object.position, speed, {
        ease: Power3.easeOut,
        x: -this.moveDistance * sign
      });
    } else {
      TweenMax.to(object.position, speed, {
        ease: Power3.easeOut,
        y: -this.moveDistance * sign
      });
    }

    TweenMax.to(object.rotation, speed, {
      onComplete: this.hideObjectHandler.bind(this),
      onCompleteParams: [object],
      ease: Power3.easeOut,
      y: Math.PI * .5 * sign
    });
    this.index = index;
  }

  hideObjectHandler(object) {
    object.visible = false;
  }

  showObjectHandler() {
    this.isTweening = false;
  }

  flipObject() {
    if (!this.isTweening) {
      this.isTweening = true;
      let object = this.objects[this.index];
      let angle = 0;

      if (!this.flipped) {
        angle = Math.PI;
      }

      TweenMax.to(object.rotation, .8, {
        onComplete: this.flipObjectHandler.bind(this),
        ease: Power3.easeInOut,
        y: angle
      });
      this.flipped = !this.flipped;
    }
  }

  flipObjectHandler() {
    this.isTweening = false;
  }

  show() {
    var object = this.objects[0];
    object.visible = true;
    object.position.x = 0;
    this.isTweening = true;
    TweenMax.from(document.querySelector('.container3D'), .6, {
      ease: Sine.easeIn,
      alpha: 0
    });
    TweenMax.from(object.position, 3, {
      ease: Sine.easeOut,
      z: 1.6,
      y: -1
    });
    TweenMax.from(object.rotation, 3, {
      onComplete: this.showHandler.bind(this),
      y: Math.PI * 2
    });
  }

  showHandler() {
    this.isTweening = false;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);
  }

}

/***/ }),

/***/ "./app/js/build/three.min-custom-jorre.js":
/*!************************************************!*\
  !*** ./app/js/build/three.min-custom-jorre.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @license
 * Copyright 2010-2021 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
!function (t, e) {
   true ? e(exports) : undefined;
}(this, function (t) {
  "use strict";

  const e = "129dev",
        n = 100,
        i = 301,
        r = 302,
        a = 306,
        s = 307,
        o = 1e3,
        l = 1001,
        c = 1002,
        h = 1003,
        u = 1004,
        d = 1005,
        p = 1006,
        m = 1008,
        f = 1009,
        g = 1012,
        v = 1014,
        _ = 1015,
        x = 1016,
        y = 1020,
        M = 1022,
        b = 1023,
        w = 1026,
        S = 1027,
        T = 33776,
        L = 33777,
        E = 33778,
        A = 33779,
        C = 35840,
        P = 35841,
        D = 35842,
        R = 35843,
        N = 37492,
        I = 37496,
        z = 3e3,
        F = 7680,
        O = 35044,
        U = "300 es",
        B = [];

  for (let t = 0; t < 256; t++) B[t] = (t < 16 ? "0" : "") + t.toString(16);

  const G = Math.PI / 180,
        H = 180 / Math.PI;

  function V() {
    const t = 4294967295 * Math.random() | 0,
          e = 4294967295 * Math.random() | 0,
          n = 4294967295 * Math.random() | 0,
          i = 4294967295 * Math.random() | 0;
    return (B[255 & t] + B[t >> 8 & 255] + B[t >> 16 & 255] + B[t >> 24 & 255] + "-" + B[255 & e] + B[e >> 8 & 255] + "-" + B[e >> 16 & 15 | 64] + B[e >> 24 & 255] + "-" + B[63 & n | 128] + B[n >> 8 & 255] + "-" + B[n >> 16 & 255] + B[n >> 24 & 255] + B[255 & i] + B[i >> 8 & 255] + B[i >> 16 & 255] + B[i >> 24 & 255]).toUpperCase();
  }

  function W(t, e, n) {
    return Math.max(e, Math.min(n, t));
  }

  function k(t, e, n) {
    return (1 - n) * t + n * e;
  }

  function q(t) {
    return 0 == (t & t - 1) && 0 !== t;
  }

  function j(t) {
    return Math.pow(2, Math.floor(Math.log(t) / Math.LN2));
  }

  class X {
    constructor(t = 0, e = 0, n = 0, i = 1) {
      this._x = t, this._y = e, this._z = n, this._w = i;
    }

    static slerp(t, e, n, i) {
      return console.warn("THREE.Quaternion: Static .slerp() has been deprecated. Use qm.slerpQuaternions( qa, qb, t ) instead."), n.slerpQuaternions(t, e, i);
    }

    static slerpFlat(t, e, n, i, r, a, s) {
      let o = n[i + 0],
          l = n[i + 1],
          c = n[i + 2],
          h = n[i + 3];
      const u = r[a + 0],
            d = r[a + 1],
            p = r[a + 2],
            m = r[a + 3];
      if (0 === s) return t[e + 0] = o, t[e + 1] = l, t[e + 2] = c, void (t[e + 3] = h);
      if (1 === s) return t[e + 0] = u, t[e + 1] = d, t[e + 2] = p, void (t[e + 3] = m);

      if (h !== m || o !== u || l !== d || c !== p) {
        let t = 1 - s;
        const e = o * u + l * d + c * p + h * m,
              n = e >= 0 ? 1 : -1,
              i = 1 - e * e;

        if (i > Number.EPSILON) {
          const r = Math.sqrt(i),
                a = Math.atan2(r, e * n);
          t = Math.sin(t * a) / r, s = Math.sin(s * a) / r;
        }

        const r = s * n;

        if (o = o * t + u * r, l = l * t + d * r, c = c * t + p * r, h = h * t + m * r, t === 1 - s) {
          const t = 1 / Math.sqrt(o * o + l * l + c * c + h * h);
          o *= t, l *= t, c *= t, h *= t;
        }
      }

      t[e] = o, t[e + 1] = l, t[e + 2] = c, t[e + 3] = h;
    }

    static multiplyQuaternionsFlat(t, e, n, i, r, a) {
      const s = n[i],
            o = n[i + 1],
            l = n[i + 2],
            c = n[i + 3],
            h = r[a],
            u = r[a + 1],
            d = r[a + 2],
            p = r[a + 3];
      return t[e] = s * p + c * h + o * d - l * u, t[e + 1] = o * p + c * u + l * h - s * d, t[e + 2] = l * p + c * d + s * u - o * h, t[e + 3] = c * p - s * h - o * u - l * d, t;
    }

    get x() {
      return this._x;
    }

    set x(t) {
      this._x = t, this._onChangeCallback();
    }

    get y() {
      return this._y;
    }

    set y(t) {
      this._y = t, this._onChangeCallback();
    }

    get z() {
      return this._z;
    }

    set z(t) {
      this._z = t, this._onChangeCallback();
    }

    get w() {
      return this._w;
    }

    set w(t) {
      this._w = t, this._onChangeCallback();
    }

    set(t, e, n, i) {
      return this._x = t, this._y = e, this._z = n, this._w = i, this._onChangeCallback(), this;
    }

    clone() {
      return new this.constructor(this._x, this._y, this._z, this._w);
    }

    copy(t) {
      return this._x = t.x, this._y = t.y, this._z = t.z, this._w = t.w, this._onChangeCallback(), this;
    }

    setFromEuler(t, e) {
      if (!t || !t.isEuler) throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");
      const n = t._x,
            i = t._y,
            r = t._z,
            a = t._order,
            s = Math.cos,
            o = Math.sin,
            l = s(n / 2),
            c = s(i / 2),
            h = s(r / 2),
            u = o(n / 2),
            d = o(i / 2),
            p = o(r / 2);

      switch (a) {
        case "XYZ":
          this._x = u * c * h + l * d * p, this._y = l * d * h - u * c * p, this._z = l * c * p + u * d * h, this._w = l * c * h - u * d * p;
          break;

        case "YXZ":
          this._x = u * c * h + l * d * p, this._y = l * d * h - u * c * p, this._z = l * c * p - u * d * h, this._w = l * c * h + u * d * p;
          break;

        case "ZXY":
          this._x = u * c * h - l * d * p, this._y = l * d * h + u * c * p, this._z = l * c * p + u * d * h, this._w = l * c * h - u * d * p;
          break;

        case "ZYX":
          this._x = u * c * h - l * d * p, this._y = l * d * h + u * c * p, this._z = l * c * p - u * d * h, this._w = l * c * h + u * d * p;
          break;

        case "YZX":
          this._x = u * c * h + l * d * p, this._y = l * d * h + u * c * p, this._z = l * c * p - u * d * h, this._w = l * c * h - u * d * p;
          break;

        case "XZY":
          this._x = u * c * h - l * d * p, this._y = l * d * h - u * c * p, this._z = l * c * p + u * d * h, this._w = l * c * h + u * d * p;
          break;

        default:
          console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + a);
      }

      return !1 !== e && this._onChangeCallback(), this;
    }

    setFromAxisAngle(t, e) {
      const n = e / 2,
            i = Math.sin(n);
      return this._x = t.x * i, this._y = t.y * i, this._z = t.z * i, this._w = Math.cos(n), this._onChangeCallback(), this;
    }

    setFromRotationMatrix(t) {
      const e = t.elements,
            n = e[0],
            i = e[4],
            r = e[8],
            a = e[1],
            s = e[5],
            o = e[9],
            l = e[2],
            c = e[6],
            h = e[10],
            u = n + s + h;

      if (u > 0) {
        const t = .5 / Math.sqrt(u + 1);
        this._w = .25 / t, this._x = (c - o) * t, this._y = (r - l) * t, this._z = (a - i) * t;
      } else if (n > s && n > h) {
        const t = 2 * Math.sqrt(1 + n - s - h);
        this._w = (c - o) / t, this._x = .25 * t, this._y = (i + a) / t, this._z = (r + l) / t;
      } else if (s > h) {
        const t = 2 * Math.sqrt(1 + s - n - h);
        this._w = (r - l) / t, this._x = (i + a) / t, this._y = .25 * t, this._z = (o + c) / t;
      } else {
        const t = 2 * Math.sqrt(1 + h - n - s);
        this._w = (a - i) / t, this._x = (r + l) / t, this._y = (o + c) / t, this._z = .25 * t;
      }

      return this._onChangeCallback(), this;
    }

    setFromUnitVectors(t, e) {
      let n = t.dot(e) + 1;
      return n < Number.EPSILON ? (n = 0, Math.abs(t.x) > Math.abs(t.z) ? (this._x = -t.y, this._y = t.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -t.z, this._z = t.y, this._w = n)) : (this._x = t.y * e.z - t.z * e.y, this._y = t.z * e.x - t.x * e.z, this._z = t.x * e.y - t.y * e.x, this._w = n), this.normalize();
    }

    angleTo(t) {
      return 2 * Math.acos(Math.abs(W(this.dot(t), -1, 1)));
    }

    rotateTowards(t, e) {
      const n = this.angleTo(t);
      if (0 === n) return this;
      const i = Math.min(1, e / n);
      return this.slerp(t, i), this;
    }

    identity() {
      return this.set(0, 0, 0, 1);
    }

    invert() {
      return this.conjugate();
    }

    conjugate() {
      return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
    }

    dot(t) {
      return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w;
    }

    lengthSq() {
      return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
    }

    length() {
      return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
    }

    normalize() {
      let t = this.length();
      return 0 === t ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (t = 1 / t, this._x = this._x * t, this._y = this._y * t, this._z = this._z * t, this._w = this._w * t), this._onChangeCallback(), this;
    }

    multiply(t, e) {
      return void 0 !== e ? (console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."), this.multiplyQuaternions(t, e)) : this.multiplyQuaternions(this, t);
    }

    premultiply(t) {
      return this.multiplyQuaternions(t, this);
    }

    multiplyQuaternions(t, e) {
      const n = t._x,
            i = t._y,
            r = t._z,
            a = t._w,
            s = e._x,
            o = e._y,
            l = e._z,
            c = e._w;
      return this._x = n * c + a * s + i * l - r * o, this._y = i * c + a * o + r * s - n * l, this._z = r * c + a * l + n * o - i * s, this._w = a * c - n * s - i * o - r * l, this._onChangeCallback(), this;
    }

    slerp(t, e) {
      if (0 === e) return this;
      if (1 === e) return this.copy(t);
      const n = this._x,
            i = this._y,
            r = this._z,
            a = this._w;
      let s = a * t._w + n * t._x + i * t._y + r * t._z;
      if (s < 0 ? (this._w = -t._w, this._x = -t._x, this._y = -t._y, this._z = -t._z, s = -s) : this.copy(t), s >= 1) return this._w = a, this._x = n, this._y = i, this._z = r, this;
      const o = 1 - s * s;

      if (o <= Number.EPSILON) {
        const t = 1 - e;
        return this._w = t * a + e * this._w, this._x = t * n + e * this._x, this._y = t * i + e * this._y, this._z = t * r + e * this._z, this.normalize(), this._onChangeCallback(), this;
      }

      const l = Math.sqrt(o),
            c = Math.atan2(l, s),
            h = Math.sin((1 - e) * c) / l,
            u = Math.sin(e * c) / l;
      return this._w = a * h + this._w * u, this._x = n * h + this._x * u, this._y = i * h + this._y * u, this._z = r * h + this._z * u, this._onChangeCallback(), this;
    }

    slerpQuaternions(t, e, n) {
      this.copy(t).slerp(e, n);
    }

    equals(t) {
      return t._x === this._x && t._y === this._y && t._z === this._z && t._w === this._w;
    }

    fromArray(t, e = 0) {
      return this._x = t[e], this._y = t[e + 1], this._z = t[e + 2], this._w = t[e + 3], this._onChangeCallback(), this;
    }

    toArray(t = [], e = 0) {
      return t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._w, t;
    }

    fromBufferAttribute(t, e) {
      return this._x = t.getX(e), this._y = t.getY(e), this._z = t.getZ(e), this._w = t.getW(e), this;
    }

    _onChange(t) {
      return this._onChangeCallback = t, this;
    }

    _onChangeCallback() {}

  }

  X.prototype.isQuaternion = !0;

  class Y {
    constructor(t = 0, e = 0, n = 0) {
      this.x = t, this.y = e, this.z = n;
    }

    set(t, e, n) {
      return void 0 === n && (n = this.z), this.x = t, this.y = e, this.z = n, this;
    }

    setScalar(t) {
      return this.x = t, this.y = t, this.z = t, this;
    }

    setX(t) {
      return this.x = t, this;
    }

    setY(t) {
      return this.y = t, this;
    }

    setZ(t) {
      return this.z = t, this;
    }

    setComponent(t, e) {
      switch (t) {
        case 0:
          this.x = e;
          break;

        case 1:
          this.y = e;
          break;

        case 2:
          this.z = e;
          break;

        default:
          throw new Error("index is out of range: " + t);
      }

      return this;
    }

    getComponent(t) {
      switch (t) {
        case 0:
          return this.x;

        case 1:
          return this.y;

        case 2:
          return this.z;

        default:
          throw new Error("index is out of range: " + t);
      }
    }

    clone() {
      return new this.constructor(this.x, this.y, this.z);
    }

    copy(t) {
      return this.x = t.x, this.y = t.y, this.z = t.z, this;
    }

    add(t, e) {
      return void 0 !== e ? (console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(t, e)) : (this.x += t.x, this.y += t.y, this.z += t.z, this);
    }

    addScalar(t) {
      return this.x += t, this.y += t, this.z += t, this;
    }

    addVectors(t, e) {
      return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this;
    }

    addScaledVector(t, e) {
      return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this;
    }

    sub(t, e) {
      return void 0 !== e ? (console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(t, e)) : (this.x -= t.x, this.y -= t.y, this.z -= t.z, this);
    }

    subScalar(t) {
      return this.x -= t, this.y -= t, this.z -= t, this;
    }

    subVectors(t, e) {
      return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this;
    }

    multiply(t, e) {
      return void 0 !== e ? (console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."), this.multiplyVectors(t, e)) : (this.x *= t.x, this.y *= t.y, this.z *= t.z, this);
    }

    multiplyScalar(t) {
      return this.x *= t, this.y *= t, this.z *= t, this;
    }

    multiplyVectors(t, e) {
      return this.x = t.x * e.x, this.y = t.y * e.y, this.z = t.z * e.z, this;
    }

    applyEuler(t) {
      return t && t.isEuler || console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."), this.applyQuaternion(J.setFromEuler(t));
    }

    applyAxisAngle(t, e) {
      return this.applyQuaternion(J.setFromAxisAngle(t, e));
    }

    applyMatrix3(t) {
      const e = this.x,
            n = this.y,
            i = this.z,
            r = t.elements;
      return this.x = r[0] * e + r[3] * n + r[6] * i, this.y = r[1] * e + r[4] * n + r[7] * i, this.z = r[2] * e + r[5] * n + r[8] * i, this;
    }

    applyNormalMatrix(t) {
      return this.applyMatrix3(t).normalize();
    }

    applyMatrix4(t) {
      const e = this.x,
            n = this.y,
            i = this.z,
            r = t.elements,
            a = 1 / (r[3] * e + r[7] * n + r[11] * i + r[15]);
      return this.x = (r[0] * e + r[4] * n + r[8] * i + r[12]) * a, this.y = (r[1] * e + r[5] * n + r[9] * i + r[13]) * a, this.z = (r[2] * e + r[6] * n + r[10] * i + r[14]) * a, this;
    }

    applyQuaternion(t) {
      const e = this.x,
            n = this.y,
            i = this.z,
            r = t.x,
            a = t.y,
            s = t.z,
            o = t.w,
            l = o * e + a * i - s * n,
            c = o * n + s * e - r * i,
            h = o * i + r * n - a * e,
            u = -r * e - a * n - s * i;
      return this.x = l * o + u * -r + c * -s - h * -a, this.y = c * o + u * -a + h * -r - l * -s, this.z = h * o + u * -s + l * -a - c * -r, this;
    }

    project(t) {
      return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix);
    }

    unproject(t) {
      return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld);
    }

    transformDirection(t) {
      const e = this.x,
            n = this.y,
            i = this.z,
            r = t.elements;
      return this.x = r[0] * e + r[4] * n + r[8] * i, this.y = r[1] * e + r[5] * n + r[9] * i, this.z = r[2] * e + r[6] * n + r[10] * i, this.normalize();
    }

    divide(t) {
      return this.x /= t.x, this.y /= t.y, this.z /= t.z, this;
    }

    divideScalar(t) {
      return this.multiplyScalar(1 / t);
    }

    min(t) {
      return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this;
    }

    max(t) {
      return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this;
    }

    clamp(t, e) {
      return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this.z = Math.max(t.z, Math.min(e.z, this.z)), this;
    }

    clampScalar(t, e) {
      return this.x = Math.max(t, Math.min(e, this.x)), this.y = Math.max(t, Math.min(e, this.y)), this.z = Math.max(t, Math.min(e, this.z)), this;
    }

    clampLength(t, e) {
      const n = this.length();
      return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)));
    }

    floor() {
      return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
    }

    ceil() {
      return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
    }

    round() {
      return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
    }

    roundToZero() {
      return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this;
    }

    negate() {
      return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
    }

    dot(t) {
      return this.x * t.x + this.y * t.y + this.z * t.z;
    }

    lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    }

    normalize() {
      return this.divideScalar(this.length() || 1);
    }

    setLength(t) {
      return this.normalize().multiplyScalar(t);
    }

    lerp(t, e) {
      return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this;
    }

    lerpVectors(t, e, n) {
      return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this.z = t.z + (e.z - t.z) * n, this;
    }

    cross(t, e) {
      return void 0 !== e ? (console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."), this.crossVectors(t, e)) : this.crossVectors(this, t);
    }

    crossVectors(t, e) {
      const n = t.x,
            i = t.y,
            r = t.z,
            a = e.x,
            s = e.y,
            o = e.z;
      return this.x = i * o - r * s, this.y = r * a - n * o, this.z = n * s - i * a, this;
    }

    projectOnVector(t) {
      const e = t.lengthSq();
      if (0 === e) return this.set(0, 0, 0);
      const n = t.dot(this) / e;
      return this.copy(t).multiplyScalar(n);
    }

    projectOnPlane(t) {
      return Z.copy(this).projectOnVector(t), this.sub(Z);
    }

    reflect(t) {
      return this.sub(Z.copy(t).multiplyScalar(2 * this.dot(t)));
    }

    angleTo(t) {
      const e = Math.sqrt(this.lengthSq() * t.lengthSq());
      if (0 === e) return Math.PI / 2;
      const n = this.dot(t) / e;
      return Math.acos(W(n, -1, 1));
    }

    distanceTo(t) {
      return Math.sqrt(this.distanceToSquared(t));
    }

    distanceToSquared(t) {
      const e = this.x - t.x,
            n = this.y - t.y,
            i = this.z - t.z;
      return e * e + n * n + i * i;
    }

    manhattanDistanceTo(t) {
      return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z);
    }

    setFromSpherical(t) {
      return this.setFromSphericalCoords(t.radius, t.phi, t.theta);
    }

    setFromSphericalCoords(t, e, n) {
      const i = Math.sin(e) * t;
      return this.x = i * Math.sin(n), this.y = Math.cos(e) * t, this.z = i * Math.cos(n), this;
    }

    setFromCylindrical(t) {
      return this.setFromCylindricalCoords(t.radius, t.theta, t.y);
    }

    setFromCylindricalCoords(t, e, n) {
      return this.x = t * Math.sin(e), this.y = n, this.z = t * Math.cos(e), this;
    }

    setFromMatrixPosition(t) {
      const e = t.elements;
      return this.x = e[12], this.y = e[13], this.z = e[14], this;
    }

    setFromMatrixScale(t) {
      const e = this.setFromMatrixColumn(t, 0).length(),
            n = this.setFromMatrixColumn(t, 1).length(),
            i = this.setFromMatrixColumn(t, 2).length();
      return this.x = e, this.y = n, this.z = i, this;
    }

    setFromMatrixColumn(t, e) {
      return this.fromArray(t.elements, 4 * e);
    }

    setFromMatrix3Column(t, e) {
      return this.fromArray(t.elements, 3 * e);
    }

    equals(t) {
      return t.x === this.x && t.y === this.y && t.z === this.z;
    }

    fromArray(t, e = 0) {
      return this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this;
    }

    toArray(t = [], e = 0) {
      return t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t;
    }

    fromBufferAttribute(t, e, n) {
      return void 0 !== n && console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."), this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this;
    }

    random() {
      return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
    }

  }

  Y.prototype.isVector3 = !0;
  const Z = new Y(),
        J = new X();

  class Q {
    constructor(t = new Y(1 / 0, 1 / 0, 1 / 0), e = new Y(-1 / 0, -1 / 0, -1 / 0)) {
      this.min = t, this.max = e;
    }

    set(t, e) {
      return this.min.copy(t), this.max.copy(e), this;
    }

    setFromArray(t) {
      let e = 1 / 0,
          n = 1 / 0,
          i = 1 / 0,
          r = -1 / 0,
          a = -1 / 0,
          s = -1 / 0;

      for (let o = 0, l = t.length; o < l; o += 3) {
        const l = t[o],
              c = t[o + 1],
              h = t[o + 2];
        l < e && (e = l), c < n && (n = c), h < i && (i = h), l > r && (r = l), c > a && (a = c), h > s && (s = h);
      }

      return this.min.set(e, n, i), this.max.set(r, a, s), this;
    }

    setFromBufferAttribute(t) {
      let e = 1 / 0,
          n = 1 / 0,
          i = 1 / 0,
          r = -1 / 0,
          a = -1 / 0,
          s = -1 / 0;

      for (let o = 0, l = t.count; o < l; o++) {
        const l = t.getX(o),
              c = t.getY(o),
              h = t.getZ(o);
        l < e && (e = l), c < n && (n = c), h < i && (i = h), l > r && (r = l), c > a && (a = c), h > s && (s = h);
      }

      return this.min.set(e, n, i), this.max.set(r, a, s), this;
    }

    setFromPoints(t) {
      this.makeEmpty();

      for (let e = 0, n = t.length; e < n; e++) this.expandByPoint(t[e]);

      return this;
    }

    setFromCenterAndSize(t, e) {
      const n = $.copy(e).multiplyScalar(.5);
      return this.min.copy(t).sub(n), this.max.copy(t).add(n), this;
    }

    setFromObject(t) {
      return this.makeEmpty(), this.expandByObject(t);
    }

    clone() {
      return new this.constructor().copy(this);
    }

    copy(t) {
      return this.min.copy(t.min), this.max.copy(t.max), this;
    }

    makeEmpty() {
      return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
    }

    isEmpty() {
      return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
    }

    getCenter(t) {
      return void 0 === t && (console.warn("THREE.Box3: .getCenter() target is now required"), t = new Y()), this.isEmpty() ? t.set(0, 0, 0) : t.addVectors(this.min, this.max).multiplyScalar(.5);
    }

    getSize(t) {
      return void 0 === t && (console.warn("THREE.Box3: .getSize() target is now required"), t = new Y()), this.isEmpty() ? t.set(0, 0, 0) : t.subVectors(this.max, this.min);
    }

    expandByPoint(t) {
      return this.min.min(t), this.max.max(t), this;
    }

    expandByVector(t) {
      return this.min.sub(t), this.max.add(t), this;
    }

    expandByScalar(t) {
      return this.min.addScalar(-t), this.max.addScalar(t), this;
    }

    expandByObject(t) {
      t.updateWorldMatrix(!1, !1);
      const e = t.geometry;
      void 0 !== e && (null === e.boundingBox && e.computeBoundingBox(), tt.copy(e.boundingBox), tt.applyMatrix4(t.matrixWorld), this.union(tt));
      const n = t.children;

      for (let t = 0, e = n.length; t < e; t++) this.expandByObject(n[t]);

      return this;
    }

    containsPoint(t) {
      return !(t.x < this.min.x || t.x > this.max.x || t.y < this.min.y || t.y > this.max.y || t.z < this.min.z || t.z > this.max.z);
    }

    containsBox(t) {
      return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y && this.min.z <= t.min.z && t.max.z <= this.max.z;
    }

    getParameter(t, e) {
      return void 0 === e && (console.warn("THREE.Box3: .getParameter() target is now required"), e = new Y()), e.set((t.x - this.min.x) / (this.max.x - this.min.x), (t.y - this.min.y) / (this.max.y - this.min.y), (t.z - this.min.z) / (this.max.z - this.min.z));
    }

    intersectsBox(t) {
      return !(t.max.x < this.min.x || t.min.x > this.max.x || t.max.y < this.min.y || t.min.y > this.max.y || t.max.z < this.min.z || t.min.z > this.max.z);
    }

    intersectsSphere(t) {
      return this.clampPoint(t.center, $), $.distanceToSquared(t.center) <= t.radius * t.radius;
    }

    intersectsPlane(t) {
      let e, n;
      return t.normal.x > 0 ? (e = t.normal.x * this.min.x, n = t.normal.x * this.max.x) : (e = t.normal.x * this.max.x, n = t.normal.x * this.min.x), t.normal.y > 0 ? (e += t.normal.y * this.min.y, n += t.normal.y * this.max.y) : (e += t.normal.y * this.max.y, n += t.normal.y * this.min.y), t.normal.z > 0 ? (e += t.normal.z * this.min.z, n += t.normal.z * this.max.z) : (e += t.normal.z * this.max.z, n += t.normal.z * this.min.z), e <= -t.constant && n >= -t.constant;
    }

    intersectsTriangle(t) {
      if (this.isEmpty()) return !1;
      this.getCenter(ot), lt.subVectors(this.max, ot), et.subVectors(t.a, ot), nt.subVectors(t.b, ot), it.subVectors(t.c, ot), rt.subVectors(nt, et), at.subVectors(it, nt), st.subVectors(et, it);
      let e = [0, -rt.z, rt.y, 0, -at.z, at.y, 0, -st.z, st.y, rt.z, 0, -rt.x, at.z, 0, -at.x, st.z, 0, -st.x, -rt.y, rt.x, 0, -at.y, at.x, 0, -st.y, st.x, 0];
      return !!ut(e, et, nt, it, lt) && (e = [1, 0, 0, 0, 1, 0, 0, 0, 1], !!ut(e, et, nt, it, lt) && (ct.crossVectors(rt, at), e = [ct.x, ct.y, ct.z], ut(e, et, nt, it, lt)));
    }

    clampPoint(t, e) {
      return void 0 === e && (console.warn("THREE.Box3: .clampPoint() target is now required"), e = new Y()), e.copy(t).clamp(this.min, this.max);
    }

    distanceToPoint(t) {
      return $.copy(t).clamp(this.min, this.max).sub(t).length();
    }

    getBoundingSphere(t) {
      return void 0 === t && console.error("THREE.Box3: .getBoundingSphere() target is now required"), this.getCenter(t.center), t.radius = .5 * this.getSize($).length(), t;
    }

    intersect(t) {
      return this.min.max(t.min), this.max.min(t.max), this.isEmpty() && this.makeEmpty(), this;
    }

    union(t) {
      return this.min.min(t.min), this.max.max(t.max), this;
    }

    applyMatrix4(t) {
      return this.isEmpty() || (K[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t), K[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t), K[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t), K[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t), K[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t), K[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t), K[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t), K[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t), this.setFromPoints(K)), this;
    }

    translate(t) {
      return this.min.add(t), this.max.add(t), this;
    }

    equals(t) {
      return t.min.equals(this.min) && t.max.equals(this.max);
    }

  }

  Q.prototype.isBox3 = !0;
  const K = [new Y(), new Y(), new Y(), new Y(), new Y(), new Y(), new Y(), new Y()],
        $ = new Y(),
        tt = new Q(),
        et = new Y(),
        nt = new Y(),
        it = new Y(),
        rt = new Y(),
        at = new Y(),
        st = new Y(),
        ot = new Y(),
        lt = new Y(),
        ct = new Y(),
        ht = new Y();

  function ut(t, e, n, i, r) {
    for (let a = 0, s = t.length - 3; a <= s; a += 3) {
      ht.fromArray(t, a);
      const s = r.x * Math.abs(ht.x) + r.y * Math.abs(ht.y) + r.z * Math.abs(ht.z),
            o = e.dot(ht),
            l = n.dot(ht),
            c = i.dot(ht);
      if (Math.max(-Math.max(o, l, c), Math.min(o, l, c)) > s) return !1;
    }

    return !0;
  }

  const dt = new Q(),
        pt = new Y(),
        mt = new Y(),
        ft = new Y();

  class gt {
    constructor(t = new Y(), e = -1) {
      this.center = t, this.radius = e;
    }

    set(t, e) {
      return this.center.copy(t), this.radius = e, this;
    }

    setFromPoints(t, e) {
      const n = this.center;
      void 0 !== e ? n.copy(e) : dt.setFromPoints(t).getCenter(n);
      let i = 0;

      for (let e = 0, r = t.length; e < r; e++) i = Math.max(i, n.distanceToSquared(t[e]));

      return this.radius = Math.sqrt(i), this;
    }

    copy(t) {
      return this.center.copy(t.center), this.radius = t.radius, this;
    }

    isEmpty() {
      return this.radius < 0;
    }

    makeEmpty() {
      return this.center.set(0, 0, 0), this.radius = -1, this;
    }

    containsPoint(t) {
      return t.distanceToSquared(this.center) <= this.radius * this.radius;
    }

    distanceToPoint(t) {
      return t.distanceTo(this.center) - this.radius;
    }

    intersectsSphere(t) {
      const e = this.radius + t.radius;
      return t.center.distanceToSquared(this.center) <= e * e;
    }

    intersectsBox(t) {
      return t.intersectsSphere(this);
    }

    intersectsPlane(t) {
      return Math.abs(t.distanceToPoint(this.center)) <= this.radius;
    }

    clampPoint(t, e) {
      const n = this.center.distanceToSquared(t);
      return void 0 === e && (console.warn("THREE.Sphere: .clampPoint() target is now required"), e = new Y()), e.copy(t), n > this.radius * this.radius && (e.sub(this.center).normalize(), e.multiplyScalar(this.radius).add(this.center)), e;
    }

    getBoundingBox(t) {
      return void 0 === t && (console.warn("THREE.Sphere: .getBoundingBox() target is now required"), t = new Q()), this.isEmpty() ? (t.makeEmpty(), t) : (t.set(this.center, this.center), t.expandByScalar(this.radius), t);
    }

    applyMatrix4(t) {
      return this.center.applyMatrix4(t), this.radius = this.radius * t.getMaxScaleOnAxis(), this;
    }

    translate(t) {
      return this.center.add(t), this;
    }

    expandByPoint(t) {
      ft.subVectors(t, this.center);
      const e = ft.lengthSq();

      if (e > this.radius * this.radius) {
        const t = Math.sqrt(e),
              n = .5 * (t - this.radius);
        this.center.add(ft.multiplyScalar(n / t)), this.radius += n;
      }

      return this;
    }

    union(t) {
      return mt.subVectors(t.center, this.center).normalize().multiplyScalar(t.radius), this.expandByPoint(pt.copy(t.center).add(mt)), this.expandByPoint(pt.copy(t.center).sub(mt)), this;
    }

    equals(t) {
      return t.center.equals(this.center) && t.radius === this.radius;
    }

    clone() {
      return new this.constructor().copy(this);
    }

  }

  class vt {
    constructor() {
      this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1], arguments.length > 0 && console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.");
    }

    set(t, e, n, i, r, a, s, o, l) {
      const c = this.elements;
      return c[0] = t, c[1] = i, c[2] = s, c[3] = e, c[4] = r, c[5] = o, c[6] = n, c[7] = a, c[8] = l, this;
    }

    identity() {
      return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
    }

    copy(t) {
      const e = this.elements,
            n = t.elements;
      return e[0] = n[0], e[1] = n[1], e[2] = n[2], e[3] = n[3], e[4] = n[4], e[5] = n[5], e[6] = n[6], e[7] = n[7], e[8] = n[8], this;
    }

    extractBasis(t, e, n) {
      return t.setFromMatrix3Column(this, 0), e.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
    }

    setFromMatrix4(t) {
      const e = t.elements;
      return this.set(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]), this;
    }

    multiply(t) {
      return this.multiplyMatrices(this, t);
    }

    premultiply(t) {
      return this.multiplyMatrices(t, this);
    }

    multiplyMatrices(t, e) {
      const n = t.elements,
            i = e.elements,
            r = this.elements,
            a = n[0],
            s = n[3],
            o = n[6],
            l = n[1],
            c = n[4],
            h = n[7],
            u = n[2],
            d = n[5],
            p = n[8],
            m = i[0],
            f = i[3],
            g = i[6],
            v = i[1],
            _ = i[4],
            x = i[7],
            y = i[2],
            M = i[5],
            b = i[8];
      return r[0] = a * m + s * v + o * y, r[3] = a * f + s * _ + o * M, r[6] = a * g + s * x + o * b, r[1] = l * m + c * v + h * y, r[4] = l * f + c * _ + h * M, r[7] = l * g + c * x + h * b, r[2] = u * m + d * v + p * y, r[5] = u * f + d * _ + p * M, r[8] = u * g + d * x + p * b, this;
    }

    multiplyScalar(t) {
      const e = this.elements;
      return e[0] *= t, e[3] *= t, e[6] *= t, e[1] *= t, e[4] *= t, e[7] *= t, e[2] *= t, e[5] *= t, e[8] *= t, this;
    }

    determinant() {
      const t = this.elements,
            e = t[0],
            n = t[1],
            i = t[2],
            r = t[3],
            a = t[4],
            s = t[5],
            o = t[6],
            l = t[7],
            c = t[8];
      return e * a * c - e * s * l - n * r * c + n * s * o + i * r * l - i * a * o;
    }

    invert() {
      const t = this.elements,
            e = t[0],
            n = t[1],
            i = t[2],
            r = t[3],
            a = t[4],
            s = t[5],
            o = t[6],
            l = t[7],
            c = t[8],
            h = c * a - s * l,
            u = s * o - c * r,
            d = l * r - a * o,
            p = e * h + n * u + i * d;
      if (0 === p) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
      const m = 1 / p;
      return t[0] = h * m, t[1] = (i * l - c * n) * m, t[2] = (s * n - i * a) * m, t[3] = u * m, t[4] = (c * e - i * o) * m, t[5] = (i * r - s * e) * m, t[6] = d * m, t[7] = (n * o - l * e) * m, t[8] = (a * e - n * r) * m, this;
    }

    transpose() {
      let t;
      const e = this.elements;
      return t = e[1], e[1] = e[3], e[3] = t, t = e[2], e[2] = e[6], e[6] = t, t = e[5], e[5] = e[7], e[7] = t, this;
    }

    getNormalMatrix(t) {
      return this.setFromMatrix4(t).invert().transpose();
    }

    transposeIntoArray(t) {
      const e = this.elements;
      return t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = e[1], t[4] = e[4], t[5] = e[7], t[6] = e[2], t[7] = e[5], t[8] = e[8], this;
    }

    setUvTransform(t, e, n, i, r, a, s) {
      const o = Math.cos(r),
            l = Math.sin(r);
      return this.set(n * o, n * l, -n * (o * a + l * s) + a + t, -i * l, i * o, -i * (-l * a + o * s) + s + e, 0, 0, 1), this;
    }

    scale(t, e) {
      const n = this.elements;
      return n[0] *= t, n[3] *= t, n[6] *= t, n[1] *= e, n[4] *= e, n[7] *= e, this;
    }

    rotate(t) {
      const e = Math.cos(t),
            n = Math.sin(t),
            i = this.elements,
            r = i[0],
            a = i[3],
            s = i[6],
            o = i[1],
            l = i[4],
            c = i[7];
      return i[0] = e * r + n * o, i[3] = e * a + n * l, i[6] = e * s + n * c, i[1] = -n * r + e * o, i[4] = -n * a + e * l, i[7] = -n * s + e * c, this;
    }

    translate(t, e) {
      const n = this.elements;
      return n[0] += t * n[2], n[3] += t * n[5], n[6] += t * n[8], n[1] += e * n[2], n[4] += e * n[5], n[7] += e * n[8], this;
    }

    equals(t) {
      const e = this.elements,
            n = t.elements;

      for (let t = 0; t < 9; t++) if (e[t] !== n[t]) return !1;

      return !0;
    }

    fromArray(t, e = 0) {
      for (let n = 0; n < 9; n++) this.elements[n] = t[n + e];

      return this;
    }

    toArray(t = [], e = 0) {
      const n = this.elements;
      return t[e] = n[0], t[e + 1] = n[1], t[e + 2] = n[2], t[e + 3] = n[3], t[e + 4] = n[4], t[e + 5] = n[5], t[e + 6] = n[6], t[e + 7] = n[7], t[e + 8] = n[8], t;
    }

    clone() {
      return new this.constructor().fromArray(this.elements);
    }

  }

  vt.prototype.isMatrix3 = !0;

  const _t = new Y(),
        xt = new Y(),
        yt = new vt();

  class Mt {
    constructor(t = new Y(1, 0, 0), e = 0) {
      this.normal = t, this.constant = e;
    }

    set(t, e) {
      return this.normal.copy(t), this.constant = e, this;
    }

    setComponents(t, e, n, i) {
      return this.normal.set(t, e, n), this.constant = i, this;
    }

    setFromNormalAndCoplanarPoint(t, e) {
      return this.normal.copy(t), this.constant = -e.dot(this.normal), this;
    }

    setFromCoplanarPoints(t, e, n) {
      const i = _t.subVectors(n, e).cross(xt.subVectors(t, e)).normalize();

      return this.setFromNormalAndCoplanarPoint(i, t), this;
    }

    copy(t) {
      return this.normal.copy(t.normal), this.constant = t.constant, this;
    }

    normalize() {
      const t = 1 / this.normal.length();
      return this.normal.multiplyScalar(t), this.constant *= t, this;
    }

    negate() {
      return this.constant *= -1, this.normal.negate(), this;
    }

    distanceToPoint(t) {
      return this.normal.dot(t) + this.constant;
    }

    distanceToSphere(t) {
      return this.distanceToPoint(t.center) - t.radius;
    }

    projectPoint(t, e) {
      return void 0 === e && (console.warn("THREE.Plane: .projectPoint() target is now required"), e = new Y()), e.copy(this.normal).multiplyScalar(-this.distanceToPoint(t)).add(t);
    }

    intersectLine(t, e) {
      void 0 === e && (console.warn("THREE.Plane: .intersectLine() target is now required"), e = new Y());
      const n = t.delta(_t),
            i = this.normal.dot(n);
      if (0 === i) return 0 === this.distanceToPoint(t.start) ? e.copy(t.start) : null;
      const r = -(t.start.dot(this.normal) + this.constant) / i;
      return r < 0 || r > 1 ? null : e.copy(n).multiplyScalar(r).add(t.start);
    }

    intersectsLine(t) {
      const e = this.distanceToPoint(t.start),
            n = this.distanceToPoint(t.end);
      return e < 0 && n > 0 || n < 0 && e > 0;
    }

    intersectsBox(t) {
      return t.intersectsPlane(this);
    }

    intersectsSphere(t) {
      return t.intersectsPlane(this);
    }

    coplanarPoint(t) {
      return void 0 === t && (console.warn("THREE.Plane: .coplanarPoint() target is now required"), t = new Y()), t.copy(this.normal).multiplyScalar(-this.constant);
    }

    applyMatrix4(t, e) {
      const n = e || yt.getNormalMatrix(t),
            i = this.coplanarPoint(_t).applyMatrix4(t),
            r = this.normal.applyMatrix3(n).normalize();
      return this.constant = -i.dot(r), this;
    }

    translate(t) {
      return this.constant -= t.dot(this.normal), this;
    }

    equals(t) {
      return t.normal.equals(this.normal) && t.constant === this.constant;
    }

    clone() {
      return new this.constructor().copy(this);
    }

  }

  Mt.prototype.isPlane = !0;
  const bt = new gt(),
        wt = new Y();

  class St {
    constructor(t = new Mt(), e = new Mt(), n = new Mt(), i = new Mt(), r = new Mt(), a = new Mt()) {
      this.planes = [t, e, n, i, r, a];
    }

    set(t, e, n, i, r, a) {
      const s = this.planes;
      return s[0].copy(t), s[1].copy(e), s[2].copy(n), s[3].copy(i), s[4].copy(r), s[5].copy(a), this;
    }

    copy(t) {
      const e = this.planes;

      for (let n = 0; n < 6; n++) e[n].copy(t.planes[n]);

      return this;
    }

    setFromProjectionMatrix(t) {
      const e = this.planes,
            n = t.elements,
            i = n[0],
            r = n[1],
            a = n[2],
            s = n[3],
            o = n[4],
            l = n[5],
            c = n[6],
            h = n[7],
            u = n[8],
            d = n[9],
            p = n[10],
            m = n[11],
            f = n[12],
            g = n[13],
            v = n[14],
            _ = n[15];
      return e[0].setComponents(s - i, h - o, m - u, _ - f).normalize(), e[1].setComponents(s + i, h + o, m + u, _ + f).normalize(), e[2].setComponents(s + r, h + l, m + d, _ + g).normalize(), e[3].setComponents(s - r, h - l, m - d, _ - g).normalize(), e[4].setComponents(s - a, h - c, m - p, _ - v).normalize(), e[5].setComponents(s + a, h + c, m + p, _ + v).normalize(), this;
    }

    intersectsObject(t) {
      const e = t.geometry;
      return null === e.boundingSphere && e.computeBoundingSphere(), bt.copy(e.boundingSphere).applyMatrix4(t.matrixWorld), this.intersectsSphere(bt);
    }

    intersectsSprite(t) {
      return bt.center.set(0, 0, 0), bt.radius = .7071067811865476, bt.applyMatrix4(t.matrixWorld), this.intersectsSphere(bt);
    }

    intersectsSphere(t) {
      const e = this.planes,
            n = t.center,
            i = -t.radius;

      for (let t = 0; t < 6; t++) {
        if (e[t].distanceToPoint(n) < i) return !1;
      }

      return !0;
    }

    intersectsBox(t) {
      const e = this.planes;

      for (let n = 0; n < 6; n++) {
        const i = e[n];
        if (wt.x = i.normal.x > 0 ? t.max.x : t.min.x, wt.y = i.normal.y > 0 ? t.max.y : t.min.y, wt.z = i.normal.z > 0 ? t.max.z : t.min.z, i.distanceToPoint(wt) < 0) return !1;
      }

      return !0;
    }

    containsPoint(t) {
      const e = this.planes;

      for (let n = 0; n < 6; n++) if (e[n].distanceToPoint(t) < 0) return !1;

      return !0;
    }

    clone() {
      return new this.constructor().copy(this);
    }

  }

  class Tt {
    constructor() {
      this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], arguments.length > 0 && console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.");
    }

    set(t, e, n, i, r, a, s, o, l, c, h, u, d, p, m, f) {
      const g = this.elements;
      return g[0] = t, g[4] = e, g[8] = n, g[12] = i, g[1] = r, g[5] = a, g[9] = s, g[13] = o, g[2] = l, g[6] = c, g[10] = h, g[14] = u, g[3] = d, g[7] = p, g[11] = m, g[15] = f, this;
    }

    identity() {
      return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
    }

    clone() {
      return new Tt().fromArray(this.elements);
    }

    copy(t) {
      const e = this.elements,
            n = t.elements;
      return e[0] = n[0], e[1] = n[1], e[2] = n[2], e[3] = n[3], e[4] = n[4], e[5] = n[5], e[6] = n[6], e[7] = n[7], e[8] = n[8], e[9] = n[9], e[10] = n[10], e[11] = n[11], e[12] = n[12], e[13] = n[13], e[14] = n[14], e[15] = n[15], this;
    }

    copyPosition(t) {
      const e = this.elements,
            n = t.elements;
      return e[12] = n[12], e[13] = n[13], e[14] = n[14], this;
    }

    setFromMatrix3(t) {
      const e = t.elements;
      return this.set(e[0], e[3], e[6], 0, e[1], e[4], e[7], 0, e[2], e[5], e[8], 0, 0, 0, 0, 1), this;
    }

    extractBasis(t, e, n) {
      return t.setFromMatrixColumn(this, 0), e.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this;
    }

    makeBasis(t, e, n) {
      return this.set(t.x, e.x, n.x, 0, t.y, e.y, n.y, 0, t.z, e.z, n.z, 0, 0, 0, 0, 1), this;
    }

    extractRotation(t) {
      const e = this.elements,
            n = t.elements,
            i = 1 / Lt.setFromMatrixColumn(t, 0).length(),
            r = 1 / Lt.setFromMatrixColumn(t, 1).length(),
            a = 1 / Lt.setFromMatrixColumn(t, 2).length();
      return e[0] = n[0] * i, e[1] = n[1] * i, e[2] = n[2] * i, e[3] = 0, e[4] = n[4] * r, e[5] = n[5] * r, e[6] = n[6] * r, e[7] = 0, e[8] = n[8] * a, e[9] = n[9] * a, e[10] = n[10] * a, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this;
    }

    makeRotationFromEuler(t) {
      t && t.isEuler || console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
      const e = this.elements,
            n = t.x,
            i = t.y,
            r = t.z,
            a = Math.cos(n),
            s = Math.sin(n),
            o = Math.cos(i),
            l = Math.sin(i),
            c = Math.cos(r),
            h = Math.sin(r);

      if ("XYZ" === t.order) {
        const t = a * c,
              n = a * h,
              i = s * c,
              r = s * h;
        e[0] = o * c, e[4] = -o * h, e[8] = l, e[1] = n + i * l, e[5] = t - r * l, e[9] = -s * o, e[2] = r - t * l, e[6] = i + n * l, e[10] = a * o;
      } else if ("YXZ" === t.order) {
        const t = o * c,
              n = o * h,
              i = l * c,
              r = l * h;
        e[0] = t + r * s, e[4] = i * s - n, e[8] = a * l, e[1] = a * h, e[5] = a * c, e[9] = -s, e[2] = n * s - i, e[6] = r + t * s, e[10] = a * o;
      } else if ("ZXY" === t.order) {
        const t = o * c,
              n = o * h,
              i = l * c,
              r = l * h;
        e[0] = t - r * s, e[4] = -a * h, e[8] = i + n * s, e[1] = n + i * s, e[5] = a * c, e[9] = r - t * s, e[2] = -a * l, e[6] = s, e[10] = a * o;
      } else if ("ZYX" === t.order) {
        const t = a * c,
              n = a * h,
              i = s * c,
              r = s * h;
        e[0] = o * c, e[4] = i * l - n, e[8] = t * l + r, e[1] = o * h, e[5] = r * l + t, e[9] = n * l - i, e[2] = -l, e[6] = s * o, e[10] = a * o;
      } else if ("YZX" === t.order) {
        const t = a * o,
              n = a * l,
              i = s * o,
              r = s * l;
        e[0] = o * c, e[4] = r - t * h, e[8] = i * h + n, e[1] = h, e[5] = a * c, e[9] = -s * c, e[2] = -l * c, e[6] = n * h + i, e[10] = t - r * h;
      } else if ("XZY" === t.order) {
        const t = a * o,
              n = a * l,
              i = s * o,
              r = s * l;
        e[0] = o * c, e[4] = -h, e[8] = l * c, e[1] = t * h + r, e[5] = a * c, e[9] = n * h - i, e[2] = i * h - n, e[6] = s * c, e[10] = r * h + t;
      }

      return e[3] = 0, e[7] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this;
    }

    makeRotationFromQuaternion(t) {
      return this.compose(At, t, Ct);
    }

    lookAt(t, e, n) {
      const i = this.elements;
      return Rt.subVectors(t, e), 0 === Rt.lengthSq() && (Rt.z = 1), Rt.normalize(), Pt.crossVectors(n, Rt), 0 === Pt.lengthSq() && (1 === Math.abs(n.z) ? Rt.x += 1e-4 : Rt.z += 1e-4, Rt.normalize(), Pt.crossVectors(n, Rt)), Pt.normalize(), Dt.crossVectors(Rt, Pt), i[0] = Pt.x, i[4] = Dt.x, i[8] = Rt.x, i[1] = Pt.y, i[5] = Dt.y, i[9] = Rt.y, i[2] = Pt.z, i[6] = Dt.z, i[10] = Rt.z, this;
    }

    multiply(t, e) {
      return void 0 !== e ? (console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), this.multiplyMatrices(t, e)) : this.multiplyMatrices(this, t);
    }

    premultiply(t) {
      return this.multiplyMatrices(t, this);
    }

    multiplyMatrices(t, e) {
      const n = t.elements,
            i = e.elements,
            r = this.elements,
            a = n[0],
            s = n[4],
            o = n[8],
            l = n[12],
            c = n[1],
            h = n[5],
            u = n[9],
            d = n[13],
            p = n[2],
            m = n[6],
            f = n[10],
            g = n[14],
            v = n[3],
            _ = n[7],
            x = n[11],
            y = n[15],
            M = i[0],
            b = i[4],
            w = i[8],
            S = i[12],
            T = i[1],
            L = i[5],
            E = i[9],
            A = i[13],
            C = i[2],
            P = i[6],
            D = i[10],
            R = i[14],
            N = i[3],
            I = i[7],
            z = i[11],
            F = i[15];
      return r[0] = a * M + s * T + o * C + l * N, r[4] = a * b + s * L + o * P + l * I, r[8] = a * w + s * E + o * D + l * z, r[12] = a * S + s * A + o * R + l * F, r[1] = c * M + h * T + u * C + d * N, r[5] = c * b + h * L + u * P + d * I, r[9] = c * w + h * E + u * D + d * z, r[13] = c * S + h * A + u * R + d * F, r[2] = p * M + m * T + f * C + g * N, r[6] = p * b + m * L + f * P + g * I, r[10] = p * w + m * E + f * D + g * z, r[14] = p * S + m * A + f * R + g * F, r[3] = v * M + _ * T + x * C + y * N, r[7] = v * b + _ * L + x * P + y * I, r[11] = v * w + _ * E + x * D + y * z, r[15] = v * S + _ * A + x * R + y * F, this;
    }

    multiplyScalar(t) {
      const e = this.elements;
      return e[0] *= t, e[4] *= t, e[8] *= t, e[12] *= t, e[1] *= t, e[5] *= t, e[9] *= t, e[13] *= t, e[2] *= t, e[6] *= t, e[10] *= t, e[14] *= t, e[3] *= t, e[7] *= t, e[11] *= t, e[15] *= t, this;
    }

    determinant() {
      const t = this.elements,
            e = t[0],
            n = t[4],
            i = t[8],
            r = t[12],
            a = t[1],
            s = t[5],
            o = t[9],
            l = t[13],
            c = t[2],
            h = t[6],
            u = t[10],
            d = t[14];
      return t[3] * (+r * o * h - i * l * h - r * s * u + n * l * u + i * s * d - n * o * d) + t[7] * (+e * o * d - e * l * u + r * a * u - i * a * d + i * l * c - r * o * c) + t[11] * (+e * l * h - e * s * d - r * a * h + n * a * d + r * s * c - n * l * c) + t[15] * (-i * s * c - e * o * h + e * s * u + i * a * h - n * a * u + n * o * c);
    }

    transpose() {
      const t = this.elements;
      let e;
      return e = t[1], t[1] = t[4], t[4] = e, e = t[2], t[2] = t[8], t[8] = e, e = t[6], t[6] = t[9], t[9] = e, e = t[3], t[3] = t[12], t[12] = e, e = t[7], t[7] = t[13], t[13] = e, e = t[11], t[11] = t[14], t[14] = e, this;
    }

    setPosition(t, e, n) {
      const i = this.elements;
      return t.isVector3 ? (i[12] = t.x, i[13] = t.y, i[14] = t.z) : (i[12] = t, i[13] = e, i[14] = n), this;
    }

    invert() {
      const t = this.elements,
            e = t[0],
            n = t[1],
            i = t[2],
            r = t[3],
            a = t[4],
            s = t[5],
            o = t[6],
            l = t[7],
            c = t[8],
            h = t[9],
            u = t[10],
            d = t[11],
            p = t[12],
            m = t[13],
            f = t[14],
            g = t[15],
            v = h * f * l - m * u * l + m * o * d - s * f * d - h * o * g + s * u * g,
            _ = p * u * l - c * f * l - p * o * d + a * f * d + c * o * g - a * u * g,
            x = c * m * l - p * h * l + p * s * d - a * m * d - c * s * g + a * h * g,
            y = p * h * o - c * m * o - p * s * u + a * m * u + c * s * f - a * h * f,
            M = e * v + n * _ + i * x + r * y;

      if (0 === M) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      const b = 1 / M;
      return t[0] = v * b, t[1] = (m * u * r - h * f * r - m * i * d + n * f * d + h * i * g - n * u * g) * b, t[2] = (s * f * r - m * o * r + m * i * l - n * f * l - s * i * g + n * o * g) * b, t[3] = (h * o * r - s * u * r - h * i * l + n * u * l + s * i * d - n * o * d) * b, t[4] = _ * b, t[5] = (c * f * r - p * u * r + p * i * d - e * f * d - c * i * g + e * u * g) * b, t[6] = (p * o * r - a * f * r - p * i * l + e * f * l + a * i * g - e * o * g) * b, t[7] = (a * u * r - c * o * r + c * i * l - e * u * l - a * i * d + e * o * d) * b, t[8] = x * b, t[9] = (p * h * r - c * m * r - p * n * d + e * m * d + c * n * g - e * h * g) * b, t[10] = (a * m * r - p * s * r + p * n * l - e * m * l - a * n * g + e * s * g) * b, t[11] = (c * s * r - a * h * r - c * n * l + e * h * l + a * n * d - e * s * d) * b, t[12] = y * b, t[13] = (c * m * i - p * h * i + p * n * u - e * m * u - c * n * f + e * h * f) * b, t[14] = (p * s * i - a * m * i - p * n * o + e * m * o + a * n * f - e * s * f) * b, t[15] = (a * h * i - c * s * i + c * n * o - e * h * o - a * n * u + e * s * u) * b, this;
    }

    scale(t) {
      const e = this.elements,
            n = t.x,
            i = t.y,
            r = t.z;
      return e[0] *= n, e[4] *= i, e[8] *= r, e[1] *= n, e[5] *= i, e[9] *= r, e[2] *= n, e[6] *= i, e[10] *= r, e[3] *= n, e[7] *= i, e[11] *= r, this;
    }

    getMaxScaleOnAxis() {
      const t = this.elements,
            e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2],
            n = t[4] * t[4] + t[5] * t[5] + t[6] * t[6],
            i = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
      return Math.sqrt(Math.max(e, n, i));
    }

    makeTranslation(t, e, n) {
      return this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, n, 0, 0, 0, 1), this;
    }

    makeRotationX(t) {
      const e = Math.cos(t),
            n = Math.sin(t);
      return this.set(1, 0, 0, 0, 0, e, -n, 0, 0, n, e, 0, 0, 0, 0, 1), this;
    }

    makeRotationY(t) {
      const e = Math.cos(t),
            n = Math.sin(t);
      return this.set(e, 0, n, 0, 0, 1, 0, 0, -n, 0, e, 0, 0, 0, 0, 1), this;
    }

    makeRotationZ(t) {
      const e = Math.cos(t),
            n = Math.sin(t);
      return this.set(e, -n, 0, 0, n, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
    }

    makeRotationAxis(t, e) {
      const n = Math.cos(e),
            i = Math.sin(e),
            r = 1 - n,
            a = t.x,
            s = t.y,
            o = t.z,
            l = r * a,
            c = r * s;
      return this.set(l * a + n, l * s - i * o, l * o + i * s, 0, l * s + i * o, c * s + n, c * o - i * a, 0, l * o - i * s, c * o + i * a, r * o * o + n, 0, 0, 0, 0, 1), this;
    }

    makeScale(t, e, n) {
      return this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this;
    }

    makeShear(t, e, n, i, r, a) {
      return this.set(1, n, r, 0, t, 1, a, 0, e, i, 1, 0, 0, 0, 0, 1), this;
    }

    compose(t, e, n) {
      const i = this.elements,
            r = e._x,
            a = e._y,
            s = e._z,
            o = e._w,
            l = r + r,
            c = a + a,
            h = s + s,
            u = r * l,
            d = r * c,
            p = r * h,
            m = a * c,
            f = a * h,
            g = s * h,
            v = o * l,
            _ = o * c,
            x = o * h,
            y = n.x,
            M = n.y,
            b = n.z;

      return i[0] = (1 - (m + g)) * y, i[1] = (d + x) * y, i[2] = (p - _) * y, i[3] = 0, i[4] = (d - x) * M, i[5] = (1 - (u + g)) * M, i[6] = (f + v) * M, i[7] = 0, i[8] = (p + _) * b, i[9] = (f - v) * b, i[10] = (1 - (u + m)) * b, i[11] = 0, i[12] = t.x, i[13] = t.y, i[14] = t.z, i[15] = 1, this;
    }

    decompose(t, e, n) {
      const i = this.elements;
      let r = Lt.set(i[0], i[1], i[2]).length();
      const a = Lt.set(i[4], i[5], i[6]).length(),
            s = Lt.set(i[8], i[9], i[10]).length();
      this.determinant() < 0 && (r = -r), t.x = i[12], t.y = i[13], t.z = i[14], Et.copy(this);
      const o = 1 / r,
            l = 1 / a,
            c = 1 / s;
      return Et.elements[0] *= o, Et.elements[1] *= o, Et.elements[2] *= o, Et.elements[4] *= l, Et.elements[5] *= l, Et.elements[6] *= l, Et.elements[8] *= c, Et.elements[9] *= c, Et.elements[10] *= c, e.setFromRotationMatrix(Et), n.x = r, n.y = a, n.z = s, this;
    }

    makePerspective(t, e, n, i, r, a) {
      void 0 === a && console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");
      const s = this.elements,
            o = 2 * r / (e - t),
            l = 2 * r / (n - i),
            c = (e + t) / (e - t),
            h = (n + i) / (n - i),
            u = -(a + r) / (a - r),
            d = -2 * a * r / (a - r);
      return s[0] = o, s[4] = 0, s[8] = c, s[12] = 0, s[1] = 0, s[5] = l, s[9] = h, s[13] = 0, s[2] = 0, s[6] = 0, s[10] = u, s[14] = d, s[3] = 0, s[7] = 0, s[11] = -1, s[15] = 0, this;
    }

    makeOrthographic(t, e, n, i, r, a) {
      const s = this.elements,
            o = 1 / (e - t),
            l = 1 / (n - i),
            c = 1 / (a - r),
            h = (e + t) * o,
            u = (n + i) * l,
            d = (a + r) * c;
      return s[0] = 2 * o, s[4] = 0, s[8] = 0, s[12] = -h, s[1] = 0, s[5] = 2 * l, s[9] = 0, s[13] = -u, s[2] = 0, s[6] = 0, s[10] = -2 * c, s[14] = -d, s[3] = 0, s[7] = 0, s[11] = 0, s[15] = 1, this;
    }

    equals(t) {
      const e = this.elements,
            n = t.elements;

      for (let t = 0; t < 16; t++) if (e[t] !== n[t]) return !1;

      return !0;
    }

    fromArray(t, e = 0) {
      for (let n = 0; n < 16; n++) this.elements[n] = t[n + e];

      return this;
    }

    toArray(t = [], e = 0) {
      const n = this.elements;
      return t[e] = n[0], t[e + 1] = n[1], t[e + 2] = n[2], t[e + 3] = n[3], t[e + 4] = n[4], t[e + 5] = n[5], t[e + 6] = n[6], t[e + 7] = n[7], t[e + 8] = n[8], t[e + 9] = n[9], t[e + 10] = n[10], t[e + 11] = n[11], t[e + 12] = n[12], t[e + 13] = n[13], t[e + 14] = n[14], t[e + 15] = n[15], t;
    }

  }

  Tt.prototype.isMatrix4 = !0;
  const Lt = new Y(),
        Et = new Tt(),
        At = new Y(0, 0, 0),
        Ct = new Y(1, 1, 1),
        Pt = new Y(),
        Dt = new Y(),
        Rt = new Y();

  class Nt {
    constructor(t = 0, e = 0) {
      this.x = t, this.y = e;
    }

    get width() {
      return this.x;
    }

    set width(t) {
      this.x = t;
    }

    get height() {
      return this.y;
    }

    set height(t) {
      this.y = t;
    }

    set(t, e) {
      return this.x = t, this.y = e, this;
    }

    setScalar(t) {
      return this.x = t, this.y = t, this;
    }

    setX(t) {
      return this.x = t, this;
    }

    setY(t) {
      return this.y = t, this;
    }

    setComponent(t, e) {
      switch (t) {
        case 0:
          this.x = e;
          break;

        case 1:
          this.y = e;
          break;

        default:
          throw new Error("index is out of range: " + t);
      }

      return this;
    }

    getComponent(t) {
      switch (t) {
        case 0:
          return this.x;

        case 1:
          return this.y;

        default:
          throw new Error("index is out of range: " + t);
      }
    }

    clone() {
      return new this.constructor(this.x, this.y);
    }

    copy(t) {
      return this.x = t.x, this.y = t.y, this;
    }

    add(t, e) {
      return void 0 !== e ? (console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(t, e)) : (this.x += t.x, this.y += t.y, this);
    }

    addScalar(t) {
      return this.x += t, this.y += t, this;
    }

    addVectors(t, e) {
      return this.x = t.x + e.x, this.y = t.y + e.y, this;
    }

    addScaledVector(t, e) {
      return this.x += t.x * e, this.y += t.y * e, this;
    }

    sub(t, e) {
      return void 0 !== e ? (console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(t, e)) : (this.x -= t.x, this.y -= t.y, this);
    }

    subScalar(t) {
      return this.x -= t, this.y -= t, this;
    }

    subVectors(t, e) {
      return this.x = t.x - e.x, this.y = t.y - e.y, this;
    }

    multiply(t) {
      return this.x *= t.x, this.y *= t.y, this;
    }

    multiplyScalar(t) {
      return this.x *= t, this.y *= t, this;
    }

    divide(t) {
      return this.x /= t.x, this.y /= t.y, this;
    }

    divideScalar(t) {
      return this.multiplyScalar(1 / t);
    }

    applyMatrix3(t) {
      const e = this.x,
            n = this.y,
            i = t.elements;
      return this.x = i[0] * e + i[3] * n + i[6], this.y = i[1] * e + i[4] * n + i[7], this;
    }

    min(t) {
      return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this;
    }

    max(t) {
      return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this;
    }

    clamp(t, e) {
      return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this;
    }

    clampScalar(t, e) {
      return this.x = Math.max(t, Math.min(e, this.x)), this.y = Math.max(t, Math.min(e, this.y)), this;
    }

    clampLength(t, e) {
      const n = this.length();
      return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)));
    }

    floor() {
      return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
    }

    ceil() {
      return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
    }

    round() {
      return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
    }

    roundToZero() {
      return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this;
    }

    negate() {
      return this.x = -this.x, this.y = -this.y, this;
    }

    dot(t) {
      return this.x * t.x + this.y * t.y;
    }

    cross(t) {
      return this.x * t.y - this.y * t.x;
    }

    lengthSq() {
      return this.x * this.x + this.y * this.y;
    }

    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y);
    }

    normalize() {
      return this.divideScalar(this.length() || 1);
    }

    angle() {
      return Math.atan2(-this.y, -this.x) + Math.PI;
    }

    distanceTo(t) {
      return Math.sqrt(this.distanceToSquared(t));
    }

    distanceToSquared(t) {
      const e = this.x - t.x,
            n = this.y - t.y;
      return e * e + n * n;
    }

    manhattanDistanceTo(t) {
      return Math.abs(this.x - t.x) + Math.abs(this.y - t.y);
    }

    setLength(t) {
      return this.normalize().multiplyScalar(t);
    }

    lerp(t, e) {
      return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this;
    }

    lerpVectors(t, e, n) {
      return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this;
    }

    equals(t) {
      return t.x === this.x && t.y === this.y;
    }

    fromArray(t, e = 0) {
      return this.x = t[e], this.y = t[e + 1], this;
    }

    toArray(t = [], e = 0) {
      return t[e] = this.x, t[e + 1] = this.y, t;
    }

    fromBufferAttribute(t, e, n) {
      return void 0 !== n && console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."), this.x = t.getX(e), this.y = t.getY(e), this;
    }

    rotateAround(t, e) {
      const n = Math.cos(e),
            i = Math.sin(e),
            r = this.x - t.x,
            a = this.y - t.y;
      return this.x = r * n - a * i + t.x, this.y = r * i + a * n + t.y, this;
    }

    random() {
      return this.x = Math.random(), this.y = Math.random(), this;
    }

  }

  Nt.prototype.isVector2 = !0;

  class It {
    constructor(t = 0, e = 0, n = 0, i = 1) {
      this.x = t, this.y = e, this.z = n, this.w = i;
    }

    get width() {
      return this.z;
    }

    set width(t) {
      this.z = t;
    }

    get height() {
      return this.w;
    }

    set height(t) {
      this.w = t;
    }

    set(t, e, n, i) {
      return this.x = t, this.y = e, this.z = n, this.w = i, this;
    }

    setScalar(t) {
      return this.x = t, this.y = t, this.z = t, this.w = t, this;
    }

    setX(t) {
      return this.x = t, this;
    }

    setY(t) {
      return this.y = t, this;
    }

    setZ(t) {
      return this.z = t, this;
    }

    setW(t) {
      return this.w = t, this;
    }

    setComponent(t, e) {
      switch (t) {
        case 0:
          this.x = e;
          break;

        case 1:
          this.y = e;
          break;

        case 2:
          this.z = e;
          break;

        case 3:
          this.w = e;
          break;

        default:
          throw new Error("index is out of range: " + t);
      }

      return this;
    }

    getComponent(t) {
      switch (t) {
        case 0:
          return this.x;

        case 1:
          return this.y;

        case 2:
          return this.z;

        case 3:
          return this.w;

        default:
          throw new Error("index is out of range: " + t);
      }
    }

    clone() {
      return new this.constructor(this.x, this.y, this.z, this.w);
    }

    copy(t) {
      return this.x = t.x, this.y = t.y, this.z = t.z, this.w = void 0 !== t.w ? t.w : 1, this;
    }

    add(t, e) {
      return void 0 !== e ? (console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(t, e)) : (this.x += t.x, this.y += t.y, this.z += t.z, this.w += t.w, this);
    }

    addScalar(t) {
      return this.x += t, this.y += t, this.z += t, this.w += t, this;
    }

    addVectors(t, e) {
      return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this.w = t.w + e.w, this;
    }

    addScaledVector(t, e) {
      return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this.w += t.w * e, this;
    }

    sub(t, e) {
      return void 0 !== e ? (console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(t, e)) : (this.x -= t.x, this.y -= t.y, this.z -= t.z, this.w -= t.w, this);
    }

    subScalar(t) {
      return this.x -= t, this.y -= t, this.z -= t, this.w -= t, this;
    }

    subVectors(t, e) {
      return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this.w = t.w - e.w, this;
    }

    multiply(t) {
      return this.x *= t.x, this.y *= t.y, this.z *= t.z, this.w *= t.w, this;
    }

    multiplyScalar(t) {
      return this.x *= t, this.y *= t, this.z *= t, this.w *= t, this;
    }

    applyMatrix4(t) {
      const e = this.x,
            n = this.y,
            i = this.z,
            r = this.w,
            a = t.elements;
      return this.x = a[0] * e + a[4] * n + a[8] * i + a[12] * r, this.y = a[1] * e + a[5] * n + a[9] * i + a[13] * r, this.z = a[2] * e + a[6] * n + a[10] * i + a[14] * r, this.w = a[3] * e + a[7] * n + a[11] * i + a[15] * r, this;
    }

    divideScalar(t) {
      return this.multiplyScalar(1 / t);
    }

    setAxisAngleFromQuaternion(t) {
      this.w = 2 * Math.acos(t.w);
      const e = Math.sqrt(1 - t.w * t.w);
      return e < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = t.x / e, this.y = t.y / e, this.z = t.z / e), this;
    }

    setAxisAngleFromRotationMatrix(t) {
      let e, n, i, r;
      const a = .01,
            s = .1,
            o = t.elements,
            l = o[0],
            c = o[4],
            h = o[8],
            u = o[1],
            d = o[5],
            p = o[9],
            m = o[2],
            f = o[6],
            g = o[10];

      if (Math.abs(c - u) < a && Math.abs(h - m) < a && Math.abs(p - f) < a) {
        if (Math.abs(c + u) < s && Math.abs(h + m) < s && Math.abs(p + f) < s && Math.abs(l + d + g - 3) < s) return this.set(1, 0, 0, 0), this;
        e = Math.PI;

        const t = (l + 1) / 2,
              o = (d + 1) / 2,
              v = (g + 1) / 2,
              _ = (c + u) / 4,
              x = (h + m) / 4,
              y = (p + f) / 4;

        return t > o && t > v ? t < a ? (n = 0, i = .707106781, r = .707106781) : (n = Math.sqrt(t), i = _ / n, r = x / n) : o > v ? o < a ? (n = .707106781, i = 0, r = .707106781) : (i = Math.sqrt(o), n = _ / i, r = y / i) : v < a ? (n = .707106781, i = .707106781, r = 0) : (r = Math.sqrt(v), n = x / r, i = y / r), this.set(n, i, r, e), this;
      }

      let v = Math.sqrt((f - p) * (f - p) + (h - m) * (h - m) + (u - c) * (u - c));
      return Math.abs(v) < .001 && (v = 1), this.x = (f - p) / v, this.y = (h - m) / v, this.z = (u - c) / v, this.w = Math.acos((l + d + g - 1) / 2), this;
    }

    min(t) {
      return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this.w = Math.min(this.w, t.w), this;
    }

    max(t) {
      return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this.w = Math.max(this.w, t.w), this;
    }

    clamp(t, e) {
      return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this.z = Math.max(t.z, Math.min(e.z, this.z)), this.w = Math.max(t.w, Math.min(e.w, this.w)), this;
    }

    clampScalar(t, e) {
      return this.x = Math.max(t, Math.min(e, this.x)), this.y = Math.max(t, Math.min(e, this.y)), this.z = Math.max(t, Math.min(e, this.z)), this.w = Math.max(t, Math.min(e, this.w)), this;
    }

    clampLength(t, e) {
      const n = this.length();
      return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)));
    }

    floor() {
      return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
    }

    ceil() {
      return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
    }

    round() {
      return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
    }

    roundToZero() {
      return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w), this;
    }

    negate() {
      return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
    }

    dot(t) {
      return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w;
    }

    lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }

    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }

    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
    }

    normalize() {
      return this.divideScalar(this.length() || 1);
    }

    setLength(t) {
      return this.normalize().multiplyScalar(t);
    }

    lerp(t, e) {
      return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this.w += (t.w - this.w) * e, this;
    }

    lerpVectors(t, e, n) {
      return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this.z = t.z + (e.z - t.z) * n, this.w = t.w + (e.w - t.w) * n, this;
    }

    equals(t) {
      return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w;
    }

    fromArray(t, e = 0) {
      return this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this.w = t[e + 3], this;
    }

    toArray(t = [], e = 0) {
      return t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t[e + 3] = this.w, t;
    }

    fromBufferAttribute(t, e, n) {
      return void 0 !== n && console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute()."), this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this.w = t.getW(e), this;
    }

    random() {
      return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
    }

  }

  It.prototype.isVector4 = !0;
  const zt = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
  },
        Ft = {
    h: 0,
    s: 0,
    l: 0
  },
        Ot = {
    h: 0,
    s: 0,
    l: 0
  };

  function Ut(t, e, n) {
    return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + 6 * (e - t) * n : n < .5 ? e : n < 2 / 3 ? t + 6 * (e - t) * (2 / 3 - n) : t;
  }

  function Bt(t) {
    return t < .04045 ? .0773993808 * t : Math.pow(.9478672986 * t + .0521327014, 2.4);
  }

  function Gt(t) {
    return t < .0031308 ? 12.92 * t : 1.055 * Math.pow(t, .41666) - .055;
  }

  class Ht {
    constructor(t, e, n) {
      return void 0 === e && void 0 === n ? this.set(t) : this.setRGB(t, e, n);
    }

    set(t) {
      return t && t.isColor ? this.copy(t) : "number" == typeof t ? this.setHex(t) : "string" == typeof t && this.setStyle(t), this;
    }

    setScalar(t) {
      return this.r = t, this.g = t, this.b = t, this;
    }

    setHex(t) {
      return t = Math.floor(t), this.r = (t >> 16 & 255) / 255, this.g = (t >> 8 & 255) / 255, this.b = (255 & t) / 255, this;
    }

    setRGB(t, e, n) {
      return this.r = t, this.g = e, this.b = n, this;
    }

    setHSL(t, e, n) {
      var i;
      if (t = (t % (i = 1) + i) % i, e = W(e, 0, 1), n = W(n, 0, 1), 0 === e) this.r = this.g = this.b = n;else {
        const i = n <= .5 ? n * (1 + e) : n + e - n * e,
              r = 2 * n - i;
        this.r = Ut(r, i, t + 1 / 3), this.g = Ut(r, i, t), this.b = Ut(r, i, t - 1 / 3);
      }
      return this;
    }

    setStyle(t) {
      function e(e) {
        void 0 !== e && parseFloat(e) < 1 && console.warn("THREE.Color: Alpha component of " + t + " will be ignored.");
      }

      let n;

      if (n = /^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(t)) {
        let t;
        const i = n[1],
              r = n[2];

        switch (i) {
          case "rgb":
          case "rgba":
            if (t = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r)) return this.r = Math.min(255, parseInt(t[1], 10)) / 255, this.g = Math.min(255, parseInt(t[2], 10)) / 255, this.b = Math.min(255, parseInt(t[3], 10)) / 255, e(t[4]), this;
            if (t = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r)) return this.r = Math.min(100, parseInt(t[1], 10)) / 100, this.g = Math.min(100, parseInt(t[2], 10)) / 100, this.b = Math.min(100, parseInt(t[3], 10)) / 100, e(t[4]), this;
            break;

          case "hsl":
          case "hsla":
            if (t = /^\s*(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r)) {
              const n = parseFloat(t[1]) / 360,
                    i = parseInt(t[2], 10) / 100,
                    r = parseInt(t[3], 10) / 100;
              return e(t[4]), this.setHSL(n, i, r);
            }

        }
      } else if (n = /^\#([A-Fa-f\d]+)$/.exec(t)) {
        const t = n[1],
              e = t.length;
        if (3 === e) return this.r = parseInt(t.charAt(0) + t.charAt(0), 16) / 255, this.g = parseInt(t.charAt(1) + t.charAt(1), 16) / 255, this.b = parseInt(t.charAt(2) + t.charAt(2), 16) / 255, this;
        if (6 === e) return this.r = parseInt(t.charAt(0) + t.charAt(1), 16) / 255, this.g = parseInt(t.charAt(2) + t.charAt(3), 16) / 255, this.b = parseInt(t.charAt(4) + t.charAt(5), 16) / 255, this;
      }

      return t && t.length > 0 ? this.setColorName(t) : this;
    }

    setColorName(t) {
      const e = zt[t.toLowerCase()];
      return void 0 !== e ? this.setHex(e) : console.warn("THREE.Color: Unknown color " + t), this;
    }

    clone() {
      return new this.constructor(this.r, this.g, this.b);
    }

    copy(t) {
      return this.r = t.r, this.g = t.g, this.b = t.b, this;
    }

    copyGammaToLinear(t, e = 2) {
      return this.r = Math.pow(t.r, e), this.g = Math.pow(t.g, e), this.b = Math.pow(t.b, e), this;
    }

    copyLinearToGamma(t, e = 2) {
      const n = e > 0 ? 1 / e : 1;
      return this.r = Math.pow(t.r, n), this.g = Math.pow(t.g, n), this.b = Math.pow(t.b, n), this;
    }

    convertGammaToLinear(t) {
      return this.copyGammaToLinear(this, t), this;
    }

    convertLinearToGamma(t) {
      return this.copyLinearToGamma(this, t), this;
    }

    copySRGBToLinear(t) {
      return this.r = Bt(t.r), this.g = Bt(t.g), this.b = Bt(t.b), this;
    }

    copyLinearToSRGB(t) {
      return this.r = Gt(t.r), this.g = Gt(t.g), this.b = Gt(t.b), this;
    }

    convertSRGBToLinear() {
      return this.copySRGBToLinear(this), this;
    }

    convertLinearToSRGB() {
      return this.copyLinearToSRGB(this), this;
    }

    getHex() {
      return 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0;
    }

    getHexString() {
      return ("000000" + this.getHex().toString(16)).slice(-6);
    }

    getHSL(t) {
      void 0 === t && (console.warn("THREE.Color: .getHSL() target is now required"), t = {
        h: 0,
        s: 0,
        l: 0
      });
      const e = this.r,
            n = this.g,
            i = this.b,
            r = Math.max(e, n, i),
            a = Math.min(e, n, i);
      let s, o;
      const l = (a + r) / 2;
      if (a === r) s = 0, o = 0;else {
        const t = r - a;

        switch (o = l <= .5 ? t / (r + a) : t / (2 - r - a), r) {
          case e:
            s = (n - i) / t + (n < i ? 6 : 0);
            break;

          case n:
            s = (i - e) / t + 2;
            break;

          case i:
            s = (e - n) / t + 4;
        }

        s /= 6;
      }
      return t.h = s, t.s = o, t.l = l, t;
    }

    getStyle() {
      return "rgb(" + (255 * this.r | 0) + "," + (255 * this.g | 0) + "," + (255 * this.b | 0) + ")";
    }

    offsetHSL(t, e, n) {
      return this.getHSL(Ft), Ft.h += t, Ft.s += e, Ft.l += n, this.setHSL(Ft.h, Ft.s, Ft.l), this;
    }

    add(t) {
      return this.r += t.r, this.g += t.g, this.b += t.b, this;
    }

    addColors(t, e) {
      return this.r = t.r + e.r, this.g = t.g + e.g, this.b = t.b + e.b, this;
    }

    addScalar(t) {
      return this.r += t, this.g += t, this.b += t, this;
    }

    sub(t) {
      return this.r = Math.max(0, this.r - t.r), this.g = Math.max(0, this.g - t.g), this.b = Math.max(0, this.b - t.b), this;
    }

    multiply(t) {
      return this.r *= t.r, this.g *= t.g, this.b *= t.b, this;
    }

    multiplyScalar(t) {
      return this.r *= t, this.g *= t, this.b *= t, this;
    }

    lerp(t, e) {
      return this.r += (t.r - this.r) * e, this.g += (t.g - this.g) * e, this.b += (t.b - this.b) * e, this;
    }

    lerpColors(t, e, n) {
      return this.r = t.r + (e.r - t.r) * n, this.g = t.g + (e.g - t.g) * n, this.b = t.b + (e.b - t.b) * n, this;
    }

    lerpHSL(t, e) {
      this.getHSL(Ft), t.getHSL(Ot);
      const n = k(Ft.h, Ot.h, e),
            i = k(Ft.s, Ot.s, e),
            r = k(Ft.l, Ot.l, e);
      return this.setHSL(n, i, r), this;
    }

    equals(t) {
      return t.r === this.r && t.g === this.g && t.b === this.b;
    }

    fromArray(t, e = 0) {
      return this.r = t[e], this.g = t[e + 1], this.b = t[e + 2], this;
    }

    toArray(t = [], e = 0) {
      return t[e] = this.r, t[e + 1] = this.g, t[e + 2] = this.b, t;
    }

    fromBufferAttribute(t, e) {
      return this.r = t.getX(e), this.g = t.getY(e), this.b = t.getZ(e), !0 === t.normalized && (this.r /= 255, this.g /= 255, this.b /= 255), this;
    }

    toJSON() {
      return this.getHex();
    }

  }

  function Vt() {
    let t = null,
        e = !1,
        n = null,
        i = null;

    function r(e, a) {
      n(e, a), i = t.requestAnimationFrame(r);
    }

    return {
      start: function () {
        !0 !== e && null !== n && (i = t.requestAnimationFrame(r), e = !0);
      },
      stop: function () {
        t.cancelAnimationFrame(i), e = !1;
      },
      setAnimationLoop: function (t) {
        n = t;
      },
      setContext: function (e) {
        t = e;
      }
    };
  }

  function Wt(t, e) {
    const n = e.isWebGL2,
          i = new WeakMap();
    return {
      get: function (t) {
        return t.isInterleavedBufferAttribute && (t = t.data), i.get(t);
      },
      remove: function (e) {
        e.isInterleavedBufferAttribute && (e = e.data);
        const n = i.get(e);
        n && (t.deleteBuffer(n.buffer), i.delete(e));
      },
      update: function (e, r) {
        if (e.isGLBufferAttribute) {
          const t = i.get(e);
          return void ((!t || t.version < e.version) && i.set(e, {
            buffer: e.buffer,
            type: e.type,
            bytesPerElement: e.elementSize,
            version: e.version
          }));
        }

        e.isInterleavedBufferAttribute && (e = e.data);
        const a = i.get(e);
        void 0 === a ? i.set(e, function (e, i) {
          const r = e.array,
                a = e.usage,
                s = t.createBuffer();
          t.bindBuffer(i, s), t.bufferData(i, r, a), e.onUploadCallback();
          let o = 5126;
          return r instanceof Float32Array ? o = 5126 : r instanceof Float64Array ? console.warn("THREE.WebGLAttributes: Unsupported data buffer format: Float64Array.") : r instanceof Uint16Array ? e.isFloat16BufferAttribute ? n ? o = 5131 : console.warn("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.") : o = 5123 : r instanceof Int16Array ? o = 5122 : r instanceof Uint32Array ? o = 5125 : r instanceof Int32Array ? o = 5124 : r instanceof Int8Array ? o = 5120 : (r instanceof Uint8Array || r instanceof Uint8ClampedArray) && (o = 5121), {
            buffer: s,
            type: o,
            bytesPerElement: r.BYTES_PER_ELEMENT,
            version: e.version
          };
        }(e, r)) : a.version < e.version && (!function (e, i, r) {
          const a = i.array,
                s = i.updateRange;
          t.bindBuffer(r, e), -1 === s.count ? t.bufferSubData(r, 0, a) : (n ? t.bufferSubData(r, s.offset * a.BYTES_PER_ELEMENT, a, s.offset, s.count) : t.bufferSubData(r, s.offset * a.BYTES_PER_ELEMENT, a.subarray(s.offset, s.offset + s.count)), s.count = -1);
        }(a.buffer, e, r), a.version = e.version);
      }
    };
  }

  Ht.NAMES = zt, Ht.prototype.isColor = !0, Ht.prototype.r = 1, Ht.prototype.g = 1, Ht.prototype.b = 1;

  class kt {
    addEventListener(t, e) {
      void 0 === this._listeners && (this._listeners = {});
      const n = this._listeners;
      void 0 === n[t] && (n[t] = []), -1 === n[t].indexOf(e) && n[t].push(e);
    }

    hasEventListener(t, e) {
      if (void 0 === this._listeners) return !1;
      const n = this._listeners;
      return void 0 !== n[t] && -1 !== n[t].indexOf(e);
    }

    removeEventListener(t, e) {
      if (void 0 === this._listeners) return;
      const n = this._listeners[t];

      if (void 0 !== n) {
        const t = n.indexOf(e);
        -1 !== t && n.splice(t, 1);
      }
    }

    dispatchEvent(t) {
      if (void 0 === this._listeners) return;
      const e = this._listeners[t.type];

      if (void 0 !== e) {
        t.target = this;
        const n = e.slice(0);

        for (let e = 0, i = n.length; e < i; e++) n[e].call(this, t);

        t.target = null;
      }
    }

  }

  const qt = new Y(),
        jt = new Nt();

  class Xt {
    constructor(t, e, n) {
      if (Array.isArray(t)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
      this.name = "", this.array = t, this.itemSize = e, this.count = void 0 !== t ? t.length / e : 0, this.normalized = !0 === n, this.usage = O, this.updateRange = {
        offset: 0,
        count: -1
      }, this.version = 0;
    }

    onUploadCallback() {}

    set needsUpdate(t) {
      !0 === t && this.version++;
    }

    setUsage(t) {
      return this.usage = t, this;
    }

    copy(t) {
      return this.name = t.name, this.array = new t.array.constructor(t.array), this.itemSize = t.itemSize, this.count = t.count, this.normalized = t.normalized, this.usage = t.usage, this;
    }

    copyAt(t, e, n) {
      t *= this.itemSize, n *= e.itemSize;

      for (let i = 0, r = this.itemSize; i < r; i++) this.array[t + i] = e.array[n + i];

      return this;
    }

    copyArray(t) {
      return this.array.set(t), this;
    }

    copyColorsArray(t) {
      const e = this.array;
      let n = 0;

      for (let i = 0, r = t.length; i < r; i++) {
        let r = t[i];
        void 0 === r && (console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined", i), r = new Ht()), e[n++] = r.r, e[n++] = r.g, e[n++] = r.b;
      }

      return this;
    }

    copyVector2sArray(t) {
      const e = this.array;
      let n = 0;

      for (let i = 0, r = t.length; i < r; i++) {
        let r = t[i];
        void 0 === r && (console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined", i), r = new Nt()), e[n++] = r.x, e[n++] = r.y;
      }

      return this;
    }

    copyVector3sArray(t) {
      const e = this.array;
      let n = 0;

      for (let i = 0, r = t.length; i < r; i++) {
        let r = t[i];
        void 0 === r && (console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined", i), r = new Y()), e[n++] = r.x, e[n++] = r.y, e[n++] = r.z;
      }

      return this;
    }

    copyVector4sArray(t) {
      const e = this.array;
      let n = 0;

      for (let i = 0, r = t.length; i < r; i++) {
        let r = t[i];
        void 0 === r && (console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined", i), r = new It()), e[n++] = r.x, e[n++] = r.y, e[n++] = r.z, e[n++] = r.w;
      }

      return this;
    }

    applyMatrix3(t) {
      if (2 === this.itemSize) for (let e = 0, n = this.count; e < n; e++) jt.fromBufferAttribute(this, e), jt.applyMatrix3(t), this.setXY(e, jt.x, jt.y);else if (3 === this.itemSize) for (let e = 0, n = this.count; e < n; e++) qt.fromBufferAttribute(this, e), qt.applyMatrix3(t), this.setXYZ(e, qt.x, qt.y, qt.z);
      return this;
    }

    applyMatrix4(t) {
      for (let e = 0, n = this.count; e < n; e++) qt.x = this.getX(e), qt.y = this.getY(e), qt.z = this.getZ(e), qt.applyMatrix4(t), this.setXYZ(e, qt.x, qt.y, qt.z);

      return this;
    }

    applyNormalMatrix(t) {
      for (let e = 0, n = this.count; e < n; e++) qt.x = this.getX(e), qt.y = this.getY(e), qt.z = this.getZ(e), qt.applyNormalMatrix(t), this.setXYZ(e, qt.x, qt.y, qt.z);

      return this;
    }

    transformDirection(t) {
      for (let e = 0, n = this.count; e < n; e++) qt.x = this.getX(e), qt.y = this.getY(e), qt.z = this.getZ(e), qt.transformDirection(t), this.setXYZ(e, qt.x, qt.y, qt.z);

      return this;
    }

    set(t, e = 0) {
      return this.array.set(t, e), this;
    }

    getX(t) {
      return this.array[t * this.itemSize];
    }

    setX(t, e) {
      return this.array[t * this.itemSize] = e, this;
    }

    getY(t) {
      return this.array[t * this.itemSize + 1];
    }

    setY(t, e) {
      return this.array[t * this.itemSize + 1] = e, this;
    }

    getZ(t) {
      return this.array[t * this.itemSize + 2];
    }

    setZ(t, e) {
      return this.array[t * this.itemSize + 2] = e, this;
    }

    getW(t) {
      return this.array[t * this.itemSize + 3];
    }

    setW(t, e) {
      return this.array[t * this.itemSize + 3] = e, this;
    }

    setXY(t, e, n) {
      return t *= this.itemSize, this.array[t + 0] = e, this.array[t + 1] = n, this;
    }

    setXYZ(t, e, n, i) {
      return t *= this.itemSize, this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = i, this;
    }

    setXYZW(t, e, n, i, r) {
      return t *= this.itemSize, this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = i, this.array[t + 3] = r, this;
    }

    onUpload(t) {
      return this.onUploadCallback = t, this;
    }

    clone() {
      return new this.constructor(this.array, this.itemSize).copy(this);
    }

    toJSON() {
      const t = {
        itemSize: this.itemSize,
        type: this.array.constructor.name,
        array: Array.prototype.slice.call(this.array),
        normalized: this.normalized
      };
      return "" !== this.name && (t.name = this.name), this.usage !== O && (t.usage = this.usage), 0 === this.updateRange.offset && -1 === this.updateRange.count || (t.updateRange = this.updateRange), t;
    }

  }

  Xt.prototype.isBufferAttribute = !0;

  class Yt extends Xt {
    constructor(t, e, n) {
      super(new Uint16Array(t), e, n);
    }

  }

  class Zt extends Xt {
    constructor(t, e, n) {
      super(new Uint32Array(t), e, n);
    }

  }

  class Jt extends Xt {
    constructor(t, e, n) {
      super(new Float32Array(t), e, n);
    }

  }

  const Qt = new Tt(),
        Kt = new X();

  class $t {
    constructor(t = 0, e = 0, n = 0, i = $t.DefaultOrder) {
      this._x = t, this._y = e, this._z = n, this._order = i;
    }

    get x() {
      return this._x;
    }

    set x(t) {
      this._x = t, this._onChangeCallback();
    }

    get y() {
      return this._y;
    }

    set y(t) {
      this._y = t, this._onChangeCallback();
    }

    get z() {
      return this._z;
    }

    set z(t) {
      this._z = t, this._onChangeCallback();
    }

    get order() {
      return this._order;
    }

    set order(t) {
      this._order = t, this._onChangeCallback();
    }

    set(t, e, n, i) {
      return this._x = t, this._y = e, this._z = n, this._order = i || this._order, this._onChangeCallback(), this;
    }

    clone() {
      return new this.constructor(this._x, this._y, this._z, this._order);
    }

    copy(t) {
      return this._x = t._x, this._y = t._y, this._z = t._z, this._order = t._order, this._onChangeCallback(), this;
    }

    setFromRotationMatrix(t, e, n) {
      const i = t.elements,
            r = i[0],
            a = i[4],
            s = i[8],
            o = i[1],
            l = i[5],
            c = i[9],
            h = i[2],
            u = i[6],
            d = i[10];

      switch (e = e || this._order) {
        case "XYZ":
          this._y = Math.asin(W(s, -1, 1)), Math.abs(s) < .9999999 ? (this._x = Math.atan2(-c, d), this._z = Math.atan2(-a, r)) : (this._x = Math.atan2(u, l), this._z = 0);
          break;

        case "YXZ":
          this._x = Math.asin(-W(c, -1, 1)), Math.abs(c) < .9999999 ? (this._y = Math.atan2(s, d), this._z = Math.atan2(o, l)) : (this._y = Math.atan2(-h, r), this._z = 0);
          break;

        case "ZXY":
          this._x = Math.asin(W(u, -1, 1)), Math.abs(u) < .9999999 ? (this._y = Math.atan2(-h, d), this._z = Math.atan2(-a, l)) : (this._y = 0, this._z = Math.atan2(o, r));
          break;

        case "ZYX":
          this._y = Math.asin(-W(h, -1, 1)), Math.abs(h) < .9999999 ? (this._x = Math.atan2(u, d), this._z = Math.atan2(o, r)) : (this._x = 0, this._z = Math.atan2(-a, l));
          break;

        case "YZX":
          this._z = Math.asin(W(o, -1, 1)), Math.abs(o) < .9999999 ? (this._x = Math.atan2(-c, l), this._y = Math.atan2(-h, r)) : (this._x = 0, this._y = Math.atan2(s, d));
          break;

        case "XZY":
          this._z = Math.asin(-W(a, -1, 1)), Math.abs(a) < .9999999 ? (this._x = Math.atan2(u, l), this._y = Math.atan2(s, r)) : (this._x = Math.atan2(-c, d), this._y = 0);
          break;

        default:
          console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + e);
      }

      return this._order = e, !1 !== n && this._onChangeCallback(), this;
    }

    setFromQuaternion(t, e, n) {
      return Qt.makeRotationFromQuaternion(t), this.setFromRotationMatrix(Qt, e, n);
    }

    setFromVector3(t, e) {
      return this.set(t.x, t.y, t.z, e || this._order);
    }

    reorder(t) {
      return Kt.setFromEuler(this), this.setFromQuaternion(Kt, t);
    }

    equals(t) {
      return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order;
    }

    fromArray(t) {
      return this._x = t[0], this._y = t[1], this._z = t[2], void 0 !== t[3] && (this._order = t[3]), this._onChangeCallback(), this;
    }

    toArray(t = [], e = 0) {
      return t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._order, t;
    }

    toVector3(t) {
      return t ? t.set(this._x, this._y, this._z) : new Y(this._x, this._y, this._z);
    }

    _onChange(t) {
      return this._onChangeCallback = t, this;
    }

    _onChangeCallback() {}

  }

  $t.prototype.isEuler = !0, $t.DefaultOrder = "XYZ", $t.RotationOrders = ["XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX"];

  class te {
    constructor() {
      this.mask = 1;
    }

    set(t) {
      this.mask = 1 << t | 0;
    }

    enable(t) {
      this.mask |= 1 << t | 0;
    }

    enableAll() {
      this.mask = -1;
    }

    toggle(t) {
      this.mask ^= 1 << t | 0;
    }

    disable(t) {
      this.mask &= ~(1 << t | 0);
    }

    disableAll() {
      this.mask = 0;
    }

    test(t) {
      return 0 != (this.mask & t.mask);
    }

  }

  let ee = 0;
  const ne = new Y(),
        ie = new X(),
        re = new Tt(),
        ae = new Y(),
        se = new Y(),
        oe = new Y(),
        le = new X(),
        ce = new Y(1, 0, 0),
        he = new Y(0, 1, 0),
        ue = new Y(0, 0, 1),
        de = {
    type: "added"
  },
        pe = {
    type: "removed"
  };

  class me extends kt {
    constructor() {
      super(), Object.defineProperty(this, "id", {
        value: ee++
      }), this.uuid = V(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = me.DefaultUp.clone();
      const t = new Y(),
            e = new $t(),
            n = new X(),
            i = new Y(1, 1, 1);
      e._onChange(function () {
        n.setFromEuler(e, !1);
      }), n._onChange(function () {
        e.setFromQuaternion(n, void 0, !1);
      }), Object.defineProperties(this, {
        position: {
          configurable: !0,
          enumerable: !0,
          value: t
        },
        rotation: {
          configurable: !0,
          enumerable: !0,
          value: e
        },
        quaternion: {
          configurable: !0,
          enumerable: !0,
          value: n
        },
        scale: {
          configurable: !0,
          enumerable: !0,
          value: i
        },
        modelViewMatrix: {
          value: new Tt()
        },
        normalMatrix: {
          value: new vt()
        }
      }), this.matrix = new Tt(), this.matrixWorld = new Tt(), this.matrixAutoUpdate = me.DefaultMatrixAutoUpdate, this.matrixWorldNeedsUpdate = !1, this.layers = new te(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {};
    }

    onBeforeRender() {}

    onAfterRender() {}

    applyMatrix4(t) {
      this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(t), this.matrix.decompose(this.position, this.quaternion, this.scale);
    }

    applyQuaternion(t) {
      return this.quaternion.premultiply(t), this;
    }

    setRotationFromAxisAngle(t, e) {
      this.quaternion.setFromAxisAngle(t, e);
    }

    setRotationFromEuler(t) {
      this.quaternion.setFromEuler(t, !0);
    }

    setRotationFromMatrix(t) {
      this.quaternion.setFromRotationMatrix(t);
    }

    setRotationFromQuaternion(t) {
      this.quaternion.copy(t);
    }

    rotateOnAxis(t, e) {
      return ie.setFromAxisAngle(t, e), this.quaternion.multiply(ie), this;
    }

    rotateOnWorldAxis(t, e) {
      return ie.setFromAxisAngle(t, e), this.quaternion.premultiply(ie), this;
    }

    rotateX(t) {
      return this.rotateOnAxis(ce, t);
    }

    rotateY(t) {
      return this.rotateOnAxis(he, t);
    }

    rotateZ(t) {
      return this.rotateOnAxis(ue, t);
    }

    translateOnAxis(t, e) {
      return ne.copy(t).applyQuaternion(this.quaternion), this.position.add(ne.multiplyScalar(e)), this;
    }

    translateX(t) {
      return this.translateOnAxis(ce, t);
    }

    translateY(t) {
      return this.translateOnAxis(he, t);
    }

    translateZ(t) {
      return this.translateOnAxis(ue, t);
    }

    localToWorld(t) {
      return t.applyMatrix4(this.matrixWorld);
    }

    worldToLocal(t) {
      return t.applyMatrix4(re.copy(this.matrixWorld).invert());
    }

    lookAt(t, e, n) {
      t.isVector3 ? ae.copy(t) : ae.set(t, e, n);
      const i = this.parent;
      this.updateWorldMatrix(!0, !1), se.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? re.lookAt(se, ae, this.up) : re.lookAt(ae, se, this.up), this.quaternion.setFromRotationMatrix(re), i && (re.extractRotation(i.matrixWorld), ie.setFromRotationMatrix(re), this.quaternion.premultiply(ie.invert()));
    }

    add(t) {
      if (arguments.length > 1) {
        for (let t = 0; t < arguments.length; t++) this.add(arguments[t]);

        return this;
      }

      return t === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", t), this) : (t && t.isObject3D ? (null !== t.parent && t.parent.remove(t), t.parent = this, this.children.push(t), t.dispatchEvent(de)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", t), this);
    }

    remove(t) {
      if (arguments.length > 1) {
        for (let t = 0; t < arguments.length; t++) this.remove(arguments[t]);

        return this;
      }

      const e = this.children.indexOf(t);
      return -1 !== e && (t.parent = null, this.children.splice(e, 1), t.dispatchEvent(pe)), this;
    }

    removeFromParent() {
      const t = this.parent;
      return null !== t && t.remove(this), this;
    }

    clear() {
      for (let t = 0; t < this.children.length; t++) {
        const e = this.children[t];
        e.parent = null, e.dispatchEvent(pe);
      }

      return this.children.length = 0, this;
    }

    attach(t) {
      return this.updateWorldMatrix(!0, !1), re.copy(this.matrixWorld).invert(), null !== t.parent && (t.parent.updateWorldMatrix(!0, !1), re.multiply(t.parent.matrixWorld)), t.applyMatrix4(re), this.add(t), t.updateWorldMatrix(!1, !0), this;
    }

    getObjectById(t) {
      return this.getObjectByProperty("id", t);
    }

    getObjectByName(t) {
      return this.getObjectByProperty("name", t);
    }

    getObjectByProperty(t, e) {
      if (this[t] === e) return this;

      for (let n = 0, i = this.children.length; n < i; n++) {
        const i = this.children[n].getObjectByProperty(t, e);
        if (void 0 !== i) return i;
      }
    }

    getWorldPosition(t) {
      return void 0 === t && (console.warn("THREE.Object3D: .getWorldPosition() target is now required"), t = new Y()), this.updateWorldMatrix(!0, !1), t.setFromMatrixPosition(this.matrixWorld);
    }

    getWorldQuaternion(t) {
      return void 0 === t && (console.warn("THREE.Object3D: .getWorldQuaternion() target is now required"), t = new X()), this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(se, t, oe), t;
    }

    getWorldScale(t) {
      return void 0 === t && (console.warn("THREE.Object3D: .getWorldScale() target is now required"), t = new Y()), this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(se, le, t), t;
    }

    getWorldDirection(t) {
      void 0 === t && (console.warn("THREE.Object3D: .getWorldDirection() target is now required"), t = new Y()), this.updateWorldMatrix(!0, !1);
      const e = this.matrixWorld.elements;
      return t.set(e[8], e[9], e[10]).normalize();
    }

    raycast() {}

    traverse(t) {
      t(this);
      const e = this.children;

      for (let n = 0, i = e.length; n < i; n++) e[n].traverse(t);
    }

    traverseVisible(t) {
      if (!1 === this.visible) return;
      t(this);
      const e = this.children;

      for (let n = 0, i = e.length; n < i; n++) e[n].traverseVisible(t);
    }

    traverseAncestors(t) {
      const e = this.parent;
      null !== e && (t(e), e.traverseAncestors(t));
    }

    updateMatrix() {
      this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0;
    }

    updateMatrixWorld(t) {
      this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || t) && (null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, t = !0);
      const e = this.children;

      for (let n = 0, i = e.length; n < i; n++) e[n].updateMatrixWorld(t);
    }

    updateWorldMatrix(t, e) {
      const n = this.parent;

      if (!0 === t && null !== n && n.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), !0 === e) {
        const t = this.children;

        for (let e = 0, n = t.length; e < n; e++) t[e].updateWorldMatrix(!1, !0);
      }
    }

    toJSON(t) {
      const e = void 0 === t || "string" == typeof t,
            n = {};
      e && (t = {
        geometries: {},
        materials: {},
        textures: {},
        images: {},
        shapes: {},
        skeletons: {},
        animations: {}
      }, n.metadata = {
        version: 4.5,
        type: "Object",
        generator: "Object3D.toJSON"
      });
      const i = {};

      function r(e, n) {
        return void 0 === e[n.uuid] && (e[n.uuid] = n.toJSON(t)), n.uuid;
      }

      if (i.uuid = this.uuid, i.type = this.type, "" !== this.name && (i.name = this.name), !0 === this.castShadow && (i.castShadow = !0), !0 === this.receiveShadow && (i.receiveShadow = !0), !1 === this.visible && (i.visible = !1), !1 === this.frustumCulled && (i.frustumCulled = !1), 0 !== this.renderOrder && (i.renderOrder = this.renderOrder), "{}" !== JSON.stringify(this.userData) && (i.userData = this.userData), i.layers = this.layers.mask, i.matrix = this.matrix.toArray(), !1 === this.matrixAutoUpdate && (i.matrixAutoUpdate = !1), this.isInstancedMesh && (i.type = "InstancedMesh", i.count = this.count, i.instanceMatrix = this.instanceMatrix.toJSON(), null !== this.instanceColor && (i.instanceColor = this.instanceColor.toJSON())), this.isMesh || this.isLine || this.isPoints) {
        i.geometry = r(t.geometries, this.geometry);
        const e = this.geometry.parameters;

        if (void 0 !== e && void 0 !== e.shapes) {
          const n = e.shapes;
          if (Array.isArray(n)) for (let e = 0, i = n.length; e < i; e++) {
            const i = n[e];
            r(t.shapes, i);
          } else r(t.shapes, n);
        }
      }

      if (this.isSkinnedMesh && (i.bindMode = this.bindMode, i.bindMatrix = this.bindMatrix.toArray(), void 0 !== this.skeleton && (r(t.skeletons, this.skeleton), i.skeleton = this.skeleton.uuid)), void 0 !== this.material) if (Array.isArray(this.material)) {
        const e = [];

        for (let n = 0, i = this.material.length; n < i; n++) e.push(r(t.materials, this.material[n]));

        i.material = e;
      } else i.material = r(t.materials, this.material);

      if (this.children.length > 0) {
        i.children = [];

        for (let e = 0; e < this.children.length; e++) i.children.push(this.children[e].toJSON(t).object);
      }

      if (this.animations.length > 0) {
        i.animations = [];

        for (let e = 0; e < this.animations.length; e++) {
          const n = this.animations[e];
          i.animations.push(r(t.animations, n));
        }
      }

      if (e) {
        const e = a(t.geometries),
              i = a(t.materials),
              r = a(t.textures),
              s = a(t.images),
              o = a(t.shapes),
              l = a(t.skeletons),
              c = a(t.animations);
        e.length > 0 && (n.geometries = e), i.length > 0 && (n.materials = i), r.length > 0 && (n.textures = r), s.length > 0 && (n.images = s), o.length > 0 && (n.shapes = o), l.length > 0 && (n.skeletons = l), c.length > 0 && (n.animations = c);
      }

      return n.object = i, n;

      function a(t) {
        const e = [];

        for (const n in t) {
          const i = t[n];
          delete i.metadata, e.push(i);
        }

        return e;
      }
    }

    clone(t) {
      return new this.constructor().copy(this, t);
    }

    copy(t, e = !0) {
      if (this.name = t.name, this.up.copy(t.up), this.position.copy(t.position), this.rotation.order = t.rotation.order, this.quaternion.copy(t.quaternion), this.scale.copy(t.scale), this.matrix.copy(t.matrix), this.matrixWorld.copy(t.matrixWorld), this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate, this.layers.mask = t.layers.mask, this.visible = t.visible, this.castShadow = t.castShadow, this.receiveShadow = t.receiveShadow, this.frustumCulled = t.frustumCulled, this.renderOrder = t.renderOrder, this.userData = JSON.parse(JSON.stringify(t.userData)), !0 === e) for (let e = 0; e < t.children.length; e++) {
        const n = t.children[e];
        this.add(n.clone());
      }
      return this;
    }

  }

  function fe(t) {
    if (0 === t.length) return -1 / 0;
    let e = t[0];

    for (let n = 1, i = t.length; n < i; ++n) t[n] > e && (e = t[n]);

    return e;
  }

  me.DefaultUp = new Y(0, 1, 0), me.DefaultMatrixAutoUpdate = !0, me.prototype.isObject3D = !0;
  let ge = 0;

  const ve = new Tt(),
        _e = new me(),
        xe = new Y(),
        ye = new Q(),
        Me = new Q(),
        be = new Y();

  class we extends kt {
    constructor() {
      super(), Object.defineProperty(this, "id", {
        value: ge++
      }), this.uuid = V(), this.name = "", this.type = "BufferGeometry", this.index = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
        start: 0,
        count: 1 / 0
      }, this.userData = {};
    }

    getIndex() {
      return this.index;
    }

    setIndex(t) {
      return Array.isArray(t) ? this.index = new (fe(t) > 65535 ? Zt : Yt)(t, 1) : this.index = t, this;
    }

    getAttribute(t) {
      return this.attributes[t];
    }

    setAttribute(t, e) {
      return this.attributes[t] = e, this;
    }

    deleteAttribute(t) {
      return delete this.attributes[t], this;
    }

    hasAttribute(t) {
      return void 0 !== this.attributes[t];
    }

    addGroup(t, e, n = 0) {
      this.groups.push({
        start: t,
        count: e,
        materialIndex: n
      });
    }

    clearGroups() {
      this.groups = [];
    }

    setDrawRange(t, e) {
      this.drawRange.start = t, this.drawRange.count = e;
    }

    applyMatrix4(t) {
      const e = this.attributes.position;
      void 0 !== e && (e.applyMatrix4(t), e.needsUpdate = !0);
      const n = this.attributes.normal;

      if (void 0 !== n) {
        const e = new vt().getNormalMatrix(t);
        n.applyNormalMatrix(e), n.needsUpdate = !0;
      }

      const i = this.attributes.tangent;
      return void 0 !== i && (i.transformDirection(t), i.needsUpdate = !0), null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), this;
    }

    applyQuaternion(t) {
      return ve.makeRotationFromQuaternion(t), this.applyMatrix4(ve), this;
    }

    rotateX(t) {
      return ve.makeRotationX(t), this.applyMatrix4(ve), this;
    }

    rotateY(t) {
      return ve.makeRotationY(t), this.applyMatrix4(ve), this;
    }

    rotateZ(t) {
      return ve.makeRotationZ(t), this.applyMatrix4(ve), this;
    }

    translate(t, e, n) {
      return ve.makeTranslation(t, e, n), this.applyMatrix4(ve), this;
    }

    scale(t, e, n) {
      return ve.makeScale(t, e, n), this.applyMatrix4(ve), this;
    }

    lookAt(t) {
      return _e.lookAt(t), _e.updateMatrix(), this.applyMatrix4(_e.matrix), this;
    }

    center() {
      return this.computeBoundingBox(), this.boundingBox.getCenter(xe).negate(), this.translate(xe.x, xe.y, xe.z), this;
    }

    setFromPoints(t) {
      const e = [];

      for (let n = 0, i = t.length; n < i; n++) {
        const i = t[n];
        e.push(i.x, i.y, i.z || 0);
      }

      return this.setAttribute("position", new Jt(e, 3)), this;
    }

    computeBoundingBox() {
      null === this.boundingBox && (this.boundingBox = new Q());
      const t = this.attributes.position,
            e = this.morphAttributes.position;
      if (t && t.isGLBufferAttribute) return console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".', this), void this.boundingBox.set(new Y(-1 / 0, -1 / 0, -1 / 0), new Y(1 / 0, 1 / 0, 1 / 0));

      if (void 0 !== t) {
        if (this.boundingBox.setFromBufferAttribute(t), e) for (let t = 0, n = e.length; t < n; t++) {
          const n = e[t];
          ye.setFromBufferAttribute(n), this.morphTargetsRelative ? (be.addVectors(this.boundingBox.min, ye.min), this.boundingBox.expandByPoint(be), be.addVectors(this.boundingBox.max, ye.max), this.boundingBox.expandByPoint(be)) : (this.boundingBox.expandByPoint(ye.min), this.boundingBox.expandByPoint(ye.max));
        }
      } else this.boundingBox.makeEmpty();

      (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
    }

    computeBoundingSphere() {
      null === this.boundingSphere && (this.boundingSphere = new gt());
      const t = this.attributes.position,
            e = this.morphAttributes.position;
      if (t && t.isGLBufferAttribute) return console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".', this), void this.boundingSphere.set(new Y(), 1 / 0);

      if (t) {
        const n = this.boundingSphere.center;
        if (ye.setFromBufferAttribute(t), e) for (let t = 0, n = e.length; t < n; t++) {
          const n = e[t];
          Me.setFromBufferAttribute(n), this.morphTargetsRelative ? (be.addVectors(ye.min, Me.min), ye.expandByPoint(be), be.addVectors(ye.max, Me.max), ye.expandByPoint(be)) : (ye.expandByPoint(Me.min), ye.expandByPoint(Me.max));
        }
        ye.getCenter(n);
        let i = 0;

        for (let e = 0, r = t.count; e < r; e++) be.fromBufferAttribute(t, e), i = Math.max(i, n.distanceToSquared(be));

        if (e) for (let r = 0, a = e.length; r < a; r++) {
          const a = e[r],
                s = this.morphTargetsRelative;

          for (let e = 0, r = a.count; e < r; e++) be.fromBufferAttribute(a, e), s && (xe.fromBufferAttribute(t, e), be.add(xe)), i = Math.max(i, n.distanceToSquared(be));
        }
        this.boundingSphere.radius = Math.sqrt(i), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
      }
    }

    computeFaceNormals() {}

    computeTangents() {
      const t = this.index,
            e = this.attributes;
      if (null === t || void 0 === e.position || void 0 === e.normal || void 0 === e.uv) return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      const n = t.array,
            i = e.position.array,
            r = e.normal.array,
            a = e.uv.array,
            s = i.length / 3;
      void 0 === e.tangent && this.setAttribute("tangent", new Xt(new Float32Array(4 * s), 4));
      const o = e.tangent.array,
            l = [],
            c = [];

      for (let t = 0; t < s; t++) l[t] = new Y(), c[t] = new Y();

      const h = new Y(),
            u = new Y(),
            d = new Y(),
            p = new Nt(),
            m = new Nt(),
            f = new Nt(),
            g = new Y(),
            v = new Y();

      function _(t, e, n) {
        h.fromArray(i, 3 * t), u.fromArray(i, 3 * e), d.fromArray(i, 3 * n), p.fromArray(a, 2 * t), m.fromArray(a, 2 * e), f.fromArray(a, 2 * n), u.sub(h), d.sub(h), m.sub(p), f.sub(p);
        const r = 1 / (m.x * f.y - f.x * m.y);
        isFinite(r) && (g.copy(u).multiplyScalar(f.y).addScaledVector(d, -m.y).multiplyScalar(r), v.copy(d).multiplyScalar(m.x).addScaledVector(u, -f.x).multiplyScalar(r), l[t].add(g), l[e].add(g), l[n].add(g), c[t].add(v), c[e].add(v), c[n].add(v));
      }

      let x = this.groups;
      0 === x.length && (x = [{
        start: 0,
        count: n.length
      }]);

      for (let t = 0, e = x.length; t < e; ++t) {
        const e = x[t],
              i = e.start;

        for (let t = i, r = i + e.count; t < r; t += 3) _(n[t + 0], n[t + 1], n[t + 2]);
      }

      const y = new Y(),
            M = new Y(),
            b = new Y(),
            w = new Y();

      function S(t) {
        b.fromArray(r, 3 * t), w.copy(b);
        const e = l[t];
        y.copy(e), y.sub(b.multiplyScalar(b.dot(e))).normalize(), M.crossVectors(w, e);
        const n = M.dot(c[t]) < 0 ? -1 : 1;
        o[4 * t] = y.x, o[4 * t + 1] = y.y, o[4 * t + 2] = y.z, o[4 * t + 3] = n;
      }

      for (let t = 0, e = x.length; t < e; ++t) {
        const e = x[t],
              i = e.start;

        for (let t = i, r = i + e.count; t < r; t += 3) S(n[t + 0]), S(n[t + 1]), S(n[t + 2]);
      }
    }

    computeVertexNormals() {
      const t = this.index,
            e = this.getAttribute("position");

      if (void 0 !== e) {
        let n = this.getAttribute("normal");
        if (void 0 === n) n = new Xt(new Float32Array(3 * e.count), 3), this.setAttribute("normal", n);else for (let t = 0, e = n.count; t < e; t++) n.setXYZ(t, 0, 0, 0);
        const i = new Y(),
              r = new Y(),
              a = new Y(),
              s = new Y(),
              o = new Y(),
              l = new Y(),
              c = new Y(),
              h = new Y();
        if (t) for (let u = 0, d = t.count; u < d; u += 3) {
          const d = t.getX(u + 0),
                p = t.getX(u + 1),
                m = t.getX(u + 2);
          i.fromBufferAttribute(e, d), r.fromBufferAttribute(e, p), a.fromBufferAttribute(e, m), c.subVectors(a, r), h.subVectors(i, r), c.cross(h), s.fromBufferAttribute(n, d), o.fromBufferAttribute(n, p), l.fromBufferAttribute(n, m), s.add(c), o.add(c), l.add(c), n.setXYZ(d, s.x, s.y, s.z), n.setXYZ(p, o.x, o.y, o.z), n.setXYZ(m, l.x, l.y, l.z);
        } else for (let t = 0, s = e.count; t < s; t += 3) i.fromBufferAttribute(e, t + 0), r.fromBufferAttribute(e, t + 1), a.fromBufferAttribute(e, t + 2), c.subVectors(a, r), h.subVectors(i, r), c.cross(h), n.setXYZ(t + 0, c.x, c.y, c.z), n.setXYZ(t + 1, c.x, c.y, c.z), n.setXYZ(t + 2, c.x, c.y, c.z);
        this.normalizeNormals(), n.needsUpdate = !0;
      }
    }

    merge(t, e) {
      if (!t || !t.isBufferGeometry) return void console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.", t);
      void 0 === e && (e = 0, console.warn("THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."));
      const n = this.attributes;

      for (const i in n) {
        if (void 0 === t.attributes[i]) continue;
        const r = n[i].array,
              a = t.attributes[i],
              s = a.array,
              o = a.itemSize * e,
              l = Math.min(s.length, r.length - o);

        for (let t = 0, e = o; t < l; t++, e++) r[e] = s[t];
      }

      return this;
    }

    normalizeNormals() {
      const t = this.attributes.normal;

      for (let e = 0, n = t.count; e < n; e++) be.fromBufferAttribute(t, e), be.normalize(), t.setXYZ(e, be.x, be.y, be.z);
    }

    toNonIndexed() {
      function t(t, e) {
        const n = t.array,
              i = t.itemSize,
              r = t.normalized,
              a = new n.constructor(e.length * i);
        let s = 0,
            o = 0;

        for (let t = 0, r = e.length; t < r; t++) {
          s = e[t] * i;

          for (let t = 0; t < i; t++) a[o++] = n[s++];
        }

        return new Xt(a, i, r);
      }

      if (null === this.index) return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
      const e = new we(),
            n = this.index.array,
            i = this.attributes;

      for (const r in i) {
        const a = t(i[r], n);
        e.setAttribute(r, a);
      }

      const r = this.morphAttributes;

      for (const i in r) {
        const a = [],
              s = r[i];

        for (let e = 0, i = s.length; e < i; e++) {
          const i = t(s[e], n);
          a.push(i);
        }

        e.morphAttributes[i] = a;
      }

      e.morphTargetsRelative = this.morphTargetsRelative;
      const a = this.groups;

      for (let t = 0, n = a.length; t < n; t++) {
        const n = a[t];
        e.addGroup(n.start, n.count, n.materialIndex);
      }

      return e;
    }

    toJSON() {
      const t = {
        metadata: {
          version: 4.5,
          type: "BufferGeometry",
          generator: "BufferGeometry.toJSON"
        }
      };

      if (t.uuid = this.uuid, t.type = this.type, "" !== this.name && (t.name = this.name), Object.keys(this.userData).length > 0 && (t.userData = this.userData), void 0 !== this.parameters) {
        const e = this.parameters;

        for (const n in e) void 0 !== e[n] && (t[n] = e[n]);

        return t;
      }

      t.data = {
        attributes: {}
      };
      const e = this.index;
      null !== e && (t.data.index = {
        type: e.array.constructor.name,
        array: Array.prototype.slice.call(e.array)
      });
      const n = this.attributes;

      for (const e in n) {
        const i = n[e];
        t.data.attributes[e] = i.toJSON(t.data);
      }

      const i = {};
      let r = !1;

      for (const e in this.morphAttributes) {
        const n = this.morphAttributes[e],
              a = [];

        for (let e = 0, i = n.length; e < i; e++) {
          const i = n[e];
          a.push(i.toJSON(t.data));
        }

        a.length > 0 && (i[e] = a, r = !0);
      }

      r && (t.data.morphAttributes = i, t.data.morphTargetsRelative = this.morphTargetsRelative);
      const a = this.groups;
      a.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(a)));
      const s = this.boundingSphere;
      return null !== s && (t.data.boundingSphere = {
        center: s.center.toArray(),
        radius: s.radius
      }), t;
    }

    clone() {
      return new we().copy(this);
    }

    copy(t) {
      this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
      const e = {};
      this.name = t.name;
      const n = t.index;
      null !== n && this.setIndex(n.clone(e));
      const i = t.attributes;

      for (const t in i) {
        const n = i[t];
        this.setAttribute(t, n.clone(e));
      }

      const r = t.morphAttributes;

      for (const t in r) {
        const n = [],
              i = r[t];

        for (let t = 0, r = i.length; t < r; t++) n.push(i[t].clone(e));

        this.morphAttributes[t] = n;
      }

      this.morphTargetsRelative = t.morphTargetsRelative;
      const a = t.groups;

      for (let t = 0, e = a.length; t < e; t++) {
        const e = a[t];
        this.addGroup(e.start, e.count, e.materialIndex);
      }

      const s = t.boundingBox;
      null !== s && (this.boundingBox = s.clone());
      const o = t.boundingSphere;
      return null !== o && (this.boundingSphere = o.clone()), this.drawRange.start = t.drawRange.start, this.drawRange.count = t.drawRange.count, this.userData = t.userData, this;
    }

    dispose() {
      this.dispatchEvent({
        type: "dispose"
      });
    }

  }

  we.prototype.isBufferGeometry = !0;

  class Se extends we {
    constructor(t = 1, e = 1, n = 1, i = 1, r = 1, a = 1) {
      super(), this.type = "BoxGeometry", this.parameters = {
        width: t,
        height: e,
        depth: n,
        widthSegments: i,
        heightSegments: r,
        depthSegments: a
      };
      const s = this;
      i = Math.floor(i), r = Math.floor(r), a = Math.floor(a);
      const o = [],
            l = [],
            c = [],
            h = [];
      let u = 0,
          d = 0;

      function p(t, e, n, i, r, a, p, m, f, g, v) {
        const _ = a / f,
              x = p / g,
              y = a / 2,
              M = p / 2,
              b = m / 2,
              w = f + 1,
              S = g + 1;

        let T = 0,
            L = 0;
        const E = new Y();

        for (let a = 0; a < S; a++) {
          const s = a * x - M;

          for (let o = 0; o < w; o++) {
            const u = o * _ - y;
            E[t] = u * i, E[e] = s * r, E[n] = b, l.push(E.x, E.y, E.z), E[t] = 0, E[e] = 0, E[n] = m > 0 ? 1 : -1, c.push(E.x, E.y, E.z), h.push(o / f), h.push(1 - a / g), T += 1;
          }
        }

        for (let t = 0; t < g; t++) for (let e = 0; e < f; e++) {
          const n = u + e + w * t,
                i = u + e + w * (t + 1),
                r = u + (e + 1) + w * (t + 1),
                a = u + (e + 1) + w * t;
          o.push(n, i, a), o.push(i, r, a), L += 6;
        }

        s.addGroup(d, L, v), d += L, u += T;
      }

      p("z", "y", "x", -1, -1, n, e, t, a, r, 0), p("z", "y", "x", 1, -1, n, e, -t, a, r, 1), p("x", "z", "y", 1, 1, t, n, e, i, a, 2), p("x", "z", "y", 1, -1, t, n, -e, i, a, 3), p("x", "y", "z", 1, -1, t, e, n, i, r, 4), p("x", "y", "z", -1, -1, t, e, -n, i, r, 5), this.setIndex(o), this.setAttribute("position", new Jt(l, 3)), this.setAttribute("normal", new Jt(c, 3)), this.setAttribute("uv", new Jt(h, 2));
    }

  }

  class Te extends we {
    constructor(t = 1, e = 1, n = 1, i = 1) {
      super(), this.type = "PlaneGeometry", this.parameters = {
        width: t,
        height: e,
        widthSegments: n,
        heightSegments: i
      };
      const r = t / 2,
            a = e / 2,
            s = Math.floor(n),
            o = Math.floor(i),
            l = s + 1,
            c = o + 1,
            h = t / s,
            u = e / o,
            d = [],
            p = [],
            m = [],
            f = [];

      for (let t = 0; t < c; t++) {
        const e = t * u - a;

        for (let n = 0; n < l; n++) {
          const i = n * h - r;
          p.push(i, -e, 0), m.push(0, 0, 1), f.push(n / s), f.push(1 - t / o);
        }
      }

      for (let t = 0; t < o; t++) for (let e = 0; e < s; e++) {
        const n = e + l * t,
              i = e + l * (t + 1),
              r = e + 1 + l * (t + 1),
              a = e + 1 + l * t;
        d.push(n, i, a), d.push(i, r, a);
      }

      this.setIndex(d), this.setAttribute("position", new Jt(p, 3)), this.setAttribute("normal", new Jt(m, 3)), this.setAttribute("uv", new Jt(f, 2));
    }

  }

  let Le = 0;

  class Ee extends kt {
    constructor() {
      super(), Object.defineProperty(this, "id", {
        value: Le++
      }), this.uuid = V(), this.name = "", this.type = "Material", this.fog = !0, this.blending = 1, this.side = 0, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = n, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = F, this.stencilZFail = F, this.stencilZPass = F, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaTest = 0, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0;
    }

    onBuild() {}

    onBeforeCompile() {}

    customProgramCacheKey() {
      return this.onBeforeCompile.toString();
    }

    setValues(t) {
      if (void 0 !== t) for (const e in t) {
        const n = t[e];

        if (void 0 === n) {
          console.warn("THREE.Material: '" + e + "' parameter is undefined.");
          continue;
        }

        if ("shading" === e) {
          console.warn("THREE." + this.type + ": .shading has been removed. Use the boolean .flatShading instead."), this.flatShading = 1 === n;
          continue;
        }

        const i = this[e];
        void 0 !== i ? i && i.isColor ? i.set(n) : i && i.isVector3 && n && n.isVector3 ? i.copy(n) : this[e] = n : console.warn("THREE." + this.type + ": '" + e + "' is not a property of this material.");
      }
    }

    toJSON(t) {
      const e = void 0 === t || "string" == typeof t;
      e && (t = {
        textures: {},
        images: {}
      });
      const n = {
        metadata: {
          version: 4.5,
          type: "Material",
          generator: "Material.toJSON"
        }
      };

      function i(t) {
        const e = [];

        for (const n in t) {
          const i = t[n];
          delete i.metadata, e.push(i);
        }

        return e;
      }

      if (n.uuid = this.uuid, n.type = this.type, "" !== this.name && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), void 0 !== this.roughness && (n.roughness = this.roughness), void 0 !== this.metalness && (n.metalness = this.metalness), this.sheen && this.sheen.isColor && (n.sheen = this.sheen.getHex()), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity && 1 !== this.emissiveIntensity && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), void 0 !== this.shininess && (n.shininess = this.shininess), void 0 !== this.clearcoat && (n.clearcoat = this.clearcoat), void 0 !== this.clearcoatRoughness && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(t).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(t).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(t).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.map && this.map.isTexture && (n.map = this.map.toJSON(t).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(t).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(t).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(t).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(t).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(t).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(t).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(t).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(t).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(t).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(t).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(t).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(t).uuid, void 0 !== this.combine && (n.combine = this.combine)), void 0 !== this.envMapIntensity && (n.envMapIntensity = this.envMapIntensity), void 0 !== this.reflectivity && (n.reflectivity = this.reflectivity), void 0 !== this.refractionRatio && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(t).uuid), void 0 !== this.size && (n.size = this.size), null !== this.shadowSide && (n.shadowSide = this.shadowSide), void 0 !== this.sizeAttenuation && (n.sizeAttenuation = this.sizeAttenuation), 1 !== this.blending && (n.blending = this.blending), 0 !== this.side && (n.side = this.side), this.vertexColors && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), !0 === this.transparent && (n.transparent = this.transparent), n.depthFunc = this.depthFunc, n.depthTest = this.depthTest, n.depthWrite = this.depthWrite, n.colorWrite = this.colorWrite, n.stencilWrite = this.stencilWrite, n.stencilWriteMask = this.stencilWriteMask, n.stencilFunc = this.stencilFunc, n.stencilRef = this.stencilRef, n.stencilFuncMask = this.stencilFuncMask, n.stencilFail = this.stencilFail, n.stencilZFail = this.stencilZFail, n.stencilZPass = this.stencilZPass, this.rotation && 0 !== this.rotation && (n.rotation = this.rotation), !0 === this.polygonOffset && (n.polygonOffset = !0), 0 !== this.polygonOffsetFactor && (n.polygonOffsetFactor = this.polygonOffsetFactor), 0 !== this.polygonOffsetUnits && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth && 1 !== this.linewidth && (n.linewidth = this.linewidth), void 0 !== this.dashSize && (n.dashSize = this.dashSize), void 0 !== this.gapSize && (n.gapSize = this.gapSize), void 0 !== this.scale && (n.scale = this.scale), !0 === this.dithering && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), !0 === this.alphaToCoverage && (n.alphaToCoverage = this.alphaToCoverage), !0 === this.premultipliedAlpha && (n.premultipliedAlpha = this.premultipliedAlpha), !0 === this.wireframe && (n.wireframe = this.wireframe), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), "round" !== this.wireframeLinecap && (n.wireframeLinecap = this.wireframeLinecap), "round" !== this.wireframeLinejoin && (n.wireframeLinejoin = this.wireframeLinejoin), !0 === this.morphTargets && (n.morphTargets = !0), !0 === this.morphNormals && (n.morphNormals = !0), !0 === this.flatShading && (n.flatShading = this.flatShading), !1 === this.visible && (n.visible = !1), !1 === this.toneMapped && (n.toneMapped = !1), "{}" !== JSON.stringify(this.userData) && (n.userData = this.userData), e) {
        const e = i(t.textures),
              r = i(t.images);
        e.length > 0 && (n.textures = e), r.length > 0 && (n.images = r);
      }

      return n;
    }

    clone() {
      return new this.constructor().copy(this);
    }

    copy(t) {
      this.name = t.name, this.fog = t.fog, this.blending = t.blending, this.side = t.side, this.vertexColors = t.vertexColors, this.opacity = t.opacity, this.transparent = t.transparent, this.blendSrc = t.blendSrc, this.blendDst = t.blendDst, this.blendEquation = t.blendEquation, this.blendSrcAlpha = t.blendSrcAlpha, this.blendDstAlpha = t.blendDstAlpha, this.blendEquationAlpha = t.blendEquationAlpha, this.depthFunc = t.depthFunc, this.depthTest = t.depthTest, this.depthWrite = t.depthWrite, this.stencilWriteMask = t.stencilWriteMask, this.stencilFunc = t.stencilFunc, this.stencilRef = t.stencilRef, this.stencilFuncMask = t.stencilFuncMask, this.stencilFail = t.stencilFail, this.stencilZFail = t.stencilZFail, this.stencilZPass = t.stencilZPass, this.stencilWrite = t.stencilWrite;
      const e = t.clippingPlanes;
      let n = null;

      if (null !== e) {
        const t = e.length;
        n = new Array(t);

        for (let i = 0; i !== t; ++i) n[i] = e[i].clone();
      }

      return this.clippingPlanes = n, this.clipIntersection = t.clipIntersection, this.clipShadows = t.clipShadows, this.shadowSide = t.shadowSide, this.colorWrite = t.colorWrite, this.precision = t.precision, this.polygonOffset = t.polygonOffset, this.polygonOffsetFactor = t.polygonOffsetFactor, this.polygonOffsetUnits = t.polygonOffsetUnits, this.dithering = t.dithering, this.alphaTest = t.alphaTest, this.alphaToCoverage = t.alphaToCoverage, this.premultipliedAlpha = t.premultipliedAlpha, this.visible = t.visible, this.toneMapped = t.toneMapped, this.userData = JSON.parse(JSON.stringify(t.userData)), this;
    }

    dispose() {
      this.dispatchEvent({
        type: "dispose"
      });
    }

    set needsUpdate(t) {
      !0 === t && this.version++;
    }

  }

  function Ae(t) {
    const e = {};

    for (const n in t) {
      e[n] = {};

      for (const i in t[n]) {
        const r = t[n][i];
        r && (r.isColor || r.isMatrix3 || r.isMatrix4 || r.isVector2 || r.isVector3 || r.isVector4 || r.isTexture || r.isQuaternion) ? e[n][i] = r.clone() : Array.isArray(r) ? e[n][i] = r.slice() : e[n][i] = r;
      }
    }

    return e;
  }

  function Ce(t) {
    const e = {};

    for (let n = 0; n < t.length; n++) {
      const i = Ae(t[n]);

      for (const t in i) e[t] = i[t];
    }

    return e;
  }

  Ee.prototype.isMaterial = !0;
  const Pe = {
    clone: Ae,
    merge: Ce
  };

  class De extends Ee {
    constructor(t) {
      super(), this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.vertexShader = "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}", this.fragmentShader = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}", this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.morphTargets = !1, this.morphNormals = !1, this.extensions = {
        derivatives: !1,
        fragDepth: !1,
        drawBuffers: !1,
        shaderTextureLOD: !1
      }, this.defaultAttributeValues = {
        color: [1, 1, 1],
        uv: [0, 0],
        uv2: [0, 0]
      }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, void 0 !== t && (void 0 !== t.attributes && console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."), this.setValues(t));
    }

    copy(t) {
      return super.copy(t), this.fragmentShader = t.fragmentShader, this.vertexShader = t.vertexShader, this.uniforms = Ae(t.uniforms), this.defines = Object.assign({}, t.defines), this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.lights = t.lights, this.clipping = t.clipping, this.morphTargets = t.morphTargets, this.morphNormals = t.morphNormals, this.extensions = Object.assign({}, t.extensions), this.glslVersion = t.glslVersion, this;
    }

    toJSON(t) {
      const e = super.toJSON(t);
      e.glslVersion = this.glslVersion, e.uniforms = {};

      for (const n in this.uniforms) {
        const i = this.uniforms[n].value;
        i && i.isTexture ? e.uniforms[n] = {
          type: "t",
          value: i.toJSON(t).uuid
        } : i && i.isColor ? e.uniforms[n] = {
          type: "c",
          value: i.getHex()
        } : i && i.isVector2 ? e.uniforms[n] = {
          type: "v2",
          value: i.toArray()
        } : i && i.isVector3 ? e.uniforms[n] = {
          type: "v3",
          value: i.toArray()
        } : i && i.isVector4 ? e.uniforms[n] = {
          type: "v4",
          value: i.toArray()
        } : i && i.isMatrix3 ? e.uniforms[n] = {
          type: "m3",
          value: i.toArray()
        } : i && i.isMatrix4 ? e.uniforms[n] = {
          type: "m4",
          value: i.toArray()
        } : e.uniforms[n] = {
          value: i
        };
      }

      Object.keys(this.defines).length > 0 && (e.defines = this.defines), e.vertexShader = this.vertexShader, e.fragmentShader = this.fragmentShader;
      const n = {};

      for (const t in this.extensions) !0 === this.extensions[t] && (n[t] = !0);

      return Object.keys(n).length > 0 && (e.extensions = n), e;
    }

  }

  De.prototype.isShaderMaterial = !0;
  const Re = new Y(),
        Ne = new Y(),
        Ie = new Y(),
        ze = new Y(),
        Fe = new Y(),
        Oe = new Y(),
        Ue = new Y();

  class Be {
    constructor(t = new Y(), e = new Y(0, 0, -1)) {
      this.origin = t, this.direction = e;
    }

    set(t, e) {
      return this.origin.copy(t), this.direction.copy(e), this;
    }

    copy(t) {
      return this.origin.copy(t.origin), this.direction.copy(t.direction), this;
    }

    at(t, e) {
      return void 0 === e && (console.warn("THREE.Ray: .at() target is now required"), e = new Y()), e.copy(this.direction).multiplyScalar(t).add(this.origin);
    }

    lookAt(t) {
      return this.direction.copy(t).sub(this.origin).normalize(), this;
    }

    recast(t) {
      return this.origin.copy(this.at(t, Re)), this;
    }

    closestPointToPoint(t, e) {
      void 0 === e && (console.warn("THREE.Ray: .closestPointToPoint() target is now required"), e = new Y()), e.subVectors(t, this.origin);
      const n = e.dot(this.direction);
      return n < 0 ? e.copy(this.origin) : e.copy(this.direction).multiplyScalar(n).add(this.origin);
    }

    distanceToPoint(t) {
      return Math.sqrt(this.distanceSqToPoint(t));
    }

    distanceSqToPoint(t) {
      const e = Re.subVectors(t, this.origin).dot(this.direction);
      return e < 0 ? this.origin.distanceToSquared(t) : (Re.copy(this.direction).multiplyScalar(e).add(this.origin), Re.distanceToSquared(t));
    }

    distanceSqToSegment(t, e, n, i) {
      Ne.copy(t).add(e).multiplyScalar(.5), Ie.copy(e).sub(t).normalize(), ze.copy(this.origin).sub(Ne);
      const r = .5 * t.distanceTo(e),
            a = -this.direction.dot(Ie),
            s = ze.dot(this.direction),
            o = -ze.dot(Ie),
            l = ze.lengthSq(),
            c = Math.abs(1 - a * a);
      let h, u, d, p;
      if (c > 0) {
        if (h = a * o - s, u = a * s - o, p = r * c, h >= 0) {
          if (u >= -p) {
            if (u <= p) {
              const t = 1 / c;
              h *= t, u *= t, d = h * (h + a * u + 2 * s) + u * (a * h + u + 2 * o) + l;
            } else u = r, h = Math.max(0, -(a * u + s)), d = -h * h + u * (u + 2 * o) + l;
          } else u = -r, h = Math.max(0, -(a * u + s)), d = -h * h + u * (u + 2 * o) + l;
        } else u <= -p ? (h = Math.max(0, -(-a * r + s)), u = h > 0 ? -r : Math.min(Math.max(-r, -o), r), d = -h * h + u * (u + 2 * o) + l) : u <= p ? (h = 0, u = Math.min(Math.max(-r, -o), r), d = u * (u + 2 * o) + l) : (h = Math.max(0, -(a * r + s)), u = h > 0 ? r : Math.min(Math.max(-r, -o), r), d = -h * h + u * (u + 2 * o) + l);
      } else u = a > 0 ? -r : r, h = Math.max(0, -(a * u + s)), d = -h * h + u * (u + 2 * o) + l;
      return n && n.copy(this.direction).multiplyScalar(h).add(this.origin), i && i.copy(Ie).multiplyScalar(u).add(Ne), d;
    }

    intersectSphere(t, e) {
      Re.subVectors(t.center, this.origin);
      const n = Re.dot(this.direction),
            i = Re.dot(Re) - n * n,
            r = t.radius * t.radius;
      if (i > r) return null;
      const a = Math.sqrt(r - i),
            s = n - a,
            o = n + a;
      return s < 0 && o < 0 ? null : s < 0 ? this.at(o, e) : this.at(s, e);
    }

    intersectsSphere(t) {
      return this.distanceSqToPoint(t.center) <= t.radius * t.radius;
    }

    distanceToPlane(t) {
      const e = t.normal.dot(this.direction);
      if (0 === e) return 0 === t.distanceToPoint(this.origin) ? 0 : null;
      const n = -(this.origin.dot(t.normal) + t.constant) / e;
      return n >= 0 ? n : null;
    }

    intersectPlane(t, e) {
      const n = this.distanceToPlane(t);
      return null === n ? null : this.at(n, e);
    }

    intersectsPlane(t) {
      const e = t.distanceToPoint(this.origin);
      if (0 === e) return !0;
      return t.normal.dot(this.direction) * e < 0;
    }

    intersectBox(t, e) {
      let n, i, r, a, s, o;
      const l = 1 / this.direction.x,
            c = 1 / this.direction.y,
            h = 1 / this.direction.z,
            u = this.origin;
      return l >= 0 ? (n = (t.min.x - u.x) * l, i = (t.max.x - u.x) * l) : (n = (t.max.x - u.x) * l, i = (t.min.x - u.x) * l), c >= 0 ? (r = (t.min.y - u.y) * c, a = (t.max.y - u.y) * c) : (r = (t.max.y - u.y) * c, a = (t.min.y - u.y) * c), n > a || r > i ? null : ((r > n || n != n) && (n = r), (a < i || i != i) && (i = a), h >= 0 ? (s = (t.min.z - u.z) * h, o = (t.max.z - u.z) * h) : (s = (t.max.z - u.z) * h, o = (t.min.z - u.z) * h), n > o || s > i ? null : ((s > n || n != n) && (n = s), (o < i || i != i) && (i = o), i < 0 ? null : this.at(n >= 0 ? n : i, e)));
    }

    intersectsBox(t) {
      return null !== this.intersectBox(t, Re);
    }

    intersectTriangle(t, e, n, i, r) {
      Fe.subVectors(e, t), Oe.subVectors(n, t), Ue.crossVectors(Fe, Oe);
      let a,
          s = this.direction.dot(Ue);

      if (s > 0) {
        if (i) return null;
        a = 1;
      } else {
        if (!(s < 0)) return null;
        a = -1, s = -s;
      }

      ze.subVectors(this.origin, t);
      const o = a * this.direction.dot(Oe.crossVectors(ze, Oe));
      if (o < 0) return null;
      const l = a * this.direction.dot(Fe.cross(ze));
      if (l < 0) return null;
      if (o + l > s) return null;
      const c = -a * ze.dot(Ue);
      return c < 0 ? null : this.at(c / s, r);
    }

    applyMatrix4(t) {
      return this.origin.applyMatrix4(t), this.direction.transformDirection(t), this;
    }

    equals(t) {
      return t.origin.equals(this.origin) && t.direction.equals(this.direction);
    }

    clone() {
      return new this.constructor().copy(this);
    }

  }

  const Ge = new Y(),
        He = new Y(),
        Ve = new Y(),
        We = new Y(),
        ke = new Y(),
        qe = new Y(),
        je = new Y(),
        Xe = new Y(),
        Ye = new Y(),
        Ze = new Y();

  class Je {
    constructor(t = new Y(), e = new Y(), n = new Y()) {
      this.a = t, this.b = e, this.c = n;
    }

    static getNormal(t, e, n, i) {
      void 0 === i && (console.warn("THREE.Triangle: .getNormal() target is now required"), i = new Y()), i.subVectors(n, e), Ge.subVectors(t, e), i.cross(Ge);
      const r = i.lengthSq();
      return r > 0 ? i.multiplyScalar(1 / Math.sqrt(r)) : i.set(0, 0, 0);
    }

    static getBarycoord(t, e, n, i, r) {
      Ge.subVectors(i, e), He.subVectors(n, e), Ve.subVectors(t, e);
      const a = Ge.dot(Ge),
            s = Ge.dot(He),
            o = Ge.dot(Ve),
            l = He.dot(He),
            c = He.dot(Ve),
            h = a * l - s * s;
      if (void 0 === r && (console.warn("THREE.Triangle: .getBarycoord() target is now required"), r = new Y()), 0 === h) return r.set(-2, -1, -1);
      const u = 1 / h,
            d = (l * o - s * c) * u,
            p = (a * c - s * o) * u;
      return r.set(1 - d - p, p, d);
    }

    static containsPoint(t, e, n, i) {
      return this.getBarycoord(t, e, n, i, We), We.x >= 0 && We.y >= 0 && We.x + We.y <= 1;
    }

    static getUV(t, e, n, i, r, a, s, o) {
      return this.getBarycoord(t, e, n, i, We), o.set(0, 0), o.addScaledVector(r, We.x), o.addScaledVector(a, We.y), o.addScaledVector(s, We.z), o;
    }

    static isFrontFacing(t, e, n, i) {
      return Ge.subVectors(n, e), He.subVectors(t, e), Ge.cross(He).dot(i) < 0;
    }

    set(t, e, n) {
      return this.a.copy(t), this.b.copy(e), this.c.copy(n), this;
    }

    setFromPointsAndIndices(t, e, n, i) {
      return this.a.copy(t[e]), this.b.copy(t[n]), this.c.copy(t[i]), this;
    }

    clone() {
      return new this.constructor().copy(this);
    }

    copy(t) {
      return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this;
    }

    getArea() {
      return Ge.subVectors(this.c, this.b), He.subVectors(this.a, this.b), .5 * Ge.cross(He).length();
    }

    getMidpoint(t) {
      return void 0 === t && (console.warn("THREE.Triangle: .getMidpoint() target is now required"), t = new Y()), t.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
    }

    getNormal(t) {
      return Je.getNormal(this.a, this.b, this.c, t);
    }

    getPlane(t) {
      return void 0 === t && (console.warn("THREE.Triangle: .getPlane() target is now required"), t = new Mt()), t.setFromCoplanarPoints(this.a, this.b, this.c);
    }

    getBarycoord(t, e) {
      return Je.getBarycoord(t, this.a, this.b, this.c, e);
    }

    getUV(t, e, n, i, r) {
      return Je.getUV(t, this.a, this.b, this.c, e, n, i, r);
    }

    containsPoint(t) {
      return Je.containsPoint(t, this.a, this.b, this.c);
    }

    isFrontFacing(t) {
      return Je.isFrontFacing(this.a, this.b, this.c, t);
    }

    intersectsBox(t) {
      return t.intersectsTriangle(this);
    }

    closestPointToPoint(t, e) {
      void 0 === e && (console.warn("THREE.Triangle: .closestPointToPoint() target is now required"), e = new Y());
      const n = this.a,
            i = this.b,
            r = this.c;
      let a, s;
      ke.subVectors(i, n), qe.subVectors(r, n), Xe.subVectors(t, n);
      const o = ke.dot(Xe),
            l = qe.dot(Xe);
      if (o <= 0 && l <= 0) return e.copy(n);
      Ye.subVectors(t, i);
      const c = ke.dot(Ye),
            h = qe.dot(Ye);
      if (c >= 0 && h <= c) return e.copy(i);
      const u = o * h - c * l;
      if (u <= 0 && o >= 0 && c <= 0) return a = o / (o - c), e.copy(n).addScaledVector(ke, a);
      Ze.subVectors(t, r);
      const d = ke.dot(Ze),
            p = qe.dot(Ze);
      if (p >= 0 && d <= p) return e.copy(r);
      const m = d * l - o * p;
      if (m <= 0 && l >= 0 && p <= 0) return s = l / (l - p), e.copy(n).addScaledVector(qe, s);
      const f = c * p - d * h;
      if (f <= 0 && h - c >= 0 && d - p >= 0) return je.subVectors(r, i), s = (h - c) / (h - c + (d - p)), e.copy(i).addScaledVector(je, s);
      const g = 1 / (f + m + u);
      return a = m * g, s = u * g, e.copy(n).addScaledVector(ke, a).addScaledVector(qe, s);
    }

    equals(t) {
      return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c);
    }

  }

  class Qe extends Ee {
    constructor(t) {
      super(), this.type = "MeshBasicMaterial", this.color = new Ht(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = 0, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.morphTargets = !1, this.setValues(t);
    }

    copy(t) {
      return super.copy(t), this.color.copy(t.color), this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.morphTargets = t.morphTargets, this;
    }

  }

  Qe.prototype.isMeshBasicMaterial = !0;
  const Ke = new Tt(),
        $e = new Be(),
        tn = new gt(),
        en = new Y(),
        nn = new Y(),
        rn = new Y(),
        an = new Y(),
        sn = new Y(),
        on = new Y(),
        ln = new Y(),
        cn = new Y(),
        hn = new Y(),
        un = new Nt(),
        dn = new Nt(),
        pn = new Nt(),
        mn = new Y(),
        fn = new Y();

  class gn extends me {
    constructor(t = new we(), e = new Qe()) {
      super(), this.type = "Mesh", this.geometry = t, this.material = e, this.updateMorphTargets();
    }

    copy(t) {
      return super.copy(t), void 0 !== t.morphTargetInfluences && (this.morphTargetInfluences = t.morphTargetInfluences.slice()), void 0 !== t.morphTargetDictionary && (this.morphTargetDictionary = Object.assign({}, t.morphTargetDictionary)), this.material = t.material, this.geometry = t.geometry, this;
    }

    updateMorphTargets() {
      const t = this.geometry;

      if (t.isBufferGeometry) {
        const e = t.morphAttributes,
              n = Object.keys(e);

        if (n.length > 0) {
          const t = e[n[0]];

          if (void 0 !== t) {
            this.morphTargetInfluences = [], this.morphTargetDictionary = {};

            for (let e = 0, n = t.length; e < n; e++) {
              const n = t[e].name || String(e);
              this.morphTargetInfluences.push(0), this.morphTargetDictionary[n] = e;
            }
          }
        }
      } else {
        const e = t.morphTargets;
        void 0 !== e && e.length > 0 && console.error("THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");
      }
    }

    raycast(t, e) {
      const n = this.geometry,
            i = this.material,
            r = this.matrixWorld;
      if (void 0 === i) return;
      if (null === n.boundingSphere && n.computeBoundingSphere(), tn.copy(n.boundingSphere), tn.applyMatrix4(r), !1 === t.ray.intersectsSphere(tn)) return;
      if (Ke.copy(r).invert(), $e.copy(t.ray).applyMatrix4(Ke), null !== n.boundingBox && !1 === $e.intersectsBox(n.boundingBox)) return;
      let a;

      if (n.isBufferGeometry) {
        const r = n.index,
              s = n.attributes.position,
              o = n.morphAttributes.position,
              l = n.morphTargetsRelative,
              c = n.attributes.uv,
              h = n.attributes.uv2,
              u = n.groups,
              d = n.drawRange;
        if (null !== r) {
          if (Array.isArray(i)) for (let n = 0, p = u.length; n < p; n++) {
            const p = u[n],
                  m = i[p.materialIndex];

            for (let n = Math.max(p.start, d.start), i = Math.min(p.start + p.count, d.start + d.count); n < i; n += 3) {
              const i = r.getX(n),
                    u = r.getX(n + 1),
                    d = r.getX(n + 2);
              a = vn(this, m, t, $e, s, o, l, c, h, i, u, d), a && (a.faceIndex = Math.floor(n / 3), a.face.materialIndex = p.materialIndex, e.push(a));
            }
          } else {
            for (let n = Math.max(0, d.start), u = Math.min(r.count, d.start + d.count); n < u; n += 3) {
              const u = r.getX(n),
                    d = r.getX(n + 1),
                    p = r.getX(n + 2);
              a = vn(this, i, t, $e, s, o, l, c, h, u, d, p), a && (a.faceIndex = Math.floor(n / 3), e.push(a));
            }
          }
        } else if (void 0 !== s) if (Array.isArray(i)) for (let n = 0, r = u.length; n < r; n++) {
          const r = u[n],
                p = i[r.materialIndex];

          for (let n = Math.max(r.start, d.start), i = Math.min(r.start + r.count, d.start + d.count); n < i; n += 3) {
            a = vn(this, p, t, $e, s, o, l, c, h, n, n + 1, n + 2), a && (a.faceIndex = Math.floor(n / 3), a.face.materialIndex = r.materialIndex, e.push(a));
          }
        } else {
          for (let n = Math.max(0, d.start), r = Math.min(s.count, d.start + d.count); n < r; n += 3) {
            a = vn(this, i, t, $e, s, o, l, c, h, n, n + 1, n + 2), a && (a.faceIndex = Math.floor(n / 3), e.push(a));
          }
        }
      } else n.isGeometry && console.error("THREE.Mesh.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");
    }

  }

  function vn(t, e, n, i, r, a, s, o, l, c, h, u) {
    en.fromBufferAttribute(r, c), nn.fromBufferAttribute(r, h), rn.fromBufferAttribute(r, u);
    const d = t.morphTargetInfluences;

    if (e.morphTargets && a && d) {
      ln.set(0, 0, 0), cn.set(0, 0, 0), hn.set(0, 0, 0);

      for (let t = 0, e = a.length; t < e; t++) {
        const e = d[t],
              n = a[t];
        0 !== e && (an.fromBufferAttribute(n, c), sn.fromBufferAttribute(n, h), on.fromBufferAttribute(n, u), s ? (ln.addScaledVector(an, e), cn.addScaledVector(sn, e), hn.addScaledVector(on, e)) : (ln.addScaledVector(an.sub(en), e), cn.addScaledVector(sn.sub(nn), e), hn.addScaledVector(on.sub(rn), e)));
      }

      en.add(ln), nn.add(cn), rn.add(hn);
    }

    t.isSkinnedMesh && (t.boneTransform(c, en), t.boneTransform(h, nn), t.boneTransform(u, rn));

    const p = function (t, e, n, i, r, a, s, o) {
      let l;
      if (l = 1 === e.side ? i.intersectTriangle(s, a, r, !0, o) : i.intersectTriangle(r, a, s, 2 !== e.side, o), null === l) return null;
      fn.copy(o), fn.applyMatrix4(t.matrixWorld);
      const c = n.ray.origin.distanceTo(fn);
      return c < n.near || c > n.far ? null : {
        distance: c,
        point: fn.clone(),
        object: t
      };
    }(t, e, n, i, en, nn, rn, mn);

    if (p) {
      o && (un.fromBufferAttribute(o, c), dn.fromBufferAttribute(o, h), pn.fromBufferAttribute(o, u), p.uv = Je.getUV(mn, en, nn, rn, un, dn, pn, new Nt())), l && (un.fromBufferAttribute(l, c), dn.fromBufferAttribute(l, h), pn.fromBufferAttribute(l, u), p.uv2 = Je.getUV(mn, en, nn, rn, un, dn, pn, new Nt()));
      const t = {
        a: c,
        b: h,
        c: u,
        normal: new Y(),
        materialIndex: 0
      };
      Je.getNormal(en, nn, rn, t.normal), p.face = t;
    }

    return p;
  }

  gn.prototype.isMesh = !0;
  const _n = {
    alphamap_fragment: "#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif",
    alphamap_pars_fragment: "#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif",
    alphatest_fragment: "#ifdef ALPHATEST\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n#endif",
    aomap_fragment: "#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( STANDARD )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\t#endif\n#endif",
    aomap_pars_fragment: "#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif",
    begin_vertex: "vec3 transformed = vec3( position );",
    beginnormal_vertex: "vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n\tvec3 objectTangent = vec3( tangent.xyz );\n#endif",
    bsdfs: "vec2 integrateSpecularBRDF( const in float dotNV, const in float roughness ) {\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\treturn vec2( -1.04, 1.04 ) * a004 + r.zw;\n}\nfloat punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\tif( cutoffDistance > 0.0 ) {\n\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t}\n\treturn distanceFalloff;\n#else\n\tif( cutoffDistance > 0.0 && decayExponent > 0.0 ) {\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t}\n\treturn 1.0;\n#endif\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nvec3 F_Schlick_RoughnessDependent( const in vec3 F0, const in float dotNV, const in float roughness ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotNV - 6.98316 ) * dotNV );\n\tvec3 Fr = max( vec3( 1.0 - roughness ), F0 ) - F0;\n\treturn Fr * fresnel + F0;\n}\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\tfloat gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\treturn 1.0 / ( gl * gv );\n}\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( incidentLight.direction + viewDir );\n\tfloat dotNL = saturate( dot( normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( G * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\nvec3 BRDF_Specular_GGX_Environment( const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tvec2 brdf = integrateSpecularBRDF( dotNV, roughness );\n\treturn specularColor * brdf.x + brdf.y;\n}\nvoid BRDF_Specular_Multiscattering_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tvec3 F = F_Schlick_RoughnessDependent( specularColor, dotNV, roughness );\n\tvec2 brdf = integrateSpecularBRDF( dotNV, roughness );\n\tvec3 FssEss = F * brdf.x + brdf.y;\n\tfloat Ess = brdf.x + brdf.y;\n\tfloat Ems = 1.0 - Ess;\n\tvec3 Favg = specularColor + ( 1.0 - specularColor ) * 0.047619;\tvec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n\tsingleScatter += FssEss;\n\tmultiScatter += Fms * Ems;\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n\treturn sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie(float roughness, float NoH) {\n\tfloat invAlpha = 1.0 / roughness;\n\tfloat cos2h = NoH * NoH;\n\tfloat sin2h = max(1.0 - cos2h, 0.0078125);\treturn (2.0 + invAlpha) * pow(sin2h, invAlpha * 0.5) / (2.0 * PI);\n}\nfloat V_Neubelt(float NoV, float NoL) {\n\treturn saturate(1.0 / (4.0 * (NoL + NoV - NoL * NoV)));\n}\nvec3 BRDF_Specular_Sheen( const in float roughness, const in vec3 L, const in GeometricContext geometry, vec3 specularColor ) {\n\tvec3 N = geometry.normal;\n\tvec3 V = geometry.viewDir;\n\tvec3 H = normalize( V + L );\n\tfloat dotNH = saturate( dot( N, H ) );\n\treturn specularColor * D_Charlie( roughness, dotNH ) * V_Neubelt( dot(N, V), dot(N, L) );\n}\n#endif",
    bumpmap_pars_fragment: "#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n\t\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n\t\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 ) * faceDirection;\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif",
    clipping_planes_fragment: "#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t#pragma unroll_loop_end\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t\tif ( clipped ) discard;\n\t#endif\n#endif",
    clipping_planes_pars_fragment: "#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif",
    clipping_planes_pars_vertex: "#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n#endif",
    clipping_planes_vertex: "#if NUM_CLIPPING_PLANES > 0\n\tvClipPosition = - mvPosition.xyz;\n#endif",
    color_fragment: "#if defined( USE_COLOR_ALPHA )\n\tdiffuseColor *= vColor;\n#elif defined( USE_COLOR )\n\tdiffuseColor.rgb *= vColor;\n#endif",
    color_pars_fragment: "#if defined( USE_COLOR_ALPHA )\n\tvarying vec4 vColor;\n#elif defined( USE_COLOR )\n\tvarying vec3 vColor;\n#endif",
    color_pars_vertex: "#if defined( USE_COLOR_ALPHA )\n\tvarying vec4 vColor;\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\tvarying vec3 vColor;\n#endif",
    color_vertex: "#if defined( USE_COLOR_ALPHA )\n\tvColor = vec4( 1.0 );\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\tvColor = vec3( 1.0 );\n#endif\n#ifdef USE_COLOR\n\tvColor *= color;\n#endif\n#ifdef USE_INSTANCING_COLOR\n\tvColor.xyz *= instanceColor.xyz;\n#endif",
    common: "#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement(a) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\n#ifdef HIGH_PRECISION\n\tfloat precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n\tfloat max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }\n\tfloat precisionSafeLength( vec3 v ) {\n\t\tfloat maxComponent = max3( abs( v ) );\n\t\treturn length( v / maxComponent ) * maxComponent;\n\t}\n#endif\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n#ifdef CLEARCOAT\n\tvec3 clearcoatNormal;\n#endif\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\treturn - distance * planeNormal + point;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nfloat linearToRelativeLuminance( const in vec3 color ) {\n\tvec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n\treturn dot( weights, color.rgb );\n}\nbool isPerspectiveMatrix( mat4 m ) {\n\treturn m[ 2 ][ 3 ] == - 1.0;\n}\nvec2 equirectUv( in vec3 dir ) {\n\tfloat u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n\tfloat v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\treturn vec2( u, v );\n}",
    cube_uv_reflection_fragment: "#ifdef ENVMAP_TYPE_CUBE_UV\n\t#define cubeUV_maxMipLevel 8.0\n\t#define cubeUV_minMipLevel 4.0\n\t#define cubeUV_maxTileSize 256.0\n\t#define cubeUV_minTileSize 16.0\n\tfloat getFace( vec3 direction ) {\n\t\tvec3 absDirection = abs( direction );\n\t\tfloat face = - 1.0;\n\t\tif ( absDirection.x > absDirection.z ) {\n\t\t\tif ( absDirection.x > absDirection.y )\n\t\t\t\tface = direction.x > 0.0 ? 0.0 : 3.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t} else {\n\t\t\tif ( absDirection.z > absDirection.y )\n\t\t\t\tface = direction.z > 0.0 ? 2.0 : 5.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t}\n\t\treturn face;\n\t}\n\tvec2 getUV( vec3 direction, float face ) {\n\t\tvec2 uv;\n\t\tif ( face == 0.0 ) {\n\t\t\tuv = vec2( direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 1.0 ) {\n\t\t\tuv = vec2( - direction.x, - direction.z ) / abs( direction.y );\n\t\t} else if ( face == 2.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.y ) / abs( direction.z );\n\t\t} else if ( face == 3.0 ) {\n\t\t\tuv = vec2( - direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 4.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.z ) / abs( direction.y );\n\t\t} else {\n\t\t\tuv = vec2( direction.x, direction.y ) / abs( direction.z );\n\t\t}\n\t\treturn 0.5 * ( uv + 1.0 );\n\t}\n\tvec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {\n\t\tfloat face = getFace( direction );\n\t\tfloat filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );\n\t\tmipInt = max( mipInt, cubeUV_minMipLevel );\n\t\tfloat faceSize = exp2( mipInt );\n\t\tfloat texelSize = 1.0 / ( 3.0 * cubeUV_maxTileSize );\n\t\tvec2 uv = getUV( direction, face ) * ( faceSize - 1.0 );\n\t\tvec2 f = fract( uv );\n\t\tuv += 0.5 - f;\n\t\tif ( face > 2.0 ) {\n\t\t\tuv.y += faceSize;\n\t\t\tface -= 3.0;\n\t\t}\n\t\tuv.x += face * faceSize;\n\t\tif ( mipInt < cubeUV_maxMipLevel ) {\n\t\t\tuv.y += 2.0 * cubeUV_maxTileSize;\n\t\t}\n\t\tuv.y += filterInt * 2.0 * cubeUV_minTileSize;\n\t\tuv.x += 3.0 * max( 0.0, cubeUV_maxTileSize - 2.0 * faceSize );\n\t\tuv *= texelSize;\n\t\tvec3 tl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tuv.x += texelSize;\n\t\tvec3 tr = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tuv.y += texelSize;\n\t\tvec3 br = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tuv.x -= texelSize;\n\t\tvec3 bl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tvec3 tm = mix( tl, tr, f.x );\n\t\tvec3 bm = mix( bl, br, f.x );\n\t\treturn mix( tm, bm, f.y );\n\t}\n\t#define r0 1.0\n\t#define v0 0.339\n\t#define m0 - 2.0\n\t#define r1 0.8\n\t#define v1 0.276\n\t#define m1 - 1.0\n\t#define r4 0.4\n\t#define v4 0.046\n\t#define m4 2.0\n\t#define r5 0.305\n\t#define v5 0.016\n\t#define m5 3.0\n\t#define r6 0.21\n\t#define v6 0.0038\n\t#define m6 4.0\n\tfloat roughnessToMip( float roughness ) {\n\t\tfloat mip = 0.0;\n\t\tif ( roughness >= r1 ) {\n\t\t\tmip = ( r0 - roughness ) * ( m1 - m0 ) / ( r0 - r1 ) + m0;\n\t\t} else if ( roughness >= r4 ) {\n\t\t\tmip = ( r1 - roughness ) * ( m4 - m1 ) / ( r1 - r4 ) + m1;\n\t\t} else if ( roughness >= r5 ) {\n\t\t\tmip = ( r4 - roughness ) * ( m5 - m4 ) / ( r4 - r5 ) + m4;\n\t\t} else if ( roughness >= r6 ) {\n\t\t\tmip = ( r5 - roughness ) * ( m6 - m5 ) / ( r5 - r6 ) + m5;\n\t\t} else {\n\t\t\tmip = - 2.0 * log2( 1.16 * roughness );\t\t}\n\t\treturn mip;\n\t}\n\tvec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {\n\t\tfloat mip = clamp( roughnessToMip( roughness ), m0, cubeUV_maxMipLevel );\n\t\tfloat mipF = fract( mip );\n\t\tfloat mipInt = floor( mip );\n\t\tvec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );\n\t\tif ( mipF == 0.0 ) {\n\t\t\treturn vec4( color0, 1.0 );\n\t\t} else {\n\t\t\tvec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );\n\t\t\treturn vec4( mix( color0, color1, mipF ), 1.0 );\n\t\t}\n\t}\n#endif",
    defaultnormal_vertex: "vec3 transformedNormal = objectNormal;\n#ifdef USE_INSTANCING\n\tmat3 m = mat3( instanceMatrix );\n\ttransformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );\n\ttransformedNormal = m * transformedNormal;\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n\tvec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#ifdef FLIP_SIDED\n\t\ttransformedTangent = - transformedTangent;\n\t#endif\n#endif",
    displacementmap_pars_vertex: "#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif",
    displacementmap_vertex: "#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );\n#endif",
    emissivemap_fragment: "#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif",
    emissivemap_pars_fragment: "#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif",
    encodings_fragment: "gl_FragColor = linearToOutputTexel( gl_FragColor );",
    encodings_pars_fragment: "\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );\n}\nvec4 sRGBToLinear( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}\nvec4 RGBEToLinear( in vec4 value ) {\n\treturn vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n\tfloat maxComponent = max( max( value.r, value.g ), value.b );\n\tfloat fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n\treturn vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n}\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * value.a * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat M = clamp( maxRGB / maxRange, 0.0, 1.0 );\n\tM = ceil( M * 255.0 ) / 255.0;\n\treturn vec4( value.rgb / ( M * maxRange ), M );\n}\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat D = max( maxRange / maxRGB, 1.0 );\n\tD = clamp( floor( D ) / 255.0, 0.0, 1.0 );\n\treturn vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value ) {\n\tvec3 Xp_Y_XYZp = cLogLuvM * value.rgb;\n\tXp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );\n\tvec4 vResult;\n\tvResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n\tfloat Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n\tvResult.w = fract( Le );\n\tvResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;\n\treturn vResult;\n}\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n\tfloat Le = value.z * 255.0 + value.w;\n\tvec3 Xp_Y_XYZp;\n\tXp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );\n\tXp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n\tXp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n\tvec3 vRGB = cLogLuvInverseM * Xp_Y_XYZp.rgb;\n\treturn vec4( max( vRGB, 0.0 ), 1.0 );\n}",
    envmap_fragment: "#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvec3 cameraToFrag;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToFrag = normalize( vWorldPosition - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToFrag, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\tvec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\t#ifndef ENVMAP_TYPE_CUBE_UV\n\t\tenvColor = envMapTexelToLinear( envColor );\n\t#endif\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif",
    envmap_common_pars_fragment: "#ifdef USE_ENVMAP\n\tuniform float envMapIntensity;\n\tuniform float flipEnvMap;\n\tuniform int maxMipLevel;\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\t\n#endif",
    envmap_pars_fragment: "#ifdef USE_ENVMAP\n\tuniform float reflectivity;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\tvarying vec3 vWorldPosition;\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif",
    envmap_pars_vertex: "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ||defined( PHONG )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\t\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif",
    envmap_physical_pars_fragment: "#if defined( USE_ENVMAP )\n\t#ifdef ENVMAP_MODE_REFRACTION\n\t\tuniform float refractionRatio;\n\t#endif\n\tvec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );\n\t\t#else\n\t\t\tvec4 envMapColor = vec4( 0.0 );\n\t\t#endif\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t}\n\tfloat getSpecularMIPLevel( const in float roughness, const in int maxMIPLevel ) {\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\t\tfloat sigma = PI * roughness * roughness / ( 1.0 + roughness );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar + log2( sigma );\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\t}\n\tvec3 getLightProbeIndirectRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in int maxMIPLevel ) {\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( -viewDir, normal );\n\t\t\treflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( -viewDir, normal, refractionRatio );\n\t\t#endif\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\tfloat specularMIPLevel = getSpecularMIPLevel( roughness, maxMIPLevel );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );\n\t\t#endif\n\t\treturn envMapColor.rgb * envMapIntensity;\n\t}\n#endif",
    envmap_vertex: "#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif",
    fog_vertex: "#ifdef USE_FOG\n\tfogDepth = - mvPosition.z;\n#endif",
    fog_pars_vertex: "#ifdef USE_FOG\n\tvarying float fogDepth;\n#endif",
    fog_fragment: "#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = 1.0 - exp( - fogDensity * fogDensity * fogDepth * fogDepth );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif",
    fog_pars_fragment: "#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float fogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif",
    gradientmap_pars_fragment: "#ifdef USE_GRADIENTMAP\n\tuniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\tfloat dotNL = dot( normal, lightDirection );\n\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t#ifdef USE_GRADIENTMAP\n\t\treturn texture2D( gradientMap, coord ).rgb;\n\t#else\n\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\t#endif\n}",
    lightmap_fragment: "#ifdef USE_LIGHTMAP\n\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\treflectedLight.indirectDiffuse += PI * lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n#endif",
    lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif",
    lights_lambert_vertex: "vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\nvIndirectFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n\tvIndirectBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\nvIndirectFront += getAmbientLightIrradiance( ambientLightColor );\nvIndirectFront += getLightProbeIrradiance( lightProbe, geometry );\n#ifdef DOUBLE_SIDED\n\tvIndirectBack += getAmbientLightIrradiance( ambientLightColor );\n\tvIndirectBack += getLightProbeIrradiance( lightProbe, backGeometry );\n#endif\n#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\tvIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif",
    lights_pars_begin: "uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\nuniform vec3 lightProbe[ 9 ];\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n\tfloat x = normal.x, y = normal.y, z = normal.z;\n\tvec3 result = shCoefficients[ 0 ] * 0.886227;\n\tresult += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n\tresult += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n\tresult += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n\tresult += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n\tresult += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n\tresult += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n\tresult += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n\tresult += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n\treturn result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in GeometricContext geometry ) {\n\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\tvec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n\treturn irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treturn irradiance;\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tirradiance *= PI;\n\t\t#endif\n\t\treturn irradiance;\n\t}\n#endif",
    lights_toon_fragment: "ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;",
    lights_toon_pars_fragment: "varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct ToonMaterial {\n\tvec3 diffuseColor;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_Toon\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Toon\n#define Material_LightProbeLOD( material )\t(0)",
    lights_phong_fragment: "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;",
    lights_phong_pars_fragment: "varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial {\n\tvec3 diffuseColor;\n\tvec3 specularColor;\n\tfloat specularShininess;\n\tfloat specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)",
    lights_physical_fragment: "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nvec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.specularRoughness = max( roughnessFactor, 0.0525 );material.specularRoughness += geometryRoughness;\nmaterial.specularRoughness = min( material.specularRoughness, 1.0 );\n#ifdef REFLECTIVITY\n\tmaterial.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n#endif\n#ifdef CLEARCOAT\n\tmaterial.clearcoat = clearcoat;\n\tmaterial.clearcoatRoughness = clearcoatRoughness;\n\t#ifdef USE_CLEARCOATMAP\n\t\tmaterial.clearcoat *= texture2D( clearcoatMap, vUv ).x;\n\t#endif\n\t#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\t\tmaterial.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;\n\t#endif\n\tmaterial.clearcoat = saturate( material.clearcoat );\tmaterial.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n\tmaterial.clearcoatRoughness += geometryRoughness;\n\tmaterial.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_SHEEN\n\tmaterial.sheenColor = sheen;\n#endif",
    lights_physical_pars_fragment: "struct PhysicalMaterial {\n\tvec3 diffuseColor;\n\tfloat specularRoughness;\n\tvec3 specularColor;\n#ifdef CLEARCOAT\n\tfloat clearcoat;\n\tfloat clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\n\tvec3 sheenColor;\n#endif\n};\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\nfloat clearcoatDHRApprox( const in float roughness, const in float dotNL ) {\n\treturn DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.specularRoughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos + halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(\t\t0, 1,\t\t0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\t#ifdef CLEARCOAT\n\t\tfloat ccDotNL = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );\n\t\tvec3 ccIrradiance = ccDotNL * directLight.color;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tccIrradiance *= PI;\n\t\t#endif\n\t\tfloat clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );\n\t\treflectedLight.directSpecular += ccIrradiance * material.clearcoat * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );\n\t#else\n\t\tfloat clearcoatDHR = 0.0;\n\t#endif\n\t#ifdef USE_SHEEN\n\t\treflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_Sheen(\n\t\t\tmaterial.specularRoughness,\n\t\t\tdirectLight.direction,\n\t\t\tgeometry,\n\t\t\tmaterial.sheenColor\n\t\t);\n\t#else\n\t\treflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.normal, material.specularColor, material.specularRoughness);\n\t#endif\n\treflectedLight.directDiffuse += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n\t#ifdef CLEARCOAT\n\t\tfloat ccDotNV = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular += clearcoatRadiance * material.clearcoat * BRDF_Specular_GGX_Environment( geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );\n\t\tfloat ccDotNL = ccDotNV;\n\t\tfloat clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );\n\t#else\n\t\tfloat clearcoatDHR = 0.0;\n\t#endif\n\tfloat clearcoatInv = 1.0 - clearcoatDHR;\n\tvec3 singleScattering = vec3( 0.0 );\n\tvec3 multiScattering = vec3( 0.0 );\n\tvec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n\tBRDF_Specular_Multiscattering_Environment( geometry, material.specularColor, material.specularRoughness, singleScattering, multiScattering );\n\tvec3 diffuse = material.diffuseColor * ( 1.0 - ( singleScattering + multiScattering ) );\n\treflectedLight.indirectSpecular += clearcoatInv * radiance * singleScattering;\n\treflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;\n\treflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}",
    lights_fragment_begin: "\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\n#ifdef CLEARCOAT\n\tgeometry.clearcoatNormal = clearcoatNormal;\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n\t\tpointLightShadow = pointLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\tspotLightShadow = spotLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n\t\tdirectionalLightShadow = directionalLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 iblIrradiance = vec3( 0.0 );\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\tirradiance += getLightProbeIrradiance( lightProbe, geometry );\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearcoatRadiance = vec3( 0.0 );\n#endif",
    lights_fragment_maps: "#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\t\tvec3 lightMapIrradiance = lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tlightMapIrradiance *= PI;\n\t\t#endif\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tiblIrradiance += getLightProbeIndirectIrradiance( geometry, maxMipLevel );\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tradiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.normal, material.specularRoughness, maxMipLevel );\n\t#ifdef CLEARCOAT\n\t\tclearcoatRadiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness, maxMipLevel );\n\t#endif\n#endif",
    lights_fragment_end: "#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );\n#endif",
    logdepthbuf_fragment: "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tgl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif",
    logdepthbuf_pars_fragment: "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n\tvarying float vIsPerspective;\n#endif",
    logdepthbuf_pars_vertex: "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t\tvarying float vIsPerspective;\n\t#else\n\t\tuniform float logDepthBufFC;\n\t#endif\n#endif",
    logdepthbuf_vertex: "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t\tvIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n\t#else\n\t\tif ( isPerspectiveMatrix( projectionMatrix ) ) {\n\t\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\t\t\tgl_Position.z *= gl_Position.w;\n\t\t}\n\t#endif\n#endif",
    map_fragment: "#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n#endif",
    map_pars_fragment: "#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif",
    map_particle_fragment: "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n#endif\n#ifdef USE_MAP\n\tvec4 mapTexel = texture2D( map, uv );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n#endif\n#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif",
    map_particle_pars_fragment: "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\tuniform mat3 uvTransform;\n#endif\n#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif",
    metalnessmap_fragment: "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif",
    metalnessmap_pars_fragment: "#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif",
    morphnormal_vertex: "#ifdef USE_MORPHNORMALS\n\tobjectNormal *= morphTargetBaseInfluence;\n\tobjectNormal += morphNormal0 * morphTargetInfluences[ 0 ];\n\tobjectNormal += morphNormal1 * morphTargetInfluences[ 1 ];\n\tobjectNormal += morphNormal2 * morphTargetInfluences[ 2 ];\n\tobjectNormal += morphNormal3 * morphTargetInfluences[ 3 ];\n#endif",
    morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\n\tuniform float morphTargetBaseInfluence;\n\t#ifndef USE_MORPHNORMALS\n\t\tuniform float morphTargetInfluences[ 8 ];\n\t#else\n\t\tuniform float morphTargetInfluences[ 4 ];\n\t#endif\n#endif",
    morphtarget_vertex: "#ifdef USE_MORPHTARGETS\n\ttransformed *= morphTargetBaseInfluence;\n\ttransformed += morphTarget0 * morphTargetInfluences[ 0 ];\n\ttransformed += morphTarget1 * morphTargetInfluences[ 1 ];\n\ttransformed += morphTarget2 * morphTargetInfluences[ 2 ];\n\ttransformed += morphTarget3 * morphTargetInfluences[ 3 ];\n\t#ifndef USE_MORPHNORMALS\n\t\ttransformed += morphTarget4 * morphTargetInfluences[ 4 ];\n\t\ttransformed += morphTarget5 * morphTargetInfluences[ 5 ];\n\t\ttransformed += morphTarget6 * morphTargetInfluences[ 6 ];\n\t\ttransformed += morphTarget7 * morphTargetInfluences[ 7 ];\n\t#endif\n#endif",
    normal_fragment_begin: "float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * faceDirection;\n\t#endif\n\t#ifdef USE_TANGENT\n\t\tvec3 tangent = normalize( vTangent );\n\t\tvec3 bitangent = normalize( vBitangent );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\ttangent = tangent * faceDirection;\n\t\t\tbitangent = bitangent * faceDirection;\n\t\t#endif\n\t\t#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )\n\t\t\tmat3 vTBN = mat3( tangent, bitangent, normal );\n\t\t#endif\n\t#endif\n#endif\nvec3 geometryNormal = normal;",
    normal_fragment_maps: "#ifdef OBJECTSPACE_NORMALMAP\n\tnormal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t#ifdef FLIP_SIDED\n\t\tnormal = - normal;\n\t#endif\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * faceDirection;\n\t#endif\n\tnormal = normalize( normalMatrix * normal );\n#elif defined( TANGENTSPACE_NORMALMAP )\n\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\tmapN.xy *= normalScale;\n\t#ifdef USE_TANGENT\n\t\tnormal = normalize( vTBN * mapN );\n\t#else\n\t\tnormal = perturbNormal2Arb( -vViewPosition, normal, mapN, faceDirection );\n\t#endif\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd(), faceDirection );\n#endif",
    normalmap_pars_fragment: "#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n#endif\n#ifdef OBJECTSPACE_NORMALMAP\n\tuniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {\n\t\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\t\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\t\tvec3 N = surf_norm;\n\t\tvec3 q1perp = cross( q1, N );\n\t\tvec3 q0perp = cross( N, q0 );\n\t\tvec3 T = q1perp * st0.x + q0perp * st1.x;\n\t\tvec3 B = q1perp * st0.y + q0perp * st1.y;\n\t\tfloat det = max( dot( T, T ), dot( B, B ) );\n\t\tfloat scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );\n\t\treturn normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );\n\t}\n#endif",
    clearcoat_normal_fragment_begin: "#ifdef CLEARCOAT\n\tvec3 clearcoatNormal = geometryNormal;\n#endif",
    clearcoat_normal_fragment_maps: "#ifdef USE_CLEARCOAT_NORMALMAP\n\tvec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;\n\tclearcoatMapN.xy *= clearcoatNormalScale;\n\t#ifdef USE_TANGENT\n\t\tclearcoatNormal = normalize( vTBN * clearcoatMapN );\n\t#else\n\t\tclearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );\n\t#endif\n#endif",
    clearcoat_pars_fragment: "#ifdef USE_CLEARCOATMAP\n\tuniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tuniform sampler2D clearcoatRoughnessMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tuniform sampler2D clearcoatNormalMap;\n\tuniform vec2 clearcoatNormalScale;\n#endif",
    packing: "vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nvec4 pack2HalfToRGBA( vec2 v ) {\n\tvec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ));\n\treturn vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w);\n}\nvec2 unpackRGBATo2Half( vec4 v ) {\n\treturn vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}",
    premultiplied_alpha_fragment: "#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif",
    project_vertex: "vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_INSTANCING\n\tmvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;",
    dithering_fragment: "#ifdef DITHERING\n\tgl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif",
    dithering_pars_fragment: "#ifdef DITHERING\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif",
    roughnessmap_fragment: "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.g;\n#endif",
    roughnessmap_pars_fragment: "#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif",
    shadowmap_pars_fragment: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tvec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {\n\t\treturn unpackRGBATo2Half( texture2D( shadow, uv ) );\n\t}\n\tfloat VSMShadow (sampler2D shadow, vec2 uv, float compare ){\n\t\tfloat occlusion = 1.0;\n\t\tvec2 distribution = texture2DDistribution( shadow, uv );\n\t\tfloat hard_shadow = step( compare , distribution.x );\n\t\tif (hard_shadow != 1.0 ) {\n\t\t\tfloat distance = compare - distribution.x ;\n\t\t\tfloat variance = max( 0.00000, distribution.y * distribution.y );\n\t\t\tfloat softness_probability = variance / (variance + distance * distance );\t\t\tsoftness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );\t\t\tocclusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );\n\t\t}\n\t\treturn occlusion;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tfloat dx2 = dx0 / 2.0;\n\t\t\tfloat dy2 = dy0 / 2.0;\n\t\t\tfloat dx3 = dx1 / 2.0;\n\t\t\tfloat dy3 = dy1 / 2.0;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 17.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx = texelSize.x;\n\t\t\tfloat dy = texelSize.y;\n\t\t\tvec2 uv = shadowCoord.xy;\n\t\t\tvec2 f = fract( uv * shadowMapSize + 0.5 );\n\t\t\tuv -= f * texelSize;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, uv, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ), \n\t\t\t\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t\t\tf.x ),\n\t\t\t\t\t mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ), \n\t\t\t\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t\t\tf.x ),\n\t\t\t\t\t f.y )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_VSM )\n\t\t\tshadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\tdp += shadowBias;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif",
    shadowmap_pars_vertex: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n#endif",
    shadowmap_vertex: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0\n\t\tvec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\tvec4 shadowWorldPosition;\n\t#endif\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n#endif",
    shadowmask_pars_fragment: "float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tdirectionalLight = directionalLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tspotLight = spotLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tpointLight = pointLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#endif\n\treturn shadow;\n}",
    skinbase_vertex: "#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",
    skinning_pars_vertex: "#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform highp sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif",
    skinning_vertex: "#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif",
    skinnormal_vertex: "#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\t#ifdef USE_TANGENT\n\t\tobjectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#endif\n#endif",
    specularmap_fragment: "float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif",
    specularmap_pars_fragment: "#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif",
    tonemapping_fragment: "#if defined( TONE_MAPPING )\n\tgl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif",
    tonemapping_pars_fragment: "#ifndef saturate\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 RRTAndODTFit( vec3 v ) {\n\tvec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n\tvec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n\treturn a / b;\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n\tconst mat3 ACESInputMat = mat3(\n\t\tvec3( 0.59719, 0.07600, 0.02840 ),\t\tvec3( 0.35458, 0.90834, 0.13383 ),\n\t\tvec3( 0.04823, 0.01566, 0.83777 )\n\t);\n\tconst mat3 ACESOutputMat = mat3(\n\t\tvec3(\t1.60475, -0.10208, -0.00327 ),\t\tvec3( -0.53108,\t1.10813, -0.07276 ),\n\t\tvec3( -0.07367, -0.00605,\t1.07602 )\n\t);\n\tcolor *= toneMappingExposure / 0.6;\n\tcolor = ACESInputMat * color;\n\tcolor = RRTAndODTFit( color );\n\tcolor = ACESOutputMat * color;\n\treturn saturate( color );\n}\nvec3 CustomToneMapping( vec3 color ) { return color; }",
    transmissionmap_fragment: "#ifdef USE_TRANSMISSIONMAP\n\ttotalTransmission *= texture2D( transmissionMap, vUv ).r;\n#endif",
    transmissionmap_pars_fragment: "#ifdef USE_TRANSMISSIONMAP\n\tuniform sampler2D transmissionMap;\n#endif",
    uv_pars_fragment: "#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )\n\tvarying vec2 vUv;\n#endif",
    uv_pars_vertex: "#ifdef USE_UV\n\t#ifdef UVS_VERTEX_ONLY\n\t\tvec2 vUv;\n\t#else\n\t\tvarying vec2 vUv;\n\t#endif\n\tuniform mat3 uvTransform;\n#endif",
    uv_vertex: "#ifdef USE_UV\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif",
    uv2_pars_fragment: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif",
    uv2_pars_vertex: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n\tuniform mat3 uv2Transform;\n#endif",
    uv2_vertex: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;\n#endif",
    worldpos_vertex: "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )\n\tvec4 worldPosition = vec4( transformed, 1.0 );\n\t#ifdef USE_INSTANCING\n\t\tworldPosition = instanceMatrix * worldPosition;\n\t#endif\n\tworldPosition = modelMatrix * worldPosition;\n#endif",
    background_frag: "uniform sampler2D t2D;\nvarying vec2 vUv;\nvoid main() {\n\tvec4 texColor = texture2D( t2D, vUv );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}",
    background_vert: "varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\tgl_Position = vec4( position.xy, 1.0, 1.0 );\n}",
    cube_frag: "#include <envmap_common_pars_fragment>\nuniform float opacity;\nvarying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main() {\n\tvec3 vReflect = vWorldDirection;\n\t#include <envmap_fragment>\n\tgl_FragColor = envColor;\n\tgl_FragColor.a *= opacity;\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}",
    cube_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}",
    depth_frag: "#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\tfloat fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( fragCoordZ );\n\t#endif\n}",
    depth_vert: "#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvHighPrecisionZW = gl_Position.zw;\n}",
    distanceRGBA_frag: "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = packDepthToRGBA( dist );\n}",
    distanceRGBA_vert: "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}",
    equirect_frag: "uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldDirection );\n\tvec2 sampleUV = equirectUv( direction );\n\tvec4 texColor = texture2D( tEquirect, sampleUV );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}",
    equirect_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}",
    linedashed_frag: "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}",
    linedashed_vert: "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\tvLineDistance = scale * lineDistance;\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}",
    meshbasic_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\n\t\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\t\treflectedLight.indirectDiffuse += lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
    meshbasic_vert: "#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_ENVMAP\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}",
    meshlambert_frag: "uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;\n\t#else\n\t\treflectedLight.indirectDiffuse += vIndirectFront;\n\t#endif\n\t#include <lightmap_fragment>\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
    meshlambert_vert: "#define LAMBERT\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
    meshmatcap_frag: "#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n\t#ifdef USE_MATCAP\n\t\tvec4 matcapColor = texture2D( matcap, uv );\n\t\tmatcapColor = matcapTexelToLinear( matcapColor );\n\t#else\n\t\tvec4 matcapColor = vec4( 1.0 );\n\t#endif\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
    meshmatcap_vert: "#define MATCAP\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#ifndef FLAT_SHADED\n\t\tvNormal = normalize( transformedNormal );\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\tvViewPosition = - mvPosition.xyz;\n}",
    meshtoon_frag: "#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_toon_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
    meshtoon_vert: "#define TOON\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
    meshphong_frag: "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
    meshphong_vert: "#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
    meshphysical_frag: "#define STANDARD\n#ifdef PHYSICAL\n\t#define REFLECTIVITY\n\t#define CLEARCOAT\n\t#define TRANSMISSION\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef TRANSMISSION\n\tuniform float transmission;\n#endif\n#ifdef REFLECTIVITY\n\tuniform float reflectivity;\n#endif\n#ifdef CLEARCOAT\n\tuniform float clearcoat;\n\tuniform float clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\n\tuniform vec3 sheen;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <transmissionmap_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#ifdef TRANSMISSION\n\t\tfloat totalTransmission = transmission;\n\t#endif\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <clearcoat_normal_fragment_begin>\n\t#include <clearcoat_normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <transmissionmap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#ifdef TRANSMISSION\n\t\tdiffuseColor.a *= mix( saturate( 1. - totalTransmission + linearToRelativeLuminance( reflectedLight.directSpecular + reflectedLight.indirectSpecular ) ), 1.0, metalness );\n\t#endif\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
    meshphysical_vert: "#define STANDARD\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
    normal_frag: "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n}",
    normal_vert: "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}",
    points_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}",
    points_vert: "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\tgl_PointSize = size;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n}",
    shadow_frag: "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}",
    shadow_vert: "#include <common>\n#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
    sprite_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}",
    sprite_vert: "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\tvec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\t#ifndef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\t#endif\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}"
  },
        xn = {
    common: {
      diffuse: {
        value: new Ht(16777215)
      },
      opacity: {
        value: 1
      },
      map: {
        value: null
      },
      uvTransform: {
        value: new vt()
      },
      uv2Transform: {
        value: new vt()
      },
      alphaMap: {
        value: null
      }
    },
    specularmap: {
      specularMap: {
        value: null
      }
    },
    envmap: {
      envMap: {
        value: null
      },
      flipEnvMap: {
        value: -1
      },
      reflectivity: {
        value: 1
      },
      refractionRatio: {
        value: .98
      },
      maxMipLevel: {
        value: 0
      }
    },
    aomap: {
      aoMap: {
        value: null
      },
      aoMapIntensity: {
        value: 1
      }
    },
    lightmap: {
      lightMap: {
        value: null
      },
      lightMapIntensity: {
        value: 1
      }
    },
    emissivemap: {
      emissiveMap: {
        value: null
      }
    },
    bumpmap: {
      bumpMap: {
        value: null
      },
      bumpScale: {
        value: 1
      }
    },
    normalmap: {
      normalMap: {
        value: null
      },
      normalScale: {
        value: new Nt(1, 1)
      }
    },
    displacementmap: {
      displacementMap: {
        value: null
      },
      displacementScale: {
        value: 1
      },
      displacementBias: {
        value: 0
      }
    },
    roughnessmap: {
      roughnessMap: {
        value: null
      }
    },
    metalnessmap: {
      metalnessMap: {
        value: null
      }
    },
    gradientmap: {
      gradientMap: {
        value: null
      }
    },
    fog: {
      fogDensity: {
        value: 25e-5
      },
      fogNear: {
        value: 1
      },
      fogFar: {
        value: 2e3
      },
      fogColor: {
        value: new Ht(16777215)
      }
    },
    lights: {
      ambientLightColor: {
        value: []
      },
      lightProbe: {
        value: []
      },
      directionalLights: {
        value: [],
        properties: {
          direction: {},
          color: {}
        }
      },
      directionalLightShadows: {
        value: [],
        properties: {
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {}
        }
      },
      directionalShadowMap: {
        value: []
      },
      directionalShadowMatrix: {
        value: []
      },
      spotLights: {
        value: [],
        properties: {
          color: {},
          position: {},
          direction: {},
          distance: {},
          coneCos: {},
          penumbraCos: {},
          decay: {}
        }
      },
      spotLightShadows: {
        value: [],
        properties: {
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {}
        }
      },
      spotShadowMap: {
        value: []
      },
      spotShadowMatrix: {
        value: []
      },
      pointLights: {
        value: [],
        properties: {
          color: {},
          position: {},
          decay: {},
          distance: {}
        }
      },
      pointLightShadows: {
        value: [],
        properties: {
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {},
          shadowCameraNear: {},
          shadowCameraFar: {}
        }
      },
      pointShadowMap: {
        value: []
      },
      pointShadowMatrix: {
        value: []
      },
      hemisphereLights: {
        value: [],
        properties: {
          direction: {},
          skyColor: {},
          groundColor: {}
        }
      },
      rectAreaLights: {
        value: [],
        properties: {
          color: {},
          position: {},
          width: {},
          height: {}
        }
      },
      ltc_1: {
        value: null
      },
      ltc_2: {
        value: null
      }
    },
    points: {
      diffuse: {
        value: new Ht(16777215)
      },
      opacity: {
        value: 1
      },
      size: {
        value: 1
      },
      scale: {
        value: 1
      },
      map: {
        value: null
      },
      alphaMap: {
        value: null
      },
      uvTransform: {
        value: new vt()
      }
    },
    sprite: {
      diffuse: {
        value: new Ht(16777215)
      },
      opacity: {
        value: 1
      },
      center: {
        value: new Nt(.5, .5)
      },
      rotation: {
        value: 0
      },
      map: {
        value: null
      },
      alphaMap: {
        value: null
      },
      uvTransform: {
        value: new vt()
      }
    }
  },
        yn = {
    basic: {
      uniforms: Ce([xn.common, xn.specularmap, xn.envmap, xn.aomap, xn.lightmap, xn.fog]),
      vertexShader: _n.meshbasic_vert,
      fragmentShader: _n.meshbasic_frag
    },
    lambert: {
      uniforms: Ce([xn.common, xn.specularmap, xn.envmap, xn.aomap, xn.lightmap, xn.emissivemap, xn.fog, xn.lights, {
        emissive: {
          value: new Ht(0)
        }
      }]),
      vertexShader: _n.meshlambert_vert,
      fragmentShader: _n.meshlambert_frag
    },
    phong: {
      uniforms: Ce([xn.common, xn.specularmap, xn.envmap, xn.aomap, xn.lightmap, xn.emissivemap, xn.bumpmap, xn.normalmap, xn.displacementmap, xn.fog, xn.lights, {
        emissive: {
          value: new Ht(0)
        },
        specular: {
          value: new Ht(1118481)
        },
        shininess: {
          value: 30
        }
      }]),
      vertexShader: _n.meshphong_vert,
      fragmentShader: _n.meshphong_frag
    },
    standard: {
      uniforms: Ce([xn.common, xn.envmap, xn.aomap, xn.lightmap, xn.emissivemap, xn.bumpmap, xn.normalmap, xn.displacementmap, xn.roughnessmap, xn.metalnessmap, xn.fog, xn.lights, {
        emissive: {
          value: new Ht(0)
        },
        roughness: {
          value: 1
        },
        metalness: {
          value: 0
        },
        envMapIntensity: {
          value: 1
        }
      }]),
      vertexShader: _n.meshphysical_vert,
      fragmentShader: _n.meshphysical_frag
    },
    toon: {
      uniforms: Ce([xn.common, xn.aomap, xn.lightmap, xn.emissivemap, xn.bumpmap, xn.normalmap, xn.displacementmap, xn.gradientmap, xn.fog, xn.lights, {
        emissive: {
          value: new Ht(0)
        }
      }]),
      vertexShader: _n.meshtoon_vert,
      fragmentShader: _n.meshtoon_frag
    },
    matcap: {
      uniforms: Ce([xn.common, xn.bumpmap, xn.normalmap, xn.displacementmap, xn.fog, {
        matcap: {
          value: null
        }
      }]),
      vertexShader: _n.meshmatcap_vert,
      fragmentShader: _n.meshmatcap_frag
    },
    points: {
      uniforms: Ce([xn.points, xn.fog]),
      vertexShader: _n.points_vert,
      fragmentShader: _n.points_frag
    },
    dashed: {
      uniforms: Ce([xn.common, xn.fog, {
        scale: {
          value: 1
        },
        dashSize: {
          value: 1
        },
        totalSize: {
          value: 2
        }
      }]),
      vertexShader: _n.linedashed_vert,
      fragmentShader: _n.linedashed_frag
    },
    depth: {
      uniforms: Ce([xn.common, xn.displacementmap]),
      vertexShader: _n.depth_vert,
      fragmentShader: _n.depth_frag
    },
    normal: {
      uniforms: Ce([xn.common, xn.bumpmap, xn.normalmap, xn.displacementmap, {
        opacity: {
          value: 1
        }
      }]),
      vertexShader: _n.normal_vert,
      fragmentShader: _n.normal_frag
    },
    sprite: {
      uniforms: Ce([xn.sprite, xn.fog]),
      vertexShader: _n.sprite_vert,
      fragmentShader: _n.sprite_frag
    },
    background: {
      uniforms: {
        uvTransform: {
          value: new vt()
        },
        t2D: {
          value: null
        }
      },
      vertexShader: _n.background_vert,
      fragmentShader: _n.background_frag
    },
    cube: {
      uniforms: Ce([xn.envmap, {
        opacity: {
          value: 1
        }
      }]),
      vertexShader: _n.cube_vert,
      fragmentShader: _n.cube_frag
    },
    equirect: {
      uniforms: {
        tEquirect: {
          value: null
        }
      },
      vertexShader: _n.equirect_vert,
      fragmentShader: _n.equirect_frag
    },
    distanceRGBA: {
      uniforms: Ce([xn.common, xn.displacementmap, {
        referencePosition: {
          value: new Y()
        },
        nearDistance: {
          value: 1
        },
        farDistance: {
          value: 1e3
        }
      }]),
      vertexShader: _n.distanceRGBA_vert,
      fragmentShader: _n.distanceRGBA_frag
    },
    shadow: {
      uniforms: Ce([xn.lights, xn.fog, {
        color: {
          value: new Ht(0)
        },
        opacity: {
          value: 1
        }
      }]),
      vertexShader: _n.shadow_vert,
      fragmentShader: _n.shadow_frag
    }
  };

  function Mn(t, e, n, i, r) {
    const s = new Ht(0);
    let o,
        l,
        c = 0,
        h = null,
        u = 0,
        d = null;

    function p(t, e) {
      n.buffers.color.setClear(t.r, t.g, t.b, e, r);
    }

    return {
      getClearColor: function () {
        return s;
      },
      setClearColor: function (t, e = 1) {
        s.set(t), c = e, p(s, c);
      },
      getClearAlpha: function () {
        return c;
      },
      setClearAlpha: function (t) {
        c = t, p(s, c);
      },
      render: function (n, r) {
        let m = !1,
            f = !0 === r.isScene ? r.background : null;
        f && f.isTexture && (f = e.get(f));
        const g = t.xr,
              v = g.getSession && g.getSession();
        v && "additive" === v.environmentBlendMode && (f = null), null === f ? p(s, c) : f && f.isColor && (p(f, 1), m = !0), (t.autoClear || m) && t.clear(t.autoClearColor, t.autoClearDepth, t.autoClearStencil), f && (f.isCubeTexture || f.mapping === a) ? (void 0 === l && (l = new gn(new Se(1, 1, 1), new De({
          name: "BackgroundCubeMaterial",
          uniforms: Ae(yn.cube.uniforms),
          vertexShader: yn.cube.vertexShader,
          fragmentShader: yn.cube.fragmentShader,
          side: 1,
          depthTest: !1,
          depthWrite: !1,
          fog: !1
        })), l.geometry.deleteAttribute("normal"), l.geometry.deleteAttribute("uv"), l.onBeforeRender = function (t, e, n) {
          this.matrixWorld.copyPosition(n.matrixWorld);
        }, Object.defineProperty(l.material, "envMap", {
          get: function () {
            return this.uniforms.envMap.value;
          }
        }), i.update(l)), l.material.uniforms.envMap.value = f, l.material.uniforms.flipEnvMap.value = f.isCubeTexture && f._needsFlipEnvMap ? -1 : 1, h === f && u === f.version && d === t.toneMapping || (l.material.needsUpdate = !0, h = f, u = f.version, d = t.toneMapping), n.unshift(l, l.geometry, l.material, 0, 0, null)) : f && f.isTexture && (void 0 === o && (o = new gn(new Te(2, 2), new De({
          name: "BackgroundMaterial",
          uniforms: Ae(yn.background.uniforms),
          vertexShader: yn.background.vertexShader,
          fragmentShader: yn.background.fragmentShader,
          side: 0,
          depthTest: !1,
          depthWrite: !1,
          fog: !1
        })), o.geometry.deleteAttribute("normal"), Object.defineProperty(o.material, "map", {
          get: function () {
            return this.uniforms.t2D.value;
          }
        }), i.update(o)), o.material.uniforms.t2D.value = f, !0 === f.matrixAutoUpdate && f.updateMatrix(), o.material.uniforms.uvTransform.value.copy(f.matrix), h === f && u === f.version && d === t.toneMapping || (o.material.needsUpdate = !0, h = f, u = f.version, d = t.toneMapping), n.unshift(o, o.geometry, o.material, 0, 0, null));
      }
    };
  }

  function bn(t, e, n, i) {
    const r = t.getParameter(34921),
          a = i.isWebGL2 ? null : e.get("OES_vertex_array_object"),
          s = i.isWebGL2 || null !== a,
          o = {},
          l = d(null);
    let c = l;

    function h(e) {
      return i.isWebGL2 ? t.bindVertexArray(e) : a.bindVertexArrayOES(e);
    }

    function u(e) {
      return i.isWebGL2 ? t.deleteVertexArray(e) : a.deleteVertexArrayOES(e);
    }

    function d(t) {
      const e = [],
            n = [],
            i = [];

      for (let t = 0; t < r; t++) e[t] = 0, n[t] = 0, i[t] = 0;

      return {
        geometry: null,
        program: null,
        wireframe: !1,
        newAttributes: e,
        enabledAttributes: n,
        attributeDivisors: i,
        object: t,
        attributes: {},
        index: null
      };
    }

    function p() {
      const t = c.newAttributes;

      for (let e = 0, n = t.length; e < n; e++) t[e] = 0;
    }

    function m(t) {
      f(t, 0);
    }

    function f(n, r) {
      const a = c.newAttributes,
            s = c.enabledAttributes,
            o = c.attributeDivisors;

      if (a[n] = 1, 0 === s[n] && (t.enableVertexAttribArray(n), s[n] = 1), o[n] !== r) {
        (i.isWebGL2 ? t : e.get("ANGLE_instanced_arrays"))[i.isWebGL2 ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"](n, r), o[n] = r;
      }
    }

    function g() {
      const e = c.newAttributes,
            n = c.enabledAttributes;

      for (let i = 0, r = n.length; i < r; i++) n[i] !== e[i] && (t.disableVertexAttribArray(i), n[i] = 0);
    }

    function v(e, n, r, a, s, o) {
      !0 !== i.isWebGL2 || 5124 !== r && 5125 !== r ? t.vertexAttribPointer(e, n, r, a, s, o) : t.vertexAttribIPointer(e, n, r, s, o);
    }

    function _() {
      x(), c !== l && (c = l, h(c.object));
    }

    function x() {
      l.geometry = null, l.program = null, l.wireframe = !1;
    }

    return {
      setup: function (r, l, u, _, x) {
        let y = !1;

        if (s) {
          const e = function (e, n, r) {
            const s = !0 === r.wireframe;
            let l = o[e.id];
            void 0 === l && (l = {}, o[e.id] = l);
            let c = l[n.id];
            void 0 === c && (c = {}, l[n.id] = c);
            let h = c[s];
            void 0 === h && (h = d(i.isWebGL2 ? t.createVertexArray() : a.createVertexArrayOES()), c[s] = h);
            return h;
          }(_, u, l);

          c !== e && (c = e, h(c.object)), y = function (t, e) {
            const n = c.attributes,
                  i = t.attributes;
            let r = 0;

            for (const t in i) {
              const e = n[t],
                    a = i[t];
              if (void 0 === e) return !0;
              if (e.attribute !== a) return !0;
              if (e.data !== a.data) return !0;
              r++;
            }

            return c.attributesNum !== r || c.index !== e;
          }(_, x), y && function (t, e) {
            const n = {},
                  i = t.attributes;
            let r = 0;

            for (const t in i) {
              const e = i[t],
                    a = {};
              a.attribute = e, e.data && (a.data = e.data), n[t] = a, r++;
            }

            c.attributes = n, c.attributesNum = r, c.index = e;
          }(_, x);
        } else {
          const t = !0 === l.wireframe;
          c.geometry === _.id && c.program === u.id && c.wireframe === t || (c.geometry = _.id, c.program = u.id, c.wireframe = t, y = !0);
        }

        !0 === r.isInstancedMesh && (y = !0), null !== x && n.update(x, 34963), y && (!function (r, a, s, o) {
          if (!1 === i.isWebGL2 && (r.isInstancedMesh || o.isInstancedBufferGeometry) && null === e.get("ANGLE_instanced_arrays")) return;
          p();
          const l = o.attributes,
                c = s.getAttributes(),
                h = a.defaultAttributeValues;

          for (const e in c) {
            const i = c[e];

            if (i >= 0) {
              const a = l[e];

              if (void 0 !== a) {
                const e = a.normalized,
                      r = a.itemSize,
                      s = n.get(a);
                if (void 0 === s) continue;
                const l = s.buffer,
                      c = s.type,
                      h = s.bytesPerElement;

                if (a.isInterleavedBufferAttribute) {
                  const n = a.data,
                        s = n.stride,
                        u = a.offset;
                  n && n.isInstancedInterleavedBuffer ? (f(i, n.meshPerAttribute), void 0 === o._maxInstanceCount && (o._maxInstanceCount = n.meshPerAttribute * n.count)) : m(i), t.bindBuffer(34962, l), v(i, r, c, e, s * h, u * h);
                } else a.isInstancedBufferAttribute ? (f(i, a.meshPerAttribute), void 0 === o._maxInstanceCount && (o._maxInstanceCount = a.meshPerAttribute * a.count)) : m(i), t.bindBuffer(34962, l), v(i, r, c, e, 0, 0);
              } else if ("instanceMatrix" === e) {
                const e = n.get(r.instanceMatrix);
                if (void 0 === e) continue;
                const a = e.buffer,
                      s = e.type;
                f(i + 0, 1), f(i + 1, 1), f(i + 2, 1), f(i + 3, 1), t.bindBuffer(34962, a), t.vertexAttribPointer(i + 0, 4, s, !1, 64, 0), t.vertexAttribPointer(i + 1, 4, s, !1, 64, 16), t.vertexAttribPointer(i + 2, 4, s, !1, 64, 32), t.vertexAttribPointer(i + 3, 4, s, !1, 64, 48);
              } else if ("instanceColor" === e) {
                const e = n.get(r.instanceColor);
                if (void 0 === e) continue;
                const a = e.buffer,
                      s = e.type;
                f(i, 1), t.bindBuffer(34962, a), t.vertexAttribPointer(i, 3, s, !1, 12, 0);
              } else if (void 0 !== h) {
                const n = h[e];
                if (void 0 !== n) switch (n.length) {
                  case 2:
                    t.vertexAttrib2fv(i, n);
                    break;

                  case 3:
                    t.vertexAttrib3fv(i, n);
                    break;

                  case 4:
                    t.vertexAttrib4fv(i, n);
                    break;

                  default:
                    t.vertexAttrib1fv(i, n);
                }
              }
            }
          }

          g();
        }(r, l, u, _), null !== x && t.bindBuffer(34963, n.get(x).buffer));
      },
      reset: _,
      resetDefaultState: x,
      dispose: function () {
        _();

        for (const t in o) {
          const e = o[t];

          for (const t in e) {
            const n = e[t];

            for (const t in n) u(n[t].object), delete n[t];

            delete e[t];
          }

          delete o[t];
        }
      },
      releaseStatesOfGeometry: function (t) {
        if (void 0 === o[t.id]) return;
        const e = o[t.id];

        for (const t in e) {
          const n = e[t];

          for (const t in n) u(n[t].object), delete n[t];

          delete e[t];
        }

        delete o[t.id];
      },
      releaseStatesOfProgram: function (t) {
        for (const e in o) {
          const n = o[e];
          if (void 0 === n[t.id]) continue;
          const i = n[t.id];

          for (const t in i) u(i[t].object), delete i[t];

          delete n[t.id];
        }
      },
      initAttributes: p,
      enableAttribute: m,
      disableUnusedAttributes: g
    };
  }

  function wn(t, e, n, i) {
    const r = i.isWebGL2;
    let a;
    this.setMode = function (t) {
      a = t;
    }, this.render = function (e, i) {
      t.drawArrays(a, e, i), n.update(i, a, 1);
    }, this.renderInstances = function (i, s, o) {
      if (0 === o) return;
      let l, c;
      if (r) l = t, c = "drawArraysInstanced";else if (l = e.get("ANGLE_instanced_arrays"), c = "drawArraysInstancedANGLE", null === l) return void console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
      l[c](a, i, s, o), n.update(s, a, o);
    };
  }

  function Sn(t, e, n) {
    let i;

    function r(e) {
      if ("highp" === e) {
        if (t.getShaderPrecisionFormat(35633, 36338).precision > 0 && t.getShaderPrecisionFormat(35632, 36338).precision > 0) return "highp";
        e = "mediump";
      }

      return "mediump" === e && t.getShaderPrecisionFormat(35633, 36337).precision > 0 && t.getShaderPrecisionFormat(35632, 36337).precision > 0 ? "mediump" : "lowp";
    }

    const a = "undefined" != typeof WebGL2RenderingContext && t instanceof WebGL2RenderingContext || "undefined" != typeof WebGL2ComputeRenderingContext && t instanceof WebGL2ComputeRenderingContext;
    let s = void 0 !== n.precision ? n.precision : "highp";
    const o = r(s);
    o !== s && (console.warn("THREE.WebGLRenderer:", s, "not supported, using", o, "instead."), s = o);

    const l = a || e.has("WEBGL_draw_buffers"),
          c = !0 === n.logarithmicDepthBuffer,
          h = t.getParameter(34930),
          u = t.getParameter(35660),
          d = t.getParameter(3379),
          p = t.getParameter(34076),
          m = t.getParameter(34921),
          f = t.getParameter(36347),
          g = t.getParameter(36348),
          v = t.getParameter(36349),
          _ = u > 0,
          x = a || e.has("OES_texture_float");

    return {
      isWebGL2: a,
      drawBuffers: l,
      getMaxAnisotropy: function () {
        if (void 0 !== i) return i;

        if (!0 === e.has("EXT_texture_filter_anisotropic")) {
          const n = e.get("EXT_texture_filter_anisotropic");
          i = t.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
        } else i = 0;

        return i;
      },
      getMaxPrecision: r,
      precision: s,
      logarithmicDepthBuffer: c,
      maxTextures: h,
      maxVertexTextures: u,
      maxTextureSize: d,
      maxCubemapSize: p,
      maxAttributes: m,
      maxVertexUniforms: f,
      maxVaryings: g,
      maxFragmentUniforms: v,
      vertexTextures: _,
      floatFragmentTextures: x,
      floatVertexTextures: _ && x,
      maxSamples: a ? t.getParameter(36183) : 0
    };
  }

  function Tn(t) {
    const e = this;
    let n = null,
        i = 0,
        r = !1,
        a = !1;
    const s = new Mt(),
          o = new vt(),
          l = {
      value: null,
      needsUpdate: !1
    };

    function c() {
      l.value !== n && (l.value = n, l.needsUpdate = i > 0), e.numPlanes = i, e.numIntersection = 0;
    }

    function h(t, n, i, r) {
      const a = null !== t ? t.length : 0;
      let c = null;

      if (0 !== a) {
        if (c = l.value, !0 !== r || null === c) {
          const e = i + 4 * a,
                r = n.matrixWorldInverse;
          o.getNormalMatrix(r), (null === c || c.length < e) && (c = new Float32Array(e));

          for (let e = 0, n = i; e !== a; ++e, n += 4) s.copy(t[e]).applyMatrix4(r, o), s.normal.toArray(c, n), c[n + 3] = s.constant;
        }

        l.value = c, l.needsUpdate = !0;
      }

      return e.numPlanes = a, e.numIntersection = 0, c;
    }

    this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function (t, e, a) {
      const s = 0 !== t.length || e || 0 !== i || r;
      return r = e, n = h(t, a, 0), i = t.length, s;
    }, this.beginShadows = function () {
      a = !0, h(null);
    }, this.endShadows = function () {
      a = !1, c();
    }, this.setState = function (e, s, o) {
      const u = e.clippingPlanes,
            d = e.clipIntersection,
            p = e.clipShadows,
            m = t.get(e);
      if (!r || null === u || 0 === u.length || a && !p) a ? h(null) : c();else {
        const t = a ? 0 : i,
              e = 4 * t;
        let r = m.clippingState || null;
        l.value = r, r = h(u, s, e, o);

        for (let t = 0; t !== e; ++t) r[t] = n[t];

        m.clippingState = r, this.numIntersection = d ? this.numPlanes : 0, this.numPlanes += t;
      }
    };
  }

  let Ln;
  yn.physical = {
    uniforms: Ce([yn.standard.uniforms, {
      clearcoat: {
        value: 0
      },
      clearcoatMap: {
        value: null
      },
      clearcoatRoughness: {
        value: 0
      },
      clearcoatRoughnessMap: {
        value: null
      },
      clearcoatNormalScale: {
        value: new Nt(1, 1)
      },
      clearcoatNormalMap: {
        value: null
      },
      sheen: {
        value: new Ht(0)
      },
      transmission: {
        value: 0
      },
      transmissionMap: {
        value: null
      }
    }]),
    vertexShader: _n.meshphysical_vert,
    fragmentShader: _n.meshphysical_frag
  };
  let En = 0;

  class An extends kt {
    constructor(t = An.DEFAULT_IMAGE, e = An.DEFAULT_MAPPING, n = 1001, i = 1001, r = 1006, a = 1008, s = 1023, o = 1009, l = 1, c = 3e3) {
      super(), Object.defineProperty(this, "id", {
        value: En++
      }), this.uuid = V(), this.name = "", this.image = t, this.mipmaps = [], this.mapping = e, this.wrapS = n, this.wrapT = i, this.magFilter = r, this.minFilter = a, this.anisotropy = l, this.format = s, this.internalFormat = null, this.type = o, this.offset = new Nt(0, 0), this.repeat = new Nt(1, 1), this.center = new Nt(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new vt(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.encoding = c, this.version = 0, this.onUpdate = null;
    }

    updateMatrix() {
      this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
    }

    clone() {
      return new this.constructor().copy(this);
    }

    copy(t) {
      return this.name = t.name, this.image = t.image, this.mipmaps = t.mipmaps.slice(0), this.mapping = t.mapping, this.wrapS = t.wrapS, this.wrapT = t.wrapT, this.magFilter = t.magFilter, this.minFilter = t.minFilter, this.anisotropy = t.anisotropy, this.format = t.format, this.internalFormat = t.internalFormat, this.type = t.type, this.offset.copy(t.offset), this.repeat.copy(t.repeat), this.center.copy(t.center), this.rotation = t.rotation, this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrix.copy(t.matrix), this.generateMipmaps = t.generateMipmaps, this.premultiplyAlpha = t.premultiplyAlpha, this.flipY = t.flipY, this.unpackAlignment = t.unpackAlignment, this.encoding = t.encoding, this;
    }

    toJSON(t) {
      const e = void 0 === t || "string" == typeof t;
      if (!e && void 0 !== t.textures[this.uuid]) return t.textures[this.uuid];
      const n = {
        metadata: {
          version: 4.5,
          type: "Texture",
          generator: "Texture.toJSON"
        },
        uuid: this.uuid,
        name: this.name,
        mapping: this.mapping,
        repeat: [this.repeat.x, this.repeat.y],
        offset: [this.offset.x, this.offset.y],
        center: [this.center.x, this.center.y],
        rotation: this.rotation,
        wrap: [this.wrapS, this.wrapT],
        format: this.format,
        type: this.type,
        encoding: this.encoding,
        minFilter: this.minFilter,
        magFilter: this.magFilter,
        anisotropy: this.anisotropy,
        flipY: this.flipY,
        premultiplyAlpha: this.premultiplyAlpha,
        unpackAlignment: this.unpackAlignment
      };

      if (void 0 !== this.image) {
        const i = this.image;

        if (void 0 === i.uuid && (i.uuid = V()), !e && void 0 === t.images[i.uuid]) {
          let e;

          if (Array.isArray(i)) {
            e = [];

            for (let t = 0, n = i.length; t < n; t++) i[t].isDataTexture ? e.push(Cn(i[t].image)) : e.push(Cn(i[t]));
          } else e = Cn(i);

          t.images[i.uuid] = {
            uuid: i.uuid,
            url: e
          };
        }

        n.image = i.uuid;
      }

      return e || (t.textures[this.uuid] = n), n;
    }

    dispose() {
      this.dispatchEvent({
        type: "dispose"
      });
    }

    transformUv(t) {
      if (300 !== this.mapping) return t;
      if (t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1) switch (this.wrapS) {
        case o:
          t.x = t.x - Math.floor(t.x);
          break;

        case l:
          t.x = t.x < 0 ? 0 : 1;
          break;

        case c:
          1 === Math.abs(Math.floor(t.x) % 2) ? t.x = Math.ceil(t.x) - t.x : t.x = t.x - Math.floor(t.x);
      }
      if (t.y < 0 || t.y > 1) switch (this.wrapT) {
        case o:
          t.y = t.y - Math.floor(t.y);
          break;

        case l:
          t.y = t.y < 0 ? 0 : 1;
          break;

        case c:
          1 === Math.abs(Math.floor(t.y) % 2) ? t.y = Math.ceil(t.y) - t.y : t.y = t.y - Math.floor(t.y);
      }
      return this.flipY && (t.y = 1 - t.y), t;
    }

    set needsUpdate(t) {
      !0 === t && this.version++;
    }

  }

  function Cn(t) {
    return "undefined" != typeof HTMLImageElement && t instanceof HTMLImageElement || "undefined" != typeof HTMLCanvasElement && t instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && t instanceof ImageBitmap ? class {
      static getDataURL(t) {
        if (/^data:/i.test(t.src)) return t.src;
        if ("undefined" == typeof HTMLCanvasElement) return t.src;
        let e;
        if (t instanceof HTMLCanvasElement) e = t;else {
          void 0 === Ln && (Ln = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas")), Ln.width = t.width, Ln.height = t.height;
          const n = Ln.getContext("2d");
          t instanceof ImageData ? n.putImageData(t, 0, 0) : n.drawImage(t, 0, 0, t.width, t.height), e = Ln;
        }
        return e.width > 2048 || e.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", t), e.toDataURL("image/jpeg", .6)) : e.toDataURL("image/png");
      }

    }.getDataURL(t) : t.data ? {
      data: Array.prototype.slice.call(t.data),
      width: t.width,
      height: t.height,
      type: t.data.constructor.name
    } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
  }

  An.DEFAULT_IMAGE = void 0, An.DEFAULT_MAPPING = 300, An.prototype.isTexture = !0;

  class Pn extends kt {
    constructor(t, e, n) {
      super(), this.width = t, this.height = e, this.depth = 1, this.scissor = new It(0, 0, t, e), this.scissorTest = !1, this.viewport = new It(0, 0, t, e), n = n || {}, this.texture = new An(void 0, n.mapping, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.encoding), this.texture.image = {}, this.texture.image.width = t, this.texture.image.height = e, this.texture.image.depth = 1, this.texture.generateMipmaps = void 0 !== n.generateMipmaps && n.generateMipmaps, this.texture.minFilter = void 0 !== n.minFilter ? n.minFilter : p, this.depthBuffer = void 0 === n.depthBuffer || n.depthBuffer, this.stencilBuffer = void 0 !== n.stencilBuffer && n.stencilBuffer, this.depthTexture = void 0 !== n.depthTexture ? n.depthTexture : null;
    }

    setTexture(t) {
      t.image = {
        width: this.width,
        height: this.height,
        depth: this.depth
      }, this.texture = t;
    }

    setSize(t, e, n = 1) {
      this.width === t && this.height === e && this.depth === n || (this.width = t, this.height = e, this.depth = n, this.texture.image.width = t, this.texture.image.height = e, this.texture.image.depth = n, this.dispose()), this.viewport.set(0, 0, t, e), this.scissor.set(0, 0, t, e);
    }

    clone() {
      return new this.constructor().copy(this);
    }

    copy(t) {
      return this.width = t.width, this.height = t.height, this.depth = t.depth, this.viewport.copy(t.viewport), this.texture = t.texture.clone(), this.texture.image = { ...this.texture.image
      }, this.depthBuffer = t.depthBuffer, this.stencilBuffer = t.stencilBuffer, this.depthTexture = t.depthTexture, this;
    }

    dispose() {
      this.dispatchEvent({
        type: "dispose"
      });
    }

  }

  Pn.prototype.isWebGLRenderTarget = !0;

  class Dn extends me {
    constructor() {
      super(), this.type = "Camera", this.matrixWorldInverse = new Tt(), this.projectionMatrix = new Tt(), this.projectionMatrixInverse = new Tt();
    }

    copy(t, e) {
      return super.copy(t, e), this.matrixWorldInverse.copy(t.matrixWorldInverse), this.projectionMatrix.copy(t.projectionMatrix), this.projectionMatrixInverse.copy(t.projectionMatrixInverse), this;
    }

    getWorldDirection(t) {
      void 0 === t && (console.warn("THREE.Camera: .getWorldDirection() target is now required"), t = new Y()), this.updateWorldMatrix(!0, !1);
      const e = this.matrixWorld.elements;
      return t.set(-e[8], -e[9], -e[10]).normalize();
    }

    updateMatrixWorld(t) {
      super.updateMatrixWorld(t), this.matrixWorldInverse.copy(this.matrixWorld).invert();
    }

    updateWorldMatrix(t, e) {
      super.updateWorldMatrix(t, e), this.matrixWorldInverse.copy(this.matrixWorld).invert();
    }

    clone() {
      return new this.constructor().copy(this);
    }

  }

  Dn.prototype.isCamera = !0;

  class Rn extends Dn {
    constructor(t = 50, e = 1, n = .1, i = 2e3) {
      super(), this.type = "PerspectiveCamera", this.fov = t, this.zoom = 1, this.near = n, this.far = i, this.focus = 10, this.aspect = e, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
    }

    copy(t, e) {
      return super.copy(t, e), this.fov = t.fov, this.zoom = t.zoom, this.near = t.near, this.far = t.far, this.focus = t.focus, this.aspect = t.aspect, this.view = null === t.view ? null : Object.assign({}, t.view), this.filmGauge = t.filmGauge, this.filmOffset = t.filmOffset, this;
    }

    setFocalLength(t) {
      const e = .5 * this.getFilmHeight() / t;
      this.fov = 2 * H * Math.atan(e), this.updateProjectionMatrix();
    }

    getFocalLength() {
      const t = Math.tan(.5 * G * this.fov);
      return .5 * this.getFilmHeight() / t;
    }

    getEffectiveFOV() {
      return 2 * H * Math.atan(Math.tan(.5 * G * this.fov) / this.zoom);
    }

    getFilmWidth() {
      return this.filmGauge * Math.min(this.aspect, 1);
    }

    getFilmHeight() {
      return this.filmGauge / Math.max(this.aspect, 1);
    }

    setViewOffset(t, e, n, i, r, a) {
      this.aspect = t / e, null === this.view && (this.view = {
        enabled: !0,
        fullWidth: 1,
        fullHeight: 1,
        offsetX: 0,
        offsetY: 0,
        width: 1,
        height: 1
      }), this.view.enabled = !0, this.view.fullWidth = t, this.view.fullHeight = e, this.view.offsetX = n, this.view.offsetY = i, this.view.width = r, this.view.height = a, this.updateProjectionMatrix();
    }

    clearViewOffset() {
      null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix();
    }

    updateProjectionMatrix() {
      const t = this.near;
      let e = t * Math.tan(.5 * G * this.fov) / this.zoom,
          n = 2 * e,
          i = this.aspect * n,
          r = -.5 * i;
      const a = this.view;

      if (null !== this.view && this.view.enabled) {
        const t = a.fullWidth,
              s = a.fullHeight;
        r += a.offsetX * i / t, e -= a.offsetY * n / s, i *= a.width / t, n *= a.height / s;
      }

      const s = this.filmOffset;
      0 !== s && (r += t * s / this.getFilmWidth()), this.projectionMatrix.makePerspective(r, r + i, e, e - n, t, this.far), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
    }

    toJSON(t) {
      const e = super.toJSON(t);
      return e.object.fov = this.fov, e.object.zoom = this.zoom, e.object.near = this.near, e.object.far = this.far, e.object.focus = this.focus, e.object.aspect = this.aspect, null !== this.view && (e.object.view = Object.assign({}, this.view)), e.object.filmGauge = this.filmGauge, e.object.filmOffset = this.filmOffset, e;
    }

  }

  Rn.prototype.isPerspectiveCamera = !0;
  const Nn = 90;

  class In extends me {
    constructor(t, e, n) {
      if (super(), this.type = "CubeCamera", !0 !== n.isWebGLCubeRenderTarget) return void console.error("THREE.CubeCamera: The constructor now expects an instance of WebGLCubeRenderTarget as third parameter.");
      this.renderTarget = n;
      const i = new Rn(Nn, 1, t, e);
      i.layers = this.layers, i.up.set(0, -1, 0), i.lookAt(new Y(1, 0, 0)), this.add(i);
      const r = new Rn(Nn, 1, t, e);
      r.layers = this.layers, r.up.set(0, -1, 0), r.lookAt(new Y(-1, 0, 0)), this.add(r);
      const a = new Rn(Nn, 1, t, e);
      a.layers = this.layers, a.up.set(0, 0, 1), a.lookAt(new Y(0, 1, 0)), this.add(a);
      const s = new Rn(Nn, 1, t, e);
      s.layers = this.layers, s.up.set(0, 0, -1), s.lookAt(new Y(0, -1, 0)), this.add(s);
      const o = new Rn(Nn, 1, t, e);
      o.layers = this.layers, o.up.set(0, -1, 0), o.lookAt(new Y(0, 0, 1)), this.add(o);
      const l = new Rn(Nn, 1, t, e);
      l.layers = this.layers, l.up.set(0, -1, 0), l.lookAt(new Y(0, 0, -1)), this.add(l);
    }

    update(t, e) {
      null === this.parent && this.updateMatrixWorld();
      const n = this.renderTarget,
            [i, r, a, s, o, l] = this.children,
            c = t.xr.enabled,
            h = t.getRenderTarget();
      t.xr.enabled = !1;
      const u = n.texture.generateMipmaps;
      n.texture.generateMipmaps = !1, t.setRenderTarget(n, 0), t.render(e, i), t.setRenderTarget(n, 1), t.render(e, r), t.setRenderTarget(n, 2), t.render(e, a), t.setRenderTarget(n, 3), t.render(e, s), t.setRenderTarget(n, 4), t.render(e, o), n.texture.generateMipmaps = u, t.setRenderTarget(n, 5), t.render(e, l), t.setRenderTarget(h), t.xr.enabled = c;
    }

  }

  class zn extends An {
    constructor(t, e, n, r, a, s, o, l, c, h) {
      super(t = void 0 !== t ? t : [], e = void 0 !== e ? e : i, n, r, a, s, o = void 0 !== o ? o : M, l, c, h), this._needsFlipEnvMap = !0, this.flipY = !1;
    }

    get images() {
      return this.image;
    }

    set images(t) {
      this.image = t;
    }

  }

  zn.prototype.isCubeTexture = !0;

  class Fn extends Pn {
    constructor(t, e, n) {
      Number.isInteger(e) && (console.warn("THREE.WebGLCubeRenderTarget: constructor signature is now WebGLCubeRenderTarget( size, options )"), e = n), super(t, t, e), e = e || {}, this.texture = new zn(void 0, e.mapping, e.wrapS, e.wrapT, e.magFilter, e.minFilter, e.format, e.type, e.anisotropy, e.encoding), this.texture.generateMipmaps = void 0 !== e.generateMipmaps && e.generateMipmaps, this.texture.minFilter = void 0 !== e.minFilter ? e.minFilter : p, this.texture._needsFlipEnvMap = !1;
    }

    fromEquirectangularTexture(t, e) {
      this.texture.type = e.type, this.texture.format = b, this.texture.encoding = e.encoding, this.texture.generateMipmaps = e.generateMipmaps, this.texture.minFilter = e.minFilter, this.texture.magFilter = e.magFilter;
      const n = {
        uniforms: {
          tEquirect: {
            value: null
          }
        },
        vertexShader: "\n\n\t\t\t\tvarying vec3 vWorldDirection;\n\n\t\t\t\tvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\n\t\t\t\t\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n\n\t\t\t\t}\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tvWorldDirection = transformDirection( position, modelMatrix );\n\n\t\t\t\t\t#include <begin_vertex>\n\t\t\t\t\t#include <project_vertex>\n\n\t\t\t\t}\n\t\t\t",
        fragmentShader: "\n\n\t\t\t\tuniform sampler2D tEquirect;\n\n\t\t\t\tvarying vec3 vWorldDirection;\n\n\t\t\t\t#include <common>\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tvec3 direction = normalize( vWorldDirection );\n\n\t\t\t\t\tvec2 sampleUV = equirectUv( direction );\n\n\t\t\t\t\tgl_FragColor = texture2D( tEquirect, sampleUV );\n\n\t\t\t\t}\n\t\t\t"
      },
            i = new Se(5, 5, 5),
            r = new De({
        name: "CubemapFromEquirect",
        uniforms: Ae(n.uniforms),
        vertexShader: n.vertexShader,
        fragmentShader: n.fragmentShader,
        side: 1,
        blending: 0
      });
      r.uniforms.tEquirect.value = e;
      const a = new gn(i, r),
            s = e.minFilter;
      e.minFilter === m && (e.minFilter = p);
      return new In(1, 10, this).update(t, a), e.minFilter = s, a.geometry.dispose(), a.material.dispose(), this;
    }

    clear(t, e, n, i) {
      const r = t.getRenderTarget();

      for (let r = 0; r < 6; r++) t.setRenderTarget(this, r), t.clear(e, n, i);

      t.setRenderTarget(r);
    }

  }

  function On(t) {
    let e = new WeakMap();

    function n(t, e) {
      return 303 === e ? t.mapping = i : 304 === e && (t.mapping = r), t;
    }

    function a(t) {
      const n = t.target;
      n.removeEventListener("dispose", a);
      const i = e.get(n);
      void 0 !== i && (e.delete(n), i.dispose());
    }

    return {
      get: function (i) {
        if (i && i.isTexture) {
          const r = i.mapping;

          if (303 === r || 304 === r) {
            if (e.has(i)) {
              return n(e.get(i).texture, i.mapping);
            }

            {
              const r = i.image;

              if (r && r.height > 0) {
                const s = t.getRenderTarget(),
                      o = new Fn(r.height / 2);
                return o.fromEquirectangularTexture(t, i), e.set(i, o), t.setRenderTarget(s), i.addEventListener("dispose", a), n(o.texture, i.mapping);
              }

              return null;
            }
          }
        }

        return i;
      },
      dispose: function () {
        e = new WeakMap();
      }
    };
  }

  function Un(t) {
    const e = {};

    function n(n) {
      if (void 0 !== e[n]) return e[n];
      let i;

      switch (n) {
        case "WEBGL_depth_texture":
          i = t.getExtension("WEBGL_depth_texture") || t.getExtension("MOZ_WEBGL_depth_texture") || t.getExtension("WEBKIT_WEBGL_depth_texture");
          break;

        case "EXT_texture_filter_anisotropic":
          i = t.getExtension("EXT_texture_filter_anisotropic") || t.getExtension("MOZ_EXT_texture_filter_anisotropic") || t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
          break;

        case "WEBGL_compressed_texture_s3tc":
          i = t.getExtension("WEBGL_compressed_texture_s3tc") || t.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
          break;

        case "WEBGL_compressed_texture_pvrtc":
          i = t.getExtension("WEBGL_compressed_texture_pvrtc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
          break;

        default:
          i = t.getExtension(n);
      }

      return e[n] = i, i;
    }

    return {
      has: function (t) {
        return null !== n(t);
      },
      init: function (t) {
        t.isWebGL2 ? n("EXT_color_buffer_float") : (n("WEBGL_depth_texture"), n("OES_texture_float"), n("OES_texture_half_float"), n("OES_texture_half_float_linear"), n("OES_standard_derivatives"), n("OES_element_index_uint"), n("OES_vertex_array_object"), n("ANGLE_instanced_arrays")), n("OES_texture_float_linear"), n("EXT_color_buffer_half_float");
      },
      get: function (t) {
        const e = n(t);
        return null === e && console.warn("THREE.WebGLRenderer: " + t + " extension not supported."), e;
      }
    };
  }

  function Bn(t, e, n, i) {
    const r = {},
          a = new WeakMap();

    function s(t) {
      const o = t.target;
      null !== o.index && e.remove(o.index);

      for (const t in o.attributes) e.remove(o.attributes[t]);

      o.removeEventListener("dispose", s), delete r[o.id];
      const l = a.get(o);
      l && (e.remove(l), a.delete(o)), i.releaseStatesOfGeometry(o), !0 === o.isInstancedBufferGeometry && delete o._maxInstanceCount, n.memory.geometries--;
    }

    function o(t) {
      const n = [],
            i = t.index,
            r = t.attributes.position;
      let s = 0;

      if (null !== i) {
        const t = i.array;
        s = i.version;

        for (let e = 0, i = t.length; e < i; e += 3) {
          const i = t[e + 0],
                r = t[e + 1],
                a = t[e + 2];
          n.push(i, r, r, a, a, i);
        }
      } else {
        const t = r.array;
        s = r.version;

        for (let e = 0, i = t.length / 3 - 1; e < i; e += 3) {
          const t = e + 0,
                i = e + 1,
                r = e + 2;
          n.push(t, i, i, r, r, t);
        }
      }

      const o = new (fe(n) > 65535 ? Zt : Yt)(n, 1);
      o.version = s;
      const l = a.get(t);
      l && e.remove(l), a.set(t, o);
    }

    return {
      get: function (t, e) {
        return !0 === r[e.id] || (e.addEventListener("dispose", s), r[e.id] = !0, n.memory.geometries++), e;
      },
      update: function (t) {
        const n = t.attributes;

        for (const t in n) e.update(n[t], 34962);

        const i = t.morphAttributes;

        for (const t in i) {
          const n = i[t];

          for (let t = 0, i = n.length; t < i; t++) e.update(n[t], 34962);
        }
      },
      getWireframeAttribute: function (t) {
        const e = a.get(t);

        if (e) {
          const n = t.index;
          null !== n && e.version < n.version && o(t);
        } else o(t);

        return a.get(t);
      }
    };
  }

  function Gn(t, e, n, i) {
    const r = i.isWebGL2;
    let a, s, o;
    this.setMode = function (t) {
      a = t;
    }, this.setIndex = function (t) {
      s = t.type, o = t.bytesPerElement;
    }, this.render = function (e, i) {
      t.drawElements(a, i, s, e * o), n.update(i, a, 1);
    }, this.renderInstances = function (i, l, c) {
      if (0 === c) return;
      let h, u;
      if (r) h = t, u = "drawElementsInstanced";else if (h = e.get("ANGLE_instanced_arrays"), u = "drawElementsInstancedANGLE", null === h) return void console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
      h[u](a, l, s, i * o, c), n.update(l, a, c);
    };
  }

  function Hn(t) {
    const e = {
      frame: 0,
      calls: 0,
      triangles: 0,
      points: 0,
      lines: 0
    };
    return {
      memory: {
        geometries: 0,
        textures: 0
      },
      render: e,
      programs: null,
      autoReset: !0,
      reset: function () {
        e.frame++, e.calls = 0, e.triangles = 0, e.points = 0, e.lines = 0;
      },
      update: function (t, n, i) {
        switch (e.calls++, n) {
          case 4:
            e.triangles += i * (t / 3);
            break;

          case 1:
            e.lines += i * (t / 2);
            break;

          case 3:
            e.lines += i * (t - 1);
            break;

          case 2:
            e.lines += i * t;
            break;

          case 0:
            e.points += i * t;
            break;

          default:
            console.error("THREE.WebGLInfo: Unknown draw mode:", n);
        }
      }
    };
  }

  function Vn(t, e) {
    return t[0] - e[0];
  }

  function Wn(t, e) {
    return Math.abs(e[1]) - Math.abs(t[1]);
  }

  function kn(t) {
    const e = {},
          n = new Float32Array(8),
          i = [];

    for (let t = 0; t < 8; t++) i[t] = [t, 0];

    return {
      update: function (r, a, s, o) {
        const l = r.morphTargetInfluences,
              c = void 0 === l ? 0 : l.length;
        let h = e[a.id];

        if (void 0 === h) {
          h = [];

          for (let t = 0; t < c; t++) h[t] = [t, 0];

          e[a.id] = h;
        }

        for (let t = 0; t < c; t++) {
          const e = h[t];
          e[0] = t, e[1] = l[t];
        }

        h.sort(Wn);

        for (let t = 0; t < 8; t++) t < c && h[t][1] ? (i[t][0] = h[t][0], i[t][1] = h[t][1]) : (i[t][0] = Number.MAX_SAFE_INTEGER, i[t][1] = 0);

        i.sort(Vn);
        const u = s.morphTargets && a.morphAttributes.position,
              d = s.morphNormals && a.morphAttributes.normal;
        let p = 0;

        for (let t = 0; t < 8; t++) {
          const e = i[t],
                r = e[0],
                s = e[1];
          r !== Number.MAX_SAFE_INTEGER && s ? (u && a.getAttribute("morphTarget" + t) !== u[r] && a.setAttribute("morphTarget" + t, u[r]), d && a.getAttribute("morphNormal" + t) !== d[r] && a.setAttribute("morphNormal" + t, d[r]), n[t] = s, p += s) : (u && !0 === a.hasAttribute("morphTarget" + t) && a.deleteAttribute("morphTarget" + t), d && !0 === a.hasAttribute("morphNormal" + t) && a.deleteAttribute("morphNormal" + t), n[t] = 0);
        }

        const m = a.morphTargetsRelative ? 1 : 1 - p;
        o.getUniforms().setValue(t, "morphTargetBaseInfluence", m), o.getUniforms().setValue(t, "morphTargetInfluences", n);
      }
    };
  }

  function qn(t, e, n, i) {
    let r = new WeakMap();

    function a(t) {
      const e = t.target;
      e.removeEventListener("dispose", a), n.remove(e.instanceMatrix), null !== e.instanceColor && n.remove(e.instanceColor);
    }

    return {
      update: function (t) {
        const s = i.render.frame,
              o = t.geometry,
              l = e.get(t, o);
        return r.get(l) !== s && (e.update(l), r.set(l, s)), t.isInstancedMesh && (!1 === t.hasEventListener("dispose", a) && t.addEventListener("dispose", a), n.update(t.instanceMatrix, 34962), null !== t.instanceColor && n.update(t.instanceColor, 34962)), l;
      },
      dispose: function () {
        r = new WeakMap();
      }
    };
  }

  Fn.prototype.isWebGLCubeRenderTarget = !0;

  class jn extends An {
    constructor(t = null, e = 1, n = 1, i = 1) {
      super(null), this.image = {
        data: t,
        width: e,
        height: n,
        depth: i
      }, this.magFilter = h, this.minFilter = h, this.wrapR = l, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.needsUpdate = !0;
    }

  }

  jn.prototype.isDataTexture2DArray = !0;

  class Xn extends An {
    constructor(t = null, e = 1, n = 1, i = 1) {
      super(null), this.image = {
        data: t,
        width: e,
        height: n,
        depth: i
      }, this.magFilter = h, this.minFilter = h, this.wrapR = l, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.needsUpdate = !0;
    }

  }

  Xn.prototype.isDataTexture3D = !0;
  const Yn = new An(),
        Zn = new jn(),
        Jn = new Xn(),
        Qn = new zn(),
        Kn = [],
        $n = [],
        ti = new Float32Array(16),
        ei = new Float32Array(9),
        ni = new Float32Array(4);

  function ii(t, e, n) {
    const i = t[0];
    if (i <= 0 || i > 0) return t;
    const r = e * n;
    let a = Kn[r];

    if (void 0 === a && (a = new Float32Array(r), Kn[r] = a), 0 !== e) {
      i.toArray(a, 0);

      for (let i = 1, r = 0; i !== e; ++i) r += n, t[i].toArray(a, r);
    }

    return a;
  }

  function ri(t, e) {
    if (t.length !== e.length) return !1;

    for (let n = 0, i = t.length; n < i; n++) if (t[n] !== e[n]) return !1;

    return !0;
  }

  function ai(t, e) {
    for (let n = 0, i = e.length; n < i; n++) t[n] = e[n];
  }

  function si(t, e) {
    let n = $n[e];
    void 0 === n && (n = new Int32Array(e), $n[e] = n);

    for (let i = 0; i !== e; ++i) n[i] = t.allocateTextureUnit();

    return n;
  }

  function oi(t, e) {
    const n = this.cache;
    n[0] !== e && (t.uniform1f(this.addr, e), n[0] = e);
  }

  function li(t, e) {
    const n = this.cache;
    if (void 0 !== e.x) n[0] === e.x && n[1] === e.y || (t.uniform2f(this.addr, e.x, e.y), n[0] = e.x, n[1] = e.y);else {
      if (ri(n, e)) return;
      t.uniform2fv(this.addr, e), ai(n, e);
    }
  }

  function ci(t, e) {
    const n = this.cache;
    if (void 0 !== e.x) n[0] === e.x && n[1] === e.y && n[2] === e.z || (t.uniform3f(this.addr, e.x, e.y, e.z), n[0] = e.x, n[1] = e.y, n[2] = e.z);else if (void 0 !== e.r) n[0] === e.r && n[1] === e.g && n[2] === e.b || (t.uniform3f(this.addr, e.r, e.g, e.b), n[0] = e.r, n[1] = e.g, n[2] = e.b);else {
      if (ri(n, e)) return;
      t.uniform3fv(this.addr, e), ai(n, e);
    }
  }

  function hi(t, e) {
    const n = this.cache;
    if (void 0 !== e.x) n[0] === e.x && n[1] === e.y && n[2] === e.z && n[3] === e.w || (t.uniform4f(this.addr, e.x, e.y, e.z, e.w), n[0] = e.x, n[1] = e.y, n[2] = e.z, n[3] = e.w);else {
      if (ri(n, e)) return;
      t.uniform4fv(this.addr, e), ai(n, e);
    }
  }

  function ui(t, e) {
    const n = this.cache,
          i = e.elements;

    if (void 0 === i) {
      if (ri(n, e)) return;
      t.uniformMatrix2fv(this.addr, !1, e), ai(n, e);
    } else {
      if (ri(n, i)) return;
      ni.set(i), t.uniformMatrix2fv(this.addr, !1, ni), ai(n, i);
    }
  }

  function di(t, e) {
    const n = this.cache,
          i = e.elements;

    if (void 0 === i) {
      if (ri(n, e)) return;
      t.uniformMatrix3fv(this.addr, !1, e), ai(n, e);
    } else {
      if (ri(n, i)) return;
      ei.set(i), t.uniformMatrix3fv(this.addr, !1, ei), ai(n, i);
    }
  }

  function pi(t, e) {
    const n = this.cache,
          i = e.elements;

    if (void 0 === i) {
      if (ri(n, e)) return;
      t.uniformMatrix4fv(this.addr, !1, e), ai(n, e);
    } else {
      if (ri(n, i)) return;
      ti.set(i), t.uniformMatrix4fv(this.addr, !1, ti), ai(n, i);
    }
  }

  function mi(t, e) {
    const n = this.cache;
    n[0] !== e && (t.uniform1i(this.addr, e), n[0] = e);
  }

  function fi(t, e) {
    const n = this.cache;
    ri(n, e) || (t.uniform2iv(this.addr, e), ai(n, e));
  }

  function gi(t, e) {
    const n = this.cache;
    ri(n, e) || (t.uniform3iv(this.addr, e), ai(n, e));
  }

  function vi(t, e) {
    const n = this.cache;
    ri(n, e) || (t.uniform4iv(this.addr, e), ai(n, e));
  }

  function _i(t, e) {
    const n = this.cache;
    n[0] !== e && (t.uniform1ui(this.addr, e), n[0] = e);
  }

  function xi(t, e) {
    const n = this.cache;
    ri(n, e) || (t.uniform2uiv(this.addr, e), ai(n, e));
  }

  function yi(t, e) {
    const n = this.cache;
    ri(n, e) || (t.uniform3uiv(this.addr, e), ai(n, e));
  }

  function Mi(t, e) {
    const n = this.cache;
    ri(n, e) || (t.uniform4uiv(this.addr, e), ai(n, e));
  }

  function bi(t, e, n) {
    const i = this.cache,
          r = n.allocateTextureUnit();
    i[0] !== r && (t.uniform1i(this.addr, r), i[0] = r), n.safeSetTexture2D(e || Yn, r);
  }

  function wi(t, e, n) {
    const i = this.cache,
          r = n.allocateTextureUnit();
    i[0] !== r && (t.uniform1i(this.addr, r), i[0] = r), n.setTexture3D(e || Jn, r);
  }

  function Si(t, e, n) {
    const i = this.cache,
          r = n.allocateTextureUnit();
    i[0] !== r && (t.uniform1i(this.addr, r), i[0] = r), n.safeSetTextureCube(e || Qn, r);
  }

  function Ti(t, e, n) {
    const i = this.cache,
          r = n.allocateTextureUnit();
    i[0] !== r && (t.uniform1i(this.addr, r), i[0] = r), n.setTexture2DArray(e || Zn, r);
  }

  function Li(t, e) {
    t.uniform1fv(this.addr, e);
  }

  function Ei(t, e) {
    const n = ii(e, this.size, 2);
    t.uniform2fv(this.addr, n);
  }

  function Ai(t, e) {
    const n = ii(e, this.size, 3);
    t.uniform3fv(this.addr, n);
  }

  function Ci(t, e) {
    const n = ii(e, this.size, 4);
    t.uniform4fv(this.addr, n);
  }

  function Pi(t, e) {
    const n = ii(e, this.size, 4);
    t.uniformMatrix2fv(this.addr, !1, n);
  }

  function Di(t, e) {
    const n = ii(e, this.size, 9);
    t.uniformMatrix3fv(this.addr, !1, n);
  }

  function Ri(t, e) {
    const n = ii(e, this.size, 16);
    t.uniformMatrix4fv(this.addr, !1, n);
  }

  function Ni(t, e) {
    t.uniform1iv(this.addr, e);
  }

  function Ii(t, e) {
    t.uniform2iv(this.addr, e);
  }

  function zi(t, e) {
    t.uniform3iv(this.addr, e);
  }

  function Fi(t, e) {
    t.uniform4iv(this.addr, e);
  }

  function Oi(t, e) {
    t.uniform1uiv(this.addr, e);
  }

  function Ui(t, e) {
    t.uniform2uiv(this.addr, e);
  }

  function Bi(t, e) {
    t.uniform3uiv(this.addr, e);
  }

  function Gi(t, e) {
    t.uniform4uiv(this.addr, e);
  }

  function Hi(t, e, n) {
    const i = e.length,
          r = si(n, i);
    t.uniform1iv(this.addr, r);

    for (let t = 0; t !== i; ++t) n.safeSetTexture2D(e[t] || Yn, r[t]);
  }

  function Vi(t, e, n) {
    const i = e.length,
          r = si(n, i);
    t.uniform1iv(this.addr, r);

    for (let t = 0; t !== i; ++t) n.safeSetTextureCube(e[t] || Qn, r[t]);
  }

  function Wi(t, e, n) {
    this.id = t, this.addr = n, this.cache = [], this.setValue = function (t) {
      switch (t) {
        case 5126:
          return oi;

        case 35664:
          return li;

        case 35665:
          return ci;

        case 35666:
          return hi;

        case 35674:
          return ui;

        case 35675:
          return di;

        case 35676:
          return pi;

        case 5124:
        case 35670:
          return mi;

        case 35667:
        case 35671:
          return fi;

        case 35668:
        case 35672:
          return gi;

        case 35669:
        case 35673:
          return vi;

        case 5125:
          return _i;

        case 36294:
          return xi;

        case 36295:
          return yi;

        case 36296:
          return Mi;

        case 35678:
        case 36198:
        case 36298:
        case 36306:
        case 35682:
          return bi;

        case 35679:
        case 36299:
        case 36307:
          return wi;

        case 35680:
        case 36300:
        case 36308:
        case 36293:
          return Si;

        case 36289:
        case 36303:
        case 36311:
        case 36292:
          return Ti;
      }
    }(e.type);
  }

  function ki(t, e, n) {
    this.id = t, this.addr = n, this.cache = [], this.size = e.size, this.setValue = function (t) {
      switch (t) {
        case 5126:
          return Li;

        case 35664:
          return Ei;

        case 35665:
          return Ai;

        case 35666:
          return Ci;

        case 35674:
          return Pi;

        case 35675:
          return Di;

        case 35676:
          return Ri;

        case 5124:
        case 35670:
          return Ni;

        case 35667:
        case 35671:
          return Ii;

        case 35668:
        case 35672:
          return zi;

        case 35669:
        case 35673:
          return Fi;

        case 5125:
          return Oi;

        case 36294:
          return Ui;

        case 36295:
          return Bi;

        case 36296:
          return Gi;

        case 35678:
        case 36198:
        case 36298:
        case 36306:
        case 35682:
          return Hi;

        case 35680:
        case 36300:
        case 36308:
        case 36293:
          return Vi;
      }
    }(e.type);
  }

  function qi(t) {
    this.id = t, this.seq = [], this.map = {};
  }

  ki.prototype.updateCache = function (t) {
    const e = this.cache;
    t instanceof Float32Array && e.length !== t.length && (this.cache = new Float32Array(t.length)), ai(e, t);
  }, qi.prototype.setValue = function (t, e, n) {
    const i = this.seq;

    for (let r = 0, a = i.length; r !== a; ++r) {
      const a = i[r];
      a.setValue(t, e[a.id], n);
    }
  };
  const ji = /(\w+)(\])?(\[|\.)?/g;

  function Xi(t, e) {
    t.seq.push(e), t.map[e.id] = e;
  }

  function Yi(t, e, n) {
    const i = t.name,
          r = i.length;

    for (ji.lastIndex = 0;;) {
      const a = ji.exec(i),
            s = ji.lastIndex;
      let o = a[1];
      const l = "]" === a[2],
            c = a[3];

      if (l && (o |= 0), void 0 === c || "[" === c && s + 2 === r) {
        Xi(n, void 0 === c ? new Wi(o, t, e) : new ki(o, t, e));
        break;
      }

      {
        let t = n.map[o];
        void 0 === t && (t = new qi(o), Xi(n, t)), n = t;
      }
    }
  }

  function Zi(t, e) {
    this.seq = [], this.map = {};
    const n = t.getProgramParameter(e, 35718);

    for (let i = 0; i < n; ++i) {
      const n = t.getActiveUniform(e, i);
      Yi(n, t.getUniformLocation(e, n.name), this);
    }
  }

  function Ji(t, e, n) {
    const i = t.createShader(e);
    return t.shaderSource(i, n), t.compileShader(i), i;
  }

  Zi.prototype.setValue = function (t, e, n, i) {
    const r = this.map[e];
    void 0 !== r && r.setValue(t, n, i);
  }, Zi.prototype.setOptional = function (t, e, n) {
    const i = e[n];
    void 0 !== i && this.setValue(t, n, i);
  }, Zi.upload = function (t, e, n, i) {
    for (let r = 0, a = e.length; r !== a; ++r) {
      const a = e[r],
            s = n[a.id];
      !1 !== s.needsUpdate && a.setValue(t, s.value, i);
    }
  }, Zi.seqWithValue = function (t, e) {
    const n = [];

    for (let i = 0, r = t.length; i !== r; ++i) {
      const r = t[i];
      r.id in e && n.push(r);
    }

    return n;
  };
  let Qi = 0;

  function Ki(t) {
    switch (t) {
      case z:
        return ["Linear", "( value )"];

      case 3001:
        return ["sRGB", "( value )"];

      case 3002:
        return ["RGBE", "( value )"];

      case 3004:
        return ["RGBM", "( value, 7.0 )"];

      case 3005:
        return ["RGBM", "( value, 16.0 )"];

      case 3006:
        return ["RGBD", "( value, 256.0 )"];

      case 3007:
        return ["Gamma", "( value, float( GAMMA_FACTOR ) )"];

      case 3003:
        return ["LogLuv", "( value )"];

      default:
        return console.warn("THREE.WebGLProgram: Unsupported encoding:", t), ["Linear", "( value )"];
    }
  }

  function $i(t, e, n) {
    const i = t.getShaderParameter(e, 35713),
          r = t.getShaderInfoLog(e).trim();
    if (i && "" === r) return "";
    return "THREE.WebGLShader: gl.getShaderInfoLog() " + n + "\n" + r + function (t) {
      const e = t.split("\n");

      for (let t = 0; t < e.length; t++) e[t] = t + 1 + ": " + e[t];

      return e.join("\n");
    }(t.getShaderSource(e));
  }

  function tr(t, e) {
    const n = Ki(e);
    return "vec4 " + t + "( vec4 value ) { return " + n[0] + "ToLinear" + n[1] + "; }";
  }

  function er(t, e) {
    const n = Ki(e);
    return "vec4 " + t + "( vec4 value ) { return LinearTo" + n[0] + n[1] + "; }";
  }

  function nr(t, e) {
    let n;

    switch (e) {
      case 1:
        n = "Linear";
        break;

      case 2:
        n = "Reinhard";
        break;

      case 3:
        n = "OptimizedCineon";
        break;

      case 4:
        n = "ACESFilmic";
        break;

      case 5:
        n = "Custom";
        break;

      default:
        console.warn("THREE.WebGLProgram: Unsupported toneMapping:", e), n = "Linear";
    }

    return "vec3 " + t + "( vec3 color ) { return " + n + "ToneMapping( color ); }";
  }

  function ir(t) {
    return "" !== t;
  }

  function rr(t, e) {
    return t.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows);
  }

  function ar(t, e) {
    return t.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection);
  }

  const sr = /^[ \t]*#include +<([\w\d./]+)>/gm;

  function or(t) {
    return t.replace(sr, lr);
  }

  function lr(t, e) {
    const n = _n[e];
    if (void 0 === n) throw new Error("Can not resolve #include <" + e + ">");
    return or(n);
  }

  const cr = /#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g,
        hr = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;

  function ur(t) {
    return t.replace(hr, pr).replace(cr, dr);
  }

  function dr(t, e, n, i) {
    return console.warn("WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead."), pr(t, e, n, i);
  }

  function pr(t, e, n, i) {
    let r = "";

    for (let t = parseInt(e); t < parseInt(n); t++) r += i.replace(/\[\s*i\s*\]/g, "[ " + t + " ]").replace(/UNROLLED_LOOP_INDEX/g, t);

    return r;
  }

  function mr(t) {
    let e = "precision " + t.precision + " float;\nprecision " + t.precision + " int;";
    return "highp" === t.precision ? e += "\n#define HIGH_PRECISION" : "mediump" === t.precision ? e += "\n#define MEDIUM_PRECISION" : "lowp" === t.precision && (e += "\n#define LOW_PRECISION"), e;
  }

  function fr(t, e, n, o) {
    const l = t.getContext(),
          c = n.defines;
    let h = n.vertexShader,
        u = n.fragmentShader;

    const d = function (t) {
      let e = "SHADOWMAP_TYPE_BASIC";
      return 1 === t.shadowMapType ? e = "SHADOWMAP_TYPE_PCF" : 2 === t.shadowMapType ? e = "SHADOWMAP_TYPE_PCF_SOFT" : 3 === t.shadowMapType && (e = "SHADOWMAP_TYPE_VSM"), e;
    }(n),
          p = function (t) {
      let e = "ENVMAP_TYPE_CUBE";
      if (t.envMap) switch (t.envMapMode) {
        case i:
        case r:
          e = "ENVMAP_TYPE_CUBE";
          break;

        case a:
        case s:
          e = "ENVMAP_TYPE_CUBE_UV";
      }
      return e;
    }(n),
          m = function (t) {
      let e = "ENVMAP_MODE_REFLECTION";
      if (t.envMap) switch (t.envMapMode) {
        case r:
        case s:
          e = "ENVMAP_MODE_REFRACTION";
      }
      return e;
    }(n),
          f = function (t) {
      let e = "ENVMAP_BLENDING_NONE";
      if (t.envMap) switch (t.combine) {
        case 0:
          e = "ENVMAP_BLENDING_MULTIPLY";
          break;

        case 1:
          e = "ENVMAP_BLENDING_MIX";
          break;

        case 2:
          e = "ENVMAP_BLENDING_ADD";
      }
      return e;
    }(n),
          g = t.gammaFactor > 0 ? t.gammaFactor : 1,
          v = n.isWebGL2 ? "" : function (t) {
      return [t.extensionDerivatives || t.envMapCubeUV || t.bumpMap || t.tangentSpaceNormalMap || t.clearcoatNormalMap || t.flatShading || "physical" === t.shaderID ? "#extension GL_OES_standard_derivatives : enable" : "", (t.extensionFragDepth || t.logarithmicDepthBuffer) && t.rendererExtensionFragDepth ? "#extension GL_EXT_frag_depth : enable" : "", t.extensionDrawBuffers && t.rendererExtensionDrawBuffers ? "#extension GL_EXT_draw_buffers : require" : "", (t.extensionShaderTextureLOD || t.envMap) && t.rendererExtensionShaderTextureLod ? "#extension GL_EXT_shader_texture_lod : enable" : ""].filter(ir).join("\n");
    }(n),
          _ = function (t) {
      const e = [];

      for (const n in t) {
        const i = t[n];
        !1 !== i && e.push("#define " + n + " " + i);
      }

      return e.join("\n");
    }(c),
          x = l.createProgram();

    let y,
        M,
        b = n.glslVersion ? "#version " + n.glslVersion + "\n" : "";
    n.isRawShaderMaterial ? (y = [_].filter(ir).join("\n"), y.length > 0 && (y += "\n"), M = [v, _].filter(ir).join("\n"), M.length > 0 && (M += "\n")) : (y = [mr(n), "#define SHADER_NAME " + n.shaderName, _, n.instancing ? "#define USE_INSTANCING" : "", n.instancingColor ? "#define USE_INSTANCING_COLOR" : "", n.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", "#define GAMMA_FACTOR " + g, "#define MAX_BONES " + n.maxBones, n.useFog && n.fog ? "#define USE_FOG" : "", n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "", n.map ? "#define USE_MAP" : "", n.envMap ? "#define USE_ENVMAP" : "", n.envMap ? "#define " + m : "", n.lightMap ? "#define USE_LIGHTMAP" : "", n.aoMap ? "#define USE_AOMAP" : "", n.emissiveMap ? "#define USE_EMISSIVEMAP" : "", n.bumpMap ? "#define USE_BUMPMAP" : "", n.normalMap ? "#define USE_NORMALMAP" : "", n.normalMap && n.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "", n.normalMap && n.tangentSpaceNormalMap ? "#define TANGENTSPACE_NORMALMAP" : "", n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", n.displacementMap && n.supportsVertexTextures ? "#define USE_DISPLACEMENTMAP" : "", n.specularMap ? "#define USE_SPECULARMAP" : "", n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", n.metalnessMap ? "#define USE_METALNESSMAP" : "", n.alphaMap ? "#define USE_ALPHAMAP" : "", n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", n.vertexTangents ? "#define USE_TANGENT" : "", n.vertexColors ? "#define USE_COLOR" : "", n.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", n.vertexUvs ? "#define USE_UV" : "", n.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "", n.flatShading ? "#define FLAT_SHADED" : "", n.skinning ? "#define USE_SKINNING" : "", n.useVertexTexture ? "#define BONE_TEXTURE" : "", n.morphTargets ? "#define USE_MORPHTARGETS" : "", n.morphNormals && !1 === n.flatShading ? "#define USE_MORPHNORMALS" : "", n.doubleSided ? "#define DOUBLE_SIDED" : "", n.flipSided ? "#define FLIP_SIDED" : "", n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", n.shadowMapEnabled ? "#define " + d : "", n.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", n.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", n.logarithmicDepthBuffer && n.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", "#ifdef USE_INSTANCING", "\tattribute mat4 instanceMatrix;", "#endif", "#ifdef USE_INSTANCING_COLOR", "\tattribute vec3 instanceColor;", "#endif", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_TANGENT", "\tattribute vec4 tangent;", "#endif", "#if defined( USE_COLOR_ALPHA )", "\tattribute vec4 color;", "#elif defined( USE_COLOR )", "\tattribute vec3 color;", "#endif", "#ifdef USE_MORPHTARGETS", "\tattribute vec3 morphTarget0;", "\tattribute vec3 morphTarget1;", "\tattribute vec3 morphTarget2;", "\tattribute vec3 morphTarget3;", "\t#ifdef USE_MORPHNORMALS", "\t\tattribute vec3 morphNormal0;", "\t\tattribute vec3 morphNormal1;", "\t\tattribute vec3 morphNormal2;", "\t\tattribute vec3 morphNormal3;", "\t#else", "\t\tattribute vec3 morphTarget4;", "\t\tattribute vec3 morphTarget5;", "\t\tattribute vec3 morphTarget6;", "\t\tattribute vec3 morphTarget7;", "\t#endif", "#endif", "#ifdef USE_SKINNING", "\tattribute vec4 skinIndex;", "\tattribute vec4 skinWeight;", "#endif", "\n"].filter(ir).join("\n"), M = [v, mr(n), "#define SHADER_NAME " + n.shaderName, _, n.alphaTest ? "#define ALPHATEST " + n.alphaTest + (n.alphaTest % 1 ? "" : ".0") : "", "#define GAMMA_FACTOR " + g, n.useFog && n.fog ? "#define USE_FOG" : "", n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "", n.map ? "#define USE_MAP" : "", n.matcap ? "#define USE_MATCAP" : "", n.envMap ? "#define USE_ENVMAP" : "", n.envMap ? "#define " + p : "", n.envMap ? "#define " + m : "", n.envMap ? "#define " + f : "", n.lightMap ? "#define USE_LIGHTMAP" : "", n.aoMap ? "#define USE_AOMAP" : "", n.emissiveMap ? "#define USE_EMISSIVEMAP" : "", n.bumpMap ? "#define USE_BUMPMAP" : "", n.normalMap ? "#define USE_NORMALMAP" : "", n.normalMap && n.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "", n.normalMap && n.tangentSpaceNormalMap ? "#define TANGENTSPACE_NORMALMAP" : "", n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", n.specularMap ? "#define USE_SPECULARMAP" : "", n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", n.metalnessMap ? "#define USE_METALNESSMAP" : "", n.alphaMap ? "#define USE_ALPHAMAP" : "", n.sheen ? "#define USE_SHEEN" : "", n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", n.vertexTangents ? "#define USE_TANGENT" : "", n.vertexColors || n.instancingColor ? "#define USE_COLOR" : "", n.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", n.vertexUvs ? "#define USE_UV" : "", n.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "", n.gradientMap ? "#define USE_GRADIENTMAP" : "", n.flatShading ? "#define FLAT_SHADED" : "", n.doubleSided ? "#define DOUBLE_SIDED" : "", n.flipSided ? "#define FLIP_SIDED" : "", n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", n.shadowMapEnabled ? "#define " + d : "", n.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", n.physicallyCorrectLights ? "#define PHYSICALLY_CORRECT_LIGHTS" : "", n.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", n.logarithmicDepthBuffer && n.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "", (n.extensionShaderTextureLOD || n.envMap) && n.rendererExtensionShaderTextureLod ? "#define TEXTURE_LOD_EXT" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", 0 !== n.toneMapping ? "#define TONE_MAPPING" : "", 0 !== n.toneMapping ? _n.tonemapping_pars_fragment : "", 0 !== n.toneMapping ? nr("toneMapping", n.toneMapping) : "", n.dithering ? "#define DITHERING" : "", _n.encodings_pars_fragment, n.map ? tr("mapTexelToLinear", n.mapEncoding) : "", n.matcap ? tr("matcapTexelToLinear", n.matcapEncoding) : "", n.envMap ? tr("envMapTexelToLinear", n.envMapEncoding) : "", n.emissiveMap ? tr("emissiveMapTexelToLinear", n.emissiveMapEncoding) : "", n.lightMap ? tr("lightMapTexelToLinear", n.lightMapEncoding) : "", er("linearToOutputTexel", n.outputEncoding), n.depthPacking ? "#define DEPTH_PACKING " + n.depthPacking : "", "\n"].filter(ir).join("\n")), h = or(h), h = rr(h, n), h = ar(h, n), u = or(u), u = rr(u, n), u = ar(u, n), h = ur(h), u = ur(u), n.isWebGL2 && !0 !== n.isRawShaderMaterial && (b = "#version 300 es\n", y = ["#define attribute in", "#define varying out", "#define texture2D texture"].join("\n") + "\n" + y, M = ["#define varying in", n.glslVersion === U ? "" : "out highp vec4 pc_fragColor;", n.glslVersion === U ? "" : "#define gl_FragColor pc_fragColor", "#define gl_FragDepthEXT gl_FragDepth", "#define texture2D texture", "#define textureCube texture", "#define texture2DProj textureProj", "#define texture2DLodEXT textureLod", "#define texture2DProjLodEXT textureProjLod", "#define textureCubeLodEXT textureLod", "#define texture2DGradEXT textureGrad", "#define texture2DProjGradEXT textureProjGrad", "#define textureCubeGradEXT textureGrad"].join("\n") + "\n" + M);
    const w = b + M + u,
          S = Ji(l, 35633, b + y + h),
          T = Ji(l, 35632, w);

    if (l.attachShader(x, S), l.attachShader(x, T), void 0 !== n.index0AttributeName ? l.bindAttribLocation(x, 0, n.index0AttributeName) : !0 === n.morphTargets && l.bindAttribLocation(x, 0, "position"), l.linkProgram(x), t.debug.checkShaderErrors) {
      const t = l.getProgramInfoLog(x).trim(),
            e = l.getShaderInfoLog(S).trim(),
            n = l.getShaderInfoLog(T).trim();
      let i = !0,
          r = !0;

      if (!1 === l.getProgramParameter(x, 35714)) {
        i = !1;
        const e = $i(l, S, "vertex"),
              n = $i(l, T, "fragment");
        console.error("THREE.WebGLProgram: shader error: ", l.getError(), "35715", l.getProgramParameter(x, 35715), "gl.getProgramInfoLog", t, e, n);
      } else "" !== t ? console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()", t) : "" !== e && "" !== n || (r = !1);

      r && (this.diagnostics = {
        runnable: i,
        programLog: t,
        vertexShader: {
          log: e,
          prefix: y
        },
        fragmentShader: {
          log: n,
          prefix: M
        }
      });
    }

    let L, E;
    return l.deleteShader(S), l.deleteShader(T), this.getUniforms = function () {
      return void 0 === L && (L = new Zi(l, x)), L;
    }, this.getAttributes = function () {
      return void 0 === E && (E = function (t, e) {
        const n = {},
              i = t.getProgramParameter(e, 35721);

        for (let r = 0; r < i; r++) {
          const i = t.getActiveAttrib(e, r).name;
          n[i] = t.getAttribLocation(e, i);
        }

        return n;
      }(l, x)), E;
    }, this.destroy = function () {
      o.releaseStatesOfProgram(this), l.deleteProgram(x), this.program = void 0;
    }, this.name = n.shaderName, this.id = Qi++, this.cacheKey = e, this.usedTimes = 1, this.program = x, this.vertexShader = S, this.fragmentShader = T, this;
  }

  function gr(t, e, n, i, r, o) {
    const l = [],
          c = i.isWebGL2,
          h = i.logarithmicDepthBuffer,
          u = i.floatVertexTextures,
          d = i.maxVertexUniforms,
          p = i.vertexTextures;
    let m = i.precision;
    const f = {
      MeshDepthMaterial: "depth",
      MeshDistanceMaterial: "distanceRGBA",
      MeshNormalMaterial: "normal",
      MeshBasicMaterial: "basic",
      MeshLambertMaterial: "lambert",
      MeshPhongMaterial: "phong",
      MeshToonMaterial: "toon",
      MeshStandardMaterial: "physical",
      MeshPhysicalMaterial: "physical",
      MeshMatcapMaterial: "matcap",
      LineBasicMaterial: "basic",
      LineDashedMaterial: "dashed",
      PointsMaterial: "points",
      ShadowMaterial: "shadow",
      SpriteMaterial: "sprite"
    },
          g = ["precision", "isWebGL2", "supportsVertexTextures", "outputEncoding", "instancing", "instancingColor", "map", "mapEncoding", "matcap", "matcapEncoding", "envMap", "envMapMode", "envMapEncoding", "envMapCubeUV", "lightMap", "lightMapEncoding", "aoMap", "emissiveMap", "emissiveMapEncoding", "bumpMap", "normalMap", "objectSpaceNormalMap", "tangentSpaceNormalMap", "clearcoatMap", "clearcoatRoughnessMap", "clearcoatNormalMap", "displacementMap", "specularMap", "roughnessMap", "metalnessMap", "gradientMap", "alphaMap", "combine", "vertexColors", "vertexAlphas", "vertexTangents", "vertexUvs", "uvsVertexOnly", "fog", "useFog", "fogExp2", "flatShading", "sizeAttenuation", "logarithmicDepthBuffer", "skinning", "maxBones", "useVertexTexture", "morphTargets", "morphNormals", "premultipliedAlpha", "numDirLights", "numPointLights", "numSpotLights", "numHemiLights", "numRectAreaLights", "numDirLightShadows", "numPointLightShadows", "numSpotLightShadows", "shadowMapEnabled", "shadowMapType", "toneMapping", "physicallyCorrectLights", "alphaTest", "doubleSided", "flipSided", "numClippingPlanes", "numClipIntersection", "depthPacking", "dithering", "sheen", "transmissionMap"];

    function v(t) {
      let e;
      return t && t.isTexture ? e = t.encoding : t && t.isWebGLRenderTarget ? (console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."), e = t.texture.encoding) : e = z, e;
    }

    return {
      getParameters: function (r, l, g, _, x) {
        const y = _.fog,
              M = r.isMeshStandardMaterial ? _.environment : null,
              b = e.get(r.envMap || M),
              w = f[r.type],
              S = x.isSkinnedMesh ? function (t) {
          const e = t.skeleton.bones;
          if (u) return 1024;
          {
            const t = d,
                  n = Math.floor((t - 20) / 4),
                  i = Math.min(n, e.length);
            return i < e.length ? (console.warn("THREE.WebGLRenderer: Skeleton has " + e.length + " bones. This GPU supports " + i + "."), 0) : i;
          }
        }(x) : 0;
        let T, L;

        if (null !== r.precision && (m = i.getMaxPrecision(r.precision), m !== r.precision && console.warn("THREE.WebGLProgram.getParameters:", r.precision, "not supported, using", m, "instead.")), w) {
          const t = yn[w];
          T = t.vertexShader, L = t.fragmentShader;
        } else T = r.vertexShader, L = r.fragmentShader;

        const E = t.getRenderTarget();
        return {
          isWebGL2: c,
          shaderID: w,
          shaderName: r.type,
          vertexShader: T,
          fragmentShader: L,
          defines: r.defines,
          isRawShaderMaterial: !0 === r.isRawShaderMaterial,
          glslVersion: r.glslVersion,
          precision: m,
          instancing: !0 === x.isInstancedMesh,
          instancingColor: !0 === x.isInstancedMesh && null !== x.instanceColor,
          supportsVertexTextures: p,
          outputEncoding: null !== E ? v(E.texture) : t.outputEncoding,
          map: !!r.map,
          mapEncoding: v(r.map),
          matcap: !!r.matcap,
          matcapEncoding: v(r.matcap),
          envMap: !!b,
          envMapMode: b && b.mapping,
          envMapEncoding: v(b),
          envMapCubeUV: !!b && (b.mapping === a || b.mapping === s),
          lightMap: !!r.lightMap,
          lightMapEncoding: v(r.lightMap),
          aoMap: !!r.aoMap,
          emissiveMap: !!r.emissiveMap,
          emissiveMapEncoding: v(r.emissiveMap),
          bumpMap: !!r.bumpMap,
          normalMap: !!r.normalMap,
          objectSpaceNormalMap: 1 === r.normalMapType,
          tangentSpaceNormalMap: 0 === r.normalMapType,
          clearcoatMap: !!r.clearcoatMap,
          clearcoatRoughnessMap: !!r.clearcoatRoughnessMap,
          clearcoatNormalMap: !!r.clearcoatNormalMap,
          displacementMap: !!r.displacementMap,
          roughnessMap: !!r.roughnessMap,
          metalnessMap: !!r.metalnessMap,
          specularMap: !!r.specularMap,
          alphaMap: !!r.alphaMap,
          gradientMap: !!r.gradientMap,
          sheen: !!r.sheen,
          transmissionMap: !!r.transmissionMap,
          combine: r.combine,
          vertexTangents: r.normalMap && r.vertexTangents,
          vertexColors: r.vertexColors,
          vertexAlphas: !0 === r.vertexColors && x.geometry && x.geometry.attributes.color && 4 === x.geometry.attributes.color.itemSize,
          vertexUvs: !!(r.map || r.bumpMap || r.normalMap || r.specularMap || r.alphaMap || r.emissiveMap || r.roughnessMap || r.metalnessMap || r.clearcoatMap || r.clearcoatRoughnessMap || r.clearcoatNormalMap || r.displacementMap || r.transmissionMap),
          uvsVertexOnly: !(r.map || r.bumpMap || r.normalMap || r.specularMap || r.alphaMap || r.emissiveMap || r.roughnessMap || r.metalnessMap || r.clearcoatNormalMap || r.transmissionMap || !r.displacementMap),
          fog: !!y,
          useFog: r.fog,
          fogExp2: y && y.isFogExp2,
          flatShading: !!r.flatShading,
          sizeAttenuation: r.sizeAttenuation,
          logarithmicDepthBuffer: h,
          skinning: !0 === x.isSkinnedMesh && S > 0,
          maxBones: S,
          useVertexTexture: u,
          morphTargets: r.morphTargets,
          morphNormals: r.morphNormals,
          numDirLights: l.directional.length,
          numPointLights: l.point.length,
          numSpotLights: l.spot.length,
          numRectAreaLights: l.rectArea.length,
          numHemiLights: l.hemi.length,
          numDirLightShadows: l.directionalShadowMap.length,
          numPointLightShadows: l.pointShadowMap.length,
          numSpotLightShadows: l.spotShadowMap.length,
          numClippingPlanes: o.numPlanes,
          numClipIntersection: o.numIntersection,
          dithering: r.dithering,
          shadowMapEnabled: t.shadowMap.enabled && g.length > 0,
          shadowMapType: t.shadowMap.type,
          toneMapping: r.toneMapped ? t.toneMapping : 0,
          physicallyCorrectLights: t.physicallyCorrectLights,
          premultipliedAlpha: r.premultipliedAlpha,
          alphaTest: r.alphaTest,
          doubleSided: 2 === r.side,
          flipSided: 1 === r.side,
          depthPacking: void 0 !== r.depthPacking && r.depthPacking,
          index0AttributeName: r.index0AttributeName,
          extensionDerivatives: r.extensions && r.extensions.derivatives,
          extensionFragDepth: r.extensions && r.extensions.fragDepth,
          extensionDrawBuffers: r.extensions && r.extensions.drawBuffers,
          extensionShaderTextureLOD: r.extensions && r.extensions.shaderTextureLOD,
          rendererExtensionFragDepth: c || n.has("EXT_frag_depth"),
          rendererExtensionDrawBuffers: c || n.has("WEBGL_draw_buffers"),
          rendererExtensionShaderTextureLod: c || n.has("EXT_shader_texture_lod"),
          customProgramCacheKey: r.customProgramCacheKey()
        };
      },
      getProgramCacheKey: function (e) {
        const n = [];
        if (e.shaderID ? n.push(e.shaderID) : (n.push(e.fragmentShader), n.push(e.vertexShader)), void 0 !== e.defines) for (const t in e.defines) n.push(t), n.push(e.defines[t]);

        if (!1 === e.isRawShaderMaterial) {
          for (let t = 0; t < g.length; t++) n.push(e[g[t]]);

          n.push(t.outputEncoding), n.push(t.gammaFactor);
        }

        return n.push(e.customProgramCacheKey), n.join();
      },
      getUniforms: function (t) {
        const e = f[t.type];
        let n;

        if (e) {
          const t = yn[e];
          n = Pe.clone(t.uniforms);
        } else n = t.uniforms;

        return n;
      },
      acquireProgram: function (e, n) {
        let i;

        for (let t = 0, e = l.length; t < e; t++) {
          const e = l[t];

          if (e.cacheKey === n) {
            i = e, ++i.usedTimes;
            break;
          }
        }

        return void 0 === i && (i = new fr(t, n, e, r), l.push(i)), i;
      },
      releaseProgram: function (t) {
        if (0 == --t.usedTimes) {
          const e = l.indexOf(t);
          l[e] = l[l.length - 1], l.pop(), t.destroy();
        }
      },
      programs: l
    };
  }

  function vr() {
    let t = new WeakMap();
    return {
      get: function (e) {
        let n = t.get(e);
        return void 0 === n && (n = {}, t.set(e, n)), n;
      },
      remove: function (e) {
        t.delete(e);
      },
      update: function (e, n, i) {
        t.get(e)[n] = i;
      },
      dispose: function () {
        t = new WeakMap();
      }
    };
  }

  function _r(t, e) {
    return t.groupOrder !== e.groupOrder ? t.groupOrder - e.groupOrder : t.renderOrder !== e.renderOrder ? t.renderOrder - e.renderOrder : t.program !== e.program ? t.program.id - e.program.id : t.material.id !== e.material.id ? t.material.id - e.material.id : t.z !== e.z ? t.z - e.z : t.id - e.id;
  }

  function xr(t, e) {
    return t.groupOrder !== e.groupOrder ? t.groupOrder - e.groupOrder : t.renderOrder !== e.renderOrder ? t.renderOrder - e.renderOrder : t.z !== e.z ? e.z - t.z : t.id - e.id;
  }

  function yr(t) {
    const e = [];
    let n = 0;
    const i = [],
          r = [],
          a = {
      id: -1
    };

    function s(i, r, s, o, l, c) {
      let h = e[n];
      const u = t.get(s);
      return void 0 === h ? (h = {
        id: i.id,
        object: i,
        geometry: r,
        material: s,
        program: u.program || a,
        groupOrder: o,
        renderOrder: i.renderOrder,
        z: l,
        group: c
      }, e[n] = h) : (h.id = i.id, h.object = i, h.geometry = r, h.material = s, h.program = u.program || a, h.groupOrder = o, h.renderOrder = i.renderOrder, h.z = l, h.group = c), n++, h;
    }

    return {
      opaque: i,
      transparent: r,
      init: function () {
        n = 0, i.length = 0, r.length = 0;
      },
      push: function (t, e, n, a, o, l) {
        const c = s(t, e, n, a, o, l);
        (!0 === n.transparent ? r : i).push(c);
      },
      unshift: function (t, e, n, a, o, l) {
        const c = s(t, e, n, a, o, l);
        (!0 === n.transparent ? r : i).unshift(c);
      },
      finish: function () {
        for (let t = n, i = e.length; t < i; t++) {
          const n = e[t];
          if (null === n.id) break;
          n.id = null, n.object = null, n.geometry = null, n.material = null, n.program = null, n.group = null;
        }
      },
      sort: function (t, e) {
        i.length > 1 && i.sort(t || _r), r.length > 1 && r.sort(e || xr);
      }
    };
  }

  function Mr(t) {
    let e = new WeakMap();
    return {
      get: function (n, i) {
        let r;
        return !1 === e.has(n) ? (r = new yr(t), e.set(n, [r])) : i >= e.get(n).length ? (r = new yr(t), e.get(n).push(r)) : r = e.get(n)[i], r;
      },
      dispose: function () {
        e = new WeakMap();
      }
    };
  }

  function br() {
    const t = {};
    return {
      get: function (e) {
        if (void 0 !== t[e.id]) return t[e.id];
        let n;

        switch (e.type) {
          case "DirectionalLight":
            n = {
              direction: new Y(),
              color: new Ht()
            };
            break;

          case "SpotLight":
            n = {
              position: new Y(),
              direction: new Y(),
              color: new Ht(),
              distance: 0,
              coneCos: 0,
              penumbraCos: 0,
              decay: 0
            };
            break;

          case "PointLight":
            n = {
              position: new Y(),
              color: new Ht(),
              distance: 0,
              decay: 0
            };
            break;

          case "HemisphereLight":
            n = {
              direction: new Y(),
              skyColor: new Ht(),
              groundColor: new Ht()
            };
            break;

          case "RectAreaLight":
            n = {
              color: new Ht(),
              position: new Y(),
              halfWidth: new Y(),
              halfHeight: new Y()
            };
        }

        return t[e.id] = n, n;
      }
    };
  }

  let wr = 0;

  function Sr(t, e) {
    return (e.castShadow ? 1 : 0) - (t.castShadow ? 1 : 0);
  }

  function Tr(t, e) {
    const n = new br(),
          i = function () {
      const t = {};
      return {
        get: function (e) {
          if (void 0 !== t[e.id]) return t[e.id];
          let n;

          switch (e.type) {
            case "DirectionalLight":
            case "SpotLight":
              n = {
                shadowBias: 0,
                shadowNormalBias: 0,
                shadowRadius: 1,
                shadowMapSize: new Nt()
              };
              break;

            case "PointLight":
              n = {
                shadowBias: 0,
                shadowNormalBias: 0,
                shadowRadius: 1,
                shadowMapSize: new Nt(),
                shadowCameraNear: 1,
                shadowCameraFar: 1e3
              };
          }

          return t[e.id] = n, n;
        }
      };
    }(),
          r = {
      version: 0,
      hash: {
        directionalLength: -1,
        pointLength: -1,
        spotLength: -1,
        rectAreaLength: -1,
        hemiLength: -1,
        numDirectionalShadows: -1,
        numPointShadows: -1,
        numSpotShadows: -1
      },
      ambient: [0, 0, 0],
      probe: [],
      directional: [],
      directionalShadow: [],
      directionalShadowMap: [],
      directionalShadowMatrix: [],
      spot: [],
      spotShadow: [],
      spotShadowMap: [],
      spotShadowMatrix: [],
      rectArea: [],
      rectAreaLTC1: null,
      rectAreaLTC2: null,
      point: [],
      pointShadow: [],
      pointShadowMap: [],
      pointShadowMatrix: [],
      hemi: []
    };

    for (let t = 0; t < 9; t++) r.probe.push(new Y());

    const a = new Y(),
          s = new Tt(),
          o = new Tt();
    return {
      setup: function (a) {
        let s = 0,
            o = 0,
            l = 0;

        for (let t = 0; t < 9; t++) r.probe[t].set(0, 0, 0);

        let c = 0,
            h = 0,
            u = 0,
            d = 0,
            p = 0,
            m = 0,
            f = 0,
            g = 0;
        a.sort(Sr);

        for (let t = 0, e = a.length; t < e; t++) {
          const e = a[t],
                v = e.color,
                _ = e.intensity,
                x = e.distance,
                y = e.shadow && e.shadow.map ? e.shadow.map.texture : null;
          if (e.isAmbientLight) s += v.r * _, o += v.g * _, l += v.b * _;else if (e.isLightProbe) for (let t = 0; t < 9; t++) r.probe[t].addScaledVector(e.sh.coefficients[t], _);else if (e.isDirectionalLight) {
            const t = n.get(e);

            if (t.color.copy(e.color).multiplyScalar(e.intensity), e.castShadow) {
              const t = e.shadow,
                    n = i.get(e);
              n.shadowBias = t.bias, n.shadowNormalBias = t.normalBias, n.shadowRadius = t.radius, n.shadowMapSize = t.mapSize, r.directionalShadow[c] = n, r.directionalShadowMap[c] = y, r.directionalShadowMatrix[c] = e.shadow.matrix, m++;
            }

            r.directional[c] = t, c++;
          } else if (e.isSpotLight) {
            const t = n.get(e);

            if (t.position.setFromMatrixPosition(e.matrixWorld), t.color.copy(v).multiplyScalar(_), t.distance = x, t.coneCos = Math.cos(e.angle), t.penumbraCos = Math.cos(e.angle * (1 - e.penumbra)), t.decay = e.decay, e.castShadow) {
              const t = e.shadow,
                    n = i.get(e);
              n.shadowBias = t.bias, n.shadowNormalBias = t.normalBias, n.shadowRadius = t.radius, n.shadowMapSize = t.mapSize, r.spotShadow[u] = n, r.spotShadowMap[u] = y, r.spotShadowMatrix[u] = e.shadow.matrix, g++;
            }

            r.spot[u] = t, u++;
          } else if (e.isRectAreaLight) {
            const t = n.get(e);
            t.color.copy(v).multiplyScalar(_), t.halfWidth.set(.5 * e.width, 0, 0), t.halfHeight.set(0, .5 * e.height, 0), r.rectArea[d] = t, d++;
          } else if (e.isPointLight) {
            const t = n.get(e);

            if (t.color.copy(e.color).multiplyScalar(e.intensity), t.distance = e.distance, t.decay = e.decay, e.castShadow) {
              const t = e.shadow,
                    n = i.get(e);
              n.shadowBias = t.bias, n.shadowNormalBias = t.normalBias, n.shadowRadius = t.radius, n.shadowMapSize = t.mapSize, n.shadowCameraNear = t.camera.near, n.shadowCameraFar = t.camera.far, r.pointShadow[h] = n, r.pointShadowMap[h] = y, r.pointShadowMatrix[h] = e.shadow.matrix, f++;
            }

            r.point[h] = t, h++;
          } else if (e.isHemisphereLight) {
            const t = n.get(e);
            t.skyColor.copy(e.color).multiplyScalar(_), t.groundColor.copy(e.groundColor).multiplyScalar(_), r.hemi[p] = t, p++;
          }
        }

        d > 0 && (e.isWebGL2 || !0 === t.has("OES_texture_float_linear") ? (r.rectAreaLTC1 = xn.LTC_FLOAT_1, r.rectAreaLTC2 = xn.LTC_FLOAT_2) : !0 === t.has("OES_texture_half_float_linear") ? (r.rectAreaLTC1 = xn.LTC_HALF_1, r.rectAreaLTC2 = xn.LTC_HALF_2) : console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")), r.ambient[0] = s, r.ambient[1] = o, r.ambient[2] = l;
        const v = r.hash;
        v.directionalLength === c && v.pointLength === h && v.spotLength === u && v.rectAreaLength === d && v.hemiLength === p && v.numDirectionalShadows === m && v.numPointShadows === f && v.numSpotShadows === g || (r.directional.length = c, r.spot.length = u, r.rectArea.length = d, r.point.length = h, r.hemi.length = p, r.directionalShadow.length = m, r.directionalShadowMap.length = m, r.pointShadow.length = f, r.pointShadowMap.length = f, r.spotShadow.length = g, r.spotShadowMap.length = g, r.directionalShadowMatrix.length = m, r.pointShadowMatrix.length = f, r.spotShadowMatrix.length = g, v.directionalLength = c, v.pointLength = h, v.spotLength = u, v.rectAreaLength = d, v.hemiLength = p, v.numDirectionalShadows = m, v.numPointShadows = f, v.numSpotShadows = g, r.version = wr++);
      },
      setupView: function (t, e) {
        let n = 0,
            i = 0,
            l = 0,
            c = 0,
            h = 0;
        const u = e.matrixWorldInverse;

        for (let e = 0, d = t.length; e < d; e++) {
          const d = t[e];

          if (d.isDirectionalLight) {
            const t = r.directional[n];
            t.direction.setFromMatrixPosition(d.matrixWorld), a.setFromMatrixPosition(d.target.matrixWorld), t.direction.sub(a), t.direction.transformDirection(u), n++;
          } else if (d.isSpotLight) {
            const t = r.spot[l];
            t.position.setFromMatrixPosition(d.matrixWorld), t.position.applyMatrix4(u), t.direction.setFromMatrixPosition(d.matrixWorld), a.setFromMatrixPosition(d.target.matrixWorld), t.direction.sub(a), t.direction.transformDirection(u), l++;
          } else if (d.isRectAreaLight) {
            const t = r.rectArea[c];
            t.position.setFromMatrixPosition(d.matrixWorld), t.position.applyMatrix4(u), o.identity(), s.copy(d.matrixWorld), s.premultiply(u), o.extractRotation(s), t.halfWidth.set(.5 * d.width, 0, 0), t.halfHeight.set(0, .5 * d.height, 0), t.halfWidth.applyMatrix4(o), t.halfHeight.applyMatrix4(o), c++;
          } else if (d.isPointLight) {
            const t = r.point[i];
            t.position.setFromMatrixPosition(d.matrixWorld), t.position.applyMatrix4(u), i++;
          } else if (d.isHemisphereLight) {
            const t = r.hemi[h];
            t.direction.setFromMatrixPosition(d.matrixWorld), t.direction.transformDirection(u), t.direction.normalize(), h++;
          }
        }
      },
      state: r
    };
  }

  function Lr(t, e) {
    const n = new Tr(t, e),
          i = [],
          r = [];
    return {
      init: function () {
        i.length = 0, r.length = 0;
      },
      state: {
        lightsArray: i,
        shadowsArray: r,
        lights: n
      },
      setupLights: function () {
        n.setup(i);
      },
      setupLightsView: function (t) {
        n.setupView(i, t);
      },
      pushLight: function (t) {
        i.push(t);
      },
      pushShadow: function (t) {
        r.push(t);
      }
    };
  }

  function Er(t, e) {
    let n = new WeakMap();
    return {
      get: function (i, r = 0) {
        let a;
        return !1 === n.has(i) ? (a = new Lr(t, e), n.set(i, [a])) : r >= n.get(i).length ? (a = new Lr(t, e), n.get(i).push(a)) : a = n.get(i)[r], a;
      },
      dispose: function () {
        n = new WeakMap();
      }
    };
  }

  class Ar extends Ee {
    constructor(t) {
      super(), this.type = "MeshDepthMaterial", this.depthPacking = 3200, this.morphTargets = !1, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.setValues(t);
    }

    copy(t) {
      return super.copy(t), this.depthPacking = t.depthPacking, this.morphTargets = t.morphTargets, this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this;
    }

  }

  Ar.prototype.isMeshDepthMaterial = !0;

  class Cr extends Ee {
    constructor(t) {
      super(), this.type = "MeshDistanceMaterial", this.referencePosition = new Y(), this.nearDistance = 1, this.farDistance = 1e3, this.morphTargets = !1, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.fog = !1, this.setValues(t);
    }

    copy(t) {
      return super.copy(t), this.referencePosition.copy(t.referencePosition), this.nearDistance = t.nearDistance, this.farDistance = t.farDistance, this.morphTargets = t.morphTargets, this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this;
    }

  }

  Cr.prototype.isMeshDistanceMaterial = !0;

  function Pr(t, e, n) {
    let i = new St();
    const r = new Nt(),
          a = new Nt(),
          s = new It(),
          o = [],
          l = [],
          c = {},
          u = n.maxTextureSize,
          d = {
      0: 1,
      1: 0,
      2: 2
    },
          m = new De({
      defines: {
        SAMPLE_RATE: 2 / 8,
        HALF_SAMPLE_RATE: 1 / 8
      },
      uniforms: {
        shadow_pass: {
          value: null
        },
        resolution: {
          value: new Nt()
        },
        radius: {
          value: 4
        }
      },
      vertexShader: "void main() {\n\tgl_Position = vec4( position, 1.0 );\n}",
      fragmentShader: "uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\n#include <packing>\nvoid main() {\n\tfloat mean = 0.0;\n\tfloat squared_mean = 0.0;\n\tfloat depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy ) / resolution ) );\n\tfor ( float i = -1.0; i < 1.0 ; i += SAMPLE_RATE) {\n\t\t#ifdef HORIZONTAL_PASS\n\t\t\tvec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( i, 0.0 ) * radius ) / resolution ) );\n\t\t\tmean += distribution.x;\n\t\t\tsquared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n\t\t#else\n\t\t\tfloat depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, i ) * radius ) / resolution ) );\n\t\t\tmean += depth;\n\t\t\tsquared_mean += depth * depth;\n\t\t#endif\n\t}\n\tmean = mean * HALF_SAMPLE_RATE;\n\tsquared_mean = squared_mean * HALF_SAMPLE_RATE;\n\tfloat std_dev = sqrt( squared_mean - mean * mean );\n\tgl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );\n}"
    }),
          f = m.clone();
    f.defines.HORIZONTAL_PASS = 1;
    const g = new we();
    g.setAttribute("position", new Xt(new Float32Array([-1, -1, .5, 3, -1, .5, -1, 3, .5]), 3));

    const v = new gn(g, m),
          _ = this;

    function x(n, i) {
      const r = e.update(v);
      m.uniforms.shadow_pass.value = n.map.texture, m.uniforms.resolution.value = n.mapSize, m.uniforms.radius.value = n.radius, t.setRenderTarget(n.mapPass), t.clear(), t.renderBufferDirect(i, null, r, m, v, null), f.uniforms.shadow_pass.value = n.mapPass.texture, f.uniforms.resolution.value = n.mapSize, f.uniforms.radius.value = n.radius, t.setRenderTarget(n.map), t.clear(), t.renderBufferDirect(i, null, r, f, v, null);
    }

    function y(t) {
      const e = t << 0;
      let n = o[e];
      return void 0 === n && (n = new Ar({
        depthPacking: 3201,
        morphTargets: t
      }), o[e] = n), n;
    }

    function M(t) {
      const e = t << 0;
      let n = l[e];
      return void 0 === n && (n = new Cr({
        morphTargets: t
      }), l[e] = n), n;
    }

    function w(e, n, i, r, a, s, o) {
      let l = null,
          h = y,
          u = e.customDepthMaterial;

      if (!0 === r.isPointLight && (h = M, u = e.customDistanceMaterial), void 0 === u) {
        let t = !1;
        !0 === i.morphTargets && (t = n.morphAttributes && n.morphAttributes.position && n.morphAttributes.position.length > 0), l = h(t);
      } else l = u;

      if (t.localClippingEnabled && !0 === i.clipShadows && 0 !== i.clippingPlanes.length) {
        const t = l.uuid,
              e = i.uuid;
        let n = c[t];
        void 0 === n && (n = {}, c[t] = n);
        let r = n[e];
        void 0 === r && (r = l.clone(), n[e] = r), l = r;
      }

      return l.visible = i.visible, l.wireframe = i.wireframe, l.side = 3 === o ? null !== i.shadowSide ? i.shadowSide : i.side : null !== i.shadowSide ? i.shadowSide : d[i.side], l.clipShadows = i.clipShadows, l.clippingPlanes = i.clippingPlanes, l.clipIntersection = i.clipIntersection, l.wireframeLinewidth = i.wireframeLinewidth, l.linewidth = i.linewidth, !0 === r.isPointLight && !0 === l.isMeshDistanceMaterial && (l.referencePosition.setFromMatrixPosition(r.matrixWorld), l.nearDistance = a, l.farDistance = s), l;
    }

    function S(n, r, a, s, o) {
      if (!1 === n.visible) return;

      if (n.layers.test(r.layers) && (n.isMesh || n.isLine || n.isPoints) && (n.castShadow || n.receiveShadow && 3 === o) && (!n.frustumCulled || i.intersectsObject(n))) {
        n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse, n.matrixWorld);
        const i = e.update(n),
              r = n.material;

        if (Array.isArray(r)) {
          const e = i.groups;

          for (let l = 0, c = e.length; l < c; l++) {
            const c = e[l],
                  h = r[c.materialIndex];

            if (h && h.visible) {
              const e = w(n, i, h, s, a.near, a.far, o);
              t.renderBufferDirect(a, null, i, e, n, c);
            }
          }
        } else if (r.visible) {
          const e = w(n, i, r, s, a.near, a.far, o);
          t.renderBufferDirect(a, null, i, e, n, null);
        }
      }

      const l = n.children;

      for (let t = 0, e = l.length; t < e; t++) S(l[t], r, a, s, o);
    }

    this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1, this.render = function (e, n, o) {
      if (!1 === _.enabled) return;
      if (!1 === _.autoUpdate && !1 === _.needsUpdate) return;
      if (0 === e.length) return;
      const l = t.getRenderTarget(),
            c = t.getActiveCubeFace(),
            d = t.getActiveMipmapLevel(),
            m = t.state;
      m.setBlending(0), m.buffers.color.setClear(1, 1, 1, 1), m.buffers.depth.setTest(!0), m.setScissorTest(!1);

      for (let l = 0, c = e.length; l < c; l++) {
        const c = e[l],
              d = c.shadow;

        if (void 0 === d) {
          console.warn("THREE.WebGLShadowMap:", c, "has no shadow.");
          continue;
        }

        if (!1 === d.autoUpdate && !1 === d.needsUpdate) continue;
        r.copy(d.mapSize);
        const f = d.getFrameExtents();

        if (r.multiply(f), a.copy(d.mapSize), (r.x > u || r.y > u) && (r.x > u && (a.x = Math.floor(u / f.x), r.x = a.x * f.x, d.mapSize.x = a.x), r.y > u && (a.y = Math.floor(u / f.y), r.y = a.y * f.y, d.mapSize.y = a.y)), null === d.map && !d.isPointLightShadow && 3 === this.type) {
          const t = {
            minFilter: p,
            magFilter: p,
            format: b
          };
          d.map = new Pn(r.x, r.y, t), d.map.texture.name = c.name + ".shadowMap", d.mapPass = new Pn(r.x, r.y, t), d.camera.updateProjectionMatrix();
        }

        if (null === d.map) {
          const t = {
            minFilter: h,
            magFilter: h,
            format: b
          };
          d.map = new Pn(r.x, r.y, t), d.map.texture.name = c.name + ".shadowMap", d.camera.updateProjectionMatrix();
        }

        t.setRenderTarget(d.map), t.clear();
        const g = d.getViewportCount();

        for (let t = 0; t < g; t++) {
          const e = d.getViewport(t);
          s.set(a.x * e.x, a.y * e.y, a.x * e.z, a.y * e.w), m.viewport(s), d.updateMatrices(c, t), i = d.getFrustum(), S(n, o, d.camera, c, this.type);
        }

        d.isPointLightShadow || 3 !== this.type || x(d, o), d.needsUpdate = !1;
      }

      _.needsUpdate = !1, t.setRenderTarget(l, c, d);
    };
  }

  function Dr(t, e, i) {
    const r = i.isWebGL2;
    const a = new function () {
      let e = !1;
      const n = new It();
      let i = null;
      const r = new It(0, 0, 0, 0);
      return {
        setMask: function (n) {
          i === n || e || (t.colorMask(n, n, n, n), i = n);
        },
        setLocked: function (t) {
          e = t;
        },
        setClear: function (e, i, a, s, o) {
          !0 === o && (e *= s, i *= s, a *= s), n.set(e, i, a, s), !1 === r.equals(n) && (t.clearColor(e, i, a, s), r.copy(n));
        },
        reset: function () {
          e = !1, i = null, r.set(-1, 0, 0, 0);
        }
      };
    }(),
          s = new function () {
      let e = !1,
          n = null,
          i = null,
          r = null;
      return {
        setTest: function (t) {
          t ? U(2929) : B(2929);
        },
        setMask: function (i) {
          n === i || e || (t.depthMask(i), n = i);
        },
        setFunc: function (e) {
          if (i !== e) {
            if (e) switch (e) {
              case 0:
                t.depthFunc(512);
                break;

              case 1:
                t.depthFunc(519);
                break;

              case 2:
                t.depthFunc(513);
                break;

              case 3:
                t.depthFunc(515);
                break;

              case 4:
                t.depthFunc(514);
                break;

              case 5:
                t.depthFunc(518);
                break;

              case 6:
                t.depthFunc(516);
                break;

              case 7:
                t.depthFunc(517);
                break;

              default:
                t.depthFunc(515);
            } else t.depthFunc(515);
            i = e;
          }
        },
        setLocked: function (t) {
          e = t;
        },
        setClear: function (e) {
          r !== e && (t.clearDepth(e), r = e);
        },
        reset: function () {
          e = !1, n = null, i = null, r = null;
        }
      };
    }(),
          o = new function () {
      let e = !1,
          n = null,
          i = null,
          r = null,
          a = null,
          s = null,
          o = null,
          l = null,
          c = null;
      return {
        setTest: function (t) {
          e || (t ? U(2960) : B(2960));
        },
        setMask: function (i) {
          n === i || e || (t.stencilMask(i), n = i);
        },
        setFunc: function (e, n, s) {
          i === e && r === n && a === s || (t.stencilFunc(e, n, s), i = e, r = n, a = s);
        },
        setOp: function (e, n, i) {
          s === e && o === n && l === i || (t.stencilOp(e, n, i), s = e, o = n, l = i);
        },
        setLocked: function (t) {
          e = t;
        },
        setClear: function (e) {
          c !== e && (t.clearStencil(e), c = e);
        },
        reset: function () {
          e = !1, n = null, i = null, r = null, a = null, s = null, o = null, l = null, c = null;
        }
      };
    }();
    let l = {},
        c = null,
        h = {},
        u = null,
        d = !1,
        p = null,
        m = null,
        f = null,
        g = null,
        v = null,
        _ = null,
        x = null,
        y = !1,
        M = null,
        b = null,
        w = null,
        S = null,
        T = null;
    const L = t.getParameter(35661);
    let E = !1,
        A = 0;
    const C = t.getParameter(7938);
    -1 !== C.indexOf("WebGL") ? (A = parseFloat(/^WebGL (\d)/.exec(C)[1]), E = A >= 1) : -1 !== C.indexOf("OpenGL ES") && (A = parseFloat(/^OpenGL ES (\d)/.exec(C)[1]), E = A >= 2);
    let P = null,
        D = {};
    const R = t.getParameter(3088),
          N = t.getParameter(2978),
          I = new It().fromArray(R),
          z = new It().fromArray(N);

    function F(e, n, i) {
      const r = new Uint8Array(4),
            a = t.createTexture();
      t.bindTexture(e, a), t.texParameteri(e, 10241, 9728), t.texParameteri(e, 10240, 9728);

      for (let e = 0; e < i; e++) t.texImage2D(n + e, 0, 6408, 1, 1, 0, 6408, 5121, r);

      return a;
    }

    const O = {};

    function U(e) {
      !0 !== l[e] && (t.enable(e), l[e] = !0);
    }

    function B(e) {
      !1 !== l[e] && (t.disable(e), l[e] = !1);
    }

    O[3553] = F(3553, 3553, 1), O[34067] = F(34067, 34069, 6), a.setClear(0, 0, 0, 1), s.setClear(1), o.setClear(0), U(2929), s.setFunc(3), W(!1), k(1), U(2884), V(0);
    const G = {
      [n]: 32774,
      101: 32778,
      102: 32779
    };
    if (r) G[103] = 32775, G[104] = 32776;else {
      const t = e.get("EXT_blend_minmax");
      null !== t && (G[103] = t.MIN_EXT, G[104] = t.MAX_EXT);
    }
    const H = {
      200: 0,
      201: 1,
      202: 768,
      204: 770,
      210: 776,
      208: 774,
      206: 772,
      203: 769,
      205: 771,
      209: 775,
      207: 773
    };

    function V(e, i, r, a, s, o, l, c) {
      if (0 !== e) {
        if (!1 === d && (U(3042), d = !0), 5 === e) s = s || i, o = o || r, l = l || a, i === m && s === v || (t.blendEquationSeparate(G[i], G[s]), m = i, v = s), r === f && a === g && o === _ && l === x || (t.blendFuncSeparate(H[r], H[a], H[o], H[l]), f = r, g = a, _ = o, x = l), p = e, y = null;else if (e !== p || c !== y) {
          if (m === n && v === n || (t.blendEquation(32774), m = n, v = n), c) switch (e) {
            case 1:
              t.blendFuncSeparate(1, 771, 1, 771);
              break;

            case 2:
              t.blendFunc(1, 1);
              break;

            case 3:
              t.blendFuncSeparate(0, 0, 769, 771);
              break;

            case 4:
              t.blendFuncSeparate(0, 768, 0, 770);
              break;

            default:
              console.error("THREE.WebGLState: Invalid blending: ", e);
          } else switch (e) {
            case 1:
              t.blendFuncSeparate(770, 771, 1, 771);
              break;

            case 2:
              t.blendFunc(770, 1);
              break;

            case 3:
              t.blendFunc(0, 769);
              break;

            case 4:
              t.blendFunc(0, 768);
              break;

            default:
              console.error("THREE.WebGLState: Invalid blending: ", e);
          }
          f = null, g = null, _ = null, x = null, p = e, y = c;
        }
      } else !0 === d && (B(3042), d = !1);
    }

    function W(e) {
      M !== e && (e ? t.frontFace(2304) : t.frontFace(2305), M = e);
    }

    function k(e) {
      0 !== e ? (U(2884), e !== b && (1 === e ? t.cullFace(1029) : 2 === e ? t.cullFace(1028) : t.cullFace(1032))) : B(2884), b = e;
    }

    function q(e, n, i) {
      e ? (U(32823), S === n && T === i || (t.polygonOffset(n, i), S = n, T = i)) : B(32823);
    }

    function j(e) {
      void 0 === e && (e = 33984 + L - 1), P !== e && (t.activeTexture(e), P = e);
    }

    return {
      buffers: {
        color: a,
        depth: s,
        stencil: o
      },
      enable: U,
      disable: B,
      bindFramebuffer: function (e, n) {
        return null === n && null !== c && (n = c), h[e] !== n && (t.bindFramebuffer(e, n), h[e] = n, r && (36009 === e && (h[36160] = n), 36160 === e && (h[36009] = n)), !0);
      },
      bindXRFramebuffer: function (e) {
        e !== c && (t.bindFramebuffer(36160, e), c = e);
      },
      useProgram: function (e) {
        return u !== e && (t.useProgram(e), u = e, !0);
      },
      setBlending: V,
      setMaterial: function (t, e) {
        2 === t.side ? B(2884) : U(2884);
        let n = 1 === t.side;
        e && (n = !n), W(n), 1 === t.blending && !1 === t.transparent ? V(0) : V(t.blending, t.blendEquation, t.blendSrc, t.blendDst, t.blendEquationAlpha, t.blendSrcAlpha, t.blendDstAlpha, t.premultipliedAlpha), s.setFunc(t.depthFunc), s.setTest(t.depthTest), s.setMask(t.depthWrite), a.setMask(t.colorWrite);
        const i = t.stencilWrite;
        o.setTest(i), i && (o.setMask(t.stencilWriteMask), o.setFunc(t.stencilFunc, t.stencilRef, t.stencilFuncMask), o.setOp(t.stencilFail, t.stencilZFail, t.stencilZPass)), q(t.polygonOffset, t.polygonOffsetFactor, t.polygonOffsetUnits), !0 === t.alphaToCoverage ? U(32926) : B(32926);
      },
      setFlipSided: W,
      setCullFace: k,
      setLineWidth: function (e) {
        e !== w && (E && t.lineWidth(e), w = e);
      },
      setPolygonOffset: q,
      setScissorTest: function (t) {
        t ? U(3089) : B(3089);
      },
      activeTexture: j,
      bindTexture: function (e, n) {
        null === P && j();
        let i = D[P];
        void 0 === i && (i = {
          type: void 0,
          texture: void 0
        }, D[P] = i), i.type === e && i.texture === n || (t.bindTexture(e, n || O[e]), i.type = e, i.texture = n);
      },
      unbindTexture: function () {
        const e = D[P];
        void 0 !== e && void 0 !== e.type && (t.bindTexture(e.type, null), e.type = void 0, e.texture = void 0);
      },
      compressedTexImage2D: function () {
        try {
          t.compressedTexImage2D.apply(t, arguments);
        } catch (t) {
          console.error("THREE.WebGLState:", t);
        }
      },
      texImage2D: function () {
        try {
          t.texImage2D.apply(t, arguments);
        } catch (t) {
          console.error("THREE.WebGLState:", t);
        }
      },
      texImage3D: function () {
        try {
          t.texImage3D.apply(t, arguments);
        } catch (t) {
          console.error("THREE.WebGLState:", t);
        }
      },
      scissor: function (e) {
        !1 === I.equals(e) && (t.scissor(e.x, e.y, e.z, e.w), I.copy(e));
      },
      viewport: function (e) {
        !1 === z.equals(e) && (t.viewport(e.x, e.y, e.z, e.w), z.copy(e));
      },
      reset: function () {
        t.disable(3042), t.disable(2884), t.disable(2929), t.disable(32823), t.disable(3089), t.disable(2960), t.disable(32926), t.blendEquation(32774), t.blendFunc(1, 0), t.blendFuncSeparate(1, 0, 1, 0), t.colorMask(!0, !0, !0, !0), t.clearColor(0, 0, 0, 0), t.depthMask(!0), t.depthFunc(513), t.clearDepth(1), t.stencilMask(4294967295), t.stencilFunc(519, 0, 4294967295), t.stencilOp(7680, 7680, 7680), t.clearStencil(0), t.cullFace(1029), t.frontFace(2305), t.polygonOffset(0, 0), t.activeTexture(33984), t.bindFramebuffer(36160, null), !0 === r && (t.bindFramebuffer(36009, null), t.bindFramebuffer(36008, null)), t.useProgram(null), t.lineWidth(1), t.scissor(0, 0, t.canvas.width, t.canvas.height), t.viewport(0, 0, t.canvas.width, t.canvas.height), l = {}, P = null, D = {}, c = null, h = {}, u = null, d = !1, p = null, m = null, f = null, g = null, v = null, _ = null, x = null, y = !1, M = null, b = null, w = null, S = null, T = null, I.set(0, 0, t.canvas.width, t.canvas.height), z.set(0, 0, t.canvas.width, t.canvas.height), a.reset(), s.reset(), o.reset();
      }
    };
  }

  function Rr(t, e, n, i, r, a, s) {
    const f = r.isWebGL2,
          T = r.maxTextures,
          L = r.maxCubemapSize,
          E = r.maxTextureSize,
          A = r.maxSamples,
          C = new WeakMap();
    let P,
        D = !1;

    try {
      D = "undefined" != typeof OffscreenCanvas && null !== new OffscreenCanvas(1, 1).getContext("2d");
    } catch (t) {}

    function R(t, e) {
      return D ? new OffscreenCanvas(t, e) : document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
    }

    function N(t, e, n, i) {
      let r = 1;

      if ((t.width > i || t.height > i) && (r = i / Math.max(t.width, t.height)), r < 1 || !0 === e) {
        if ("undefined" != typeof HTMLImageElement && t instanceof HTMLImageElement || "undefined" != typeof HTMLCanvasElement && t instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && t instanceof ImageBitmap) {
          const i = e ? j : Math.floor,
                a = i(r * t.width),
                s = i(r * t.height);
          void 0 === P && (P = R(a, s));
          const o = n ? R(a, s) : P;
          o.width = a, o.height = s;
          return o.getContext("2d").drawImage(t, 0, 0, a, s), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + t.width + "x" + t.height + ") to (" + a + "x" + s + ")."), o;
        }

        return "data" in t && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + t.width + "x" + t.height + ")."), t;
      }

      return t;
    }

    function I(t) {
      return q(t.width) && q(t.height);
    }

    function z(t, e) {
      return t.generateMipmaps && e && t.minFilter !== h && t.minFilter !== p;
    }

    function F(e, n, r, a) {
      t.generateMipmap(e);
      i.get(n).__maxMipLevel = Math.log2(Math.max(r, a));
    }

    function O(n, i, r) {
      if (!1 === f) return i;

      if (null !== n) {
        if (void 0 !== t[n]) return t[n];
        console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + n + "'");
      }

      let a = i;
      return 6403 === i && (5126 === r && (a = 33326), 5131 === r && (a = 33325), 5121 === r && (a = 33321)), 6407 === i && (5126 === r && (a = 34837), 5131 === r && (a = 34843), 5121 === r && (a = 32849)), 6408 === i && (5126 === r && (a = 34836), 5131 === r && (a = 34842), 5121 === r && (a = 32856)), 33325 !== a && 33326 !== a && 34842 !== a && 34836 !== a || e.get("EXT_color_buffer_float"), a;
    }

    function U(t) {
      return t === h || t === u || t === d ? 9728 : 9729;
    }

    function B(e) {
      const n = e.target;
      n.removeEventListener("dispose", B), function (e) {
        const n = i.get(e);
        if (void 0 === n.__webglInit) return;
        t.deleteTexture(n.__webglTexture), i.remove(e);
      }(n), n.isVideoTexture && C.delete(n), s.memory.textures--;
    }

    function G(e) {
      const n = e.target;
      n.removeEventListener("dispose", G), function (e) {
        const n = e.texture,
              r = i.get(e),
              a = i.get(n);
        if (!e) return;
        void 0 !== a.__webglTexture && (t.deleteTexture(a.__webglTexture), s.memory.textures--);
        e.depthTexture && e.depthTexture.dispose();
        if (e.isWebGLCubeRenderTarget) for (let e = 0; e < 6; e++) t.deleteFramebuffer(r.__webglFramebuffer[e]), r.__webglDepthbuffer && t.deleteRenderbuffer(r.__webglDepthbuffer[e]);else t.deleteFramebuffer(r.__webglFramebuffer), r.__webglDepthbuffer && t.deleteRenderbuffer(r.__webglDepthbuffer), r.__webglMultisampledFramebuffer && t.deleteFramebuffer(r.__webglMultisampledFramebuffer), r.__webglColorRenderbuffer && t.deleteRenderbuffer(r.__webglColorRenderbuffer), r.__webglDepthRenderbuffer && t.deleteRenderbuffer(r.__webglDepthRenderbuffer);
        if (e.isWebGLMultipleRenderTargets) for (let e = 0, r = n.length; e < r; e++) {
          const r = i.get(n[e]);
          r.__webglTexture && (t.deleteTexture(r.__webglTexture), s.memory.textures--), i.remove(n[e]);
        }
        i.remove(n), i.remove(e);
      }(n);
    }

    let H = 0;

    function V(t, e) {
      const r = i.get(t);

      if (t.isVideoTexture && function (t) {
        const e = s.render.frame;
        C.get(t) !== e && (C.set(t, e), t.update());
      }(t), t.version > 0 && r.__version !== t.version) {
        const n = t.image;
        if (void 0 === n) console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined");else {
          if (!1 !== n.complete) return void J(r, t, e);
          console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
        }
      }

      n.activeTexture(33984 + e), n.bindTexture(3553, r.__webglTexture);
    }

    function W(e, r) {
      const s = i.get(e);
      e.version > 0 && s.__version !== e.version ? function (e, i, r) {
        if (6 !== i.image.length) return;
        Z(e, i), n.activeTexture(33984 + r), n.bindTexture(34067, e.__webglTexture), t.pixelStorei(37440, i.flipY), t.pixelStorei(37441, i.premultiplyAlpha), t.pixelStorei(3317, i.unpackAlignment), t.pixelStorei(37443, 0);
        const s = i && (i.isCompressedTexture || i.image[0].isCompressedTexture),
              o = i.image[0] && i.image[0].isDataTexture,
              l = [];

        for (let t = 0; t < 6; t++) l[t] = s || o ? o ? i.image[t].image : i.image[t] : N(i.image[t], !1, !0, L);

        const c = l[0],
              h = I(c) || f,
              u = a.convert(i.format),
              d = a.convert(i.type),
              p = O(i.internalFormat, u, d);
        let m;

        if (Y(34067, i, h), s) {
          for (let t = 0; t < 6; t++) {
            m = l[t].mipmaps;

            for (let e = 0; e < m.length; e++) {
              const r = m[e];
              i.format !== b && i.format !== M ? null !== u ? n.compressedTexImage2D(34069 + t, e, p, r.width, r.height, 0, r.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : n.texImage2D(34069 + t, e, p, r.width, r.height, 0, u, d, r.data);
            }
          }

          e.__maxMipLevel = m.length - 1;
        } else {
          m = i.mipmaps;

          for (let t = 0; t < 6; t++) if (o) {
            n.texImage2D(34069 + t, 0, p, l[t].width, l[t].height, 0, u, d, l[t].data);

            for (let e = 0; e < m.length; e++) {
              const i = m[e].image[t].image;
              n.texImage2D(34069 + t, e + 1, p, i.width, i.height, 0, u, d, i.data);
            }
          } else {
            n.texImage2D(34069 + t, 0, p, u, d, l[t]);

            for (let e = 0; e < m.length; e++) {
              const i = m[e];
              n.texImage2D(34069 + t, e + 1, p, u, d, i.image[t]);
            }
          }

          e.__maxMipLevel = m.length;
        }

        z(i, h) && F(34067, i, c.width, c.height);
        e.__version = i.version, i.onUpdate && i.onUpdate(i);
      }(s, e, r) : (n.activeTexture(33984 + r), n.bindTexture(34067, s.__webglTexture));
    }

    const k = {
      [o]: 10497,
      [l]: 33071,
      [c]: 33648
    },
          X = {
      [h]: 9728,
      [u]: 9984,
      [d]: 9986,
      [p]: 9729,
      1007: 9985,
      [m]: 9987
    };

    function Y(n, a, s) {
      if (s ? (t.texParameteri(n, 10242, k[a.wrapS]), t.texParameteri(n, 10243, k[a.wrapT]), 32879 !== n && 35866 !== n || t.texParameteri(n, 32882, k[a.wrapR]), t.texParameteri(n, 10240, X[a.magFilter]), t.texParameteri(n, 10241, X[a.minFilter])) : (t.texParameteri(n, 10242, 33071), t.texParameteri(n, 10243, 33071), 32879 !== n && 35866 !== n || t.texParameteri(n, 32882, 33071), a.wrapS === l && a.wrapT === l || console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."), t.texParameteri(n, 10240, U(a.magFilter)), t.texParameteri(n, 10241, U(a.minFilter)), a.minFilter !== h && a.minFilter !== p && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")), !0 === e.has("EXT_texture_filter_anisotropic")) {
        const s = e.get("EXT_texture_filter_anisotropic");
        if (a.type === _ && !1 === e.has("OES_texture_float_linear")) return;
        if (!1 === f && a.type === x && !1 === e.has("OES_texture_half_float_linear")) return;
        (a.anisotropy > 1 || i.get(a).__currentAnisotropy) && (t.texParameterf(n, s.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(a.anisotropy, r.getMaxAnisotropy())), i.get(a).__currentAnisotropy = a.anisotropy);
      }
    }

    function Z(e, n) {
      void 0 === e.__webglInit && (e.__webglInit = !0, n.addEventListener("dispose", B), e.__webglTexture = t.createTexture(), s.memory.textures++);
    }

    function J(e, i, r) {
      let s = 3553;
      i.isDataTexture2DArray && (s = 35866), i.isDataTexture3D && (s = 32879), Z(e, i), n.activeTexture(33984 + r), n.bindTexture(s, e.__webglTexture), t.pixelStorei(37440, i.flipY), t.pixelStorei(37441, i.premultiplyAlpha), t.pixelStorei(3317, i.unpackAlignment), t.pixelStorei(37443, 0);

      const o = function (t) {
        return !f && (t.wrapS !== l || t.wrapT !== l || t.minFilter !== h && t.minFilter !== p);
      }(i) && !1 === I(i.image),
            c = N(i.image, o, !1, E),
            u = I(c) || f,
            d = a.convert(i.format);

      let m,
          x = a.convert(i.type),
          T = O(i.internalFormat, d, x);
      Y(s, i, u);
      const L = i.mipmaps;
      if (i.isDepthTexture) T = 6402, f ? T = i.type === _ ? 36012 : i.type === v ? 33190 : i.type === y ? 35056 : 33189 : i.type === _ && console.error("WebGLRenderer: Floating point depth texture requires WebGL2."), i.format === w && 6402 === T && i.type !== g && i.type !== v && (console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."), i.type = g, x = a.convert(i.type)), i.format === S && 6402 === T && (T = 34041, i.type !== y && (console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."), i.type = y, x = a.convert(i.type))), n.texImage2D(3553, 0, T, c.width, c.height, 0, d, x, null);else if (i.isDataTexture) {
        if (L.length > 0 && u) {
          for (let t = 0, e = L.length; t < e; t++) m = L[t], n.texImage2D(3553, t, T, m.width, m.height, 0, d, x, m.data);

          i.generateMipmaps = !1, e.__maxMipLevel = L.length - 1;
        } else n.texImage2D(3553, 0, T, c.width, c.height, 0, d, x, c.data), e.__maxMipLevel = 0;
      } else if (i.isCompressedTexture) {
        for (let t = 0, e = L.length; t < e; t++) m = L[t], i.format !== b && i.format !== M ? null !== d ? n.compressedTexImage2D(3553, t, T, m.width, m.height, 0, m.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : n.texImage2D(3553, t, T, m.width, m.height, 0, d, x, m.data);

        e.__maxMipLevel = L.length - 1;
      } else if (i.isDataTexture2DArray) n.texImage3D(35866, 0, T, c.width, c.height, c.depth, 0, d, x, c.data), e.__maxMipLevel = 0;else if (i.isDataTexture3D) n.texImage3D(32879, 0, T, c.width, c.height, c.depth, 0, d, x, c.data), e.__maxMipLevel = 0;else if (L.length > 0 && u) {
        for (let t = 0, e = L.length; t < e; t++) m = L[t], n.texImage2D(3553, t, T, d, x, m);

        i.generateMipmaps = !1, e.__maxMipLevel = L.length - 1;
      } else n.texImage2D(3553, 0, T, d, x, c), e.__maxMipLevel = 0;
      z(i, u) && F(s, i, c.width, c.height), e.__version = i.version, i.onUpdate && i.onUpdate(i);
    }

    function Q(e, r, s, o, l) {
      const c = a.convert(s.format),
            h = a.convert(s.type),
            u = O(s.internalFormat, c, h);
      32879 === l || 35866 === l ? n.texImage3D(l, 0, u, r.width, r.height, r.depth, 0, c, h, null) : n.texImage2D(l, 0, u, r.width, r.height, 0, c, h, null), n.bindFramebuffer(36160, e), t.framebufferTexture2D(36160, o, l, i.get(s).__webglTexture, 0), n.bindFramebuffer(36160, null);
    }

    function K(e, n, i) {
      if (t.bindRenderbuffer(36161, e), n.depthBuffer && !n.stencilBuffer) {
        let r = 33189;

        if (i) {
          const e = n.depthTexture;
          e && e.isDepthTexture && (e.type === _ ? r = 36012 : e.type === v && (r = 33190));
          const i = tt(n);
          t.renderbufferStorageMultisample(36161, i, r, n.width, n.height);
        } else t.renderbufferStorage(36161, r, n.width, n.height);

        t.framebufferRenderbuffer(36160, 36096, 36161, e);
      } else if (n.depthBuffer && n.stencilBuffer) {
        if (i) {
          const e = tt(n);
          t.renderbufferStorageMultisample(36161, e, 35056, n.width, n.height);
        } else t.renderbufferStorage(36161, 34041, n.width, n.height);

        t.framebufferRenderbuffer(36160, 33306, 36161, e);
      } else {
        const e = !0 === n.isWebGLMultipleRenderTargets ? n.texture[0] : n.texture,
              r = a.convert(e.format),
              s = a.convert(e.type),
              o = O(e.internalFormat, r, s);

        if (i) {
          const e = tt(n);
          t.renderbufferStorageMultisample(36161, e, o, n.width, n.height);
        } else t.renderbufferStorage(36161, o, n.width, n.height);
      }

      t.bindRenderbuffer(36161, null);
    }

    function $(e) {
      const r = i.get(e),
            a = !0 === e.isWebGLCubeRenderTarget;

      if (e.depthTexture) {
        if (a) throw new Error("target.depthTexture not supported in Cube render targets");
        !function (e, r) {
          if (r && r.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
          if (n.bindFramebuffer(36160, e), !r.depthTexture || !r.depthTexture.isDepthTexture) throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
          i.get(r.depthTexture).__webglTexture && r.depthTexture.image.width === r.width && r.depthTexture.image.height === r.height || (r.depthTexture.image.width = r.width, r.depthTexture.image.height = r.height, r.depthTexture.needsUpdate = !0), V(r.depthTexture, 0);

          const a = i.get(r.depthTexture).__webglTexture;

          if (r.depthTexture.format === w) t.framebufferTexture2D(36160, 36096, 3553, a, 0);else {
            if (r.depthTexture.format !== S) throw new Error("Unknown depthTexture format");
            t.framebufferTexture2D(36160, 33306, 3553, a, 0);
          }
        }(r.__webglFramebuffer, e);
      } else if (a) {
        r.__webglDepthbuffer = [];

        for (let i = 0; i < 6; i++) n.bindFramebuffer(36160, r.__webglFramebuffer[i]), r.__webglDepthbuffer[i] = t.createRenderbuffer(), K(r.__webglDepthbuffer[i], e, !1);
      } else n.bindFramebuffer(36160, r.__webglFramebuffer), r.__webglDepthbuffer = t.createRenderbuffer(), K(r.__webglDepthbuffer, e, !1);

      n.bindFramebuffer(36160, null);
    }

    function tt(t) {
      return f && t.isWebGLMultisampleRenderTarget ? Math.min(A, t.samples) : 0;
    }

    let et = !1,
        nt = !1;
    this.allocateTextureUnit = function () {
      const t = H;
      return t >= T && console.warn("THREE.WebGLTextures: Trying to use " + t + " texture units while this GPU supports only " + T), H += 1, t;
    }, this.resetTextureUnits = function () {
      H = 0;
    }, this.setTexture2D = V, this.setTexture2DArray = function (t, e) {
      const r = i.get(t);
      t.version > 0 && r.__version !== t.version ? J(r, t, e) : (n.activeTexture(33984 + e), n.bindTexture(35866, r.__webglTexture));
    }, this.setTexture3D = function (t, e) {
      const r = i.get(t);
      t.version > 0 && r.__version !== t.version ? J(r, t, e) : (n.activeTexture(33984 + e), n.bindTexture(32879, r.__webglTexture));
    }, this.setTextureCube = W, this.setupRenderTarget = function (e) {
      const o = e.texture,
            l = i.get(e),
            c = i.get(o);
      e.addEventListener("dispose", G), !0 !== e.isWebGLMultipleRenderTargets && (c.__webglTexture = t.createTexture(), c.__version = o.version, s.memory.textures++);
      const h = !0 === e.isWebGLCubeRenderTarget,
            u = !0 === e.isWebGLMultipleRenderTargets,
            d = !0 === e.isWebGLMultisampleRenderTarget,
            p = o.isDataTexture3D || o.isDataTexture2DArray,
            m = I(e) || f;

      if (!f || o.format !== M || o.type !== _ && o.type !== x || (o.format = b, console.warn("THREE.WebGLRenderer: Rendering to textures with RGB format is not supported. Using RGBA format instead.")), h) {
        l.__webglFramebuffer = [];

        for (let e = 0; e < 6; e++) l.__webglFramebuffer[e] = t.createFramebuffer();
      } else if (l.__webglFramebuffer = t.createFramebuffer(), u) {
        if (r.drawBuffers) {
          const n = e.texture;

          for (let e = 0, r = n.length; e < r; e++) {
            const r = i.get(n[e]);
            void 0 === r.__webglTexture && (r.__webglTexture = t.createTexture(), s.memory.textures++);
          }
        } else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");
      } else if (d) if (f) {
        l.__webglMultisampledFramebuffer = t.createFramebuffer(), l.__webglColorRenderbuffer = t.createRenderbuffer(), t.bindRenderbuffer(36161, l.__webglColorRenderbuffer);
        const i = a.convert(o.format),
              r = a.convert(o.type),
              s = O(o.internalFormat, i, r),
              c = tt(e);
        t.renderbufferStorageMultisample(36161, c, s, e.width, e.height), n.bindFramebuffer(36160, l.__webglMultisampledFramebuffer), t.framebufferRenderbuffer(36160, 36064, 36161, l.__webglColorRenderbuffer), t.bindRenderbuffer(36161, null), e.depthBuffer && (l.__webglDepthRenderbuffer = t.createRenderbuffer(), K(l.__webglDepthRenderbuffer, e, !0)), n.bindFramebuffer(36160, null);
      } else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.");

      if (h) {
        n.bindTexture(34067, c.__webglTexture), Y(34067, o, m);

        for (let t = 0; t < 6; t++) Q(l.__webglFramebuffer[t], e, o, 36064, 34069 + t);

        z(o, m) && F(34067, o, e.width, e.height), n.bindTexture(34067, null);
      } else if (u) {
        const t = e.texture;

        for (let r = 0, a = t.length; r < a; r++) {
          const a = t[r],
                s = i.get(a);
          n.bindTexture(3553, s.__webglTexture), Y(3553, a, m), Q(l.__webglFramebuffer, e, a, 36064 + r, 3553), z(a, m) && F(3553, a, e.width, e.height);
        }

        n.bindTexture(3553, null);
      } else {
        let t = 3553;
        if (p) if (f) {
          t = o.isDataTexture3D ? 32879 : 35866;
        } else console.warn("THREE.DataTexture3D and THREE.DataTexture2DArray only supported with WebGL2.");
        n.bindTexture(t, c.__webglTexture), Y(t, o, m), Q(l.__webglFramebuffer, e, o, 36064, t), z(o, m) && F(3553, o, e.width, e.height), n.bindTexture(3553, null);
      }

      e.depthBuffer && $(e);
    }, this.updateRenderTargetMipmap = function (t) {
      const e = I(t) || f,
            r = !0 === t.isWebGLMultipleRenderTargets ? t.texture : [t.texture];

      for (let a = 0, s = r.length; a < s; a++) {
        const s = r[a];

        if (z(s, e)) {
          const e = t.isWebGLCubeRenderTarget ? 34067 : 3553,
                r = i.get(s).__webglTexture;

          n.bindTexture(e, r), F(e, s, t.width, t.height), n.bindTexture(e, null);
        }
      }
    }, this.updateMultisampleRenderTarget = function (e) {
      if (e.isWebGLMultisampleRenderTarget) if (f) {
        const r = e.width,
              a = e.height;
        let s = 16384;
        e.depthBuffer && (s |= 256), e.stencilBuffer && (s |= 1024);
        const o = i.get(e);
        n.bindFramebuffer(36008, o.__webglMultisampledFramebuffer), n.bindFramebuffer(36009, o.__webglFramebuffer), t.blitFramebuffer(0, 0, r, a, 0, 0, r, a, s, 9728), n.bindFramebuffer(36008, null), n.bindFramebuffer(36009, o.__webglMultisampledFramebuffer);
      } else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.");
    }, this.safeSetTexture2D = function (t, e) {
      t && t.isWebGLRenderTarget && (!1 === et && (console.warn("THREE.WebGLTextures.safeSetTexture2D: don't use render targets as textures. Use their .texture property instead."), et = !0), t = t.texture), V(t, e);
    }, this.safeSetTextureCube = function (t, e) {
      t && t.isWebGLCubeRenderTarget && (!1 === nt && (console.warn("THREE.WebGLTextures.safeSetTextureCube: don't use cube render targets as textures. Use their .texture property instead."), nt = !0), t = t.texture), W(t, e);
    };
  }

  function Nr(t, e, n) {
    const i = n.isWebGL2;
    return {
      convert: function (t) {
        let n;
        if (t === f) return 5121;
        if (1017 === t) return 32819;
        if (1018 === t) return 32820;
        if (1019 === t) return 33635;
        if (1010 === t) return 5120;
        if (1011 === t) return 5122;
        if (t === g) return 5123;
        if (1013 === t) return 5124;
        if (t === v) return 5125;
        if (t === _) return 5126;
        if (t === x) return i ? 5131 : (n = e.get("OES_texture_half_float"), null !== n ? n.HALF_FLOAT_OES : null);
        if (1021 === t) return 6406;
        if (t === M) return 6407;
        if (t === b) return 6408;
        if (1024 === t) return 6409;
        if (1025 === t) return 6410;
        if (t === w) return 6402;
        if (t === S) return 34041;
        if (1028 === t) return 6403;
        if (1029 === t) return 36244;
        if (1030 === t) return 33319;
        if (1031 === t) return 33320;
        if (1032 === t) return 36248;
        if (1033 === t) return 36249;

        if (t === T || t === L || t === E || t === A) {
          if (n = e.get("WEBGL_compressed_texture_s3tc"), null === n) return null;
          if (t === T) return n.COMPRESSED_RGB_S3TC_DXT1_EXT;
          if (t === L) return n.COMPRESSED_RGBA_S3TC_DXT1_EXT;
          if (t === E) return n.COMPRESSED_RGBA_S3TC_DXT3_EXT;
          if (t === A) return n.COMPRESSED_RGBA_S3TC_DXT5_EXT;
        }

        if (t === C || t === P || t === D || t === R) {
          if (n = e.get("WEBGL_compressed_texture_pvrtc"), null === n) return null;
          if (t === C) return n.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
          if (t === P) return n.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
          if (t === D) return n.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
          if (t === R) return n.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
        }

        if (36196 === t) return n = e.get("WEBGL_compressed_texture_etc1"), null !== n ? n.COMPRESSED_RGB_ETC1_WEBGL : null;

        if ((t === N || t === I) && (n = e.get("WEBGL_compressed_texture_etc"), null !== n)) {
          if (t === N) return n.COMPRESSED_RGB8_ETC2;
          if (t === I) return n.COMPRESSED_RGBA8_ETC2_EAC;
        }

        return 37808 === t || 37809 === t || 37810 === t || 37811 === t || 37812 === t || 37813 === t || 37814 === t || 37815 === t || 37816 === t || 37817 === t || 37818 === t || 37819 === t || 37820 === t || 37821 === t || 37840 === t || 37841 === t || 37842 === t || 37843 === t || 37844 === t || 37845 === t || 37846 === t || 37847 === t || 37848 === t || 37849 === t || 37850 === t || 37851 === t || 37852 === t || 37853 === t ? (n = e.get("WEBGL_compressed_texture_astc"), null !== n ? t : null) : 36492 === t ? (n = e.get("EXT_texture_compression_bptc"), null !== n ? t : null) : t === y ? i ? 34042 : (n = e.get("WEBGL_depth_texture"), null !== n ? n.UNSIGNED_INT_24_8_WEBGL : null) : void 0;
      }
    };
  }

  class Ir extends Rn {
    constructor(t = []) {
      super(), this.cameras = t;
    }

  }

  Ir.prototype.isArrayCamera = !0;

  class zr extends me {
    constructor() {
      super(), this.type = "Group";
    }

  }

  zr.prototype.isGroup = !0;
  const Fr = {
    type: "move"
  };

  class Or {
    constructor() {
      this._targetRay = null, this._grip = null, this._hand = null;
    }

    getHandSpace() {
      return null === this._hand && (this._hand = new zr(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = {
        pinching: !1
      }), this._hand;
    }

    getTargetRaySpace() {
      return null === this._targetRay && (this._targetRay = new zr(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new Y(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new Y()), this._targetRay;
    }

    getGripSpace() {
      return null === this._grip && (this._grip = new zr(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new Y(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new Y()), this._grip;
    }

    dispatchEvent(t) {
      return null !== this._targetRay && this._targetRay.dispatchEvent(t), null !== this._grip && this._grip.dispatchEvent(t), null !== this._hand && this._hand.dispatchEvent(t), this;
    }

    disconnect(t) {
      return this.dispatchEvent({
        type: "disconnected",
        data: t
      }), null !== this._targetRay && (this._targetRay.visible = !1), null !== this._grip && (this._grip.visible = !1), null !== this._hand && (this._hand.visible = !1), this;
    }

    update(t, e, n) {
      let i = null,
          r = null,
          a = null;
      const s = this._targetRay,
            o = this._grip,
            l = this._hand;
      if (t && "visible-blurred" !== e.session.visibilityState) if (null !== s && (i = e.getPose(t.targetRaySpace, n), null !== i && (s.matrix.fromArray(i.transform.matrix), s.matrix.decompose(s.position, s.rotation, s.scale), i.linearVelocity ? (s.hasLinearVelocity = !0, s.linearVelocity.copy(i.linearVelocity)) : s.hasLinearVelocity = !1, i.angularVelocity ? (s.hasAngularVelocity = !0, s.angularVelocity.copy(i.angularVelocity)) : s.hasAngularVelocity = !1, this.dispatchEvent(Fr))), l && t.hand) {
        a = !0;

        for (const i of t.hand.values()) {
          const t = e.getJointPose(i, n);

          if (void 0 === l.joints[i.jointName]) {
            const t = new zr();
            t.matrixAutoUpdate = !1, t.visible = !1, l.joints[i.jointName] = t, l.add(t);
          }

          const r = l.joints[i.jointName];
          null !== t && (r.matrix.fromArray(t.transform.matrix), r.matrix.decompose(r.position, r.rotation, r.scale), r.jointRadius = t.radius), r.visible = null !== t;
        }

        const i = l.joints["index-finger-tip"],
              r = l.joints["thumb-tip"],
              s = i.position.distanceTo(r.position),
              o = .02,
              c = .005;
        l.inputState.pinching && s > o + c ? (l.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: t.handedness,
          target: this
        })) : !l.inputState.pinching && s <= o - c && (l.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: t.handedness,
          target: this
        }));
      } else null !== o && t.gripSpace && (r = e.getPose(t.gripSpace, n), null !== r && (o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), r.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(r.linearVelocity)) : o.hasLinearVelocity = !1, r.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(r.angularVelocity)) : o.hasAngularVelocity = !1));
      return null !== s && (s.visible = null !== i), null !== o && (o.visible = null !== r), null !== l && (l.visible = null !== a), this;
    }

  }

  class Ur extends kt {
    constructor(t, e) {
      super();
      const n = this,
            i = t.state;
      let r = null,
          a = 1,
          s = null,
          o = "local-floor",
          l = null;
      const c = [],
            h = new Map(),
            u = new Rn();
      u.layers.enable(1), u.viewport = new It();
      const d = new Rn();
      d.layers.enable(2), d.viewport = new It();
      const p = [u, d],
            m = new Ir();
      m.layers.enable(1), m.layers.enable(2);
      let f = null,
          g = null;

      function v(t) {
        const e = h.get(t.inputSource);
        e && e.dispatchEvent({
          type: t.type,
          data: t.inputSource
        });
      }

      function _() {
        h.forEach(function (t, e) {
          t.disconnect(e);
        }), h.clear(), f = null, g = null, i.bindXRFramebuffer(null), t.setRenderTarget(t.getRenderTarget()), S.stop(), n.isPresenting = !1, n.dispatchEvent({
          type: "sessionend"
        });
      }

      function x(t) {
        const e = r.inputSources;

        for (let t = 0; t < c.length; t++) h.set(e[t], c[t]);

        for (let e = 0; e < t.removed.length; e++) {
          const n = t.removed[e],
                i = h.get(n);
          i && (i.dispatchEvent({
            type: "disconnected",
            data: n
          }), h.delete(n));
        }

        for (let e = 0; e < t.added.length; e++) {
          const n = t.added[e],
                i = h.get(n);
          i && i.dispatchEvent({
            type: "connected",
            data: n
          });
        }
      }

      this.enabled = !1, this.isPresenting = !1, this.getController = function (t) {
        let e = c[t];
        return void 0 === e && (e = new Or(), c[t] = e), e.getTargetRaySpace();
      }, this.getControllerGrip = function (t) {
        let e = c[t];
        return void 0 === e && (e = new Or(), c[t] = e), e.getGripSpace();
      }, this.getHand = function (t) {
        let e = c[t];
        return void 0 === e && (e = new Or(), c[t] = e), e.getHandSpace();
      }, this.setFramebufferScaleFactor = function (t) {
        a = t, !0 === n.isPresenting && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
      }, this.setReferenceSpaceType = function (t) {
        o = t, !0 === n.isPresenting && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
      }, this.getReferenceSpace = function () {
        return s;
      }, this.getSession = function () {
        return r;
      }, this.setSession = async function (t) {
        if (r = t, null !== r) {
          r.addEventListener("select", v), r.addEventListener("selectstart", v), r.addEventListener("selectend", v), r.addEventListener("squeeze", v), r.addEventListener("squeezestart", v), r.addEventListener("squeezeend", v), r.addEventListener("end", _), r.addEventListener("inputsourceschange", x);
          const t = e.getContextAttributes();
          !0 !== t.xrCompatible && (await e.makeXRCompatible());
          const i = {
            antialias: t.antialias,
            alpha: t.alpha,
            depth: t.depth,
            stencil: t.stencil,
            framebufferScaleFactor: a
          },
                l = new XRWebGLLayer(r, e, i);
          r.updateRenderState({
            baseLayer: l
          }), s = await r.requestReferenceSpace(o), S.setContext(r), S.start(), n.isPresenting = !0, n.dispatchEvent({
            type: "sessionstart"
          });
        }
      };
      const y = new Y(),
            M = new Y();

      function b(t, e) {
        null === e ? t.matrixWorld.copy(t.matrix) : t.matrixWorld.multiplyMatrices(e.matrixWorld, t.matrix), t.matrixWorldInverse.copy(t.matrixWorld).invert();
      }

      this.getCamera = function (t) {
        m.near = d.near = u.near = t.near, m.far = d.far = u.far = t.far, f === m.near && g === m.far || (r.updateRenderState({
          depthNear: m.near,
          depthFar: m.far
        }), f = m.near, g = m.far);
        const e = t.parent,
              n = m.cameras;
        b(m, e);

        for (let t = 0; t < n.length; t++) b(n[t], e);

        t.matrixWorld.copy(m.matrixWorld), t.matrix.copy(m.matrix), t.matrix.decompose(t.position, t.quaternion, t.scale);
        const i = t.children;

        for (let t = 0, e = i.length; t < e; t++) i[t].updateMatrixWorld(!0);

        return 2 === n.length ? function (t, e, n) {
          y.setFromMatrixPosition(e.matrixWorld), M.setFromMatrixPosition(n.matrixWorld);
          const i = y.distanceTo(M),
                r = e.projectionMatrix.elements,
                a = n.projectionMatrix.elements,
                s = r[14] / (r[10] - 1),
                o = r[14] / (r[10] + 1),
                l = (r[9] + 1) / r[5],
                c = (r[9] - 1) / r[5],
                h = (r[8] - 1) / r[0],
                u = (a[8] + 1) / a[0],
                d = s * h,
                p = s * u,
                m = i / (-h + u),
                f = m * -h;
          e.matrixWorld.decompose(t.position, t.quaternion, t.scale), t.translateX(f), t.translateZ(m), t.matrixWorld.compose(t.position, t.quaternion, t.scale), t.matrixWorldInverse.copy(t.matrixWorld).invert();

          const g = s + m,
                v = o + m,
                _ = d - f,
                x = p + (i - f),
                b = l * o / v * g,
                w = c * o / v * g;

          t.projectionMatrix.makePerspective(_, x, b, w, g, v);
        }(m, u, d) : m.projectionMatrix.copy(u.projectionMatrix), m;
      };

      let w = null;
      const S = new Vt();
      S.setAnimationLoop(function (t, e) {
        if (l = e.getViewerPose(s), null !== l) {
          const t = l.views,
                e = r.renderState.baseLayer;
          i.bindXRFramebuffer(e.framebuffer);
          let n = !1;
          t.length !== m.cameras.length && (m.cameras.length = 0, n = !0);

          for (let i = 0; i < t.length; i++) {
            const r = t[i],
                  a = e.getViewport(r),
                  s = p[i];
            s.matrix.fromArray(r.transform.matrix), s.projectionMatrix.fromArray(r.projectionMatrix), s.viewport.set(a.x, a.y, a.width, a.height), 0 === i && m.matrix.copy(s.matrix), !0 === n && m.cameras.push(s);
          }
        }

        const n = r.inputSources;

        for (let t = 0; t < c.length; t++) {
          const i = c[t],
                r = n[t];
          i.update(r, e, s);
        }

        w && w(t, e);
      }), this.setAnimationLoop = function (t) {
        w = t;
      }, this.dispose = function () {};
    }

  }

  function Br(t) {
    function e(e, n) {
      e.opacity.value = n.opacity, n.color && e.diffuse.value.copy(n.color), n.emissive && e.emissive.value.copy(n.emissive).multiplyScalar(n.emissiveIntensity), n.map && (e.map.value = n.map), n.alphaMap && (e.alphaMap.value = n.alphaMap), n.specularMap && (e.specularMap.value = n.specularMap);
      const i = t.get(n).envMap;

      if (i) {
        e.envMap.value = i, e.flipEnvMap.value = i.isCubeTexture && i._needsFlipEnvMap ? -1 : 1, e.reflectivity.value = n.reflectivity, e.refractionRatio.value = n.refractionRatio;

        const r = t.get(i).__maxMipLevel;

        void 0 !== r && (e.maxMipLevel.value = r);
      }

      let r, a;
      n.lightMap && (e.lightMap.value = n.lightMap, e.lightMapIntensity.value = n.lightMapIntensity), n.aoMap && (e.aoMap.value = n.aoMap, e.aoMapIntensity.value = n.aoMapIntensity), n.map ? r = n.map : n.specularMap ? r = n.specularMap : n.displacementMap ? r = n.displacementMap : n.normalMap ? r = n.normalMap : n.bumpMap ? r = n.bumpMap : n.roughnessMap ? r = n.roughnessMap : n.metalnessMap ? r = n.metalnessMap : n.alphaMap ? r = n.alphaMap : n.emissiveMap ? r = n.emissiveMap : n.clearcoatMap ? r = n.clearcoatMap : n.clearcoatNormalMap ? r = n.clearcoatNormalMap : n.clearcoatRoughnessMap && (r = n.clearcoatRoughnessMap), void 0 !== r && (r.isWebGLRenderTarget && (r = r.texture), !0 === r.matrixAutoUpdate && r.updateMatrix(), e.uvTransform.value.copy(r.matrix)), n.aoMap ? a = n.aoMap : n.lightMap && (a = n.lightMap), void 0 !== a && (a.isWebGLRenderTarget && (a = a.texture), !0 === a.matrixAutoUpdate && a.updateMatrix(), e.uv2Transform.value.copy(a.matrix));
    }

    function n(e, n) {
      e.roughness.value = n.roughness, e.metalness.value = n.metalness, n.roughnessMap && (e.roughnessMap.value = n.roughnessMap), n.metalnessMap && (e.metalnessMap.value = n.metalnessMap), n.emissiveMap && (e.emissiveMap.value = n.emissiveMap), n.bumpMap && (e.bumpMap.value = n.bumpMap, e.bumpScale.value = n.bumpScale, 1 === n.side && (e.bumpScale.value *= -1)), n.normalMap && (e.normalMap.value = n.normalMap, e.normalScale.value.copy(n.normalScale), 1 === n.side && e.normalScale.value.negate()), n.displacementMap && (e.displacementMap.value = n.displacementMap, e.displacementScale.value = n.displacementScale, e.displacementBias.value = n.displacementBias);
      t.get(n).envMap && (e.envMapIntensity.value = n.envMapIntensity);
    }

    return {
      refreshFogUniforms: function (t, e) {
        t.fogColor.value.copy(e.color), e.isFog ? (t.fogNear.value = e.near, t.fogFar.value = e.far) : e.isFogExp2 && (t.fogDensity.value = e.density);
      },
      refreshMaterialUniforms: function (t, i, r, a) {
        i.isMeshBasicMaterial ? e(t, i) : i.isMeshLambertMaterial ? (e(t, i), function (t, e) {
          e.emissiveMap && (t.emissiveMap.value = e.emissiveMap);
        }(t, i)) : i.isMeshToonMaterial ? (e(t, i), function (t, e) {
          e.gradientMap && (t.gradientMap.value = e.gradientMap);
          e.emissiveMap && (t.emissiveMap.value = e.emissiveMap);
          e.bumpMap && (t.bumpMap.value = e.bumpMap, t.bumpScale.value = e.bumpScale, 1 === e.side && (t.bumpScale.value *= -1));
          e.normalMap && (t.normalMap.value = e.normalMap, t.normalScale.value.copy(e.normalScale), 1 === e.side && t.normalScale.value.negate());
          e.displacementMap && (t.displacementMap.value = e.displacementMap, t.displacementScale.value = e.displacementScale, t.displacementBias.value = e.displacementBias);
        }(t, i)) : i.isMeshPhongMaterial ? (e(t, i), function (t, e) {
          t.specular.value.copy(e.specular), t.shininess.value = Math.max(e.shininess, 1e-4), e.emissiveMap && (t.emissiveMap.value = e.emissiveMap);
          e.bumpMap && (t.bumpMap.value = e.bumpMap, t.bumpScale.value = e.bumpScale, 1 === e.side && (t.bumpScale.value *= -1));
          e.normalMap && (t.normalMap.value = e.normalMap, t.normalScale.value.copy(e.normalScale), 1 === e.side && t.normalScale.value.negate());
          e.displacementMap && (t.displacementMap.value = e.displacementMap, t.displacementScale.value = e.displacementScale, t.displacementBias.value = e.displacementBias);
        }(t, i)) : i.isMeshStandardMaterial ? (e(t, i), i.isMeshPhysicalMaterial ? function (t, e) {
          n(t, e), t.reflectivity.value = e.reflectivity, t.clearcoat.value = e.clearcoat, t.clearcoatRoughness.value = e.clearcoatRoughness, e.sheen && t.sheen.value.copy(e.sheen);
          e.clearcoatMap && (t.clearcoatMap.value = e.clearcoatMap);
          e.clearcoatRoughnessMap && (t.clearcoatRoughnessMap.value = e.clearcoatRoughnessMap);
          e.clearcoatNormalMap && (t.clearcoatNormalScale.value.copy(e.clearcoatNormalScale), t.clearcoatNormalMap.value = e.clearcoatNormalMap, 1 === e.side && t.clearcoatNormalScale.value.negate());
          t.transmission.value = e.transmission, e.transmissionMap && (t.transmissionMap.value = e.transmissionMap);
        }(t, i) : n(t, i)) : i.isMeshMatcapMaterial ? (e(t, i), function (t, e) {
          e.matcap && (t.matcap.value = e.matcap);
          e.bumpMap && (t.bumpMap.value = e.bumpMap, t.bumpScale.value = e.bumpScale, 1 === e.side && (t.bumpScale.value *= -1));
          e.normalMap && (t.normalMap.value = e.normalMap, t.normalScale.value.copy(e.normalScale), 1 === e.side && t.normalScale.value.negate());
          e.displacementMap && (t.displacementMap.value = e.displacementMap, t.displacementScale.value = e.displacementScale, t.displacementBias.value = e.displacementBias);
        }(t, i)) : i.isMeshDepthMaterial ? (e(t, i), function (t, e) {
          e.displacementMap && (t.displacementMap.value = e.displacementMap, t.displacementScale.value = e.displacementScale, t.displacementBias.value = e.displacementBias);
        }(t, i)) : i.isMeshDistanceMaterial ? (e(t, i), function (t, e) {
          e.displacementMap && (t.displacementMap.value = e.displacementMap, t.displacementScale.value = e.displacementScale, t.displacementBias.value = e.displacementBias);
          t.referencePosition.value.copy(e.referencePosition), t.nearDistance.value = e.nearDistance, t.farDistance.value = e.farDistance;
        }(t, i)) : i.isMeshNormalMaterial ? (e(t, i), function (t, e) {
          e.bumpMap && (t.bumpMap.value = e.bumpMap, t.bumpScale.value = e.bumpScale, 1 === e.side && (t.bumpScale.value *= -1));
          e.normalMap && (t.normalMap.value = e.normalMap, t.normalScale.value.copy(e.normalScale), 1 === e.side && t.normalScale.value.negate());
          e.displacementMap && (t.displacementMap.value = e.displacementMap, t.displacementScale.value = e.displacementScale, t.displacementBias.value = e.displacementBias);
        }(t, i)) : i.isLineBasicMaterial ? (function (t, e) {
          t.diffuse.value.copy(e.color), t.opacity.value = e.opacity;
        }(t, i), i.isLineDashedMaterial && function (t, e) {
          t.dashSize.value = e.dashSize, t.totalSize.value = e.dashSize + e.gapSize, t.scale.value = e.scale;
        }(t, i)) : i.isPointsMaterial ? function (t, e, n, i) {
          t.diffuse.value.copy(e.color), t.opacity.value = e.opacity, t.size.value = e.size * n, t.scale.value = .5 * i, e.map && (t.map.value = e.map);
          e.alphaMap && (t.alphaMap.value = e.alphaMap);
          let r;
          e.map ? r = e.map : e.alphaMap && (r = e.alphaMap);
          void 0 !== r && (!0 === r.matrixAutoUpdate && r.updateMatrix(), t.uvTransform.value.copy(r.matrix));
        }(t, i, r, a) : i.isSpriteMaterial ? function (t, e) {
          t.diffuse.value.copy(e.color), t.opacity.value = e.opacity, t.rotation.value = e.rotation, e.map && (t.map.value = e.map);
          e.alphaMap && (t.alphaMap.value = e.alphaMap);
          let n;
          e.map ? n = e.map : e.alphaMap && (n = e.alphaMap);
          void 0 !== n && (!0 === n.matrixAutoUpdate && n.updateMatrix(), t.uvTransform.value.copy(n.matrix));
        }(t, i) : i.isShadowMaterial ? (t.color.value.copy(i.color), t.opacity.value = i.opacity) : i.isShaderMaterial && (i.uniformsNeedUpdate = !1);
      }
    };
  }

  class Gr extends me {
    constructor() {
      super(), this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.overrideMaterial = null, this.autoUpdate = !0, "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {
        detail: this
      }));
    }

    copy(t, e) {
      return super.copy(t, e), null !== t.background && (this.background = t.background.clone()), null !== t.environment && (this.environment = t.environment.clone()), null !== t.fog && (this.fog = t.fog.clone()), null !== t.overrideMaterial && (this.overrideMaterial = t.overrideMaterial.clone()), this.autoUpdate = t.autoUpdate, this.matrixAutoUpdate = t.matrixAutoUpdate, this;
    }

    toJSON(t) {
      const e = super.toJSON(t);
      return null !== this.background && (e.object.background = this.background.toJSON(t)), null !== this.environment && (e.object.environment = this.environment.toJSON(t)), null !== this.fog && (e.object.fog = this.fog.toJSON()), e;
    }

  }

  Gr.prototype.isScene = !0;

  class Hr extends Ee {
    constructor(t) {
      super(), this.type = "MeshPhongMaterial", this.color = new Ht(16777215), this.specular = new Ht(1118481), this.shininess = 30, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Ht(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new Nt(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = 0, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.morphTargets = !1, this.morphNormals = !1, this.flatShading = !1, this.setValues(t);
    }

    copy(t) {
      return super.copy(t), this.color.copy(t.color), this.specular.copy(t.specular), this.shininess = t.shininess, this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalMapType = t.normalMapType, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.morphTargets = t.morphTargets, this.morphNormals = t.morphNormals, this.flatShading = t.flatShading, this;
    }

  }

  Hr.prototype.isMeshPhongMaterial = !0;
  const Vr = {
    enabled: !1,
    files: {},
    add: function (t, e) {
      !1 !== this.enabled && (this.files[t] = e);
    },
    get: function (t) {
      if (!1 !== this.enabled) return this.files[t];
    },
    remove: function (t) {
      delete this.files[t];
    },
    clear: function () {
      this.files = {};
    }
  };

  class Wr {
    constructor(t, e, n) {
      const i = this;
      let r,
          a = !1,
          s = 0,
          o = 0;
      const l = [];
      this.onStart = void 0, this.onLoad = t, this.onProgress = e, this.onError = n, this.itemStart = function (t) {
        o++, !1 === a && void 0 !== i.onStart && i.onStart(t, s, o), a = !0;
      }, this.itemEnd = function (t) {
        s++, void 0 !== i.onProgress && i.onProgress(t, s, o), s === o && (a = !1, void 0 !== i.onLoad && i.onLoad());
      }, this.itemError = function (t) {
        void 0 !== i.onError && i.onError(t);
      }, this.resolveURL = function (t) {
        return r ? r(t) : t;
      }, this.setURLModifier = function (t) {
        return r = t, this;
      }, this.addHandler = function (t, e) {
        return l.push(t, e), this;
      }, this.removeHandler = function (t) {
        const e = l.indexOf(t);
        return -1 !== e && l.splice(e, 2), this;
      }, this.getHandler = function (t) {
        for (let e = 0, n = l.length; e < n; e += 2) {
          const n = l[e],
                i = l[e + 1];
          if (n.global && (n.lastIndex = 0), n.test(t)) return i;
        }

        return null;
      };
    }

  }

  const kr = new Wr();

  class qr {
    constructor(t) {
      this.manager = void 0 !== t ? t : kr, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {};
    }

    load() {}

    loadAsync(t, e) {
      const n = this;
      return new Promise(function (i, r) {
        n.load(t, i, e, r);
      });
    }

    parse() {}

    setCrossOrigin(t) {
      return this.crossOrigin = t, this;
    }

    setWithCredentials(t) {
      return this.withCredentials = t, this;
    }

    setPath(t) {
      return this.path = t, this;
    }

    setResourcePath(t) {
      return this.resourcePath = t, this;
    }

    setRequestHeader(t) {
      return this.requestHeader = t, this;
    }

  }

  class jr extends qr {
    constructor(t) {
      super(t);
    }

    load(t, e, n, i) {
      void 0 !== this.path && (t = this.path + t), t = this.manager.resolveURL(t);
      const r = this,
            a = Vr.get(t);
      if (void 0 !== a) return r.manager.itemStart(t), setTimeout(function () {
        e && e(a), r.manager.itemEnd(t);
      }, 0), a;
      const s = document.createElementNS("http://www.w3.org/1999/xhtml", "img");

      function o() {
        s.removeEventListener("load", o, !1), s.removeEventListener("error", l, !1), Vr.add(t, this), e && e(this), r.manager.itemEnd(t);
      }

      function l(e) {
        s.removeEventListener("load", o, !1), s.removeEventListener("error", l, !1), i && i(e), r.manager.itemError(t), r.manager.itemEnd(t);
      }

      return s.addEventListener("load", o, !1), s.addEventListener("error", l, !1), "data:" !== t.substr(0, 5) && void 0 !== this.crossOrigin && (s.crossOrigin = this.crossOrigin), r.manager.itemStart(t), s.src = t, s;
    }

  }

  class Xr extends me {
    constructor(t, e = 1) {
      super(), this.type = "Light", this.color = new Ht(t), this.intensity = e;
    }

    dispose() {}

    copy(t) {
      return super.copy(t), this.color.copy(t.color), this.intensity = t.intensity, this;
    }

    toJSON(t) {
      const e = super.toJSON(t);
      return e.object.color = this.color.getHex(), e.object.intensity = this.intensity, void 0 !== this.groundColor && (e.object.groundColor = this.groundColor.getHex()), void 0 !== this.distance && (e.object.distance = this.distance), void 0 !== this.angle && (e.object.angle = this.angle), void 0 !== this.decay && (e.object.decay = this.decay), void 0 !== this.penumbra && (e.object.penumbra = this.penumbra), void 0 !== this.shadow && (e.object.shadow = this.shadow.toJSON()), e;
    }

  }

  Xr.prototype.isLight = !0;
  const Yr = new Tt(),
        Zr = new Y(),
        Jr = new Y();

  class Qr extends Dn {
    constructor(t = -1, e = 1, n = 1, i = -1, r = .1, a = 2e3) {
      super(), this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = t, this.right = e, this.top = n, this.bottom = i, this.near = r, this.far = a, this.updateProjectionMatrix();
    }

    copy(t, e) {
      return super.copy(t, e), this.left = t.left, this.right = t.right, this.top = t.top, this.bottom = t.bottom, this.near = t.near, this.far = t.far, this.zoom = t.zoom, this.view = null === t.view ? null : Object.assign({}, t.view), this;
    }

    setViewOffset(t, e, n, i, r, a) {
      null === this.view && (this.view = {
        enabled: !0,
        fullWidth: 1,
        fullHeight: 1,
        offsetX: 0,
        offsetY: 0,
        width: 1,
        height: 1
      }), this.view.enabled = !0, this.view.fullWidth = t, this.view.fullHeight = e, this.view.offsetX = n, this.view.offsetY = i, this.view.width = r, this.view.height = a, this.updateProjectionMatrix();
    }

    clearViewOffset() {
      null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix();
    }

    updateProjectionMatrix() {
      const t = (this.right - this.left) / (2 * this.zoom),
            e = (this.top - this.bottom) / (2 * this.zoom),
            n = (this.right + this.left) / 2,
            i = (this.top + this.bottom) / 2;
      let r = n - t,
          a = n + t,
          s = i + e,
          o = i - e;

      if (null !== this.view && this.view.enabled) {
        const t = (this.right - this.left) / this.view.fullWidth / this.zoom,
              e = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
        r += t * this.view.offsetX, a = r + t * this.view.width, s -= e * this.view.offsetY, o = s - e * this.view.height;
      }

      this.projectionMatrix.makeOrthographic(r, a, s, o, this.near, this.far), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
    }

    toJSON(t) {
      const e = super.toJSON(t);
      return e.object.zoom = this.zoom, e.object.left = this.left, e.object.right = this.right, e.object.top = this.top, e.object.bottom = this.bottom, e.object.near = this.near, e.object.far = this.far, null !== this.view && (e.object.view = Object.assign({}, this.view)), e;
    }

  }

  Qr.prototype.isOrthographicCamera = !0;

  class Kr extends class {
    constructor(t) {
      this.camera = t, this.bias = 0, this.normalBias = 0, this.radius = 1, this.mapSize = new Nt(512, 512), this.map = null, this.mapPass = null, this.matrix = new Tt(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new St(), this._frameExtents = new Nt(1, 1), this._viewportCount = 1, this._viewports = [new It(0, 0, 1, 1)];
    }

    getViewportCount() {
      return this._viewportCount;
    }

    getFrustum() {
      return this._frustum;
    }

    updateMatrices(t) {
      const e = this.camera,
            n = this.matrix;
      Zr.setFromMatrixPosition(t.matrixWorld), e.position.copy(Zr), Jr.setFromMatrixPosition(t.target.matrixWorld), e.lookAt(Jr), e.updateMatrixWorld(), Yr.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), this._frustum.setFromProjectionMatrix(Yr), n.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), n.multiply(e.projectionMatrix), n.multiply(e.matrixWorldInverse);
    }

    getViewport(t) {
      return this._viewports[t];
    }

    getFrameExtents() {
      return this._frameExtents;
    }

    dispose() {
      this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
    }

    copy(t) {
      return this.camera = t.camera.clone(), this.bias = t.bias, this.radius = t.radius, this.mapSize.copy(t.mapSize), this;
    }

    clone() {
      return new this.constructor().copy(this);
    }

    toJSON() {
      const t = {};
      return 0 !== this.bias && (t.bias = this.bias), 0 !== this.normalBias && (t.normalBias = this.normalBias), 1 !== this.radius && (t.radius = this.radius), 512 === this.mapSize.x && 512 === this.mapSize.y || (t.mapSize = this.mapSize.toArray()), t.camera = this.camera.toJSON(!1).object, delete t.camera.matrix, t;
    }

  } {
    constructor() {
      super(new Qr(-5, 5, 5, -5, .5, 500));
    }

  }

  Kr.prototype.isDirectionalLightShadow = !0;

  class $r extends Xr {
    constructor(t, e) {
      super(t, e), this.type = "DirectionalLight", this.position.copy(me.DefaultUp), this.updateMatrix(), this.target = new me(), this.shadow = new Kr();
    }

    dispose() {
      this.shadow.dispose();
    }

    copy(t) {
      return super.copy(t), this.target = t.target.clone(), this.shadow = t.shadow.clone(), this;
    }

  }

  $r.prototype.isDirectionalLight = !0;

  class ta extends Xr {
    constructor(t, e) {
      super(t, e), this.type = "AmbientLight";
    }

  }

  ta.prototype.isAmbientLight = !0, "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", {
    detail: {
      revision: e
    }
  })), "undefined" != typeof window && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = e), t.ACESFilmicToneMapping = 4, t.AddEquation = n, t.AddOperation = 2, t.AdditiveAnimationBlendMode = 2501, t.AdditiveBlending = 2, t.AlphaFormat = 1021, t.AlwaysDepth = 1, t.AlwaysStencilFunc = 519, t.AmbientLight = ta, t.BackSide = 1, t.BasicDepthPacking = 3200, t.BasicShadowMap = 0, t.BoxGeometry = Se, t.ByteType = 1010, t.CineonToneMapping = 3, t.ClampToEdgeWrapping = l, t.Color = Ht, t.CubeReflectionMapping = i, t.CubeRefractionMapping = r, t.CubeUVReflectionMapping = a, t.CubeUVRefractionMapping = s, t.CullFaceBack = 1, t.CullFaceFront = 2, t.CullFaceFrontBack = 3, t.CullFaceNone = 0, t.CustomBlending = 5, t.CustomToneMapping = 5, t.DecrementStencilOp = 7683, t.DecrementWrapStencilOp = 34056, t.DefaultLoadingManager = kr, t.DepthFormat = w, t.DepthStencilFormat = S, t.DirectionalLight = $r, t.DoubleSide = 2, t.DstAlphaFactor = 206, t.DstColorFactor = 208, t.DynamicCopyUsage = 35050, t.DynamicDrawUsage = 35048, t.DynamicReadUsage = 35049, t.EqualDepth = 4, t.EqualStencilFunc = 514, t.EquirectangularReflectionMapping = 303, t.EquirectangularRefractionMapping = 304, t.FlatShading = 1, t.FloatType = _, t.FrontSide = 0, t.GLSL1 = "100", t.GLSL3 = U, t.GammaEncoding = 3007, t.GreaterDepth = 6, t.GreaterEqualDepth = 5, t.GreaterEqualStencilFunc = 518, t.GreaterStencilFunc = 516, t.Group = zr, t.HalfFloatType = x, t.IncrementStencilOp = 7682, t.IncrementWrapStencilOp = 34055, t.IntType = 1013, t.InterpolateDiscrete = 2300, t.InterpolateLinear = 2301, t.InterpolateSmooth = 2302, t.InvertStencilOp = 5386, t.KeepStencilOp = F, t.LessDepth = 2, t.LessEqualDepth = 3, t.LessEqualStencilFunc = 515, t.LessStencilFunc = 513, t.LinearEncoding = z, t.LinearFilter = p, t.LinearMipMapLinearFilter = 1008, t.LinearMipMapNearestFilter = 1007, t.LinearMipmapLinearFilter = m, t.LinearMipmapNearestFilter = 1007, t.LinearToneMapping = 1, t.LoadingManager = Wr, t.LogLuvEncoding = 3003, t.LoopOnce = 2200, t.LoopPingPong = 2202, t.LoopRepeat = 2201, t.LuminanceAlphaFormat = 1025, t.LuminanceFormat = 1024, t.MOUSE = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2,
    ROTATE: 0,
    DOLLY: 1,
    PAN: 2
  }, t.MaxEquation = 104, t.Mesh = gn, t.MeshBasicMaterial = Qe, t.MeshPhongMaterial = Hr, t.MinEquation = 103, t.MirroredRepeatWrapping = c, t.MixOperation = 1, t.MultiplyBlending = 4, t.MultiplyOperation = 0, t.NearestFilter = h, t.NearestMipMapLinearFilter = 1005, t.NearestMipMapNearestFilter = 1004, t.NearestMipmapLinearFilter = d, t.NearestMipmapNearestFilter = u, t.NeverDepth = 0, t.NeverStencilFunc = 512, t.NoBlending = 0, t.NoToneMapping = 0, t.NormalAnimationBlendMode = 2500, t.NormalBlending = 1, t.NotEqualDepth = 7, t.NotEqualStencilFunc = 517, t.ObjectSpaceNormalMap = 1, t.OneFactor = 201, t.OneMinusDstAlphaFactor = 207, t.OneMinusDstColorFactor = 209, t.OneMinusSrcAlphaFactor = 205, t.OneMinusSrcColorFactor = 203, t.PCFShadowMap = 1, t.PCFSoftShadowMap = 2, t.PerspectiveCamera = Rn, t.PlaneGeometry = Te, t.REVISION = e, t.RGBADepthPacking = 3201, t.RGBAFormat = b, t.RGBAIntegerFormat = 1033, t.RGBA_ASTC_10x10_Format = 37819, t.RGBA_ASTC_10x5_Format = 37816, t.RGBA_ASTC_10x6_Format = 37817, t.RGBA_ASTC_10x8_Format = 37818, t.RGBA_ASTC_12x10_Format = 37820, t.RGBA_ASTC_12x12_Format = 37821, t.RGBA_ASTC_4x4_Format = 37808, t.RGBA_ASTC_5x4_Format = 37809, t.RGBA_ASTC_5x5_Format = 37810, t.RGBA_ASTC_6x5_Format = 37811, t.RGBA_ASTC_6x6_Format = 37812, t.RGBA_ASTC_8x5_Format = 37813, t.RGBA_ASTC_8x6_Format = 37814, t.RGBA_ASTC_8x8_Format = 37815, t.RGBA_BPTC_Format = 36492, t.RGBA_ETC2_EAC_Format = I, t.RGBA_PVRTC_2BPPV1_Format = R, t.RGBA_PVRTC_4BPPV1_Format = D, t.RGBA_S3TC_DXT1_Format = L, t.RGBA_S3TC_DXT3_Format = E, t.RGBA_S3TC_DXT5_Format = A, t.RGBDEncoding = 3006, t.RGBEEncoding = 3002, t.RGBEFormat = 1023, t.RGBFormat = M, t.RGBIntegerFormat = 1032, t.RGBM16Encoding = 3005, t.RGBM7Encoding = 3004, t.RGB_ETC1_Format = 36196, t.RGB_ETC2_Format = N, t.RGB_PVRTC_2BPPV1_Format = P, t.RGB_PVRTC_4BPPV1_Format = C, t.RGB_S3TC_DXT1_Format = T, t.RGFormat = 1030, t.RGIntegerFormat = 1031, t.RedFormat = 1028, t.RedIntegerFormat = 1029, t.ReinhardToneMapping = 2, t.RepeatWrapping = o, t.ReplaceStencilOp = 7681, t.ReverseSubtractEquation = 102, t.SRGB8_ALPHA8_ASTC_10x10_Format = 37851, t.SRGB8_ALPHA8_ASTC_10x5_Format = 37848, t.SRGB8_ALPHA8_ASTC_10x6_Format = 37849, t.SRGB8_ALPHA8_ASTC_10x8_Format = 37850, t.SRGB8_ALPHA8_ASTC_12x10_Format = 37852, t.SRGB8_ALPHA8_ASTC_12x12_Format = 37853, t.SRGB8_ALPHA8_ASTC_4x4_Format = 37840, t.SRGB8_ALPHA8_ASTC_5x4_Format = 37841, t.SRGB8_ALPHA8_ASTC_5x5_Format = 37842, t.SRGB8_ALPHA8_ASTC_6x5_Format = 37843, t.SRGB8_ALPHA8_ASTC_6x6_Format = 37844, t.SRGB8_ALPHA8_ASTC_8x5_Format = 37845, t.SRGB8_ALPHA8_ASTC_8x6_Format = 37846, t.SRGB8_ALPHA8_ASTC_8x8_Format = 37847, t.Scene = Gr, t.ShortType = 1011, t.SmoothShading = 2, t.SrcAlphaFactor = 204, t.SrcAlphaSaturateFactor = 210, t.SrcColorFactor = 202, t.StaticCopyUsage = 35046, t.StaticDrawUsage = O, t.StaticReadUsage = 35045, t.StreamCopyUsage = 35042, t.StreamDrawUsage = 35040, t.StreamReadUsage = 35041, t.SubtractEquation = 101, t.SubtractiveBlending = 3, t.TOUCH = {
    ROTATE: 0,
    PAN: 1,
    DOLLY_PAN: 2,
    DOLLY_ROTATE: 3
  }, t.TangentSpaceNormalMap = 0, t.TextureLoader = class extends qr {
    constructor(t) {
      super(t);
    }

    load(t, e, n, i) {
      const r = new An(),
            a = new jr(this.manager);
      return a.setCrossOrigin(this.crossOrigin), a.setPath(this.path), a.load(t, function (n) {
        r.image = n;
        const i = t.search(/\.jpe?g($|\?)/i) > 0 || 0 === t.search(/^data\:image\/jpeg/);
        r.format = i ? M : b, r.needsUpdate = !0, void 0 !== e && e(r);
      }, n, i), r;
    }

  }, t.TriangleFanDrawMode = 2, t.TriangleStripDrawMode = 1, t.TrianglesDrawMode = 0, t.UVMapping = 300, t.UnsignedByteType = f, t.UnsignedInt248Type = y, t.UnsignedIntType = v, t.UnsignedShort4444Type = 1017, t.UnsignedShort5551Type = 1018, t.UnsignedShort565Type = 1019, t.UnsignedShortType = g, t.VSMShadowMap = 3, t.Vector3 = Y, t.WebGLRenderer = function (t) {
    const e = void 0 !== (t = t || {}).canvas ? t.canvas : function () {
      const t = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
      return t.style.display = "block", t;
    }(),
          n = void 0 !== t.context ? t.context : null,
          i = void 0 !== t.alpha && t.alpha,
          r = void 0 === t.depth || t.depth,
          a = void 0 === t.stencil || t.stencil,
          s = void 0 !== t.antialias && t.antialias,
          o = void 0 === t.premultipliedAlpha || t.premultipliedAlpha,
          l = void 0 !== t.preserveDrawingBuffer && t.preserveDrawingBuffer,
          c = void 0 !== t.powerPreference ? t.powerPreference : "default",
          h = void 0 !== t.failIfMajorPerformanceCaveat && t.failIfMajorPerformanceCaveat;
    let u = null,
        d = null;
    const p = [],
          m = [];
    this.domElement = e, this.debug = {
      checkShaderErrors: !0
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.gammaFactor = 2, this.outputEncoding = z, this.physicallyCorrectLights = !1, this.toneMapping = 0, this.toneMappingExposure = 1;
    const g = this;
    let v = !1,
        y = 0,
        M = 0,
        w = null,
        S = -1,
        T = null;
    const L = new It(),
          E = new It();
    let A = null,
        C = e.width,
        P = e.height,
        D = 1,
        R = null,
        N = null;
    const I = new It(0, 0, C, P),
          F = new It(0, 0, C, P);
    let O = !1;
    const U = [],
          B = new St();
    let G = !1,
        H = !1;
    const V = new Tt(),
          W = new Y(),
          k = {
      background: null,
      fog: null,
      environment: null,
      overrideMaterial: null,
      isScene: !0
    };

    function q() {
      return null === w ? D : 1;
    }

    let j,
        X,
        Z,
        J,
        Q,
        K,
        $,
        tt,
        et,
        nt,
        it,
        rt,
        at,
        st,
        ot,
        lt,
        ct,
        ht,
        ut,
        dt,
        pt,
        mt,
        ft = n;

    function gt(t, n) {
      for (let i = 0; i < t.length; i++) {
        const r = t[i],
              a = e.getContext(r, n);
        if (null !== a) return a;
      }

      return null;
    }

    try {
      const t = {
        alpha: i,
        depth: r,
        stencil: a,
        antialias: s,
        premultipliedAlpha: o,
        preserveDrawingBuffer: l,
        powerPreference: c,
        failIfMajorPerformanceCaveat: h
      };

      if (e.addEventListener("webglcontextlost", xt, !1), e.addEventListener("webglcontextrestored", yt, !1), null === ft) {
        const e = ["webgl2", "webgl", "experimental-webgl"];
        if (!0 === g.isWebGL1Renderer && e.shift(), ft = gt(e, t), null === ft) throw gt(e) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }

      void 0 === ft.getShaderPrecisionFormat && (ft.getShaderPrecisionFormat = function () {
        return {
          rangeMin: 1,
          rangeMax: 1,
          precision: 1
        };
      });
    } catch (t) {
      throw console.error("THREE.WebGLRenderer: " + t.message), t;
    }

    function vt() {
      j = new Un(ft), X = new Sn(ft, j, t), j.init(X), pt = new Nr(ft, j, X), Z = new Dr(ft, j, X), U[0] = 1029, J = new Hn(ft), Q = new vr(), K = new Rr(ft, j, Z, Q, X, pt, J), $ = new On(g), tt = new Wt(ft, X), mt = new bn(ft, j, tt, X), et = new Bn(ft, tt, J, mt), nt = new qn(ft, et, tt, J), ht = new kn(ft), ot = new Tn(Q), it = new gr(g, $, j, X, mt, ot), rt = new Br(Q), at = new Mr(Q), st = new Er(j, X), ct = new Mn(g, $, Z, nt, o), lt = new Pr(g, nt, X), ut = new wn(ft, j, J, X), dt = new Gn(ft, j, J, X), J.programs = it.programs, g.capabilities = X, g.extensions = j, g.properties = Q, g.renderLists = at, g.shadowMap = lt, g.state = Z, g.info = J;
    }

    vt();

    const _t = new Ur(g, ft);

    function xt(t) {
      t.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), v = !0;
    }

    function yt() {
      console.log("THREE.WebGLRenderer: Context Restored."), v = !1;
      const t = J.autoReset,
            e = lt.enabled,
            n = lt.autoUpdate,
            i = lt.needsUpdate,
            r = lt.type;
      vt(), J.autoReset = t, lt.enabled = e, lt.autoUpdate = n, lt.needsUpdate = i, lt.type = r;
    }

    function Mt(t) {
      const e = t.target;
      e.removeEventListener("dispose", Mt), function (t) {
        (function (t) {
          const e = Q.get(t).programs;
          void 0 !== e && e.forEach(function (t) {
            it.releaseProgram(t);
          });
        })(t), Q.remove(t);
      }(e);
    }

    this.xr = _t, this.getContext = function () {
      return ft;
    }, this.getContextAttributes = function () {
      return ft.getContextAttributes();
    }, this.forceContextLoss = function () {
      const t = j.get("WEBGL_lose_context");
      t && t.loseContext();
    }, this.forceContextRestore = function () {
      const t = j.get("WEBGL_lose_context");
      t && t.restoreContext();
    }, this.getPixelRatio = function () {
      return D;
    }, this.setPixelRatio = function (t) {
      void 0 !== t && (D = t, this.setSize(C, P, !1));
    }, this.getSize = function (t) {
      return void 0 === t && (console.warn("WebGLRenderer: .getsize() now requires a Vector2 as an argument"), t = new Nt()), t.set(C, P);
    }, this.setSize = function (t, n, i) {
      _t.isPresenting ? console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.") : (C = t, P = n, e.width = Math.floor(t * D), e.height = Math.floor(n * D), !1 !== i && (e.style.width = t + "px", e.style.height = n + "px"), this.setViewport(0, 0, t, n));
    }, this.getDrawingBufferSize = function (t) {
      return void 0 === t && (console.warn("WebGLRenderer: .getdrawingBufferSize() now requires a Vector2 as an argument"), t = new Nt()), t.set(C * D, P * D).floor();
    }, this.setDrawingBufferSize = function (t, n, i) {
      C = t, P = n, D = i, e.width = Math.floor(t * i), e.height = Math.floor(n * i), this.setViewport(0, 0, t, n);
    }, this.getCurrentViewport = function (t) {
      return void 0 === t && (console.warn("WebGLRenderer: .getCurrentViewport() now requires a Vector4 as an argument"), t = new It()), t.copy(L);
    }, this.getViewport = function (t) {
      return t.copy(I);
    }, this.setViewport = function (t, e, n, i) {
      t.isVector4 ? I.set(t.x, t.y, t.z, t.w) : I.set(t, e, n, i), Z.viewport(L.copy(I).multiplyScalar(D).floor());
    }, this.getScissor = function (t) {
      return t.copy(F);
    }, this.setScissor = function (t, e, n, i) {
      t.isVector4 ? F.set(t.x, t.y, t.z, t.w) : F.set(t, e, n, i), Z.scissor(E.copy(F).multiplyScalar(D).floor());
    }, this.getScissorTest = function () {
      return O;
    }, this.setScissorTest = function (t) {
      Z.setScissorTest(O = t);
    }, this.setOpaqueSort = function (t) {
      R = t;
    }, this.setTransparentSort = function (t) {
      N = t;
    }, this.getClearColor = function (t) {
      return void 0 === t && (console.warn("WebGLRenderer: .getClearColor() now requires a Color as an argument"), t = new Ht()), t.copy(ct.getClearColor());
    }, this.setClearColor = function () {
      ct.setClearColor.apply(ct, arguments);
    }, this.getClearAlpha = function () {
      return ct.getClearAlpha();
    }, this.setClearAlpha = function () {
      ct.setClearAlpha.apply(ct, arguments);
    }, this.clear = function (t, e, n) {
      let i = 0;
      (void 0 === t || t) && (i |= 16384), (void 0 === e || e) && (i |= 256), (void 0 === n || n) && (i |= 1024), ft.clear(i);
    }, this.clearColor = function () {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function () {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function () {
      this.clear(!1, !1, !0);
    }, this.dispose = function () {
      e.removeEventListener("webglcontextlost", xt, !1), e.removeEventListener("webglcontextrestored", yt, !1), at.dispose(), st.dispose(), Q.dispose(), $.dispose(), nt.dispose(), mt.dispose(), _t.dispose(), _t.removeEventListener("sessionstart", wt), _t.removeEventListener("sessionend", Lt), Et.stop();
    }, this.renderBufferImmediate = function (t, e) {
      mt.initAttributes();
      const n = Q.get(t);
      t.hasPositions && !n.position && (n.position = ft.createBuffer()), t.hasNormals && !n.normal && (n.normal = ft.createBuffer()), t.hasUvs && !n.uv && (n.uv = ft.createBuffer()), t.hasColors && !n.color && (n.color = ft.createBuffer());
      const i = e.getAttributes();
      t.hasPositions && (ft.bindBuffer(34962, n.position), ft.bufferData(34962, t.positionArray, 35048), mt.enableAttribute(i.position), ft.vertexAttribPointer(i.position, 3, 5126, !1, 0, 0)), t.hasNormals && (ft.bindBuffer(34962, n.normal), ft.bufferData(34962, t.normalArray, 35048), mt.enableAttribute(i.normal), ft.vertexAttribPointer(i.normal, 3, 5126, !1, 0, 0)), t.hasUvs && (ft.bindBuffer(34962, n.uv), ft.bufferData(34962, t.uvArray, 35048), mt.enableAttribute(i.uv), ft.vertexAttribPointer(i.uv, 2, 5126, !1, 0, 0)), t.hasColors && (ft.bindBuffer(34962, n.color), ft.bufferData(34962, t.colorArray, 35048), mt.enableAttribute(i.color), ft.vertexAttribPointer(i.color, 3, 5126, !1, 0, 0)), mt.disableUnusedAttributes(), ft.drawArrays(4, 0, t.count), t.count = 0;
    }, this.renderBufferDirect = function (t, e, n, i, r, a) {
      null === e && (e = k);
      const s = r.isMesh && r.matrixWorld.determinant() < 0,
            o = zt(t, e, i, r);
      Z.setMaterial(i, s);
      let l = n.index;
      const c = n.attributes.position;

      if (null === l) {
        if (void 0 === c || 0 === c.count) return;
      } else if (0 === l.count) return;

      let h,
          u = 1;
      !0 === i.wireframe && (l = et.getWireframeAttribute(n), u = 2), (i.morphTargets || i.morphNormals) && ht.update(r, n, i, o), mt.setup(r, i, o, n, l);
      let d = ut;
      null !== l && (h = tt.get(l), d = dt, d.setIndex(h));

      const p = null !== l ? l.count : c.count,
            m = n.drawRange.start * u,
            f = n.drawRange.count * u,
            g = null !== a ? a.start * u : 0,
            v = null !== a ? a.count * u : 1 / 0,
            _ = Math.max(m, g),
            x = Math.min(p, m + f, g + v) - 1,
            y = Math.max(0, x - _ + 1);

      if (0 !== y) {
        if (r.isMesh) !0 === i.wireframe ? (Z.setLineWidth(i.wireframeLinewidth * q()), d.setMode(1)) : d.setMode(4);else if (r.isLine) {
          let t = i.linewidth;
          void 0 === t && (t = 1), Z.setLineWidth(t * q()), r.isLineSegments ? d.setMode(1) : r.isLineLoop ? d.setMode(2) : d.setMode(3);
        } else r.isPoints ? d.setMode(0) : r.isSprite && d.setMode(4);
        if (r.isInstancedMesh) d.renderInstances(_, y, r.count);else if (n.isInstancedBufferGeometry) {
          const t = Math.min(n.instanceCount, n._maxInstanceCount);
          d.renderInstances(_, y, t);
        } else d.render(_, y);
      }
    }, this.compile = function (t, e) {
      d = st.get(t), d.init(), t.traverseVisible(function (t) {
        t.isLight && t.layers.test(e.layers) && (d.pushLight(t), t.castShadow && d.pushShadow(t));
      }), d.setupLights(), t.traverse(function (e) {
        const n = e.material;
        if (n) if (Array.isArray(n)) for (let i = 0; i < n.length; i++) {
          Dt(n[i], t, e);
        } else Dt(n, t, e);
      });
    };
    let bt = null;

    function wt() {
      Et.stop();
    }

    function Lt() {
      Et.start();
    }

    const Et = new Vt();

    function At(t, e, n, i) {
      if (!1 === t.visible) return;
      if (t.layers.test(e.layers)) if (t.isGroup) n = t.renderOrder;else if (t.isLOD) !0 === t.autoUpdate && t.update(e);else if (t.isLight) d.pushLight(t), t.castShadow && d.pushShadow(t);else if (t.isSprite) {
        if (!t.frustumCulled || B.intersectsSprite(t)) {
          i && W.setFromMatrixPosition(t.matrixWorld).applyMatrix4(V);
          const e = nt.update(t),
                r = t.material;
          r.visible && u.push(t, e, r, n, W.z, null);
        }
      } else if (t.isImmediateRenderObject) i && W.setFromMatrixPosition(t.matrixWorld).applyMatrix4(V), u.push(t, null, t.material, n, W.z, null);else if ((t.isMesh || t.isLine || t.isPoints) && (t.isSkinnedMesh && t.skeleton.frame !== J.render.frame && (t.skeleton.update(), t.skeleton.frame = J.render.frame), !t.frustumCulled || B.intersectsObject(t))) {
        i && W.setFromMatrixPosition(t.matrixWorld).applyMatrix4(V);
        const e = nt.update(t),
              r = t.material;

        if (Array.isArray(r)) {
          const i = e.groups;

          for (let a = 0, s = i.length; a < s; a++) {
            const s = i[a],
                  o = r[s.materialIndex];
            o && o.visible && u.push(t, e, o, n, W.z, s);
          }
        } else r.visible && u.push(t, e, r, n, W.z, null);
      }
      const r = t.children;

      for (let t = 0, a = r.length; t < a; t++) At(r[t], e, n, i);
    }

    function Ct(t, e, n) {
      const i = !0 === e.isScene ? e.overrideMaterial : null;

      for (let r = 0, a = t.length; r < a; r++) {
        const a = t[r],
              s = a.object,
              o = a.geometry,
              l = null === i ? a.material : i,
              c = a.group;

        if (n.isArrayCamera) {
          const t = n.cameras;

          for (let n = 0, i = t.length; n < i; n++) {
            const i = t[n];
            s.layers.test(i.layers) && (Z.viewport(L.copy(i.viewport)), d.setupLightsView(i), Pt(s, e, i, o, l, c));
          }
        } else Pt(s, e, n, o, l, c);
      }
    }

    function Pt(t, e, n, i, r, a) {
      if (t.onBeforeRender(g, e, n, i, r, a), t.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse, t.matrixWorld), t.normalMatrix.getNormalMatrix(t.modelViewMatrix), t.isImmediateRenderObject) {
        const i = zt(n, e, r, t);
        Z.setMaterial(r), mt.reset(), function (t, e) {
          t.render(function (t) {
            g.renderBufferImmediate(t, e);
          });
        }(t, i);
      } else g.renderBufferDirect(n, e, i, r, t, a);

      t.onAfterRender(g, e, n, i, r, a);
    }

    function Dt(t, e, n) {
      !0 !== e.isScene && (e = k);
      const i = Q.get(t),
            r = d.state.lights,
            a = d.state.shadowsArray,
            s = r.state.version,
            o = it.getParameters(t, r.state, a, e, n),
            l = it.getProgramCacheKey(o);
      let c = i.programs;
      i.environment = t.isMeshStandardMaterial ? e.environment : null, i.fog = e.fog, i.envMap = $.get(t.envMap || i.environment), void 0 === c && (t.addEventListener("dispose", Mt), c = new Map(), i.programs = c);
      let h = c.get(l);

      if (void 0 !== h) {
        if (i.currentProgram === h && i.lightsStateVersion === s) return Rt(t, o), h;
      } else o.uniforms = it.getUniforms(t), t.onBuild(o, g), t.onBeforeCompile(o, g), h = it.acquireProgram(o, l), c.set(l, h), i.uniforms = o.uniforms;

      const u = i.uniforms;
      (t.isShaderMaterial || t.isRawShaderMaterial) && !0 !== t.clipping || (u.clippingPlanes = ot.uniform), Rt(t, o), i.needsLights = function (t) {
        return t.isMeshLambertMaterial || t.isMeshToonMaterial || t.isMeshPhongMaterial || t.isMeshStandardMaterial || t.isShadowMaterial || t.isShaderMaterial && !0 === t.lights;
      }(t), i.lightsStateVersion = s, i.needsLights && (u.ambientLightColor.value = r.state.ambient, u.lightProbe.value = r.state.probe, u.directionalLights.value = r.state.directional, u.directionalLightShadows.value = r.state.directionalShadow, u.spotLights.value = r.state.spot, u.spotLightShadows.value = r.state.spotShadow, u.rectAreaLights.value = r.state.rectArea, u.ltc_1.value = r.state.rectAreaLTC1, u.ltc_2.value = r.state.rectAreaLTC2, u.pointLights.value = r.state.point, u.pointLightShadows.value = r.state.pointShadow, u.hemisphereLights.value = r.state.hemi, u.directionalShadowMap.value = r.state.directionalShadowMap, u.directionalShadowMatrix.value = r.state.directionalShadowMatrix, u.spotShadowMap.value = r.state.spotShadowMap, u.spotShadowMatrix.value = r.state.spotShadowMatrix, u.pointShadowMap.value = r.state.pointShadowMap, u.pointShadowMatrix.value = r.state.pointShadowMatrix);
      const p = h.getUniforms(),
            m = Zi.seqWithValue(p.seq, u);
      return i.currentProgram = h, i.uniformsList = m, h;
    }

    function Rt(t, e) {
      const n = Q.get(t);
      n.outputEncoding = e.outputEncoding, n.instancing = e.instancing, n.skinning = e.skinning, n.numClippingPlanes = e.numClippingPlanes, n.numIntersection = e.numClipIntersection, n.vertexAlphas = e.vertexAlphas;
    }

    function zt(t, e, n, i) {
      !0 !== e.isScene && (e = k), K.resetTextureUnits();
      const r = e.fog,
            a = n.isMeshStandardMaterial ? e.environment : null,
            s = null === w ? g.outputEncoding : w.texture.encoding,
            o = $.get(n.envMap || a),
            l = !0 === n.vertexColors && i.geometry && i.geometry.attributes.color && 4 === i.geometry.attributes.color.itemSize,
            c = Q.get(n),
            h = d.state.lights;

      if (!0 === G && (!0 === H || t !== T)) {
        const e = t === T && n.id === S;
        ot.setState(n, t, e);
      }

      let u = !1;
      n.version === c.__version ? c.needsLights && c.lightsStateVersion !== h.state.version || c.outputEncoding !== s || i.isInstancedMesh && !1 === c.instancing ? u = !0 : i.isInstancedMesh || !0 !== c.instancing ? i.isSkinnedMesh && !1 === c.skinning ? u = !0 : i.isSkinnedMesh || !0 !== c.skinning ? c.envMap !== o || n.fog && c.fog !== r ? u = !0 : void 0 === c.numClippingPlanes || c.numClippingPlanes === ot.numPlanes && c.numIntersection === ot.numIntersection ? c.vertexAlphas !== l && (u = !0) : u = !0 : u = !0 : u = !0 : (u = !0, c.__version = n.version);
      let p = c.currentProgram;
      !0 === u && (p = Dt(n, e, i));
      let m = !1,
          f = !1,
          v = !1;

      const _ = p.getUniforms(),
            x = c.uniforms;

      if (Z.useProgram(p.program) && (m = !0, f = !0, v = !0), n.id !== S && (S = n.id, f = !0), m || T !== t) {
        if (_.setValue(ft, "projectionMatrix", t.projectionMatrix), X.logarithmicDepthBuffer && _.setValue(ft, "logDepthBufFC", 2 / (Math.log(t.far + 1) / Math.LN2)), T !== t && (T = t, f = !0, v = !0), n.isShaderMaterial || n.isMeshPhongMaterial || n.isMeshToonMaterial || n.isMeshStandardMaterial || n.envMap) {
          const e = _.map.cameraPosition;
          void 0 !== e && e.setValue(ft, W.setFromMatrixPosition(t.matrixWorld));
        }

        (n.isMeshPhongMaterial || n.isMeshToonMaterial || n.isMeshLambertMaterial || n.isMeshBasicMaterial || n.isMeshStandardMaterial || n.isShaderMaterial) && _.setValue(ft, "isOrthographic", !0 === t.isOrthographicCamera), (n.isMeshPhongMaterial || n.isMeshToonMaterial || n.isMeshLambertMaterial || n.isMeshBasicMaterial || n.isMeshStandardMaterial || n.isShaderMaterial || n.isShadowMaterial || i.isSkinnedMesh) && _.setValue(ft, "viewMatrix", t.matrixWorldInverse);
      }

      if (i.isSkinnedMesh) {
        _.setOptional(ft, i, "bindMatrix"), _.setOptional(ft, i, "bindMatrixInverse");
        const t = i.skeleton;
        t && (X.floatVertexTextures ? (null === t.boneTexture && t.computeBoneTexture(), _.setValue(ft, "boneTexture", t.boneTexture, K), _.setValue(ft, "boneTextureSize", t.boneTextureSize)) : _.setOptional(ft, t, "boneMatrices"));
      }

      var y, M;
      return (f || c.receiveShadow !== i.receiveShadow) && (c.receiveShadow = i.receiveShadow, _.setValue(ft, "receiveShadow", i.receiveShadow)), f && (_.setValue(ft, "toneMappingExposure", g.toneMappingExposure), c.needsLights && (M = v, (y = x).ambientLightColor.needsUpdate = M, y.lightProbe.needsUpdate = M, y.directionalLights.needsUpdate = M, y.directionalLightShadows.needsUpdate = M, y.pointLights.needsUpdate = M, y.pointLightShadows.needsUpdate = M, y.spotLights.needsUpdate = M, y.spotLightShadows.needsUpdate = M, y.rectAreaLights.needsUpdate = M, y.hemisphereLights.needsUpdate = M), r && n.fog && rt.refreshFogUniforms(x, r), rt.refreshMaterialUniforms(x, n, D, P), Zi.upload(ft, c.uniformsList, x, K)), n.isShaderMaterial && !0 === n.uniformsNeedUpdate && (Zi.upload(ft, c.uniformsList, x, K), n.uniformsNeedUpdate = !1), n.isSpriteMaterial && _.setValue(ft, "center", i.center), _.setValue(ft, "modelViewMatrix", i.modelViewMatrix), _.setValue(ft, "normalMatrix", i.normalMatrix), _.setValue(ft, "modelMatrix", i.matrixWorld), p;
    }

    Et.setAnimationLoop(function (t) {
      bt && bt(t);
    }), "undefined" != typeof window && Et.setContext(window), this.setAnimationLoop = function (t) {
      bt = t, _t.setAnimationLoop(t), null === t ? Et.stop() : Et.start();
    }, _t.addEventListener("sessionstart", wt), _t.addEventListener("sessionend", Lt), this.render = function (t, e) {
      if (void 0 !== e && !0 !== e.isCamera) return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
      if (!0 === v) return;
      !0 === t.autoUpdate && t.updateMatrixWorld(), null === e.parent && e.updateMatrixWorld(), !0 === _t.enabled && !0 === _t.isPresenting && (e = _t.getCamera(e)), !0 === t.isScene && t.onBeforeRender(g, t, e, w), d = st.get(t, m.length), d.init(), m.push(d), V.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), B.setFromProjectionMatrix(V), H = this.localClippingEnabled, G = ot.init(this.clippingPlanes, H, e), u = at.get(t, p.length), u.init(), p.push(u), At(t, e, 0, g.sortObjects), u.finish(), !0 === g.sortObjects && u.sort(R, N), !0 === G && ot.beginShadows();
      const n = d.state.shadowsArray;
      lt.render(n, t, e), d.setupLights(), d.setupLightsView(e), !0 === G && ot.endShadows(), !0 === this.info.autoReset && this.info.reset(), ct.render(u, t);
      const i = u.opaque,
            r = u.transparent;
      i.length > 0 && Ct(i, t, e), r.length > 0 && Ct(r, t, e), null !== w && (K.updateRenderTargetMipmap(w), K.updateMultisampleRenderTarget(w)), !0 === t.isScene && t.onAfterRender(g, t, e), Z.buffers.depth.setTest(!0), Z.buffers.depth.setMask(!0), Z.buffers.color.setMask(!0), Z.setPolygonOffset(!1), mt.resetDefaultState(), S = -1, T = null, m.pop(), d = m.length > 0 ? m[m.length - 1] : null, p.pop(), u = p.length > 0 ? p[p.length - 1] : null;
    }, this.getActiveCubeFace = function () {
      return y;
    }, this.getActiveMipmapLevel = function () {
      return M;
    }, this.getRenderTarget = function () {
      return w;
    }, this.setRenderTarget = function (t, e = 0, n = 0) {
      w = t, y = e, M = n, t && void 0 === Q.get(t).__webglFramebuffer && K.setupRenderTarget(t);
      let i = null,
          r = !1,
          a = !1;

      if (t) {
        const n = t.texture;
        (n.isDataTexture3D || n.isDataTexture2DArray) && (a = !0);

        const s = Q.get(t).__webglFramebuffer;

        t.isWebGLCubeRenderTarget ? (i = s[e], r = !0) : i = t.isWebGLMultisampleRenderTarget ? Q.get(t).__webglMultisampledFramebuffer : s, L.copy(t.viewport), E.copy(t.scissor), A = t.scissorTest;
      } else L.copy(I).multiplyScalar(D).floor(), E.copy(F).multiplyScalar(D).floor(), A = O;

      if (Z.bindFramebuffer(36160, i) && X.drawBuffers) {
        let e = !1;
        if (t) {
          if (t.isWebGLMultipleRenderTargets) {
            const n = t.texture;

            if (U.length !== n.length || 36064 !== U[0]) {
              for (let t = 0, e = n.length; t < e; t++) U[t] = 36064 + t;

              U.length = n.length, e = !0;
            }
          } else 1 === U.length && 36064 === U[0] || (U[0] = 36064, U.length = 1, e = !0);
        } else 1 === U.length && 1029 === U[0] || (U[0] = 1029, U.length = 1, e = !0);
        e && (X.isWebGL2 ? ft.drawBuffers(U) : j.get("WEBGL_draw_buffers").drawBuffersWEBGL(U));
      }

      if (Z.viewport(L), Z.scissor(E), Z.setScissorTest(A), r) {
        const i = Q.get(t.texture);
        ft.framebufferTexture2D(36160, 36064, 34069 + e, i.__webglTexture, n);
      } else if (a) {
        const i = Q.get(t.texture),
              r = e || 0;
        ft.framebufferTextureLayer(36160, 36064, i.__webglTexture, n || 0, r);
      }
    }, this.readRenderTargetPixels = function (t, e, n, i, r, a, s) {
      if (!t || !t.isWebGLRenderTarget) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");

      let o = Q.get(t).__webglFramebuffer;

      if (t.isWebGLCubeRenderTarget && void 0 !== s && (o = o[s]), o) {
        Z.bindFramebuffer(36160, o);

        try {
          const s = t.texture,
                o = s.format,
                l = s.type;
          if (o !== b && pt.convert(o) !== ft.getParameter(35739)) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
          const c = l === x && (j.has("EXT_color_buffer_half_float") || X.isWebGL2 && j.has("EXT_color_buffer_float"));
          if (!(l === f || pt.convert(l) === ft.getParameter(35738) || l === _ && (X.isWebGL2 || j.has("OES_texture_float") || j.has("WEBGL_color_buffer_float")) || c)) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
          36053 === ft.checkFramebufferStatus(36160) ? e >= 0 && e <= t.width - i && n >= 0 && n <= t.height - r && ft.readPixels(e, n, i, r, pt.convert(o), pt.convert(l), a) : console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.");
        } finally {
          const t = null !== w ? Q.get(w).__webglFramebuffer : null;
          Z.bindFramebuffer(36160, t);
        }
      }
    }, this.copyFramebufferToTexture = function (t, e, n = 0) {
      const i = Math.pow(2, -n),
            r = Math.floor(e.image.width * i),
            a = Math.floor(e.image.height * i),
            s = pt.convert(e.format);
      K.setTexture2D(e, 0), ft.copyTexImage2D(3553, n, s, t.x, t.y, r, a, 0), Z.unbindTexture();
    }, this.copyTextureToTexture = function (t, e, n, i = 0) {
      const r = e.image.width,
            a = e.image.height,
            s = pt.convert(n.format),
            o = pt.convert(n.type);
      K.setTexture2D(n, 0), ft.pixelStorei(37440, n.flipY), ft.pixelStorei(37441, n.premultiplyAlpha), ft.pixelStorei(3317, n.unpackAlignment), e.isDataTexture ? ft.texSubImage2D(3553, i, t.x, t.y, r, a, s, o, e.image.data) : e.isCompressedTexture ? ft.compressedTexSubImage2D(3553, i, t.x, t.y, e.mipmaps[0].width, e.mipmaps[0].height, s, e.mipmaps[0].data) : ft.texSubImage2D(3553, i, t.x, t.y, s, o, e.image), 0 === i && n.generateMipmaps && ft.generateMipmap(3553), Z.unbindTexture();
    }, this.copyTextureToTexture3D = function (t, e, n, i, r = 0) {
      if (g.isWebGL1Renderer) return void console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");
      const {
        width: a,
        height: s,
        data: o
      } = n.image,
            l = pt.convert(i.format),
            c = pt.convert(i.type);
      let h;
      if (i.isDataTexture3D) K.setTexture3D(i, 0), h = 32879;else {
        if (!i.isDataTexture2DArray) return void console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");
        K.setTexture2DArray(i, 0), h = 35866;
      }
      ft.pixelStorei(37440, i.flipY), ft.pixelStorei(37441, i.premultiplyAlpha), ft.pixelStorei(3317, i.unpackAlignment);
      const u = ft.getParameter(3314),
            d = ft.getParameter(32878),
            p = ft.getParameter(3316),
            m = ft.getParameter(3315),
            f = ft.getParameter(32877);
      ft.pixelStorei(3314, a), ft.pixelStorei(32878, s), ft.pixelStorei(3316, t.min.x), ft.pixelStorei(3315, t.min.y), ft.pixelStorei(32877, t.min.z), ft.texSubImage3D(h, r, e.x, e.y, e.z, t.max.x - t.min.x + 1, t.max.y - t.min.y + 1, t.max.z - t.min.z + 1, l, c, o), ft.pixelStorei(3314, u), ft.pixelStorei(32878, d), ft.pixelStorei(3316, p), ft.pixelStorei(3315, m), ft.pixelStorei(32877, f), 0 === r && i.generateMipmaps && ft.generateMipmap(h), Z.unbindTexture();
    }, this.initTexture = function (t) {
      K.setTexture2D(t, 0), Z.unbindTexture();
    }, this.resetState = function () {
      y = 0, M = 0, w = null, Z.reset(), mt.reset();
    }, "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {
      detail: this
    }));
  }, t.WrapAroundEnding = 2402, t.ZeroCurvatureEnding = 2400, t.ZeroFactor = 200, t.ZeroSlopeEnding = 2401, t.ZeroStencilOp = 0, t.sRGBEncoding = 3001, Object.defineProperty(t, "__esModule", {
    value: !0
  });
});

/***/ }),

/***/ "./app/js/main.js":
/*!************************!*\
  !*** ./app/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _banner_banner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./banner/banner */ "./app/js/banner/banner.js");

Object(_banner_banner__WEBPACK_IMPORTED_MODULE_0__["initBanner"])();

/***/ })

/******/ });
//# sourceMappingURL=main.bundle.js.map