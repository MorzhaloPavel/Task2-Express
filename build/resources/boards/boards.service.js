import * as boardRepo from './boards.memory.repository.js';
import * as tasksService from '../tasks/tasks.service.js';
const getAll = () => boardRepo.getAll();
const get = (id) => boardRepo.get(id);
const create = (board) => boardRepo.create(board);
const update = (id, board) => boardRepo.update(id, board);
const remove = (id) => Promise.all([tasksService.deleteAllTasksFromBoard(id), boardRepo.remove(id)]);
export { getAll, get, create, update, remove };
