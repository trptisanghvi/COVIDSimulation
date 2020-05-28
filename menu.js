let topMargin = 80;

// slider values
let population=300, duration, diameter, mortality, startSick=1,movers=5;

// slider objects
let popS,dur,diam,mort,sick,mov;

function initMenu() {
  frames=[];
  for (let i=0;i<1000;i+=5){
    frames.push(i);
  } 
  
  //buttons
  createButton('RESTART').position(60,2).mousePressed(startSim);
  createButton('START/STOP').position(150,2).mousePressed(()=>running = !running);
  
  //sliders
  popS = createSlider(1,8,3).position(5,130).style('width','100px');
  sick = createSlider(1,20,1).position(120,130).style('width','100px');
  dur = createSlider(1,20,8).position(235,130).style('width','100px');
  diam = createSlider(1,10,5).position(350,130).style('width','100px'); 
  mort = createSlider(0,10,1).position(465,130).style('width','100px');
  mov = createSlider(0,10,5).position(585,130).style('width','100px');
}
function resetMenu() {
  current = {'susceptible':population-startSick, 'infected':startSick, 'recovered':0, 'dead':0};
  
  history = {'susceptible':[], 'infected':[], 'recovered':[], 'dead':[]};
  population = popS.value()*100;
  startSick = sick.value();
  duration = dur.value()*10;
  diameter = diam.value()*2;
  mortality = mort.value()/20;
  movers = mov.value();
}

function updateMenu() {
  textAlign(CENTER);
  
  // labels
  fill(0); textSize(12);
  text('POPULATION = '+population,55,35);
  text('startSICK = '+startSick,170,35);
  text('DURATION = '+duration,290,35);
  text('DIAMETER = '+diameter,400,35);
  text('MORTALITY = '+mortality,520,35);
  text('MOVERS = '+movers*10+'%',640,35);

  if (simFrame>500 && current['infected']<=0) running=false; // stop at end of graph
  
  // check menu values
  if (population != popS.value()*100 ||
      duration != dur.value()*10  ||
      diameter != diam.value()*2  ||
      mortality != mort.value()/20 ||
      startSick != sick.value() ||
      movers != mov.value() ) 
    startSim();
}
