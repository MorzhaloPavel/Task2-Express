import {Entity, PrimaryColumn, Column, ManyToOne,  } from "typeorm";
import Board from "./boards.model";

@Entity({name: 'columns'})
export default class Columns {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @ManyToOne(() => Board, board => board.columns)
    board: Board;
}
