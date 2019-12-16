const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").split("");
const test = "12345678".split("").map(Number);

const data = input.map(Number);
const basePattern = [0, 1, 0, -1];

const createPattern = (length, idx) => {
  let pattern = [];
  for (let i = 0; i < length; i++) {
    pattern.push("something");
  }
};

const cutNumber = number => {
  return Math.abs(number) % 10;
};

// main entry
const phase = input => {};

console.log(test);
