const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").trim();
const tests = [];

// PREP
function parseInput(input) {
  return input.split("\n").map(parseLine);
}

function parseLine(line) {
  const [inputStr, outputStr] = line.split(" => ");
  const inputStrs = inputStr.split(", ");

  return {
    inputs: inputStrs.map(parseItem),
    output: parseItem(outputStr)
  };
}

function parseItem(item) {
  const [n, name] = item.split(" ");
  return { name, amount: +n };
}

// RUN
function run(input) {
  const equations = parseInput(input);
  let upperBound = 1;
  while (oreForFuel(equations, upperBound) <= 1e12) {
    upperBound *= 10;
  }

  let lowerBound = upperBound / 10;

  while (lowerBound !== upperBound) {
    const guess = lowerBound + Math.floor((upperBound - lowerBound) / 2);
    if (oreForFuel(equations, guess) <= 1e12) {
      lowerBound = guess;
    } else {
      upperBound = guess - 1;
    }
  }

  return lowerBound;
}

function oreForFuel(equations, n) {
  let inventory = {};

  process.stdout.write(`${n} => `);
  const result = produce("FUEL", n);
  process.stdout.write(`${result}\n`);
  return result;

  function produce(name, amount) {
    let ore = 0;
    const equation = equations.find(e => e.output.name === name);
    const multiplier = Math.ceil(amount / equation.output.amount);

    for (let input of equation.inputs) {
      if (input.name === "ORE") {
        ore += multiplier * input.amount;
      } else {
        if (!inventory[input.name]) {
          inventory[input.name] = 0;
        }

        if (inventory[input.name] < multiplier * input.amount) {
          ore += produce(
            input.name,
            multiplier * input.amount - inventory[input.name]
          );
        }

        inventory[input.name] -= multiplier * input.amount;
      }
    }

    if (!inventory[equation.output.name]) {
      inventory[equation.output.name] = 0;
    }

    inventory[equation.output.name] += multiplier * equation.output.amount;

    return ore;
  }
}

// Well... we run into a endless loop, but we get the number! 🤷‍♂️
console.log("PART 2: ", run(input));
