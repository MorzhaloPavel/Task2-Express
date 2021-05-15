const { v4: uuidv4 } = require('uuid');
const Сolumn = require('./column.model')


function createColumn(option) {
  const columns = []
  for(let i=0; i < option.length; i) {
    columns.push(new Сolumn(option[i]))
  }
  return columns
}


class Board {
  constructor({
    id = uuidv4(),
    title = 'BOARD',
    columns = []
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = createColumn(columns)
  }

  

  static toResponse(board) {
    const {id, title, columns} = board
    return {id, title, columns}
  }
}
module.exports = Board;
