const common = require('../common')
const path = require('path')

const easy = (test) => {

    let data = common.readToArray('./3/data');
    let trees = 0;
    for(let i = 0; i < data.length; i++) {
        if(data[i][(i * 3) % data[i].length] == '#') {
            trees++
        }
    }

    return trees;
}

const hard = () => {
    let data = common.readToArray('./3/data');

    trees_1_1 = 0;
    trees_1_3 = 0;
    trees_1_5 = 0;
    trees_1_7 = 0;
    trees_2_1 = 0;

    for(let i = 0; i < data.length; i++) {
        if(data[i][i % data[i].length] == '#') {
            trees_1_1++;
        }
        if(data[i][(i * 3) % data[i].length] == '#') {
            trees_1_3++;
        }
        if(data[i][(i * 5) % data[i].length] == '#') {
            trees_1_5++;
        }
        if(data[i][(i * 7) % data[i].length] == '#') {
            trees_1_7++;
        }

    }

    for(let i = 0; i * 2 < data.length; i++) {
        if(data[i * 2][i % data[i].length] == '#') {
            trees_2_1++;
        }
    }

    return trees_1_1 * trees_1_3 * trees_1_5 * trees_1_7 * trees_2_1;
}

exports.easy = easy;
exports.hard = hard;