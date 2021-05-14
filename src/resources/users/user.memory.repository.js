const User = require('./user.model')

let DB = [
  new User({ id:'1', name: 'Test', login: 'test', password: 'test'}),
  new User({name: 'Admin', login: 'admin', password: 'admin'}),
  new User({name: 'Test12', login: 'test12', password: 'test12'}),
]

const getAll = () => DB;

const get = async id => {
  const user = await DB.filter(us => us.id === id)
  if (!user) {
    console.log('Error');
  }
  console.log(user[0]);
  return user[0]
}

const save = async user => {
  DB = [...DB, user]
  return user
}

const remove = async id => {
  DB = await DB.filter(us => us.id !== id)
}



const update = async (id, user) => {
  const newList = DB.map(o => {
    if (o.id === id) {
      return {id, ...user};
    }
    return o
  })
  
  DB = newList
  return get(id)
}

module.exports = { getAll, get, save, remove, update };
