class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.volY = 0;
    this.volX = panSpeed * floor(random(1, 10));
    this.size = 20;
    this.pRN = 0;
    this.flapH = flapH;
    this.pipe1 = new Pipez(true);
    this.pipe2 = new Pipez(false, this.pipe1, this.pRN);
    this.pipe2.setX(1.5 * canvas.width + this.pipe2.pipeT.width / 2);
    this.pRN++;
    this.playerHit = false;
    this.xv = 2;
  }

  show() {
    fill(255, 40, 90);
    ellipse(this.x, this.y, this.size * 2);
    //ellipse(mouseX, mouseY, this.size * 2);
  }

  update() {
    if (y == canvas.height) {
      gravity = 0;
    } else {
      gravity = 1;
    }
    this.volY += gravity;
    this.volY = constrain(this.volY, -20, 20);
    this.y += this.volY;
    this.y = constrain(this.y, -100, canvas.height);
    if (this.playerHit) {
      panSpeed = 0;
      this.bleeding();
    }
    this.pipe1.show();
    this.pipe2.show();

    // this.x = mouseX;
    // this.y = mouseY;

    if (this.pipe1.ofSrn()) {
      this.pipe1 = new Pipez(false, this.pipe2, this.pRN);
      this.pRN++;
    }
    if (this.pipe2.ofSrn()) {
      this.pipe2 = new Pipez(false, this.pipe1, this.pRN);
      this.pRN++;
    }

    if (this.pipe2.collision(this) || this.pipe1.collision(this)) {
      if (!this.playerHit) timeOfDeath = Date.now();
      this.playerHit = true;
    }
    if (!this.playerHit) {
      score += this.pipe1.pPassed(this) || this.pipe2.pPassed(this) ? 1 : 0;
      if (score > hScore) hScore = score;
    }
  }

  //  pPassed() {
  //    if (
  //      (!this.playerHit && this.x >= pipe1.pipeB.x) ||
  //      this.x >= pipe2.pipeB.x
  //    ) {
  //    }
  //  }
  bleeding() {
    const timePassed2 = Date.now() - timeOfDeath;
    if (this.y == canvas.height) this.xv = 0;
    this.x += constrain(this.xv, 0, 100);
    if (timePassed2 > timer2Duration) state = 2;
  }

  flap() {
    if (this.playerHit) return;
    if (presd) return;
    // Apply upward velocity every frame the mouse is held (allows variable height)
    // but cut off after timerDuration ms so long holds don't jump forever
    const timePassed = Date.now() - lastKeyPressTime;
    if (timePassed < timerDuration) {
      this.volY = -this.flapH;
    }
  }
  sFlap() {
    if (this.playerHit) return;
    this.volY = -this.flapH;
  }

  updatePipes() {
    this.pipe2.update();
    this.pipe1.update();
  }
}
