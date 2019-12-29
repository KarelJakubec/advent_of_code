const common = require("../common");
const machine = require("../machine")


const easy = (test) => {
    let data = common.readToArray('./5/data')[0].split(',').map(x => parseInt(x));
    new machine.Machine(data, () => 1, console.log).run();
}

const hard = (test) => {
    let data = common.readToArray('./5/data')[0].split(',').map(x => parseInt(x));
    new machine.Machine(data, () => 5, console.log).run();
}

exports.easy = easy;
exports.hard = hard;
