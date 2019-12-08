const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").split("");
//const input = "0222112222120000".split("");

const wide = 25;
const tall = 6;

const layers = new Object();

let index = 0;

// prep the input object like in the puzzle description
for (let t = 1; t <= tall; t++) {
  layers[t] = [];
  for (let x = 0; x < tall; x++) {
    layers[t][x] = [];
    for (let w = 1; w <= wide; w++) {
      layers[t][x].push(input[index]);
      index++;
    }
  }
}

// prep image with all black pixels
let image = [];
for (let t = 0; t < tall; t++) {
  image[t] = [];
  for (let w = 0; w < wide; w++) {
    image[t][w] = "-";
  }
}

// loop through the layers
Object.entries(layers).forEach(([index, layer]) => {
  console.log(index);
  for (let i = 0; i < layer.length; i++) {
    for (let j = 0; j < layer[i].length; j++) {
      // problem... if a layer later on has the value it overwrites the previous one
      layers[index][i][j] === "0" ? (image[i][j] = "0") : null;
    }
  }
});

// print image
for (let i = 0; i < image.length; i++) {
  let str = "";
  for (let j = 0; j < image[i].length; j++) {
    str = str.concat(image[i][j]);
  }
  console.log(str);
}
