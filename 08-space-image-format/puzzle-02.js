const fs = require("fs");
const read = fs.readFileSync("./input.txt");
let data = read
  .toString()
  .split("")
  .map(Number);

const width = 25;
const height = 6;

let layers = [];
let w = 0;
let h = 0;
let layer = [];

for (let i = 0; i < data.length; i++) {
  layer.push(data[i]);
  w++;
  w == width
    ? (h++,
      (w = 0),
      h == height ? (layers.push(layer), (h = 0), (layer = [])) : undefined)
    : undefined;
}

let image = [];
for (let r = 0; r < width * height; r++) {
  let j = 0;
  let color = layers[j][r];
  while (color == 2) {
    color = layers[j][r];
    j++;
  }
  image.push(color);
}
let k = 0;
let img = "";
for (let i = 0; i < image.length; i++) {
  k++;
  image[i] == 1 ? (img = img + "▮") : (img = img + " ");
  if (k == 25) {
    k = 0;
    console.log(img);
    img = "";
  }
}
