const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const sketch = () => {
  return ({ context, width, height,frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

  const num_of_col = 10;
  const num_of_row = 10;
  const num_of_cells = num_of_col * num_of_row;

  const gridh = height * 0.8;
  const gridw = width * 0.8;
  const margy = 0.5 * (height - gridh);
  const margx = 0.5 * (width - gridw);

  const cellw = gridw/num_of_col;
  const cellh = gridh/num_of_row;

  let col, row;
  let x,y,w,n,angle; 

  for (let i=0; i<num_of_cells; i++){
    col = i % num_of_col;
    row = Math.floor(i/num_of_col);

    x = col * cellw + margx + cellw*0.5;
    y = row * cellh + margy + cellh*0.5;
    w = cellw*0.8;
    
    n = random.noise2D(x + frame*10, y, 0.001);
    angle = n * Math.PI * 0.2;

    context.save();
    context.translate(x,y);
    context.rotate(angle);
    context.lineWidth = math.mapRange(n,-1,1,1,30);
    context.beginPath();
    context.moveTo (-0.5*w, 0);
    context.lineTo(0.5*w, 0);
    context.stroke();
    context.restore();
  }; 

  };
};

canvasSketch(sketch, settings);
