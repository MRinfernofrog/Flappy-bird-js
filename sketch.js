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
function setup() {
  frameRate(60);
  window.canvas = createCanvas(600, 800);
  canvas.parent("canvas");
  player = new Player(x, y);
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
  textSize(48);
  text("Flappy Bird", width / 2, height / 3);
  textSize(24);
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

function restartGame() {
  score = 0;
  player = new Player(x, y);
  state = 0;
}

function dead() {
  panSpeed = 1;
  fill(0);
  textAlign(CENTER);
  textSize(48);
  text("You Died!", width / 2, height / 3);
  textSize(24);
  text("Score: " + score, width / 2, height / 2);
  text("Score: " + hScore, width / 2, height / 2);
  text("Click to restart", width / 2, height / 2 + 40);
}

function scre() {
  if (player.playerHit) return;
  fill(20);
  textAlign(CENTER);
  textSize(32);
  text("score:" + score, canvas.width / 2, canvas.height / 8);
}

function mouseReleased() {
  presd = true;
  held = false;
}

function keyPressed() {
  switch (key) {
    case "w":
      player.sFlap();
      break;
    case "x":
      break;
  }
}
