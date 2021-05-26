"use strict";
const { v4: uuidv4 } = require('uuid');
class Сolumn {
    /**
     * Create a Сolumn
     * @param {string} id The Сolumn's generated by id (uuidv4())
     * @param {string} title The Сolumn's title
     * @param {number} order The Сolumn's order
     */
    constructor({ id = uuidv4(), title = 'BOARD', order = 0 } = {}) {
        this.id = id;
        this.title = title;
        this.order = order;
    }
}
module.exports = Сolumn;
