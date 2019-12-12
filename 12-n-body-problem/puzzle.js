const fs = require("fs");

const input = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n");
const moons = input.map(x => x.split(",").map(Number));

function copyInput(input) {
  const outer = [];
  for (let i = 0; i < input.length; i++) {
    outer.push([...input[i]]);
  }
  return outer;
}

function energyAfter(input, steps) {
  const velocities = input.map(x => [0, 0, 0]);
  const positions = copyInput(input);

  for (let i = 1; i <= steps; i++) {
    movementLoop(positions, velocities);
  }
  return totalEnergy(positions, velocities);
}

function movementLoop(positions, velocities) {
  positions.forEach((p1, i1) => {
    positions.forEach(p2 => {
      for (let j = 0; j < 3; j++) {
        if (p1[j] > p2[j]) velocities[i1][j]--;
        else if (p1[j] < p2[j]) velocities[i1][j]++;
      }
    });
  });
  for (let j = 0; j < positions.length; j++) {
    for (let k = 0; k < 3; k++) {
      positions[j][k] += velocities[j][k];
    }
  }
}

function totalEnergy(positions, velocities) {
  const potArr = positions.map(x => {
    let sum = 0;
    x.forEach(y => (sum += Math.abs(y)));
    return sum;
  });

  const kinArr = velocities.map(x => {
    let sum = 0;
    x.forEach(y => (sum += Math.abs(y)));
    return sum;
  });

  let sum = 0;
  for (let i = 0; i < positions.length; i++) {
    sum += potArr[i] * kinArr[i];
  }
  return sum;
}

console.log("PART 1: ", energyAfter(moons, 1000));

// -----
// PART 2
// -----

// Thanks u/onamoontrip for the axis trick!
function stepsToReturn(input) {
  const origins = copyInput(input);
  const motionless = input.map(x => [0, 0, 0]);
  const axisSteps = [0, 0, 0];

  const positions = copyInput(origins);
  const velocities = copyInput(motionless);
  let steps = 0;

  while (axisSteps.indexOf(0) > -1) {
    movementLoop(positions, velocities);
    steps++;

    for (let i = 0; i < axisSteps.length; i++) {
      if (
        axisSteps[i] === 0 &&
        sameOnAxis(i, origins, positions) &&
        sameOnAxis(i, motionless, velocities)
      )
        axisSteps[i] = steps;
    }
  }
  return lcm(axisSteps);
}

function sameOnAxis(axis, posArr1, posArr2) {
  for (let i = 0; i < Math.min(posArr1.length, posArr2.length); i++) {
    if (posArr1[i][axis] !== posArr2[i][axis]) return false;
  }
  return true;
}

// lowest common multiple
function lcm(nums) {
  if (nums.length === 0) return 0;
  let rVal = nums[0];
  for (let i = 0; i < nums.length; i++) {
    rVal = (rVal * nums[i]) / gcd(rVal, nums[i]);
  }
  return rVal;
}

// greatest common divisor
function gcd(a, b) {
  if (b == 0) return a;
  return gcd(b, a % b);
}

console.log("PART 2: ", stepsToReturn(moons));
