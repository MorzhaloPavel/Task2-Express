import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({name: 'column'})
export class Colum {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  order: number
}