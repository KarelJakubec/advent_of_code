const common = require("../common");
const machine = require("../machine");


const easy = (test) => {
    let data = common.readToArray('./9/data')[0].split(',').map(x => parseInt(x));
    new machine.Machine(data.slice(), () => 1, console.log).run();
}

const hard = (test) => {
    let data = common.readToArray('./9/data')[0].split(',').map(x => parseInt(x));
    new machine.Machine(data.slice(), () => 2, console.log).run();
}

exports.easy = easy;
exports.hard = hard;
