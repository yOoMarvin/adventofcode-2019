const Computer = require("./Computer");

function checkIntersection(s, x, y) {
  delta = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ];
  let count = 0;

  delta.map(([dx, dy]) => {
    // console.log("X", x);
    // console.log("DX", dx);
    // console.log("Y", y);
    // console.log("DY", dy);
    if (x + dx < 0 || y + dy < 0) return false;
    if (s[y + dy][x + dx] === "#") count++;
  });
  if (count == 4) return true;
}

// Part 1
computer = new Computer("./input.txt", 0);
const program = computer.run();
let grid = [[]];
let i = 0;

program.map(element => {
  if (element == 10) {
    grid.push([]);
    i++;
  } else {
    grid[i].push(element.toString());
  }
});

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (grid[i][j] == 35) {
      grid[i][j] = "#";
    } else if (grid[i][j] == 46) {
      grid[i][j] = ".";
    } else {
      grid[i][j] = "^";
    }
  }
}

grid.map(line => {
  console.log(line.join(""));
});

// Well... that didn't work... let's do it by hand 🤫😂

// let align = 0;
// for (let y = 0; y < grid.length; y++) {
//   for (let x = 0; x < grid[y].length; x++) {
//     if (grid[y][x] == "#" && checkIntersection(grid, x, y)) {
//       console.log(
//         "I'M IN THE IF. HERE ARE THE COORDS FOR THE INTERSECTION",
//         x,
//         y
//       );
//       align += x * y;
//     }
//   }
// }

// coords from the grid... see robot.txt
console.log(
  6 * 12 +
    10 * 14 +
    16 * 14 +
    16 * 18 +
    18 * 18 +
    18 * 20 +
    20 * 10 +
    20 * 44 +
    22 * 6 +
    22 * 34 +
    22 * 38 +
    24 * 38 +
    26 * 32
);
