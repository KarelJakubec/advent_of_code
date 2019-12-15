const common = require("../common");
const machine = require("../machine")

const patchArray = (arr, val1, val2) => {
    arr[1] = val1;
    arr[2] = val2;
}



const easy = (test) => {
    let data = common.readToArray('./2/data')[0].split(',').map(x => parseInt(x));
    patchArray(data, 12, 2);
    machine.runMachine(data, () => 0);
    return data[0]
}

const hard = (test) => {
    const TARGET = 19690720;

    for(let i = 0; i < 100; i++) {
        for(let j = 0; j < 100; ++j) {
            let data = common.readToArray('./2/data')[0].split(',').map(x => parseInt(x));
            patchArray(data, i, j);
            machine.runMachine(data, () => 0)
            if(data[0] === TARGET) {
                return 100 * i + j;
            }
        }
    }
}

exports.easy = easy;
exports.hard = hard;
