const { v4: uuidv4 } = require('uuid');


class Сolumn {
  constructor({
    id = uuidv4(),
    title = 'BOARD',
    order = 0
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order
  }
}

module.exports = Сolumn;