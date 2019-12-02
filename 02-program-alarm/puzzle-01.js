var fs = require("fs");
var arr = fs.readFileSync("./input.txt", "utf8").split(",");

// convert to int array
arr = arr.map(Number)

// change puzzle input according to instructions
arr[1] = 12
arr[2] = 2

var i = 0
loop1:
    while (i<arr.length){
        switch (arr[i]) {
            case 1:
                arr[arr[i+3]] = arr[arr[i+1]] + arr[arr[i+2]]
                break;
            case 2:
                arr[arr[i+3]] = arr[arr[i+1]] * arr[arr[i+2]]
                break;
            case 99:
                break loop1;
            default:
                break;
        }
        i = i+4;
    }

console.log("POSITION 0 STATE:" + arr[0])