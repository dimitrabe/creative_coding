const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ window.innerWidth, window.innerHeight ]
};

let manager;
let position_x;
let position_y;
let draw_position_y;
let draw_position_x;

const sketch = ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const radius_small = Math.min(width,height)/8;
    const radius_big = radius_small *3;
    const center_y = height*0.5;
    const center_x = width*0.5;
    
    context.lineStyle = 'black';
    context.lineWidth = 4;

    context.save();
    context.translate(center_x, center_y);    
    context.beginPath();
    context.arc(0, 0, radius_big, 0, 2*Math.PI)    
    context.stroke();
    context.restore();
       
  return ({ context, width, height }) => {
    
    context.fillStyle = 'white';
    context.lineStyle = 'black';
    context.lineWidth = 4;
    context.fillRect(0, 0, width, height);

    context.save();
    context.translate(center_x, center_y);   
    context.beginPath();
    context.arc(0, 0, radius_big, 0, 2*Math.PI)    
    context.stroke();   
    context.restore();

    context.save();
         
    // find the distance of the cursor point from the center of the circle
    const distCursor = Math.sqrt(Math.pow(center_x - position_x,2) + Math.pow(center_y - position_y,2));
    //console.log( (center_x - position_x), Math.pow(center_x - position_x,2), (center_y - position_y), Math.pow(center_y - position_y,2), Math.pow(center_x - position_x,2) + Math.pow(center_y - position_y,2), distCursor);
    
    // find the angle of the cursor from the center of teh circle
    //const sinTheta = (position_y-center_y)/distCursor;
    //const cosTheta = (position_x-center_x)/distCursor;
    //console.log( "sin " + sinTheta, "cos " + cosTheta, "dist " + distCursor, "x " + position_x, "y " + position_y, "center x  " + center_x, "center y " + center_y);
    
    if (distCursor < (radius_big)){
      draw_position_y = center_y;
      draw_position_x = center_x;
      context.fillStyle = 'red';
    }
    else{
      draw_position_y = (position_y-center_y)/distCursor*(radius_big-radius_small)+center_y;
      draw_position_x = (position_x-center_x)/distCursor*(radius_big-radius_small)+center_x;
      context.fillStyle = 'black';
    }

    context.beginPath();    
    context.arc( draw_position_x, draw_position_y, radius_small, 0, 2*Math.PI);
    context.fill();
    context.restore();
  };
};


const onMouseMove = (e) => {
  position_x = e.pageX;
  position_y = e.pageY;
  rel_position_x = e.movementX;
  rel_position_y = e.movementY;
  //console.log("event " + position_x, position_y);
  //console.log('That line');
  manager.render();
}

document.addEventListener('mousemove', onMouseMove);

const start = async () => {
  manager = await canvasSketch(sketch, settings);
  //console.log('This line');
}
start();

