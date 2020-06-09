const fs = require('fs');
const Queue = require('./Queue');

class Maze {
    /**
     * Generates a new instance of Maze with the data that is stored in `filepath`.
     * @param {*} filepath the path of the file containing the Maze data.
     */
    constructor(filepath, start) {
        const s = process.hrtime()
        this.matrix = fs.readFileSync(filepath).toString()
            .split('\n')
            .filter(e => e)
            .map(e => e.split(''))
        
    }

    /**
     * Returns the distance of the sortest path from `start` to `target`. If the values of `start` and `target` appear more than once on the maze matrix,
     * the first matches found will be used.
     * @param {*} start the value of the element to start on.
     * @param {*} target the value of the element to get to.
     */
    shortestDistance(start, target) {
        let distance
        const _start = {
            value: start,
            coords: this.coords(start),
            dist: 0
        }

        let q = new Queue()

        q.push(_start)
        const s = process.hrtime()

        let go = true
        while(go) {
            const u = q.remove()

            this.neighbors(u).forEach((e) => {
                const i = e[0]
                const j = e[1]
                if (this.matrix[i][j] == target) {
                    distance = u.dist + 1
                    go = false
                } 

                const v = {
                    value: '.',
                    coords: [i, j],
                    dist: u.dist + 1
                }

                q.push(v)
                this.mark(v)
            })
        }
        return distance
    }

    /**
     * Returns the fist pair of coordinates of the maze matrix that matches the value of `target`.
     * Not recommended to search for '.' or '#', as it will return the fist value found.
     * @param {*} matrix the matrix to be searched on.
     * @param {*} target the target to be searched.
     */
    coords(target) {
        const time0 = process.hrtime()
        for (let i = 0; i < this.matrix.length; i ++) {
            for(let j = 0; j < this.matrix[i].length; j ++) {
                if (this.matrix[i][j] == target) {
                    return [i, j]
                }
            }
        }
    }

    /**
     * Returns an array of unmarked neighbors of a given `element`. `element` must have a `coords` property: an array of numbers between the matrix bounds.
     * Ex: `bounds: [i, j]` will return the neighbors of the element `matrix[i][j]`.
     * @param {*} element the element whose neighbors are being returned.
     */
    neighbors(element) {
        const i = element.coords[0]
        const j = element.coords[1]

        const up = {
            value: (this.matrix[i - 1] && this.matrix[i - 1][j]) || '#',
            coords: [i - 1, j],
            dist: element.dist + 1
        }

        const down = {
            value: (this.matrix[i + 1] && this.matrix[i + 1][j]) || '#',
            coords: [i + 1, j],
            dist: element.dist + 1
        }

        const left = {
            value: this.matrix[i][j - 1] || '#',
            coords: [i, j - 1],
            dist: element.dist + 1
        }

        const right = {
            value: this.matrix[i][j + 1] || '#',
            coords: [i, j + 1],
            dist: element.dist + 1
        }

        return [up, down, left, right].filter(e => e).filter(e => (e.value != 'x' && e.value != '#' )).map(e => e.coords)
    }

    /**
     * Marks an `element` of the Maze matrix with the value of `x`.
     * @param {*} element the element to be marked.
     */
    mark(element) { 
        const i = element.coords[0]
        const j = element.coords[1]

        this.matrix[i][j] = 'x'
    }

}

module.exports = Maze