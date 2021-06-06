import { v4 as uuidv4 } from 'uuid';
export default class Column {
    constructor({ id = uuidv4(), title = 'Column', order = 0 } = {}) {
        this.id = id;
        this.title = title;
        this.order = order;
    }
}
