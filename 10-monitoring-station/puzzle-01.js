const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").split("\n");

let asteroidmap = input.map(l => l.split(""));
let resultmap = input.map(l => l.split(""));

const greatestCommonDivisor = (x, y) => {
  if (typeof x !== "number" || typeof y !== "number") {
    console.log("Not a Number. Cannot calculate greatest common divisor");
    return false;
  }
  x = Math.abs(x);
  y = Math.abs(y);

  while (y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
};

// function for checking the line of sight
// take two coordinates pairs as input
const checkSight = (x1, y1, x2, y2) => {
  // if the input is not an asteroid, return false
  if (asteroidmap[y2][x2] !== "#") return false;
  if (asteroidmap[y1][x1] !== "#") return false;

  // if the coordinates are the same... return false
  if (y2 == y1 && x2 == x1) return false;

  let distanceY = y2 - y1;
  let distanceX = x2 - x1;

  if (distanceX === distanceY && distanceY === 0) {
  } else {
    // the gcd represents the line of sight
    let gcd = greatestCommonDivisor(distanceX, distanceY);
    distanceY /= gcd;
    distanceX /= gcd;
  }

  let x = x1 + distanceX;
  let y = y1 + distanceY;

  while (asteroidmap[y] && asteroidmap[y][x]) {
    if (asteroidmap[y][x] === "#") {
      if (y === y2 && x === x2) {
        return true;
      } else {
        return false;
      }
    }
    y += distanceY;
    x += distanceX;
  }
};

// MAIN EXECUTION
// those variables are important for the result!
let maxAsteroidsInSight = 0;
let maxX = 0;
let maxY = 0;

// loop through everything (!)
for (let y = 0; y < asteroidmap.length; y++) {
  for (let x = 0; x < asteroidmap[0].length; x++) {
    let count = 0;
    for (let y2 = 0; y2 < asteroidmap.length; y2++) {
      for (let x2 = 0; x2 < asteroidmap[0].length; x2++) {
        // if in sight, count it
        count += +checkSight(x, y, x2, y2);
      }
    }
    // add current result to the result map
    resultmap[y][x] = count;
    // if we have a new max, change the variables
    if (count > maxAsteroidsInSight) {
      maxAsteroidsInSight = count;
      maxX = x;
      maxY = y;
    }
  }
}

console.log("PART 1:", maxAsteroidsInSight, maxX, maxY);
