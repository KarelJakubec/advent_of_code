const common = require("../common");
const machine = require("../machine");




const easy = (test) => {
    let data = common.readToArray('./11/data')[0].split(',').map(x => parseInt(x));
    
    let pos = {x:0, y:0}
    let direction = 'up'
    let panels = new Map();
    
    const inputFunction = () => {
        if(panels.has(JSON.stringify(pos))) { 
            return panels.get(JSON.stringify(pos)).color
        }
        else {
            return 0
        }
    }
    
    let outputValue = 'paint'; 
    const outputHandler = (o) => {
        
        
        if(outputValue == 'paint') {
            panels.set(JSON.stringify(pos), {color: o});
            console.log("Painting ", pos, " to ", o)
            outputValue = 'move';
        }
        else if(outputValue == 'move') {
            if(direction == 'up') {
                if(o == 0) {
                    direction = 'left';
                }
                if(o == 1) {
                    direction = 'right';
                }
            }
            else if (direction == 'left') {
                if(o == 0) {
                    direction = 'down';
                }
                if(o == 1) {
                    direction = 'up';
                }
            }
            else if (direction == 'right') {
                if(o == 0) {
                    direction = 'up';
                }
                if(o == 1) {
                    direction = 'down';
                }
            }
            else if (direction == 'down') {
                if(o == 0) {
                    direction = 'right';
                }
                if(o == 1) {
                    direction = 'left';
                }
            }
            
            if(direction == 'left') {
                pos.x--;
            }
            else if(direction == 'right') {
                pos.x++;
            }
            else if(direction == 'up') {
                pos.y++;
            }
            else if(direction == 'down') {
                pos.y--;
            }
            
            console.log("Turning ", direction, " to new pos ", pos)
            outputValue = 'paint';
        }
    }
            
    new machine.Machine(data.slice(), inputFunction, outputHandler).run();
    
    console.log(panels.size)
}

const hard = (test) => {
    let data = common.readToArray('./11/data')[0].split(',').map(x => parseInt(x));
    
    let pos = {x:0, y:0}
    let direction = 'up'
    let panels = new Map();
    panels.set(JSON.stringify(pos), {color: 1});
    
    const inputFunction = () => {
        if(panels.has(JSON.stringify(pos))) { 
            return panels.get(JSON.stringify(pos)).color
        }
        else {
            return 0
        }
    }
    
    let outputValue = 'paint'; 
    const outputHandler = (o) => {
        
        
        if(outputValue == 'paint') {
            panels.set(JSON.stringify(pos), {color: o});
            console.log("Painting ", pos, " to ", o)
            outputValue = 'move';
        }
        else if(outputValue == 'move') {
            if(direction == 'up') {
                if(o == 0) {
                    direction = 'left';
                }
                if(o == 1) {
                    direction = 'right';
                }
            }
            else if (direction == 'left') {
                if(o == 0) {
                    direction = 'down';
                }
                if(o == 1) {
                    direction = 'up';
                }
            }
            else if (direction == 'right') {
                if(o == 0) {
                    direction = 'up';
                }
                if(o == 1) {
                    direction = 'down';
                }
            }
            else if (direction == 'down') {
                if(o == 0) {
                    direction = 'right';
                }
                if(o == 1) {
                    direction = 'left';
                }
            }
            
            if(direction == 'left') {
                pos.x--;
            }
            else if(direction == 'right') {
                pos.x++;
            }
            else if(direction == 'up') {
                pos.y++;
            }
            else if(direction == 'down') {
                pos.y--;
            }
            
            console.log("Turning ", direction, " to new pos ", pos)
            outputValue = 'paint';
        }
    }
            
    new machine.Machine(data.slice(), inputFunction, outputHandler).run();
    
    let displayArr = new Array();
    for(let i = 0; i < 6; i++) {
        displayArr[i] = new Array(41);
        for (let j = 0; j < 41; j++) {
            displayArr[i][j] = ' ';
            if(panels.has(JSON.stringify({x:j, y:i * -1}))) {
                 if(panels.get(JSON.stringify({x:j, y:i * -1})).color == 1) {
                     displayArr[i][j] = '#';
                 }
            }
        }
    }
    
    for(let i = 0; i < 6; i++) {
        console.log(displayArr[i].join(''))
    }
}
    


exports.easy = easy;
exports.hard = hard;