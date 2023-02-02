import canvasSketch from 'canvas-sketch';
// load utility libraries
import { mapRange } from 'canvas-sketch-util/math';
import { range } from 'canvas-sketch-util/random';


const settings = {
  dimensions: [ 1080 , 1080 ],
  animate: true
};
  
const sketch = ({ context, width, height }) => {

  const agents = [];
    
  for (let i=0; i<10; i++){
    let x = range(0,width);
    let y = range(0,height);
    agents.push(new Agent(x,y));
  };

  return ({ context, width, height }) => {
      context.fillStyle = 'white';
      context.fillRect(0, 0, width, height);

      agents.forEach(agent => {
        agent.move();
        //agent.bounce(width,height);
        agent.wrap(width,height);
        agent.draw(context); 
        
      });

      for (let i=0; i<agents.length;i++){
        const myagent = agents[i];

        for (let j=i+1; j<agents.length; j++){
          const other = agents[j];

          const dist = myagent.positio.getDist(other.positio);

          if (dist > 200) continue;

          context.lineWidth = mapRange(dist,0,200,4,1);
          context.beginPath();
          context.moveTo(myagent.positio.x, myagent.positio.y);
          context.lineTo(other.positio.x, other.positio.y);
          context.stroke();

        };
      };
    
  };
};

canvasSketch(sketch, settings);

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
  constructor (x,y,radius){
    this.positio = new Vector(x,y);
    this.velocity = new Vector(range(-1,1), range(-1,1))
    this.radius = range(4, 12);

  };

 draw(context) {
    

    context.save();
    context.translate(this.positio.x, this.positio.y);
    context.lineWidth = 4;
    context.beginPath();
    context.arc (0, 0, this.radius, 0, 2*Math.PI)
    context.fill();
    context.stroke();

    context.restore();
 };

 move() {
    this.positio.x = this.positio.x + this.velocity.x;
    this.positio.y = this.positio.y + this.velocity.y;
 };

 bounce(width,height){
    if (this.positio.x <= 0 || this.positio.x >=width){
      this.velocity.x = this.velocity.x * (-1);
    };
    if (this.positio.y <= 0 || this.positio.y >=height){
      this.velocity.y = this.velocity.y * (-1);
    };
 };

 wrap(width,height){
    if (this.positio.x <= 0){
      this.positio.x = width;
    } else if (this.positio.x >= width){
      this.positio.x = 0;
    }
   
    if (this.positio.y <= 0){
      this.positio.y = height;
    } else if (this.positio.y >= height){
      this.positio.y = 0;
    }
  };

};