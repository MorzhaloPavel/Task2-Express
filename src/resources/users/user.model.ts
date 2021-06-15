import { v4 as uuidv4 } from 'uuid';
import {Entity, PrimaryColumn, Column} from "typeorm";
import { IUser } from '../../types';

@Entity({name: 'user'})
export default class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string | undefined;

  constructor({ id = uuidv4(), login, name, password } = {} as IUser) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: IUser): IUser {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
