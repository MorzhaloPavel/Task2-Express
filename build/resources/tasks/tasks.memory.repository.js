import { memoryDb } from '../../memoryDb/memoryDb.js';
let { tasks } = memoryDb;
const getAll = async (boardId) => tasks.filter((task) => task.boardId === boardId);
const get = async (boardId, taskId) => tasks.find((task) => task.id === taskId && task.boardId === boardId);
const create = async (task) => {
    if (!task.boardId)
        return undefined;
    tasks.push(task);
    return get(task.boardId, task.id);
};
const update = async (boardId, taskId, taskData) => {
    const index = tasks.findIndex((task) => task.id === taskId && task.boardId === boardId);
    if (index === -1)
        return null;
    tasks[index] = { ...tasks[index], ...taskData, id: taskId };
    return get(boardId, taskId);
};
const remove = async (boardId, taskId) => {
    const index = tasks.findIndex((task) => task.id === taskId && task.boardId === boardId);
    if (index === -1)
        return false;
    return !!tasks.splice(index, 1).length;
};
const deleteUserFromTask = async (userId) => {
    try {
        tasks.forEach((task) => {
            const locTask = task;
            if (locTask.userId === userId) {
                locTask.userId = null;
            }
        });
        return true;
    }
    catch (e) {
        return false;
    }
};
const deleteTasksFromBoard = async (boardId) => {
    try {
        tasks = tasks.filter((task) => task.boardId !== boardId);
        return true;
    }
    catch (e) {
        return false;
    }
};
export { getAll, get, create, update, remove, deleteTasksFromBoard, deleteUserFromTask, };
