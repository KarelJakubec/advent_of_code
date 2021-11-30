
const yargs = require('yargs');

const argv = yargs
    .option('solution', {
        alias: 's',
        description: 'Which solution should be used',
        choices: ['hard', 'easy', 'e', 'h']
    })
    .option('day', {
        alias: 'd',
        description: 'Which day to solve',
        type: 'integer'
    })
    .option('test', {
        alias: 't',
        description: 'Use test data',
        type: 'boolean',
        default: false
    })
    .demandOption(['day', 'solution'])
    .help()
    .alias('help', 'h')
    .argv;

const handler = require("./" + argv.day + "/solution.js")

if(argv.solution === "easy" || argv.solution === "e") {
    console.log(handler.easy(argv.test));
}
else if (argv.solution === "hard" || argv.solution === "h") {
    console.log(handler.hard(argv.test));
}


