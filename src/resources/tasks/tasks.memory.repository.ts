import {getManager} from "typeorm";
import { ITask } from '../../types';
import ApiErroe from '../../utils/ApiErroe';
import Task from '../../entity/tasks'

const getAll = async (board: string): Promise<ITask[]> =>{
  const taskRepository = getManager().getRepository(Task);
  const tasks = await taskRepository.find({boardId: board})
  if(!tasks){
    throw ApiErroe.badRequest("Not Found!");
  }
  return tasks
}

const get = async (board: string, taskId: string): Promise<ITask> => {
  const taskRepository = getManager().getRepository(Task);
  const task = await taskRepository.findOne({id: taskId, boardId: board})
  if(!task){
    throw ApiErroe.badRequest("Not Found!");
  }
  return task
}

const create = async (task: ITask, boardId: string): Promise<ITask | undefined> => {
  const taskRepository = getManager().getRepository(Task);
  const taskCreate = await taskRepository.create({...task, boardId})
  const newTask = await taskRepository.save(taskCreate);
  if(!newTask){
    throw ApiErroe.badRequest("Not Found!");
  }
  return newTask
};

const update = async (
  board: string,
  taskId: string,
  taskData: ITask
): Promise<ITask | null | undefined> => {
  const taskRepository = getManager().getRepository(Task);
  let task = await taskRepository.findOne({id: taskId, boardId: board})
  task = {...task, ...taskData}
  const taskUpdate = await taskRepository.save(task);
  if(!taskUpdate){
    throw ApiErroe.badRequest("Not Found!");
  }
  return taskUpdate;
};

const remove = async (board: string, taskId: string): Promise<boolean> => {
  const taskRepository = getManager().getRepository(Task);
  const taskRemove = await taskRepository.delete({id: taskId, boardId: board})
  if(!taskRemove){
    throw ApiErroe.badRequest("Not Found!");
  }
  return !!taskRemove
};

const deleteUserFromTask = async (userI: string): Promise<boolean> => {
  const taskRepository = getManager().getRepository(Task);
  const task = await taskRepository.find({userId: userI})
  const taskNull = task.map(user => {
    if(user.userId === userI) {
      user.userId = null
      return user
    }
    return user
  })
  const taskUpdate = await taskRepository.save(taskNull);
  if(!taskUpdate){
    throw ApiErroe.badRequest("Not Found!");
  }
  return !!taskUpdate
};

const deleteTasksFromBoard = async (board: string): Promise<boolean> => {
  const taskRepository = getManager().getRepository(Task);
  const taskBoardDelete = await taskRepository.delete({boardId: board})
  if(!taskBoardDelete){
    throw ApiErroe.badRequest("Not Found!");
  }
  return !!taskBoardDelete
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
