import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Task from 'src/entity/tasks.entity';
import { Repository } from 'typeorm';
import { CreateTasksDto } from "../dto/create-tasks.dto";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getAll(boardId: string): Promise<Task[]> {
    return await this.tasksRepository.find({boardId});
  }

  async create(boardId: string, dto: CreateTasksDto): Promise<Task> {
    const task = await this.tasksRepository.create({...dto, boardId});
    return await this.tasksRepository.save(task)
  }

  async get(boardId: string, id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({id, boardId});
    if(!task) {
      throw new NotFoundException('Task Not Found')
    }
    return task
  }

  async update(boardId: string, id: string, dto: CreateTasksDto): Promise<Task> {
    const task = await this.tasksRepository.findOne({id, boardId})
    const taskUpdate = await this.tasksRepository.save({...task, ...dto})
    if(!taskUpdate) {
      throw new NotFoundException('Task Not Found')
    }
    return taskUpdate
  }

  async remove(boardId: string, id: string): Promise<void> {
    const task = await this.tasksRepository.findOne({id, boardId});
    if(!task) {
      throw new NotFoundException('Task Not Found')
    }
    await this.tasksRepository.delete({id, boardId});
  }

  async deleteUserFromTask(userId: string): Promise<void> {
    const task = await this.tasksRepository.find({userId})
    if(!task) {
      throw new NotFoundException('Task Not Found')
    }
    const taskNull = task.map(user => {
      if(user.userId === userId) {
        user.userId = null
        return user
      }
      return user
    })
    await this.tasksRepository.save(taskNull)
  }

  async deleteTasksFromBoard(boardId: string): Promise<void> {
    const task = await this.tasksRepository.find({boardId});
    if(!task) {
      throw new NotFoundException('Task Not Found')
    }
    await this.tasksRepository.delete({boardId});
  }
}