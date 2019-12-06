const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").split("\n");

const list = input.map(pair => {
  return [...pair.split(")")];
});

const nodes = { COM: null };

list.forEach(([parent, name]) => {
  nodes[name] = parent;
});

const chain = (parent, links = []) => {
  return parent ? chain(nodes[parent], [...links, parent]) : links;
};

const intersect = (parent, path, depth = 0) => {
  return path.includes(parent)
    ? depth + path.indexOf(parent)
    : intersect(nodes[parent], path, depth + 1);
};

console.log(
  `ORBIT TRIPS TO SANTA: ${intersect(nodes["SAN"], chain(nodes["YOU"]))}`
);

// Got help of the interwebs here 🙋‍♂️
