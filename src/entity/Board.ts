import {Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column} from "typeorm";
import { Colum } from "./Column";
@Entity({name: 'board'})
export class Board {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @OneToOne(() => Colum)
  @JoinColumn()
  columns: Colum;
}