const { v4: uuidv4 } = require('uuid');

class Сolumn {
  id: string
  title: string
  order: number

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