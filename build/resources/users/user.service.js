import * as usersRepo from './user.memory.repository.js';
import * as tasksService from '../tasks/tasks.service.js';
const getAll = () => usersRepo.getAll();
const get = (id) => usersRepo.get(id);
const create = (user) => usersRepo.create(user);
const update = (id, userData) => usersRepo.update(id, userData);
const remove = (id) => Promise.all([usersRepo.remove(id), tasksService.deleteUserFromTask(id)]);
export { getAll, create, get, update, remove };
