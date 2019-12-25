const assert = require("assert");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const input = fs.readFileSync("./input.txt", "utf-8").trim();

function run(input) {
  const seen = new Set([input]);
  for (;;) {
    input = iterate(input);
    if (seen.has(input)) {
      return score(input);
    } else {
      seen.add(input);
    }
  }
}

function score(map) {
  return map
    .replace(/\n/g, "")
    .split("")
    .reduce((acc, c, n) => acc + (c === "#" ? 1 << n : 0), 0);
}

function iterate(map) {
  map = map.split("\n").map(line => line.split(""));
  map = map.map((line, y) =>
    line.map((c, x) => {
      let neighbors = 0;
      if (y > 0 && map[y - 1][x] === "#") ++neighbors;
      if (x > 0 && map[y][x - 1] === "#") ++neighbors;
      if (y < map.length - 1 && map[y + 1][x] === "#") ++neighbors;
      if (x < map[0].length - 1 && map[y][x + 1] === "#") ++neighbors;

      if (c === "#") {
        return neighbors === 1 ? "#" : ".";
      } else {
        return neighbors === 1 || neighbors === 2 ? "#" : ".";
      }
    })
  );
  return map.map(line => line.join("")).join("\n");
}

console.log(run(input));
