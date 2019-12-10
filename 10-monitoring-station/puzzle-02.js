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

// function for checking the line of sight and counting them now
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
    let gcd = greatestCommonDivisor(distanceX, distanceY);
    distanceY /= gcd;
    distanceX /= gcd;
  }

  let x = x1 + distanceX;
  let y = y1 + distanceY;
  let count = 0;

  while (asteroidmap[y] && asteroidmap[y][x]) {
    if (asteroidmap[y][x] === "#") {
      if (y === y2 && x === x2) {
        return count;
      } else {
        count++;
        return false;
      }
    }
    y += distanceY;
    x += distanceX;
  }
};

// got help of a fellow redditor here
const getAngle = (x1, y1, x2, y2) => {
  var angleRadians = (Math.atan2(y1 - y2, x1 - x2) * 180) / Math.PI;
  if (angleRadians < 0) angleRadians += 360;
  angleRadians -= 90;
  if (angleRadians < 0) angleRadians += 360;
  return angleRadians;
};

let y = 16;
let x = 8; // coordinates from part 1

let allShots = []; // [angle, numInBetween, x, y]

for (let y2 = 0; y2 < asteroidmap.length; y2++) {
  for (let x2 = 0; x2 < asteroidmap[0].length; x2++) {
    let lineOfSight = checkSight(x, y, x2, y2);
    if (lineOfSight === false) continue;
    allShots.push([getAngle(x, y, x2, y2), lineOfSight, x2, y2]);
  }
}

// sort by radian, so we get the right direction of the laser
allShots.sort((a, b) => (a[0] - b[0] === 0 ? a[1] - b[1] : a[0] - b[0]));

let asteroid200 = allShots[199];
console.log(asteroid200);

//console.log("PART 2:", asteroid200[2] * 100 + asteroid200[3]);
