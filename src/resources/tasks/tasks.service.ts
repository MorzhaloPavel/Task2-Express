export {}
const tasksRepo = require('./tasks.memory.repository.ts');

const getAll = (boardId: string): Promise<object> => tasksRepo.getAll(boardId);

const get = (boardId: string, id: string): Promise<object> => tasksRepo.get(boardId, id);

const save = (boardId: string, task: object): Promise<object> => tasksRepo.save(boardId, task)

const update = (boardId: string, id: string, task: object): Promise<object> => tasksRepo.update(boardId, id, task)

const remove = (boardId: string, id: string): Promise<object> => tasksRepo.remove(boardId, id)

module.exports = { getAll, get, remove, save, update};
