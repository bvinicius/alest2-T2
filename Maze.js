const fs = require('fs');

class Node {
    constructor(coords, value) {
        this._value = value
        this._coords = coords        
    }

    mark() {
        this._marked = true
    }

    get coords() {
        return this._coords
    }

    get value() {
        return this._value
    }

    get neighbors() {
        return this._neighbors
    }

    get marked() {
        return this._marked
    }

    set value(value) {
        this._value = value
    }
    
    set neighbors(neighbors) {
        this._neighbors = neighbors
    }

    set marked(bool) {
        this._marked = bool
    }
}

class Maze {
    constructor(file) {
        const matrix = fs.readFileSync(file).toString()
            .split('\n')
            .filter(e => e)
            .map(e => e.split(''))
        
        this._elements = []

        for(let i = 0; i < matrix.length; i ++) {
            for(let j = 0; j < matrix[i].length; j ++) {
                const node = new Node([i, j], matrix[i][j])
            }
        }
        
    }



    get elements() {
        return this._elements
    }
}

module.exports = Maze