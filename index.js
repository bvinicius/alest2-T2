const fs = require('fs');

const content = fs.readFileSync('./casos/caso0.txt').toString()
const matrix = content.split('\n').filter(e => e).map(e => e.split(''))



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