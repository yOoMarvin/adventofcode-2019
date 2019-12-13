const Computer = require("./Computer");
const fs = require("fs");

const raw = fs
  .readFileSync("./input2.txt")
  .toString()
  .split(",");

const code = raw.map(Number);

computer = new Computer("./input2.txt", 0);
game = computer.run(code);

let idx = 0;
function* gen() {
  while (idx < game.length) {
    yield game[idx];
    idx++;
  }
}
const screen = gen();

let input = 0;
let value, done;
let paddleX;
let ballX;
let instruction = [];
let score;

while (!done) {
  ({ value, done } = screen.next(input));
  console.log("Input", input);
  if (value == null) continue;
  instruction.push(value);
  if (instruction.length === 3) {
    const [x, y, tile] = instruction;
    if (tile === 3) paddleX = x;
    if (tile === 4) ballX = x;
    if (x === -1) score = tile;
    input = paddleX < ballX ? 1 : paddleX > ballX ? -1 : 0;
    instruction = [];
  }
}
console.log(score);
