const fs = require('fs');
const Queue = require('./Queue');

const CASE_INDEX = "a"
const file = `./casos/caso${CASE_INDEX}.txt`
const maze = fs.readFileSync(file).toString()
    .split('\n')
    .filter(e => e)
    .map(e => e.split(''))


const startTime = process.hrtime()

console.log(shortestPath(maze, 'A', 'B'))

const endTime = process.hrtime(startTime)

console.log(`${CASE_INDEX}: ${endTime} sec.`)


/**
 * Returns the shortest path from `start` to `target`, both elements of `matrix`. If the values of `start` and `target` appear more than once on the matrix,
 * the first matches found will be used.
 * @param {*} matrix the matrix to search on.
 * @param {*} start the value of the element to start on.
 * @param {*} target the value of the element to get to.
 */
function shortestPath(matrix, start, target) {
    const _start = {
        value: start,
        coords: coords(matrix, start),
        dist: 0
    }
    
    let q = new Queue()

    q.push(_start)
    while(q.size()) {
        const u = q.remove()
        if (u.value == target) return u.dist

        neighbors(matrix, u).forEach(e => {
            q.push(e)
            mark(matrix, e)
        })
    }
}

/**
 * Returns the fist coordinates of the given `matrix` that match the value of `target`.
 * @param {*} matrix the matrix to be searched on.
 * @param {*} target the target to be searched.
 */
function coords(matrix, target) {
    for (let i = 0; i < matrix.length; i ++) {
        for(let j = 0; j < matrix[i].length; j ++) {
            if (matrix[i][j] == target) {
                return [i, j]
            }
        }
    }
}

/**
 * Returns an array of valid neighbors of a given `element`. `element` must have a `coords` property: an array of `numbers` between the matrix bounds. Ex: `bounds: [y, x]`
 * @param {*} matrix the matrix to search on.
 * @param {*} element the element whose neighbors are being returned.
 */
function neighbors(matrix, element) {
    const i = element.coords[0]
    const j = element.coords[1]

    const up = {
        value: (matrix[i - 1] && matrix[i - 1][j]) || '#',
        coords: [i - 1, j],
        dist: element.dist + 1
    }

    const down = {
        value: (matrix[i + 1] && matrix[i + 1][j]) || '#',
        coords: [i + 1, j],
        dist: element.dist + 1
    }

    const left = {
        value: matrix[i][j - 1] || '#',
        coords: [i, j - 1],
        dist: element.dist + 1
    }

    const right = {
        value: matrix[i][j + 1] || '#',
        coords: [i, j + 1],
        dist: element.dist + 1
    }

    return [up, down, left, right].filter(e => e).filter(e => (e.value != 'x' && e.value != '#' ))
}

/**
 * Given an `element`, this method gets it's coordinates and sets it's value to `x`.
 * @param {*} matrix the matrix to seach on.
 * @param {*} element the element to be marker.
 */
function mark(matrix, element) { 
    const i = element.coords[0]
    const j = element.coords[1]

    matrix[i][j] = 'x'
}