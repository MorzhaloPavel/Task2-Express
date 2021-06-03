export {}
const { v4: uuidv4 } = require('uuid');

class Task {
  id: string

  title?: string

  order?: number

  description?: string

  userId?: string | null

  boardId?: string

  columnId?: string

  constructor({
    id = uuidv4(),
    title = 'TASK',
    order = 0,
    description = "TASK",
    userId = 'userId',
    boardId = 'boardId',
    columnId = 'columnId'
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task: Task): Task {
    const {id, title, order, description, userId, boardId, columnId} = task
    return {id, title, order, description, userId, boardId, columnId}
  }
}
module.exports = Task;
