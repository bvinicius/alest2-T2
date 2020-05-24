const fs = require('fs');

class Node {
    constructor(value) {
        this.value = value
    }

    mark() {
        this.marked = true
    }

    get value() {
        return this.value
    }
    get neighbors() {
        return this.neighbors
    }

    get marked() {
        return this.marked
    }
}

class Maze {
    constructor(file) {
        this.elements = fs.readFileSync(file).toString()
            .split('\n')
            .filter(e => e)
            .map(e => e.split(''))

        console.log(this.elements)
    }
}

module.exports = Maze