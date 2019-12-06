const common = require("../common");

const decodeInstruction = (num) => {
    let ins = {
        opcode: 0,
        paramModes: [0,0,0]
    }
    ins.opcode = num % 100;
    num = Math.floor(num / 100);
    let i = 0;
    while(num > 0) {
        ins.paramModes[i] = num % 10;
        num = Math.floor(num / 10);
        ++i;
    }

    return ins;
}

const getArgs = (ins, data, pos, n) => {
    let arr = Array(n);
    for(let i = 0; i < n; ++i) {
        arr[i] = ins.paramModes[i] === 1 ? data[pos + 1 + i] : data[data[pos + 1 + i]];
    }
    return arr;
}

const runMachine = (data, input) => {
    let pos = 0;

    let ins = decodeInstruction(data[pos]);

    while(ins.opcode != 99) {

        if(ins.opcode == 1) {
            args = getArgs(ins, data, pos, 2);
            data[data[pos + 3]] = args[0] + args[1];
            pos += 4;
        }
        else if(ins.opcode == 2) {
            args = getArgs(ins, data, pos, 2);
            data[data[pos + 3]] = args[0] * args[1];
            pos += 4;
        }
        else if(ins.opcode == 3) {
            data[data[pos + 1]] = input;
            pos += 2;
        }
        else if(ins.opcode == 4) {
            console.log(data[data[pos + 1]]);
            pos += 2;
        }
        else if(ins.opcode == 5) {
            args = getArgs(ins, data, pos, 2);
            if(args[0] != 0) {
                pos = args[1];
            }
            else {
                pos += 3;
            }
        }
        else if(ins.opcode == 6) {
            args = getArgs(ins, data, pos, 2);
            if(args[0] == 0) {
                pos = args[1];
            }
            else {
                pos += 3;
            }
        }
        else if(ins.opcode == 7) {
            args = getArgs(ins, data, pos, 2);
            data[data[pos + 3]] = args[0] < args[1] ? 1 : 0;
            pos += 4;
        }
        else if(ins.opcode == 8) {
            args = getArgs(ins, data, pos, 2);
            data[data[pos + 3]] = args[0] == args[1] ? 1 : 0;
            pos += 4;
        }
        else {
            console.log("ERROR " + ins + " " + data[pos]);
            break;
        }

        ins = decodeInstruction(data[pos]);
    }
}

const easy = (test) => {
    let data = common.readToArray('./5/data')[0].split(',').map(x => parseInt(x));
    runMachine(data, 1);
}

const hard = (test) => {
    let data = common.readToArray('./5/data')[0].split(',').map(x => parseInt(x));
    runMachine(data, 5);
}

exports.easy = easy;
exports.hard = hard;
