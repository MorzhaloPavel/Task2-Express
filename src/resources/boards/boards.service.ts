export {}
const boardsRepo = require('./boards.memory.repository.ts');

const getAll = (): Promise<object> => boardsRepo.getAll();

const get = (id: string): Promise<object> => boardsRepo.get(id);

const save = (board: object): Promise<object> => boardsRepo.save(board)

const update = (id: string, board: object): Promise<object> => boardsRepo.update(id, board)

const remove = (id: string): Promise<object> => boardsRepo.remove(id)

module.exports = { getAll, get, remove, save, update};
