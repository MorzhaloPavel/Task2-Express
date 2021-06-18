import {Entity, PrimaryColumn, Column, } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { IColumn } from '../../types';

@Entity({name: 'columns'})
export default class Colum {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  constructor({ id = uuidv4(), title = 'Column', order = 0 } = {} as IColumn) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}
