const common = require("../common");
const machine = require("../machine");

var Vector = function(x, y) {
  this.x = x || 0;
  this.y = y || 0;
};

// return the angle of the vector in radians
Vector.prototype.getDirection = function() {
	return Math.atan2(this.y, this.x);
};

Vector.prototype.calcAngleDegrees = function() {
  let angles =  ((Math.atan2(this.y, this.x) * 180) / Math.PI) - 90;
  if(angles < 0) {
      angles += 360;
  }
  
  if(angles > 0)
    return 360 - angles;

  return 0
};

// normalize a given vector
Vector.prototype.normalize = function(){
	return new Vector(this.x/(Math.sqrt(this.x * this.x + this.y * this.y)), this.y/(Math.sqrt(this.x * this.x + this.y * this.y)));
};

// get the magnitude of the vector
Vector.prototype.getMagnitude = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y);
};


const getDirectionOfAsteroid = (row, col, startRow, startCol, data) => {
    if(row < 0 || col < 0 || row >= data.length || col >= data[0].length) {
        return null
    }
    
    if(data[row][col] == '#') {
        
        let v = new Vector(col - startCol, startRow - row).calcAngleDegrees()
        return v;
    }
    else {
        return null;
    }
}

const getDirectionAndDistanceOfAsteroid = (row, col, startRow, startCol, data) => {
    if(row < 0 || col < 0 || row >= data.length || col >= data[0].length) {
        return null
    }
    
    if(data[row][col] == '#') {
        
        let v = new Vector(col - startCol, startRow - row);
        return {direction: v.getDirection(), distance:v.getMagnitude()};
    }
    else {
        return null;
    }
}

const countVisibleAsteroids = (row, col, data ) => {
    let count = 0;
    // go in spiral through the data, starting on pos x, y
    
    const maxRounds = Math.max(row, col, (data.length - 1) - row, (data[0].length - 1) - col);
    
    let normalizedDirections = new Set();
    
    // Go in circles aroung the row, col position
    for(let round = 1; round <= maxRounds; round++) {
        
        const pos = {row: row - round, col: col }
        let d = getDirectionOfAsteroid(pos.row, pos.col, row, col, data)
        if(d != null) {
            normalizedDirections.add(d)
        }
        
        // move right
        for(let i = 0; i < round; ++i) {
            pos.col++
            d = getDirectionOfAsteroid(pos.row, pos.col, row, col, data)
            if(d != null) {
                normalizedDirections.add(d)
            }
        }
        
        // move down
        for(let i = 0; i < round * 2; ++i) {
            pos.row++
            d = getDirectionOfAsteroid(pos.row, pos.col, row, col, data)
            if(d != null) {
                normalizedDirections.add(d)
            }
        }
        
        // move left
        for(let i = 0; i < round * 2; ++i) {
            pos.col--;
            d = getDirectionOfAsteroid(pos.row, pos.col, row, col, data)
            if(d != null) {
                normalizedDirections.add(d)
            }
        }
        
        // move up
        for(let i = 0; i < round * 2; ++i) {
            pos.row--
            d = getDirectionOfAsteroid(pos.row, pos.col, row, col, data)
            if(d != null) {
                normalizedDirections.add(d)
            }
        }
        
        // move back just to start pos
        for(let i = 0; i < round -1; ++i) {
            pos.col++
            d = getDirectionOfAsteroid(pos.row, pos.col, row, col, data)
            if(d != null) {
                normalizedDirections.add(d)
            }
        }
    }
    return normalizedDirections.size
}

const getOrderOfDestruction = (startRow, startCol, data ) => {
    let count = 0;
   
    let dm = new Map()
   
    for(let row = 0; row < data.length; row++) {
        for (let col = 0; col < data[row].length; col++) {
            if(data[row][col] == "." || (startRow == row && startCol == col)) {
                continue;
            }
            
            if(data[row][col] == '#') {
                let v = new Vector(col - startCol, startRow - row);
                if(dm.has(v.calcAngleDegrees())) {
                    dm.get(v.calcAngleDegrees()).push({row: row, col: col, mag: v.getMagnitude()})
                    dm.get(v.calcAngleDegrees()).sort(function(a,b) { return a.mag - b.mag})
                }
                else {
                    dm.set(v.calcAngleDegrees(),[{row: row, col: col, mag: v.getMagnitude()}])
                
                }
            }
        }
    }
    
    return dm;

}

const easy = (test) => {
    let data = common.readToArray('./10/data')
    data = data.map(x => x.split(''))
    
    let result = {
        row: 0,
        col: 0,
        count: 0
    }
    
    for(let row = 0; row < data.length; row++) {
        for (let col = 0; col < data[row].length; col++) {
            if(data[row][col] == ".") {
                continue;
            }
            
            if(data[row][col] == '#') {
                let count = countVisibleAsteroids(row, col, data);
                if(count > result.count) {
                    result.row = row;
                    result.col = col;
                    result.count = count;
                }
            }
        }
    }
    
    return result;
}
    


const hard = (test) => {
    let data = common.readToArray('./10/data')
    data = data.map(x => x.split(''))
    
    let easyRes = easy(1)
 
    let m = getOrderOfDestruction(easyRes.row, easyRes.col, data)

    var arr = [...m.entries()].sort(function(a,b) { return a[0] - b[0]});
    console.log(new Map([...m.entries()].sort(function(a,b) { return a[0] - b[0]})));
    
    console.log((new Vector(-1, 0)).calcAngleDegrees())
    let c = 0;

    while(c < 200) {
        for(let i = 0; i < arr.length; ++i) {
            let el = arr[i][1].shift()
            if(c == 199) {
                console.log("Result is ", el.col * 100 + el.row)
                return el
            }
            else {
                if(arr[i][1].length == 0) {
                    arr.splice(i, 1)
                    --i;
                }
            }
            ++c;
        }
    }
    
    
}

exports.easy = easy;
exports.hard = hard;
