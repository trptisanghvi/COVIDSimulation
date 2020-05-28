class Disc {
    constructor(state = 'susceptible') {
      this.pos = createVector(random(width-diameter)+diameter/2, random(height-topMargin-diameter/2)+topMargin);
      this.dir = createVector(speed, 0);
      this.dir.rotate(random(2 * Math.PI));
      if (state=='infected') 
        this.startInfection = simFrame;
      this.state = state;
    }
  
    show() {
      noStroke();
      fill(color(colors[this.state]));
      circle(this.pos.x, this.pos.y, diameter);
    }
    
    move() {
      this.dir.rotate(random(0.6) - 0.3);
      let newLoc = this.pos.copy().add(this.dir);
      if (newLoc.x < 0 || newLoc.x > width) {
        this.dir.x = -1*this.dir.x;
        this.pos.add(this.dir);
      }
      else if (newLoc.y < topMargin || newLoc.y > height) {
        this.dir.y = -1*this.dir.y;
        this.pos.add(this.dir);
      }
      this.pos.add(this.dir);
    }
  
    update() {
      if (this.state == 'infected') {
        if (random() < mortality / duration) {
          this.state = 'dead';
          this.stop=true;
          current['infected'] -= 1;
          current['dead'] += 1;
        } else if ((simFrame - this.startInfection) > duration) {
          this.state = 'recovered';
          current['infected'] -= 1;
          current['recovered'] += 1;
        }
      }
      else if (this.state == 'susceptible') {
        for (let d of discs) {
          if (d.state=='infected' && 
              d.pos.dist(this.pos)<diameter) {
            this.state = "infected";
            this.startInfection = simFrame;  
            current['susceptible'] -= 1;
            current['infected'] += 1;  
            break;
          }
        }
      }
      if (!this.stop) this.move();
    }
  
  }