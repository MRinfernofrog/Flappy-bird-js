class Pipes {
  constructor(isTop, ph) {
    this.x = canvas.width;
    this.width = floor(canvas.width / 10);
    this.thick = floor(canvas.width / 70);
    this.height = ph;
    this.isTop = isTop;
    this.randomMultiplier = 2;
    if (this.isTop) {
      this.tY = 0;
      this.bY = this.height;
    } else {
      this.tY = canvas.height - this.height;
      this.bY = canvas.height;
    }
  }

  show() {
    rectMode(CORNER);
    fill(0, 200, 50);
    stroke(0, 150, 50);
    strokeWeight(this.thick);
    //print("spawn");
    ellipseMode(CENTER);
    if (this.isTop) {
      rect(this.x, this.tY, this.width, this.bY);
    } else {
      rect(this.x, this.tY, this.width, this.bY);
    }
    noStroke();
  }
  update() {
    this.x -= panSpeed * this.randomMultiplier;
  }

  collision(p) {
    if (p.x + p.size >= this.x && p.x - p.size <= this.x + this.width) {
      if (!this.isTop && p.y + p.size >= this.tY) {
        return true;
      }
      if (this.isTop && p.y - p.size <= this.bY) {
        return true;
      }
    }
    return false;
  }
}
