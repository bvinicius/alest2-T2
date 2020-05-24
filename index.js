const fs = require('fs');
const Queue = require('./Queue');

const _case = "casof.txt"
const maze = fs.readFileSync(`./casos/${_case}`).toString()
    .split('\n')
    .filter(e => e)
    .map(e => e.split(''))

const timestart = process.hrtime()

const start = {
    value: 'A',
    coords: coords(maze, 'A'),
    dist: 0
}

console.log(getTarget(maze, start, 'B'))

const timeend = process.hrtime(timestart)
console.log(`${_case}: ${timeend} sec.`)

function getTarget(matrix, start, target) {
    let q = new Queue()
    q.push(start)

    let count = 0
    while(q.size()) {
        const u = q.remove()
        if (u.value == target) {
            return u.dist
        }

        neighbors(matrix, u).forEach(e => {
            q.push(e)
            mark(matrix, e.coords)
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

function mark(matrix, coords) { 
    const i = coords[0]
    const j = coords[1]

    matrix[i][j] = 'x'
}