class Queue {
    constructor() {
        this._elements = []
    }

    push(value) {
        this._elements.push(value)
    }

    remove() {
        return this._elements.splice(0, 1)[0]
    }

    size() {
        return this._elements.length
    }
}

module.exports = Queue