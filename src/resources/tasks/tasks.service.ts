import { ITask } from '../../utils/types';
import * as taskRepo from './tasks.memory.repository';

const getAll = (boardId: string): Promise<ITask[]> => taskRepo.getAll(boardId);

const get = (boardId: string, taskId: string): Promise<ITask> =>
  taskRepo.get(boardId, taskId);

const create = (task: ITask, boardId: string): Promise<ITask | undefined> =>
  taskRepo.create(task, boardId);

const update = (boardId: string, taskId: string, taskData: ITask): Promise<ITask | null | undefined> =>
  taskRepo.update(boardId, taskId, taskData);

const remove = (boardId: string, taskId: string): Promise<boolean> =>
  taskRepo.remove(boardId, taskId);

const deleteAllTasksFromBoard = (boardId: string): Promise<boolean> =>
  taskRepo.deleteTasksFromBoard(boardId);

const deleteUserFromTask = (userId: string): Promise<boolean> =>
  taskRepo.deleteUserFromTask(userId);

export {
  getAll,
  get,
  create,
  update,
  remove,
  deleteAllTasksFromBoard,
  deleteUserFromTask,
};
