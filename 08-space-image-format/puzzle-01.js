const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").split("");

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

// function that counts the digits in a layer
const countLayerDigit = (digit, splitLayer) => {
  let completeLayer = [];
  for (let i = 0; i < splitLayer.length; i++) {
    completeLayer = completeLayer.concat(splitLayer[i]);
  }

  let count = 0;
  completeLayer.map(i => {
    if (i === digit) {
      count++;
    }
  });

  return count;
};

// count all zeros
const zeroCounts = new Object();
Object.entries(layers).forEach(([index, layer]) => {
  zeroCounts[index] = countLayerDigit("0", layer);
});

// index of layer with fewest zeros
const fewestZeros = Object.keys(zeroCounts).reduce((a, b) =>
  zeroCounts[a] < zeroCounts[b] ? a : b
);

// count the ones and the twos
const oneDigits = countLayerDigit("1", layers[fewestZeros]);
const twoDigits = countLayerDigit("2", layers[fewestZeros]);

// RESULT PART 1
console.log(oneDigits * twoDigits);
