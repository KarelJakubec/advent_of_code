
const common = require('../common')
const path = require('path')


const easy = (test) => {
    const data = common.readToArray('./1/data').map(x => parseInt(x));;

    for(let i = 0; i < data.length; ++i) {
        for(let j = i + 1; j < data.length; ++j ) {
            if(data[i] + data[j] == 2020) {
                return data[i] * data[j]
            }
        }
    }
}

const hard = () => {
    const data = common.readToArray('./1/data').map(x => parseInt(x));;

    for(let i = 0; i < data.length; ++i) {
        for(let j = i + 1; j < data.length; ++j ) {
            for(let k = j + 1; k < data.length; ++k) {
                if(data[i] + data[j] + data[k] == 2020) {
                    return data[i] * data[j] * data[k]

                }
            }
        }
    }
}

exports.easy = easy;
exports.hard = hard;