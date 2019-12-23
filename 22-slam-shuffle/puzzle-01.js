const assert = require("assert");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const input = fs.readFileSync("./input.txt", "utf-8");

const prepareInput = (rawInput, parse) =>
  rawInput.split("\n").map(x => {
    if (x.startsWith("deal with")) {
      return { type: "inc", val: parse(x.split("deal with increment ")[1]) };
    }
    if (x.startsWith("deal into")) {
      return { type: "rev" };
    }
    if (x.startsWith("cut")) {
      return { type: "cut", val: parse(x.split("cut")[1]) };
    }
  });

const partOne = rawInput => {
  const moves = prepareInput(rawInput, Number);
  const cards = 10007;

  let deck = [];
  for (let i = 0; i < cards; i++) {
    deck.push(i);
  }

  moves.forEach(({ type, val }) => {
    switch (type) {
      case "rev": {
        deck.reverse();
        break;
      }
      case "cut": {
        const left = deck.slice(val);
        const right = deck.slice(0, val);
        deck = left.concat(right);
        break;
      }
      case "inc": {
        const temp = new Array(cards);
        let originalIndex = 0;
        let index = 0;

        while (originalIndex < cards) {
          if (temp[index % cards] === undefined) {
            temp[index % cards] = deck[originalIndex];
            originalIndex++;
          }

          index += val;
        }

        deck = temp;
        break;
      }
    }
  });

  return deck.findIndex(x => x === 2019);
};

console.time("Time");
const resultA = partOne(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
