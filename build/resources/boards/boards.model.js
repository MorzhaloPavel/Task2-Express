import { v4 as uuidv4 } from 'uuid';
import Column from './column.model.js';
export class Board {
    constructor({ id = uuidv4(), title = 'Board', columns = null } = {}) {
        this.id = id;
        this.title = title;
        this.columns = Board.createColumns(columns);
    }
    static createColumns(columns) {
        if (Array.isArray(columns)) {
            return columns.map((col) => new Column({ ...col }));
        }
        return [new Column()];
    }
}
