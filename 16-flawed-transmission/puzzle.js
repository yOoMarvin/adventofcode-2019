const fs = require("fs");
const raw = fs.readFileSync("./input.txt", "utf-8").trim();

// global variables, because i don't want to set up typescript
let INPUT = [];
let PATTERN = [0, 1, 0, -1];
let OUTPUT = [];
let PHASE = 0;

class Transmission {
  constructor(input, repeat = 1) {
    INPUT = input.split("").map(Number);
    let size = input.length;
    for (let r = 0; r < repeat - 1; r++) {
      for (let i = 0; i < size; i++) {
        INPUT.push(INPUT[i]);
      }
    }
    OUTPUT = INPUT.slice();
  }

  encode() {
    PHASE++;
    let signal = OUTPUT.slice();
    OUTPUT = [];
    for (let s = 0; s < signal.length; s++) {
      let r = 0;
      for (let i = 0; i < signal.length; i++) {
        let p = PATTERN[Math.floor((i + 1) / (s + 1)) % PATTERN.length];
        r += signal[i] * p;
      }
      OUTPUT.push(Math.abs(r) % 10);
    }
  }
}

// Part 1
let t = new Transmission(raw, 1);
for (let i = 0; i < 100; i++) {
  t.encode();
}
console.log("PART 1:", OUTPUT.slice(0, 8).join(""));

// Part 2
// Pattern doesn't matter for the given offset
// All calculations will always take 1 for the pattern
// Problem can be rewritten, by solving the equation below
// value(digit, phase) = value(digit + 1, phase) + value(digit, phase - 1)
const input = raw;
let signal = input.split("").map(Number);
for (let i = 1; i < 10000; i++) {
  for (let n = 0; n < input.length; n++) signal.push(signal[n]);
}
let offset = +input.slice(0, 7);
signal = signal.slice(offset);
for (let phase = 1; phase <= 100; phase++) {
  for (let i = signal.length - 1; i >= 0; i--) {
    signal[i] = Math.abs((signal[i + 1] || 0) + signal[i]) % 10;
  }
}
console.log("PART 2:", signal.slice(0, 8).join(""));
