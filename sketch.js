let simFrame=0;
let running = true;
let speed = 2.5;
let discs,colors;

function startSim() {
  running=true;
  simFrame=0;
  resetMenu();
  discs = [];
  for (let i=0;i<population;i++) {
    let d;
    if (i<startSick) d = new Disc('infected');
    else d = new Disc();
    if (i%10>=movers) d.stop = true;
    discs.push(d);    
  }
}

function setup() {
  let canvas = createCanvas(700, 550);
  canvas.parent('canvas');
  initMenu();
  startSim();
 
}

function draw() {
  background(255,255,255);  
  updateMenu();
  showGraph();
  discs.forEach((d)=>d.show()); // show the discs
  if (running) {
    simFrame++; // advance the frame
    discs.forEach((d)=>d.update()); // update discs
    updateGraph(); // update graph
  }
} colors = {"infected": '#dddd00',
            "susceptible": '#00aa00',
              "recovered": '#00bbbb',
              "dead": '#bb0000',
           }

