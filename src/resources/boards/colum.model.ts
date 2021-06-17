import {Entity, PrimaryColumn, Column, } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { IColumn } from '../../types';
// import Board from "./boards.model";

@Entity({name: 'colum'})
export default class Colum {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  // @ManyToOne(() => Board, board => board.columns)
  //   board: Board;

  constructor({ id = uuidv4(), title = 'Column', order = 0 } = {} as IColumn) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}
