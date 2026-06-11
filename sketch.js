var panSpeed = 1;
var gravity = 1;
var timerDuration = 500;
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

function setup() {
  frameRate(60);
  window.canvas = createCanvas(600, 800);
  canvas.parent("canvas");
  player = new Player(x, y);
}

function draw() {
  background(90);
  player.update();
  player.show();
  player.flap();
  player.updatePipes();
  scre();
}

function scre(){

  fill (20);
  textAlign(CENTER);
  textSize(32)
  text ("score:"+score, canvas.width /2, canvas.height / 8);


}

function mousePressed() {
  if (mouseIsPressed) {
    presd = false;
    lastKeyPressTime = Date.now();
  }
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
