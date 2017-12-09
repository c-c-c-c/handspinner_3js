'use strict';

var howManySpinners = 300;
var scene = new THREE.Scene();
var box = void 0;
var controls = void 0;
var renderer = [];
var camera = void 0;
var model = [];
//let model = {};
var model2 = {};
var model3 = {};
var rotate_speed = 200;
var r_radian = 0;
var c_radian = 0;
var r_radian_speed = 0.01;
var c_radian_speed = 0.007;
var count = 0;

var geometry = void 0;
var material = void 0;
var scroll_px = 0;
var delta_scroll_px = 0;
var sum_delta_scroll_px = 0.05;
var $window = $(window);

function renderHandSpinner() {
	'use strict';

	var light = void 0;
	var ambient = void 0;
	var gridHelper = void 0;
	var axisHelper = void 0;
	var lightHelp = void 0;
	var width = 1440;
	var height = 6700;
	var modelPath = void 0;

	//light
	light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.set(0, 200, 80);
	scene.add(light);
	ambient = new THREE.AmbientLight(0x404040);
	scene.add(ambient);

	//camera
	camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
	camera.position.set(300, 3000, 2500);
	camera.lookAt(scene.position);

	// helper 現在は非表示
	//gridHelper = new THREE.GridHelper(200, 50);
	//scene.add(gridHelper);
	//axisHelper = new THREE.AxisHelper(1000);
	//scene.add(axisHelper);
	//lightHelper = new THREE.DirectionalLightHelper(light , 20)
	//scene.add(lightHelper);

	//controls
	//controls = new THREE.OrbitControls(camera);
	//cameraの自動回転
	//controls.autoRotate = true;
	// controls.autoRotateSpeed = 1.5;

	// renderer
	for (var i = 0; i < 1; i++) {
		renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(width, height);
		renderer.setClearColor(0xffffff);
		renderer.setPixelRatio(window.devicePixelRatio);

		document.getElementsByClassName('stage_bg')[0].appendChild(renderer.domElement);
	}

	//modelPath = '../src/data/handspiner_3d_geo.json';
	modelPath = './src/data/handspiner_3d_geo.json';
	//modelPath = '/Users/yoshimurahiroyuki/workspace/threejs/src/handspiner.json';

	var loader = new THREE.JSONLoader();
	loader.load(modelPath, function (geo, mat) {

		geometry = geo;
		material = mat;

		for (var _i = 0; _i < howManySpinners; _i++) {
			var phongMat = new THREE.MeshPhongMaterial(mat);
			model[_i] = new THREE.Mesh(geo, phongMat);

			var randX = 90 * Math.random() - 70;
			var randY = 240 * Math.random() + 240;
			var randZ = 70 * Math.random() + 30;

			if (_i == 0) {
				model[_i].position.set(0, 20, 0);
			} else {
				model[_i].position.set(randX, randY, randZ);
			}

			model[_i].scale.set(0.03, 0.03, 0.03);
			var randColor = Math.random() * 0xffffff;
			model[_i].material.color = new THREE.Color(randColor);
			model[_i].material.opacity = 0.15;
			model[_i].material.transparent = true;
			scene.add(model[_i]);
		}
		render();
	});
}

/*
function addSpinner () {
  let phongMat = new THREE.MeshPhongMaterial(material);
  model = new THREE.Mesh(geometry, phongMat);
	let randX = 800 * Math.random();
	let randY = 800 * Math.random();
	let randZ = 800 * Math.random();

  let size = Math.random();
	model.scale.set(size, size, size);　　　
  model.position.set(randX, randY, randZ);
	let randColor = Math.random() * 0xffffff;　　　
	model.material.color = new THREE.Color(randColor);
	scene.add(model);　
}
*/

function render() {

	requestAnimationFrame(render);
	r_radian += r_radian_speed;
	count++;

	for (var i = 0; i < howManySpinners; i++) {
		if (delta_scroll_px < 0) {
			rotate_speed = 0;
			sum_delta_scroll_px = 0;
			r_radian_speed = 0;
			c_radian_speed = 0;
		} else {
			rotate_speed = sum_delta_scroll_px / 4000 + 0.07;
			r_radian_speed = 0.01;
			c_radian_speed = 0.007;
		}

		model[i].rotation.y += rotate_speed;
		model[i].position.y += (Math.sin(r_radian) - Math.sin(r_radian - r_radian_speed)) * 15;

		if (rotate_speed == 0) {
			if (count % 50 < 25) {
				model[i].rotation.y += 0.02;
			} else {
				model[i].rotation.y -= 0.02;
			}
		}
	}

	c_radian += c_radian_speed;
	var cameraZ = 5 * Math.sin(c_radian) + 180;
	camera.position.set(0, 600, cameraZ);

	//for (let i=0; i<4; i++) {
	renderer.render(scene, camera);
	//controls.update();
	// }
}

function countScroll() {
	// スクロールしたら発動
	$window.scroll(function () {
		var before_scroll_px = scroll_px;
		console.log(sum_delta_scroll_px);
		// スクロール量を変数に格納
		scroll_px = $(this).scrollTop();
		delta_scroll_px = scroll_px - before_scroll_px;
		sum_delta_scroll_px += delta_scroll_px;
	});
}

function addHoverImgChange() {
	$('.item_box').hover(function (e) {

		$(e.currentTarget).find("img").each(function (i, ev) {
			if ($(ev).attr("class") == "not_spin") {
				$(ev).animate({ opacity: 0 }); //
			} else {
				$(ev).animate({ opacity: 1 });
			}
		});
	}, function (e) {

		$(e.currentTarget).find("img").each(function (i, ev) {
			if ($(ev).attr("class") == "not_spin") {
				$(ev).animate({ opacity: 1 });
			} else {
				$(ev).animate({ opacity: 0 });
			}
		});
	});
}

/*
function addHoverImgChange() {
	let notSpinImages = document.getElementsByClassName("not_spin")
	const ImageN = 6;
	for (i=0 ;i<6; i++ ){
		notSpinImages[i].addEve

	}
*/

$(document).ready(function () {
	$(countScroll());
	$(addHoverImgChange());
	renderHandSpinner();
});
//# sourceMappingURL=script.js.map