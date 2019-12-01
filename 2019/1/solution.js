
const common = require('../common')
const path = require('path')

const doSimpleCalc = (num) => {
    return Math.floor(num / 3) - 2;
}

const doHardCalc = (num) => {
    let value = doSimpleCalc(num);
    if (value <= 0) {
        return 0;
    }
    else {
        return value + doHardCalc(value);
    }
}

const easy = (test) => {
    const data = common.readToArray('./1/data');
    let sum = 0;
    data.forEach(element => {sum += doSimpleCalc(element)});
    return sum;
}

const hard = () => {
    const data = common.readToArray('./1/data');
    let sum = 0;
    data.forEach(element => {sum += doHardCalc(element)});
    return sum;
}

exports.easy = easy;
exports.hard = hard;