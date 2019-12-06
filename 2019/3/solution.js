const common = require('../common');

const WIRES_COUNT = 2;

const GetLine = (start_x, start_y, direction, distance) => {
    if(direction === 'U') {
        return {
            dir: 'U',
            s_x: start_x,
            s_y: start_y,
            e_x: start_x,
            e_y: start_y + distance,
        }
    }
    else if(direction === 'D') {
        return {
            dir: 'D',
            s_x: start_x,
            s_y: start_y - distance,
            e_x: start_x,
            e_y: start_y
        }
    }
    else if(direction == 'R') {
        return {
            dir: 'R',
            s_x: start_x,
            s_y: start_y,
            e_x: start_x + distance,
            e_y: start_y
        }
    }
    else if(direction == 'L') {
        return {
            dir: 'L',
            s_x: start_x - distance,
            s_y: start_y,
            e_x: start_x,
            e_y: start_y
        }
    }
}

const GetLineLength = (line) => {
    return Math.abs(line.s_x - line.e_x) + Math.abs(line.s_y - line.e_y);
}

const getWire = (data) => {
    let wire = Array();

    let start_x = 0, start_y = 0;
    let path = data.split(',').map(item => Array(item.substring(0,1), parseInt(item.substring(1))));
    for(let j = 0; j < path.length; ++j) {
        let line = GetLine(start_x, start_y, path[j][0], path[j][1]);
        wire.push(line);
        if(path[j][0] === 'U' || path[j][0] === 'R') {
            start_x = line.e_x;
            start_y = line.e_y;
        }
        else {
            start_x = line.s_x;
            start_y = line.s_y;
        }
    }

    return wire;
}

const pointOnLine = (line, x, y) => {
    if (line.s_x == x && line.s_y <= y && line.e_y >= y) {
        if(line.dir == 'U') {
            return Math.abs(line.s_y - y);
        }
        else {
            return Math.abs(line.e_y - y);
        }

    }
    else if (line.s_y == y && line.s_x <= x && line.e_x >= x) {
        if(line.dir == 'R') {
            return Math.abs(line.s_x - x);
        }
        else {
            return Math.abs(line.e_x - x);
        }
    }
    else {
        return undefined
    }
}

const getIntersection = (l1, l2) => {
    if(l1.s_x == l1.e_x && l2.s_x == l2.e_x || l1.s_y == l1.e_y && l2.s_y == l2.e_y) {
        return undefined;
    }

    if(l1.s_x <= l2.s_x && l1.e_x >= l2.s_x && l1.s_y >= l2.s_y && l1.s_y <= l2.e_y) {
        return[l2.s_x, l1.s_y];
    }
    else if(l2.s_x <= l1.s_x && l2.e_x >= l1.s_x && l2.s_y >= l1.s_y && l2.s_y <= l1.e_y) {
        return[l1.s_x, l2.s_y];
    }
    else {
        return undefined;
    }
}

const getIntersections = (wires) => {
    let intrs = Array();

    for(let i = 0; i < WIRES_COUNT; ++i) {
        for(let j = i + 1; j < WIRES_COUNT; ++j) {
            for(let k = 0; k < wires[i].length; k++) {
                for(let l = 0; l < wires[j].length; l++) {
                    let intersection = getIntersection(wires[i][k], wires[j][l]);
                    if(intersection && intersection[0] != 0 && intersection[1] != 0) {
                        intrs.push(intersection);
                    }
                }
            }
        }
    }

    return intrs;
}

const easy = (test) => {
    let data = common.readToArray('./3/data')

    let wires = Array();
    for(let i = 0; i < WIRES_COUNT; ++i) {
        wires.push(getWire(data[i]));
    }

    let lowest = undefined;
    let intrs = getIntersections(wires);
    for(let i = 0; i < intrs.length; ++i) {
        let dist = Math.abs(intrs[i][0]) + Math.abs(intrs[i][1])
        if(!lowest || dist < lowest) {
            lowest = dist;
        }
    }

    return lowest;
}

const hard = (test) => {
    let data = common.readToArray('./3/data')

    let wires = Array();
    for(let i = 0; i < WIRES_COUNT; ++i) {
        wires.push(getWire(data[i]));
    }

    let lowest = undefined;
    let intrs = getIntersections(wires);

    for(let i = 0; i < intrs.length; ++i) {
        let dist = 0;

        for(let j = 0; j < WIRES_COUNT; ++j) {
            let k = 0;
            while(true) {
                let pol = pointOnLine(wires[j][k], intrs[i][0], intrs[i][1]);

                if(pol) {
                    dist += pol;
                    break;
                }
                else {
                    let tmp =  GetLineLength(wires[j][k]);
                    dist += tmp;
                }
                ++k;
            }
        }

        if(!lowest || dist < lowest) {
            lowest = dist;
        }
    }

    return lowest;
}

exports.easy = easy;
exports.hard = hard;