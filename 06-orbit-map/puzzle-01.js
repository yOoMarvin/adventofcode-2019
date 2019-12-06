const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").split("\n");

const list = input.map(pair => {
  return [...pair.split(")")];
});

const nodes = { COM: null };

list.forEach(([parent, name]) => {
  nodes[name] = parent;
});

// recursive function
const countOrbits = parent => (parent ? 1 + countOrbits(nodes[parent]) : 0);

console.log(
  `NUMBER OF DIRECT AND INDIRECT LOOPS: ${Object.keys(nodes).reduce(
    (total, nodeName) => total + countOrbits(nodes[nodeName]),
    0
  )}`
);
