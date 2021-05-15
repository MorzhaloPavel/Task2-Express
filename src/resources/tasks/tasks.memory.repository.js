const Task = require('./tasks.model')

let DB = [
  new Task({title: '111111', order: 1, description: 'text111', userId: 'userId', boardId: 'boardId', columnId: 'columnId'}),
  new Task({title: '222222', order: 2, description: 'text222', userId: 'userId', boardId: 'boardId', columnId: 'columnId'}),
  new Task({title: '333333', order: 3, description: 'text333', userId: 'userId', boardId: 'boardId', columnId: 'columnId'}),
]

const getAll = () => DB;

const get = async id => {
  const task = await DB.filter(ts => ts.id === id)
  return task[0]
}

const save = async task => {
  DB = [...DB, task]
  return task
}

const remove = async id => {
  DB = await DB.filter(ts => ts.id !== id)
}

const update = async (id, task) => {
  const newList = DB.map(o => {
    if (o.id === id) {
      return {id, ...task};
    }
    return o
  })
  DB = newList
  return get(id)
}

module.exports = { getAll, get, save, remove, update };
