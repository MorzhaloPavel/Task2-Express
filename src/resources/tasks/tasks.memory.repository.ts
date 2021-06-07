import { memoryDb } from '../../memoryDb/memoryDb';
import { ITask } from '../../types';
import ErrorNotFound from '../../utils/ErrorNotFound';

let { tasks } = memoryDb;

const getAll = async (boardId: string): Promise<ITask[]> =>
  tasks.filter((task) => task.boardId === boardId);

const get = async (boardId: string, taskId: string): Promise<ITask> => {
  
  const task = await tasks.find(ts => ts.boardId === boardId && ts.id === taskId)
  if(!task){
    throw new ErrorNotFound("Not Found!");
  }
  return task
}

const create = async (task: ITask): Promise<ITask | undefined> => {
  if (!task.boardId) return undefined;

  tasks.push(task);
  return get(task.boardId, task.id);
};

const update = async (
  boardId: string,
  taskId: string,
  taskData: ITask
): Promise<ITask | null | undefined> => {
  const index = tasks.findIndex(
    (task) => task.id === taskId && task.boardId === boardId
  );

  if (index === -1) return null;
  tasks[index] = { ...tasks[index], ...taskData, id: taskId };
  return get(boardId, taskId);
};

const remove = async (boardId: string, taskId: string): Promise<boolean> => {
  const index = tasks.findIndex(
    (task) => task.id === taskId && task.boardId === boardId
  );
  if (index === -1) return false;

  return !!tasks.splice(index, 1).length;
};

const deleteUserFromTask = async (userId: string): Promise<boolean> => {
  try {
    tasks.forEach((task) => {
      const locTask = task;
      if (locTask.userId === userId) {
        locTask.userId = null;
      }
    });
    return true;
  } catch (e) {
    return false;
  }
};

const deleteTasksFromBoard = async (boardId: string): Promise<boolean> => {
  try {
    tasks = tasks.filter((task) => task.boardId !== boardId);
    return true;
  } catch (e) {
    return false;
  }
};

export {
  getAll,
  get,
  create,
  update,
  remove,
  deleteTasksFromBoard,
  deleteUserFromTask,
};
