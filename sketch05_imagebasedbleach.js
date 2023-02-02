const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

let manager;
let img;
let settings; 
const picURL = './images/sketch05_image.jpg';

const sketch = ({ context, width, height }) => {

  return ({ context, width, height }) => {
      
    context.save();
    context.drawImage(img, 0, 0, width, height); // draw image
    context.restore();

    const pixels = context.getImageData(0,0,width,height);
    const typeData = pixels.data;
    //console.log(typeData);

    // Manipulate pixels
    let len = height;
    let dimensionA = len;
    let dimensionB = width;
    while (len) {
      const newX = Math.floor(Math.random() * len--);
      const oldX = len;

      // Sometimes leave row intact
      if (Math.random() > 0.70) continue;

      for (let y = 0; y < dimensionB; y++) {
        // Sometimes leave column in tact
        if (Math.random() > 0.925) continue;

        // Copy new random column into old column
        const newIndex = newX + y * dimensionA;
        const oldIndex = oldX + y * dimensionA;

        // Make 'grayscale' by just copying blue channel
        typeData[oldIndex * 4 + 0] = typeData[newIndex * 4 + 2];
        typeData[oldIndex * 4 + 1] = typeData[newIndex * 4 + 2];
        typeData[oldIndex * 4 + 2] = typeData[newIndex * 4 + 2];
      }
    }

    // Put new pixels back into canvas
    context.putImageData(pixels, 0, 0);
        
  };
};


const loadAnImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = url;
  });
};

const start = async () => {  
  img = await loadAnImage(picURL);
  settings = {
    dimensions: [ img.width, img.height]
  };
  manager = await canvasSketch(sketch, settings);
};

start();
