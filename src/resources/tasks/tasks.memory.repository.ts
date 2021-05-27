export {}
const Task = require('./tasks.model.ts')

let DBTasks: typeof Task[] = []

/**
 * Get all tasks with DBTasks by boardId
 * @async
 * @param {string} boardId The task boardId
 * @returns {Promise<object>} Array of objects(task)
 */
const getAll = async (boardId: string): Promise<object> => DBTasks.filter(all => all.boardId === boardId);

/**
 * Get by id task with DBTasks by boardId
 * @async
 * @param {string} boardId The task boardId
 * @param {string} id The task id
 * @returns {Promise<object>} The task
 */
const get = async (boardId: string, id: string): Promise<object> => {
  const task = await DBTasks.find(ts => ts.boardId === boardId && ts.id === id)
  return task!
}

/**
 * Add new task in DBTasks by boardId
 * @async
 * @param {string} boardId The task boardId
 * @param {Object} task The task object
 * @returns {Promise<Object>} The new task
 */
const save = async (boardId: string, task: object): Promise<object> => {
  const newTask = new Task({...task, boardId})
  DBTasks = [...DBTasks, newTask]
  return newTask
}

/**
 * Update by id task in DBTasks by boardId
 * @async
 * @param {string} boardId The task boardId
 * @param {string} id The task id
 * @param {Object} taskUp The new date task
 * @returns {Promise<Object>} The update task
 */
const update = async (boardId: string, id: string, taskUp: object): Promise<object> => {
  DBTasks = DBTasks.map(task => {
    if (task.id === id && task.boardId === boardId) {
      return {id, ...taskUp};
    }
    return task
  })
  return get(boardId, id)
}

/**
 * Remove by id task in DBTasks by boardId
 * @async
 * @param {string} boardId The task boardId
 * @param {string} id The task id
 */
const remove = async (boardId: string, id: string): Promise<object> => {
  const delTask = get(boardId, id)
  DBTasks = await DBTasks.filter(ts => ts.id !== id && ts.boardId === boardId)
  return delTask
}

/**
 * Remove task in DBTasks by boardId
 * @async
 * @param {string} boardId The task boardId
 */
const removeTasksBoard = async (boardId: string) => {
  DBTasks = await DBTasks.filter(ts => ts.boardId !== boardId)
}

/**
 * Assignment tasks in DBTasks userId = null
 * @async
 * @param {string} userId The task boardId
 */
const AssignmentUserTasks = async (userId: string): Promise<void> => {
  DBTasks = DBTasks.map(obj => {
    if (obj.userId === userId) {
      return {...obj, userId: null};
    }
    return obj
  })
}

module.exports = { getAll, get, save, remove, update, removeTasksBoard, AssignmentUserTasks };
