import {Entity, PrimaryColumn, Column} from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { IColumn, IBoard } from '../../types';
import Colum from './colum.model';

@Entity({name: 'board'})
export default class Board {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  columns: IColumn[] | null;

  constructor(
    { id = uuidv4(), title = 'Board', columns = null } = {} as IBoard
  ) {
    this.id = id;
    this.title = title;
    this.columns = Board.createColumns(columns);
  }

  static createColumns(columns: IColumn[] | null): IColumn[] {
    if (Array.isArray(columns)) {
      return columns.map((col: IColumn) => new Colum({ ...col }));
    }
    return [new Colum()];
  }
}
