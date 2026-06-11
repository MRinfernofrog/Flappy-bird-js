var panSpeed = 1;
var gravity = 1;
var timerDuration = 500;
var timer2Duration = 1500;
var presd = true;
var lastKeyPressTime = 0;
var held = false;
var flapH = 10;
var currentTime = Date.now();
var x = 100;
var y = 400;
var rPH = [];
var passed = false;
var score = 0;
var state = 1;
var timeOfDeath = 0;
var hScore = 0;

var CANVAS_W = 600;
var CANVAS_H = 800;

function setup() {
  frameRate(60);
  
  var maxW = min(windowWidth - 20, 600);
  var scale = maxW / 600;
  CANVAS_W = floor(600 * scale);
  CANVAS_H = floor(800 * scale);

  window.canvas = createCanvas(CANVAS_W, CANVAS_H);
  canvas.parent("canvas");
  player = new Player(x * scale, y * scale);
}

function windowResized() {
  var maxW = min(windowWidth - 20, 600);
  var scale = maxW / 600;
  CANVAS_W = floor(600 * scale);
  CANVAS_H = floor(800 * scale);
  resizeCanvas(CANVAS_W, CANVAS_H);
}

function draw() {
  if (state == 0) running();
  else if (state == 1) title();
  else if (state == 2) dead();
}

function running() {
  background(90);
  player.update();
  player.show();
  player.flap();
  player.updatePipes();
  scre();
}

function title() {
  background(90);
  fill(0);
  textAlign(CENTER);
  textSize(min(48, CANVAS_W / 10));
  text("Flappy Bird", width / 2, height / 3);
  textSize(min(22, CANVAS_W / 16));
  text("Click or press W to start", width / 2, height / 2);
}

function mousePressed() {
  if (state == 0) {
    presd = false;
    lastKeyPressTime = Date.now();
  } else if (state == 1) {
    state = 0;
  } else if (state == 2) {
    restartGame();
  }
}

function touchStarted() {
  mousePressed();
  return false; // prevent default scroll/zoom
}

function touchEnded() {
  mouseReleased();
  return false;
}

function restartGame() {
panSpeed = 1;
  score = 0;
  var scale = CANVAS_W / 600;
  player = new Player(x * scale, y * scale);
  state = 0;
}

function dead() {
  panSpeed = 1;
  fill(0);
  textAlign(CENTER);
  textSize(min(48, CANVAS_W / 10));
  text("You Died!", width / 2, height / 3);
  textSize(min(24, CANVAS_W / 14));
  text("Score: " + score, width / 2, height / 2 - 20);
  text("Best: " + hScore, width / 2, height / 2 + 20);
  text("Tap to restart", width / 2, height / 2 + 70);
}

function scre() {
  if (player.playerHit) return;
  fill(20);
  textAlign(CENTER);
  textSize(32);
  textSize(min(32, CANVAS_W / 12));
  text("score:" + score, canvas.width / 2, canvas.height / 8);
}

function mouseReleased() {
  presd = true;
  held = false;
}

function keyPressed() {
  switch (key) {
    case "w":
      if (state == 0) player.sFlap();
      else if (state == 1) state = 0;
      else if (state == 2) restartGame();
      break;
    case " ":
      if (state == 0) {
        presd = false;
        lastKeyPressTime = Date.now();
      } else if (state == 1) {
        state = 0;
      } else if (state == 2) {
        restartGame();
      }
      break;
    case "x":
      restartGame();
      break;
  }
}


function keyReleased() {
  if (key == " ") {
    presd = true;
    held = false;
  }
}