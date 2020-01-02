const common = require("../common");

const H = 6;
const W = 25;

const easy = (test) => {
    let data = common.readToArray('./8/data')[0].split('').map(x => parseInt(x));

    let layers = [];
    let i = 0;
    let layer = -1;
    while(i < data.length) {
        if(i % (H * W) == 0) {
            layer++;
            layers.push([]);
        }
        layers[layer].push(data[i])
        ++i;
    }

    let minZeros = Number.MAX_SAFE_INTEGER;
    let minZerosIndex = -1;
    for(let i = 0; i < layers.length; ++i) {
        let zeros = layers[i].reduce((a,b) => b === 0 ? a + 1 : a, 0)
        if(zeros < minZeros) {
            minZeros = zeros;
            minZerosIndex = i
        }
    }

    return layers[minZerosIndex].reduce((a,b) => b === 1 ? a + 1 : a, 0) * layers[minZerosIndex].reduce((a,b) => b === 2 ? a + 1 : a, 0);
}

const hard = (test) => {
    let data = common.readToArray('./8/data')[0].split('').map(x => parseInt(x));

    let layers = [];
    let i = 0;
    let layer = -1;
    while(i < data.length) {
        if(i % (H * W) == 0) {
            layer++;
            layers.push([]);
        }
        layers[layer].push(data[i])
        ++i;
    }

    for(let i = 1; i < layers.length; ++i) {
        for(let j = 0; j < layers[i].length; ++j) {
            if(layers[0][j] == 2) {
                layers[0][j] = layers[i][j];
            }
        }
    }

    for(let j = 0; j < layers[0].length; ++j) {
        if(layers[0][j] == 0) {
            layers[0][j] = '.';
        }
        if(layers[0][j] == 1) {
            layers[0][j] = '*';
        }
    }

    for(let l = 0; l < H; ++l) {
        console.log(layers[0].slice((W * l), (W * l) + W).join(""));
    }

}

exports.easy = easy;
exports.hard = hard;