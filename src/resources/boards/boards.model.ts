export {}
const { v4: uuidv4 } = require('uuid');
const Сolumns = require('./column.model.ts')

function createColumn(option: typeof Сolumns[]) {
  const columns = []
  for(let i=0; i < option.length; i +=1) {
    columns.push(new Сolumns(option[i]))
  }
  return columns
}

class Board {
  id: string

  title: string

  columns: typeof Сolumns[]

  constructor({
    id = uuidv4(),
    title = 'BOARD',
    columns = []
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = createColumn(columns)
  }
}

module.exports = Board;
