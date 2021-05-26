"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { v4: uuidv4 } = require('uuid');
class User {
    /**
     * Create class User
     * @param {Object} user Accept object {{id, name, login, password}}
     */
    constructor({ id = uuidv4(), name = 'USER', login = 'user', password = 'P@55w0rd' } = {}) {
        this.id = id;
        this.name = name;
        this.login = login;
        this.password = password;
    }
    /**
     * Static method User
     *
     * @param {Object} user Accept object {{id, name, login, password}}
     * @returns {Object} Return object {{id, name, login}}
     */
    static toResponse(user) {
        const { id, name, login } = user;
        return { id, name, login };
    }
}
module.exports = User;
