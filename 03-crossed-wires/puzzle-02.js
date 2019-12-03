var fs = require("fs");
var input = fs.readFileSync("./input.txt", "utf8");

// function to get the wire positions
const getWirePositions = wire => {
  const positions = new Map();
  const position = { x: 0, y: 0 };

  let length = 0;

  // loop over the complete wire
  for (let i = 0; i < wire.length; i++) {
    // save into the object
    const { direction, distance } = wire[i];

    for (let step = 1; step <= distance; step++) {
      // increase position coordinates based on direction
      position.x += direction === "L" ? -1 : direction === "R" ? 1 : 0;
      position.y += direction === "U" ? -1 : direction === "D" ? 1 : 0;

      // add the positions and length to the map
      positions.set(`${position.x},${position.y}`, ++length);
    }
  }

  return positions;
};

// pre process input
// split into the two wires
// split by comma to get the instructions
// return object with direction and distance (as int)
const wires = input.split("\n").map(wire => {
  return wire
    .trim()
    .split(",")
    .map(instruction => {
      return {
        direction: instruction[0],
        distance: Number(instruction.slice(1))
      };
    });
});

const wire1Positions = getWirePositions(wires[0]);
// spread to array, so we can filter on that later
const wire2Positions = [...getWirePositions(wires[1]).entries()];

// main execution
console.log(
  wire2Positions
    .filter(([position]) => wire1Positions.has(position))
    .map(([position, steps]) => wire1Positions.get(position) + steps)
    .sort((a, b) => a - b)[0]
);
