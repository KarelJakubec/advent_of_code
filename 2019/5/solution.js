const common = require("../common");
const machine = require("../machine")


const easy = (test) => {
    let data = common.readToArray('./5/data')[0].split(',').map(x => parseInt(x));
    machine.runMachine(data, () => 1);
}

const hard = (test) => {
    let data = common.readToArray('./5/data')[0].split(',').map(x => parseInt(x));
    machine.runMachine(data, () => 5);
}

exports.easy = easy;
exports.hard = hard;
