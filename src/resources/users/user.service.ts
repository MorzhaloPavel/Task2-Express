export {}
const usersRepo = require('./user.memory.repository.ts');

const getAll = (): Promise<object> => usersRepo.getAll();

const get = (id: string): Promise<object> => usersRepo.get(id);

const save = (user: object): Promise<object> => usersRepo.save(user)

const update = (id: string, user: object): Promise<object> => usersRepo.update(id, user)

const remove = (id: string): Promise<object> => usersRepo.remove(id)

module.exports = { getAll, get, remove, save, update};
