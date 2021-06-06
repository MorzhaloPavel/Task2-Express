import * as taskRepo from './tasks.memory.repository.js';
const getAll = (boardId) => taskRepo.getAll(boardId);
const get = (boardId, taskId) => taskRepo.get(boardId, taskId);
const create = (taskData) => taskRepo.create(taskData);
const update = (boardId, taskId, taskData) => taskRepo.update(boardId, taskId, taskData);
const remove = (boardId, taskId) => taskRepo.remove(boardId, taskId);
const deleteAllTasksFromBoard = (boardId) => taskRepo.deleteTasksFromBoard(boardId);
const deleteUserFromTask = (userId) => taskRepo.deleteUserFromTask(userId);
export { getAll, get, create, update, remove, deleteAllTasksFromBoard, deleteUserFromTask, };
