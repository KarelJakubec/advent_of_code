const common = require("../common");
const machine = require("../machine");
const combinatorics = require('js-combinatorics');



const easy = (test) => {
    let data = common.readToArray('./7/data')[0].split(',').map(x => parseInt(x));
    const permutations = combinatorics.permutation([0,1,2,3,4]);

    let max = 0;
    let max_perm = []

    permutations.forEach(permutation => {
        let signal = 0;

        const storeOutput = (output) => {
            signal = output;
        }

        permutation.forEach(phase => {

            const getInput = () => {
                let inputs = [phase, signal]
                let i = 0;

                return () => {
                    let val = inputs[i++];
                    return val;
                }
            }

            new machine.Machine(data.slice(), getInput(), storeOutput).run();
        });

        if(signal > max) {
            max = signal;
            max_perm = permutation.slice();
        }
    })
    console.log(max, max_perm);
}

const hard = (test) => {
    let data = common.readToArray('./7/data')[0].split(',').map(x => parseInt(x));
    const permutations = combinatorics.permutation([5,6,7,8,9]);

    let max = 0;
    let max_perm = []

    permutations.forEach(permutation => {
        let machines = [];
        let inputs = [];
        let signal = 0;

        for(let i = 0; i < permutation.length; ++i) {
            // Phase signal as first input
            inputs.push([permutation[i]]);

            const getInput = () => {
                let index = 0;
                return () => {
                    if(index >= inputs[i].length) {
                        return null;
                    }

                    let val = inputs[i][index++];
                    return val;
                }
            }

            const getOutput = () => {
                return (val) => {
                    inputs[(i + 1) % 5].push(val);
                    signal = val;
                }
            }

            machines.push(new machine.Machine(data.slice(), getInput(), getOutput()));
        }

        // Start signal for amplifier A
        inputs[0].push(0);

        let returnCodes = [-1,-1,-1,-1,-1];

        let done = false;
        while(!done) {
            for(let i = 0; i < machines.length; ++i) {
                if(returnCodes[i] != 0) {
                    returnCodes[i] = machines[i].run();
                }
            }

            if(returnCodes.reduce((a,b) => a + b, 0) == 0) {
                done = true;
            }
        }


        if(signal > max) {
            max = signal;
            max_perm = permutation.slice();
        }
    })
    console.log(max, max_perm);
}

exports.easy = easy;
exports.hard = hard;
