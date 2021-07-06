// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import Columns from 'src/entity/columns.entity';
// import { Repository } from 'typeorm';
// import  Board  from '../../entity/boards.entity';
// import { CreateBoardsDto } from "../dto/create-boards.dto";
// import { TasksService } from '../tasks/tasks.service';

// @Injectable()

// export class BoardsService {
//   constructor(
//     @InjectRepository(Board) private boardsRepository: Repository<Board>,
//     @InjectRepository(Columns) private columnsRepository: Repository<Columns>,
//     private tasksService: TasksService
//   ) {}

//   async getAll(): Promise<Board[]> {
//     return await this.boardsRepository.find({relations: ["columns"]});
//   }

//   async create(dto: CreateBoardsDto): Promise<Board> {
//     const boardCreate = await this.boardsRepository.create(dto)
//     const columnsCreate = await this.columnsRepository.create(dto.columns)
//     boardCreate.columns = columnsCreate
//     await this.columnsRepository.save(columnsCreate);
//     return await this.boardsRepository.save(boardCreate);
//   }

//   async get(id: string): Promise<Board> {
//     const board = await this.boardsRepository.findOne(id, {relations: ["columns"]});
//     if(!board) {
//       throw new NotFoundException('Board Not Found')
//     }
//     return board
//   }

//   async update(id: string, dto: CreateBoardsDto): Promise<Board> {
//     const board = await this.boardsRepository.findOne(id)
//     const boardUpdate = await this.boardsRepository.save({...board, ...dto})
//     if(!boardUpdate) {
//       throw new NotFoundException('Board Not Found')
//     }
//     return boardUpdate
//   }

//   async remove(id: string): Promise<void> {
//     const board = await this.boardsRepository.findOne(id);
//     if(!board) {
//       throw new NotFoundException('Board Not Found')
//     }
//     await this.tasksService.deleteTasksFromBoard(id)
//     await this.boardsRepository.delete(id);
//   }
// }