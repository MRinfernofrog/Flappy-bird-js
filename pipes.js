class Pipes {
  constructor(isTop, ph) {
    this.x = canvas.width;
    this.width = 60;
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
    fill(0, 0, 255);
    //print("spawn");
    ellipseMode(CENTER);
    if (this.isTop){
    rect(this.x, this.tY, this.width, this.bY);
    }else{
    rect(this.x, this.tY, this.width, this.bY);
    }
    
    }
  // print(this.x)
  update() {
    this.x -= panSpeed * this.randomMultiplier;
  }

  collision(p) {
    if (p.x + p.size >= this.x &&  p.x - p.size <= this.x + this.width) {
      if (!this.isTop && p.y + p.size >= this.tY) {
       // print(this.tY);
        
       // print('hitB');
        return true;
      }
      if (this.isTop && p.y - p.size <= this.bY) {
       // print(this.bY)
        
        //print('hitT');
        return true;
      }
      
    }
    return false;
  }
}
