const Board = require('./boards.model')

let DB = [
  new Board({id: '1', title: '111111', columns: [{title:'11122211', order: 5}]}),
  new Board({title: '222222', columns: [{title:'2222222', order: 3}]})
]

const getAll = () => {
  console.log('3333333', DB);
  return DB
};

const get = async id => {
  const board = await DB.filter(bd => bd.id === id)
  return board[0]
}

const save = async board => {
  DB = [...DB, board]
  return board
}

const remove = async id => {
  console.log('111111', id);
  DB = await DB.filter(bd => bd.id !== id)
  console.log('2222222', DB);

}

const update = async (id, board) => {
  const newList = DB.map(o => {
    if (o.id === id) {
      return {id, ...board};
    }
    return o
  })
  
  DB = newList
  return get(id)
}

module.exports = { getAll, get, save, remove, update };
