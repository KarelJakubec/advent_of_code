const START = 136818, END = 685979;

const test_validity = (num) => {
    let str = num.toString();
    let two_digit = false;

    for(let i = 1; i < str.length; ++i) {
        if(str[i-1] > str[i]) {
            return false;
        }
        if(str[i-1] == str[i]) {
            two_digit = true;
        }
    }
    return two_digit;
}

const test_validity_hard = (num) => {
    let str = num.toString();

    let streak = Array(10);
    for(let i = 0; i < 10; ++i) {
        streak[i] = 1;
    }

    for(let i = 1; i < str.length; ++i) {
        if(str[i-1] > str[i]) {
            return false;
        }
        if(str[i-1] == str[i]) {
            streak[parseInt(str[i])] += 1;
        }
    }

    for(let i = 0; i < 10; ++i) {
        if(streak[i] == 2) {
            return true
        }
    }
    return false
}

const easy = (test) => {
    let count = 0;
    for(let i = START; i <= END; ++i) {
        if(test_validity(i)) {
            ++count;
        }
    }
    return count;
}

const hard = (test) => {
    let count = 0;
    for(let i = START; i <= END; ++i) {
        if(test_validity_hard(i)) {
            ++count;
        }
    }
    return count;
}

exports.easy = easy;
exports.hard = hard;