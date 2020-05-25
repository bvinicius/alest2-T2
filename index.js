const Maze = require('./Maze')

const CASE_INDEX = "a"
const file = `./casos/caso${CASE_INDEX}.txt`

const startTime = process.hrtime()

const dist = new Maze(file).shortestDistance('A', 'B')

console.log(`DIST;TIME(sec)\n\n${dist};${process.hrtime(startTime)}`)
