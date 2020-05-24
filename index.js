const fs = require('fs');
const Queue = require('./Queue');

const maze = fs.readFileSync('./casos/caso0.txt').toString()
    .split('\n')
    .filter(e => e)
    .map(e => e.split(''))

const start = {
    value: 'A',
    coords: coords(maze, 'A')
}

console.log(getTarget(maze, start, 'B'))
console.log(maze.join('\n').split(',').join(''))

function getTarget(matrix, start, target) {
    let q = new Queue()
    q.push(start)

    let count = 0
    while(q.size()) {
        const u = q.remove()

        const _neighbors = neighbors(matrix, u.coords)

        for(let i = 0; i < _neighbors.length; i ++) {
            const e = _neighbors[i]

            if (e.value == target) {
                console.log('ACHOU O TARGET.')
                return count
            }

            mark(matrix, e.coords)
            q.push(e)
        }
        count ++
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

function neighbors(matrix, coords) {
    const i = coords[0]
    const j = coords[1]

    const up = {
        value: (matrix[i - 1] && matrix[i - 1][j]) || '#',
        coords: [i - 1, j]
    }

    const down = {
        value: (matrix[i + 1] && matrix[i + 1][j]) || '#',
        coords: [i + 1, j]
    }

    const left = {
        value: matrix[i][j - 1] || '#',
        coords: [i, j - 1]
    }

    const right = {
        value: matrix[i][j + 1] || '#',
        coords: [i, j + 1]
    }

    // console.log(up, down, left, right)

    return [up, down, left, right].filter(e => e).filter(e => (e.value != 'x' && e.value != '#' ))
}

function mark(matrix, coords) { 
    const i = coords[0]
    const j = coords[1]

    matrix[i][j] = 'x'

    // console.log(matrix)
}

