const { v4: uuidv4 } = require('uuid');

class User {
  /**
   * Create a User
   * @param {string} id The User's generated by id (uuidv4())
   * @param {string} name The User's full name
   * @param {string} login The User's login
   * @param {string} password The User's password
   */
  constructor({
    id = uuidv4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
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
