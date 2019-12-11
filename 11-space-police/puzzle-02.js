const Computer = require("./Computer");
const Panel = require("./Panel");

let result, computer;
let robotx = 0,
  roboty = 0;
let minx = 0,
  maxx = 0,
  miny = 0,
  maxy = 0;
let direction = "u",
  todo = [];
let panels = [];
let visited = [];
let ix, coords;

computer = new Computer("./input.txt", 2);

while (!computer.done) {
  coords = robotx.toString() + "," + roboty.toString();
  if (visited.includes(coords)) {
    //previously visit panel
    ix = visited.indexOf(coords);
  } else {
    // new panel
    panels.push(new Panel(robotx, roboty));
    visited.push(coords);
    ix = visited.length - 1;
    if (ix == 0) {
      panels[ix].Paint(1);
    }
  }
  todo = computer.run([panels[ix].color]);
  panels[ix].Paint(todo[0]);
  if (todo[1] == 0) {
    //left
    if (direction == "u") {
      direction = "l";
    } else if (direction == "l") {
      direction = "d";
    } else if (direction == "d") {
      direction = "r";
    } else {
      direction = "u";
    }
  } else {
    //right
    if (direction == "u") {
      direction = "r";
    } else if (direction == "r") {
      direction = "d";
    } else if (direction == "d") {
      direction = "l";
    } else {
      direction = "u";
    }
  }
  switch (direction) {
    case "u":
      roboty++;
      if (roboty > maxy) {
        maxy = roboty;
      }
      break;
    case "l":
      robotx--;
      if (robotx < minx) {
        minx = robotx;
      }
      break;
    case "d":
      roboty--;
      if (roboty < miny) {
        miny = roboty;
      }
      break;
    case "r":
      robotx++;
      if (robotx > maxx) {
        maxx = robotx;
      }
      break;
  }
}

result = "";
for (a = maxy; a >= miny; a--) {
  for (b = minx; b <= maxx; b++) {
    coords = b.toString() + "," + a.toString();
    ix = visited.indexOf(coords);
    if (ix == -1) {
      result += " ";
    } else {
      if (panels[ix].color == 0) {
        result += " ";
      } else {
        result += "█";
      }
    }
  }
  result += "\n";
}
console.log(result);
