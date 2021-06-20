import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({name: 'tasks'})
export default class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column()
  description: string;

  @Column({nullable: true})
  userId: string | null;

  @Column({nullable: true})
  boardId: string | null;

  @Column({nullable: true})
  columnId: string | null;
}
