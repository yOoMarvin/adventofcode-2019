var fs = require("fs");
var arr = fs.readFileSync("./input.txt", "utf8").split(",");

const fixLanding = (noun, verb) => {
    const input = arr.map(Number)

    let i = 0
    let running = true

    input[1] = noun
    input[2] = verb

    do {
        const opCode = input[i]
        switch(opCode) {
            case 1:
               { 
                    const p1 = input[input[i+1]]
                    const p2 = input[input[i+2]]
                    const sum = input[i+3]
                    input[sum] = p1 + p2
                    i += 4
                }
                break
            case 2:
                {
                    const p1 = input[input[i+1]]
                    const p2 = input[input[i+2]]
                    const sum = input[i+3]
                    input[sum] = p1 * p2
                    i += 4
                }
                break
            case 99:
                running = false
                break
            default:
                console.log("RUNNING INTO DEFAULT")
                running = false
        }
    } while (running)

    return [input[0], 100 * noun + verb]
}

let solution = -1

for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++){
        //console.log("Loop", noun, verb)
        const [value, result] = fixLanding(noun, verb)
        //console.log("Value, Result", value, result)
        if (value === 19690720){
            console.log("WE'VE FOUND THE KEY!", noun, verb, result)
            solution = result
            break
        }
    }
}

console.log("SOLUTION", solution)



