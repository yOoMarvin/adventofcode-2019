const fs = require("fs");
const input = fs
  .readFileSync("./input.txt", "utf8")
  .split(",")
  .map(Number);

const getDiagnosticCode = instructions => {
  let diagnoticCode = null;
  let i = 0;

  // loop as long as we don't have a 99. This is the exit code
  while (instructions[i] != 99) {
    // prep: current instruction, opcode, and parameter modes
    const instruction = instructions[i].toString();
    const opCode = instruction[instruction.length - 1];
    const parameterModes = instruction.slice(0, instruction.length - 2);
    const [C = "0", B = "0", A = "0"] = [...parameterModes].reverse();

    // first part is classic ...
    if (opCode === "1" || opCode === "2") {
      const [input1, input2, output] = instructions.slice(i + 1, i + 4);
      const a = C === "0" ? instructions[input1] : input1;
      const b = B === "0" ? instructions[input2] : input2;
      instructions[output] = opCode === "1" ? a + b : a * b;
      i += 4;
    } else if (opCode === "3") {
      instructions[instructions[i + 1]] = 1;
      // new instruction, increase only, because we got less parameters!
      i += 2;
    } else if (opCode === "4") {
      if (A === "0") {
        diagnoticCode = instructions[instructions[i + 1]];
      }
      i += 2;
    }
  }
  return diagnoticCode;
};

console.log("THE DIAGNOSTIC CODE IS: ", getDiagnosticCode(input));
