import { v4 as uuidv4 } from 'uuid';
export default class Task {
    constructor({ id = uuidv4(), title = 'Task', description = 'Description', order = 0, userId = null, boardId = null, columnId = null, } = {}) {
        this.id = id;
        this.title = title;
        this.order = order;
        this.description = description;
        this.userId = userId;
        this.boardId = boardId;
        this.columnId = columnId;
    }
}
