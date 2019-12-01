var fs = require("fs");
var arr = fs.readFileSync("./input.txt", "utf8").split("\n");

const checkFuel = fuel => {
  if (fuel > 0) {
    result += fuel;
    checkFuel(Math.floor(fuel / 3) - 2);
  }
};

var result = 0;

arr.map(m => {
  var fuel = Math.floor(m / 3) - 2;
  checkFuel(fuel);
});

console.log("FUEL REQUIREMENT: " + result);
