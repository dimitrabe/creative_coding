const canvasSketch = require('canvas-sketch');
// load utility libraries
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ],
  //animate: true
};

// const degToRad = (degrees) => {
//   return degrees / 180 * Math.PI;
// }

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    

    context.fillStyle = 'black';
    const cx =  500;
    const cy =  500;
    const w = width * 0.01;
    const h = height * 0.1;

    let x,y;

    const num = 20;
    const radius = width * 0.3;

    for( let i=0; i < num; i++){
        let angle = math.degToRad(360/num)*i;
        x = cx + radius * Math.sin(angle);
        y = cy + radius * Math.cos(angle);

        // moves the context, in the analogy of pen and paper, it moves the paper
        // after the translation or rotation of whatever the paper stays where we 
        // left it so any shapes drawn afterwards will follow this "translated" coordinates
        // to restore the initial coordinates first we have to save them
        context.save();
        context.translate(x,y);
        context.rotate(-angle);
        context.scale(random.range(0.1,3), random.range(0.2,1.3));
        console.log(x,y,angle)

        // moving the coordinates x,y is like moving the pen on the paper
        context.beginPath();
        context.rect(-w*0.5, random.range(0,-h*0.5),w,h);
        context.fill();

        // to restore the initial coordinates first we have to save them
        context.restore();

        context.save();
        context.translate(cx,cy);
        context.rotate(-angle);
        context.lineWidth = random.range(0.0005,0.01)*width;

        context.beginPath();
        context.arc(0, 0, radius*random.range(0.7,1.3), 0, random.value()*Math.PI*2);
        context.stroke();
        context.restore();
     };

    // context.beginPath();
    // context.arc(100, 400, 50, 0, Math.PI*2);
    // context.fill();

  };
};

canvasSketch(sketch, settings);
