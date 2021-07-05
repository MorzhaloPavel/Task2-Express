import {Entity, PrimaryGeneratedColumn, Column, OneToMany, } from "typeorm";
import Columns from './columns';

@Entity({name: 'boards'})
export default class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => Columns, column => column.board, {nullable: true})
    columns: Columns[];
}
