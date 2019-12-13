const Computer = require("./Computer");
const fs = require("fs");

const raw = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n");
const code = raw.map(x => x.split(",").map(Number));

computer = new Computer("./input.txt", 0);
game = computer.run(code);

let idx = 0;
let screen = [];
while (idx < game.length) {
  screen.push({ x: game[idx], y: game[idx + 1], id: game[idx + 2] });

  idx += 3;
}
let count = 0;
screen.forEach(obj => {
  if (obj.id == 2) {
    count += 1;
  }
});

console.log("PART 1, # OF BLOCKS: ", count);
