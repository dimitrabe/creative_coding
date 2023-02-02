const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

let manager;
let img;
let settings; 
const picURL = './images/sketch05_image.jpg';

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ context, width, height }) => {

  const cell = 40;
  const cols = Math.floor(width/cell);
  const rows = Math.floor(height/cell);
  const numCells = cols * rows;
  
  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return ({ context, width, height }) => {
    
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, width, height);
    
    typeContext.save();
    typeContext.drawImage(img, 0, 0, cols, rows); // draw image
    typeContext.restore();

    const pixels = typeContext.getImageData(0,0,cols,rows);
    const typeData = pixels.data;
    console.log(typeData);

    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    context.textBaseline = 'middle';
    context.textAlign = 'center';

    for (let i=0; i < numCells; i++){
      const col = i%cols;
      const row = Math.floor(i/cols);

      const x = col * cell;
      const y = row * cell;

      const r = typeData[i * 4];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];

      context.fillStyle =`rgb(${r},${g},${b})`;
      context.save();
      context.translate(x,y);      
      
      context.fillRect(0,0,cell,cell);
      
      //context.beginPath();
      //context.arc(0,0,cell/2,0,Math.PI*2);
      //context.fill();
      
      //const glyph = getGlyph(r);      
      //context.font = `${cell*2}px ${fontFamily}`;
      //if (Math.random()<0.1) context.font = `${cell*6}px ${fontFamily}`;
      //context.fillText(glyph,0,0);      

      context.restore();

    }

    //context.drawImage(img, 0, 0, width, height);
    //context.drawImage(typeCanvas, 0, 0);
  };
};

const getGlyph = (v) => {
    if (v<50) return '';
    if (v<100) return '.';
    if (v<150) return 'o';
    if (v<200) return '0';
    
    const glyphs = "_= /".split('')
    console.log(glyphs);

    return random.pick(glyphs);
}


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
