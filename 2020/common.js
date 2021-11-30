
var fs = require('fs');

const readToArray = (path) =>  {
    var array = fs.readFileSync(path).toString().split("\n");
    return array;

}

exports.readToArray = readToArray;
