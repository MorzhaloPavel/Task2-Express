import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from "bcrypt";
import { Repository } from 'typeorm';
import  User  from '../../entity/user.entity';
import { CreateUsersDto } from '../dto/create-users.dto';
import { TasksService } from '../tasks/tasks.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private tasksService: TasksService
  ) {}

  async getAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async create(dto: CreateUsersDto): Promise<User> {
    const user = await this.usersRepository.create({
      name: dto.name,
      login: dto.login,
      password: bcrypt.hashSync(dto.password, 8)})
    return await this.usersRepository.save(user)
  }

  async get(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if(!user) {
        throw new NotFoundException('User Not Found')
    }
    return user
  }

  async update(id: string, dto: CreateUsersDto) {
    const user = await this.usersRepository.findOne(id)
    const userUpdate = await this.usersRepository.save({
      ...user,
      name: dto.name,
      login: dto.login,
      password: bcrypt.hashSync(dto.password, 8)
    })
    if(!userUpdate) {
      throw new NotFoundException('User Not Found')
    }
    return userUpdate
  }

  async remove(id: string): Promise<void> {
    const user = await this.usersRepository.findOne(id);
    if(!user) {
      throw new NotFoundException()
    }
    await this.tasksService.deleteUserFromTask(id)
    await this.usersRepository.delete(id);
  }

  async getUserByLogin(login: string): Promise<User> {
    return await this.usersRepository.findOne({login});
  }
}