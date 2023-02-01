const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ window.innerWidth, window.innerHeight ]
};

let cursor_position;
let manager;
let position_x;
let position_y;
let draw_position_y;
let draw_position_x;

const sketch = ({ context, width, height }) => {
    
    cursor_position = new Vector(0,0);
    const agents = [];
    const num_of_agents = 10;
    const agents_radius = Math.min(width,height)/num_of_agents/2;
    const eyeball_radius = agents_radius/3;
          
    let x = agents_radius;
    let y = agents_radius;

    for (let i=0; i<Math.floor(width/agents_radius); i++){
      for (let j=0; j<Math.floor(height/agents_radius); j++){
        agents.push(new Agent(x,y,agents_radius,x,y,eyeball_radius,4));
        y = 2*j*agents_radius + agents_radius;
      };
      x = 2*i*agents_radius + agents_radius;
    };
  
         
  return ({ context, width, height }) => {
    
    context.fillStyle = 'black';
    context.lineStyle = 'black';
    context.fillRect(0, 0, width, height);
    
    agents.forEach(agent => {
      agent.move(cursor_position);
      agent.draw(context);       
    });

  };
};

class Vector {
  constructor (x,y) {
    this.x = x; 
    this.y = y;
  };

getDist(the_other_vector){
  const dx = this.x - the_other_vector.x;
  const dy = this.y - the_other_vector.y;
  return Math.sqrt(dx*dx + dy*dy);
};

};

class Agent {
  constructor (x, y, radius, draw_position_x, draw_position_y, eyeball_radius, line_width){
    this.center_position = new Vector(x,y);    
    this.radius  = radius;
    this.color = 'white';
    this.line_width = line_width;

    this.eyeball_position = new Vector(draw_position_x,draw_position_y);
    this.eyeball_radius = eyeball_radius;
    this.eyeball_color = 'black';
  };

 draw(context) {  

    context.save();
    context.fillStyle = this.color;
    context.lineWidth = this.line_width;
    context.beginPath();
    context.arc (this.center_position.x, this.center_position.y, this.radius, 0, 2*Math.PI)
    context.fill();

    context.fillStyle = this.eyeball_color;
    context.beginPath();    
    context.arc( this.eyeball_position.x, this.eyeball_position.y, this.eyeball_radius, 0, 2*Math.PI);
    context.fill();
    context.restore();

    context.restore();
 };

 move(cursor_position) {
    const distCursor = this.center_position.getDist(cursor_position);
    
    if (distCursor < (this.radius- this.eyeball_radius)){
        this.eyeball_position.y = this.center_position.y; //cursor_position.y;
        this.eyeball_position.x = this.center_position.x; //cursor_position.x;      
    }
    else{
      this.eyeball_position.y = (cursor_position.y-this.center_position.y)/distCursor*(this.radius-this.eyeball_radius)+this.center_position.y;
      this.eyeball_position.x = (cursor_position.x-this.center_position.x)/distCursor*(this.radius-this.eyeball_radius)+this.center_position.x;
    };
 
  if ((distCursor < (this.radius ))){
    this.eyeball_color = 'red'; 
    //console.log( cursor_position.x, this.eyeball_position.x, cursor_position.y, this.eyeball_position.y);       
  }
  else{
    this.eyeball_color = 'black';
  }; 

};
};

const onMouseMove = (e) => {
  cursor_position.x = e.pageX;
  cursor_position.y = e.pageY;
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

