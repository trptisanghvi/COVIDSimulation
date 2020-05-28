let current,history;

function dataPoint() {
  for (let key in current) {
    history[key].push(current[key]);
  }
}

function updateGraph() {
  if (simFrame%5 == 0) dataPoint();
}

function showGraph() {
  let traces=[];
  let maxX = 500;
  if (simFrame>500) maxX=simFrame;
  for (let key in colors) {
    traces.push({
      x:frames, y:history[key],
      stackgroup:'one',
      fillcolor: colors[key],
      line: {width:0},
      name:current[key]+' '+key
    });
  }
  let layout= {   
    title: 'COVID-19 SIMULATION',
    xaxis: {
      range: [0,maxX]
    },
    yaxis: {
      range: [0,population]
    },
    height:125,
    width: 700,
    margin: {
      l: 40,
      r: 40,
      b: 17,
      t: 30,
      pad: 1
    }
  }
  Plotly.newPlot('graph',traces,layout);
}

