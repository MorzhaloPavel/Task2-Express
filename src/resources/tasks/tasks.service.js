const tasksRepo = require('./tasks.memory.repository');
const Task = require('./tasks.model')

const getAll = () => tasksRepo.getAll();

const get = id => tasksRepo.get(id);

const remove = id => tasksRepo.remove(id)

const save = task => tasksRepo.save(new Task(task))

const update = (id, task) => tasksRepo.update(id, task)

module.exports = { getAll, get, remove, save, update};
