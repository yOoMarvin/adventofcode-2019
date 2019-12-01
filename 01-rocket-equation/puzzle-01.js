var fs = require("fs");
var arr = fs.readFileSync("./input.txt", "utf8").split("\n");

var fuel = 0;

arr.map(m => {
  const calc = Math.floor(m / 3) - 2;
  fuel += calc;
});

console.log("FUEL REQUIREMENT: " + fuel);
