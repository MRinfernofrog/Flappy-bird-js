class Pipez {
  constructor(firstP, nextP, pRN) {
    this.distance = 200;
    this.offScreen = false;
    this.gap = floor(canvas.height * 0.2);
    this.ofset = floor(canvas.height * 0.075);
    this.first = firstP;
    this.next = nextP;
    this.tHight = 0;
     this.passed = false;
    if (this.first) {
      this.tHight = round(canvas.height / 2) - this.ofset - this.gap;
    } else {
      if (rPH.length >= pRN) {
        rPH.push(
          floor(random(this.ofset, canvas.height - this.ofset - this.gap))
        );
      }
      this.tHight = rPH[pRN];
    }
    this.bHight = canvas.height - this.tHight - this.gap;
    this.pipeT = new Pipes(true, this.tHight);
    this.pipeB = new Pipes(false, this.bHight);
  }

  show() {
    this.pipeT.show();
    this.pipeB.show();
  }

  ofSrn() {
    if (this.pipeB.x + this.pipeB.width <= 0) {
      return true;
    } else {
      return false;
    }
  }
  

  update() {
    this.pipeT.update();
    this.pipeB.update();
  }

  pPassed(p) {
    if ( !this.passed && p.x >= this.pipeT.x + this.pipeT.width) {
      this.passed = true; 
      print('sorta');
      return true;
    } else {
      return false;
    }
  }

  collision(p) {
    if (this.pipeT.collision(p) || this.pipeB.collision(p)) {
      return true;
    }
  }

  setX(newX) {
    this.pipeB.x = newX;
    this.pipeT.x = newX;
  }
}
