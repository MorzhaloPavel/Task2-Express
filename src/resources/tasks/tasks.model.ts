import {Entity, PrimaryColumn, Column} from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { ITask } from '../../types';

@Entity({name: 'tasks'})
export default class Task {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column()
  description: string;

  @Column({nullable: true})
  userId: string | null;

  @Column()
  boardId: string | null;

  @Column({nullable: true})
  columnId: string | null;

  constructor(
    {
      id = uuidv4(),
      title = 'Task',
      description = 'Description',
      order = 0,
      userId = '',
      boardId = '',
      columnId = '',
    } = {} as ITask
  ) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task: Task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}
