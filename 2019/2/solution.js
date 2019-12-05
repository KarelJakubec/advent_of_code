const common = require("../common");

const patchArray = (arr, val1, val2) => {
    arr[1] = val1;
    arr[2] = val2;
}

const runMachine = (data) => {
    let pos = 0;
    while(data[pos] != 99) {
        let opcode = data[pos]
        let pos1 = data[pos + 1];
        let pos2 = data[pos + 2];
        let store_pos = data[pos + 3];

        if(opcode == 1) {
            data[store_pos] = data[pos1] + data[pos2];
        }
        else if(opcode == 2) {
            data[store_pos] = data[pos1] * data[pos2];
        }
        else {
            console.log("ERROR " + pos + " " + data[pos]);
        }
        pos += 4;
    }
    return data[0];
}

const easy = (test) => {
    let data = common.readToArray('./2/data')[0].split(',').map(x => parseInt(x));
    patchArray(data, 12, 2);
    return runMachine(data);
}

const hard = (test) => {
    const TARGET = 19690720;

    for(let i = 0; i < 100; i++) {
        for(let j = 0; j < 100; ++j) {
            let data = common.readToArray('./2/data')[0].split(',').map(x => parseInt(x));
            patchArray(data, i, j);
            if(runMachine(data) === TARGET) {
                return 100 * i + j;
            }
        }
    }
}

exports.easy = easy;
exports.hard = hard;
