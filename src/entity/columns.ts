import {Entity, PrimaryGeneratedColumn, Column, ManyToOne,  } from "typeorm";
import Board from "./boards";

@Entity({name: 'columns'})
export default class Columns {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @ManyToOne(() => Board, board => board.columns, {onDelete: 'CASCADE'})
    board: Board;
}
