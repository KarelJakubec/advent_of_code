const p = require("performant-array-to-tree");
const common = require("../common");
const util = require('util')


const count_orbits = (node, nornik) => {
    let sum = 0;
    for(let i = 0; i < node.children.length; ++i) {
        sum += nornik + count_orbits(node.children[i], nornik + 1);
    }
    return sum
}

const get_path = (node, search) => {

    if(node.data.id == search) {
        return [node.data.id]
    }

    for(let i = 0; i < node.children.length; ++i) {
        let path = get_path(node.children[i], search);
        if(path) {
            path.unshift(node.data.id)
            return path;
        }
    }
    return undefined;
}

const count_santa_you = (node) => {
    let path_you = get_path(node, 'YOU');
    let path_santa = get_path(node, 'SAN');

    let i = 0
    while(path_you[i] == path_santa[i]) {
        ++i;
    }

    return (path_you.length - i) + (path_santa.length - i) - 2
}


const construct_tree = () => {
    let data = common.readToArray('./6/data')
    let items = [];

    let parrents = new Set();
    let children = new Set();

    data.forEach(element => {
        var arr = element.split(')');
        parrents.add(arr[0]);
        children.add(arr[1]);

        items.push({id: arr[1], parentId: arr[0]});
    });

    let roots = [];
    children.forEach(element => {
        if(parrents.has(element)) {
            parrents.delete(element);
        }
    })

    items.push({id: Array.from(parrents)[0], parentId: null});
    return p.arrayToTree(items)[0];
}

const easy = (test) => {
    return count_orbits(construct_tree(), 1);
}

const hard = (test) => {
    return count_santa_you(construct_tree());
}

exports.easy = easy;
exports.hard = hard;