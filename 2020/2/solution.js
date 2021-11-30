
const common = require('../common')
const path = require('path')



const parsePasswordAndPolicy = (line) =>  {
    let arr = line.split(' ');
    let minMax = arr[0].split('-');

    return {
        min: minMax[0],
        max: minMax[1],
        letter: arr[1][0],
        password: arr[2].split('')
    }
}

const isPasswordValidEasy = (passwordPolicy) => {
    let occurences = passwordPolicy.password.filter(x => x === passwordPolicy.letter).length;
    return (occurences >= passwordPolicy.min && occurences <= passwordPolicy.max);
}

const isPasswordValidHard = (passwordPolicy) => {
    let occurences = 0;
    if(passwordPolicy.password[passwordPolicy.min - 1] == passwordPolicy.letter) {
        ++occurences;
    }
    if(passwordPolicy.password[passwordPolicy.max - 1] == passwordPolicy.letter) {
        ++occurences;
    }
    return occurences === 1;
}

const easy = (test) => {

    return common.readToArray('./2/data').
        map((x) => parsePasswordAndPolicy(x)).
        reduce((sum, item) => {
            if(isPasswordValidEasy(item)) {
                return sum + 1;
            }
            return sum;
        }, 0);

}

const hard = () => {
    return common.readToArray('./2/data').
    map((x) => parsePasswordAndPolicy(x)).
    reduce((sum, item) => {
        if(isPasswordValidHard(item)) {
            return sum + 1;
        }
        return sum;
    }, 0);


}

exports.easy = easy;
exports.hard = hard;