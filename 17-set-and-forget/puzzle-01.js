const Computer = require("./Computer");

function checkIntersection(s, x, y) {
  delta = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ];
  let numScaff = 0;
  //y = x;
  //x = y;

  delta.map(element => {
    dx = element[0];
    dy = element[1];
    if (x + dx < 0 || y + dy < 0) return false;
    if (s[x + dx][y + dy] === "#") numScaff++;
  });
  return numScaff == 4;
}

// Part 1
computer = new Computer("./input.txt", 0);
const program = computer.run();
let scaffold = [[]];
let i = 0;

program.map(element => {
  if (element == 10) {
    scaffold.push([]);
    i++;
  } else {
    scaffold[i].push(element.toString());
  }
});

for (let i = 0; i < scaffold.length; i++) {
  for (let j = 0; j < scaffold[i].length; j++) {
    if (scaffold[i][j] == 35) scaffold[i][j] = "#";
    if (scaffold[i][j] == 46) scaffold[i][j] = ".";
  }
}

scaffold.map(line => {
  console.log(line.join(""));
});

let align = 0;
scaffold.map((row, y) => {
  row.map((char, x) => {
    if (scaffold[y][x] === "#" && checkIntersection(scaffold, x, y)) {
      console.log("I'M IN THE IF");
      align += x * y;
    }
  });
});

console.log(align);
