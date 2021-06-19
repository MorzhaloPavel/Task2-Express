import {Entity, PrimaryGeneratedColumn, Column, OneToMany, } from "typeorm";
// import { v4 as uuidv4 } from 'uuid';
// import { IBoard } from '../../types';
import Columns from './columns.model';

@Entity({name: 'boards'})
export default class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => Columns, column => column)
    columns: Columns[];

  // constructor(
  //   { id = uuidv4(), title = 'Board', columns = null } = {} as IBoard
  // ) {
  //   this.id = id;
  //   this.title = title;
  //   this.columns = Board.createColumns(columns);
  // }

  // static createColumns(columns: Columns[] | null): Columns[] {
  //   if (Array.isArray(columns)) {
  //     return columns.map((col: Columns) => new Columns({ ...col }));
  //   }
  //   return [new Columns()];
  // }
}
