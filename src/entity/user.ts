import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { IUser } from '../types';

@Entity({name: 'users'})
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string | undefined;
  
  static toResponse(user: IUser): IUser {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
