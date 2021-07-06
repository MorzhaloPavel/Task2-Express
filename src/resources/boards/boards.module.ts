// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { BoardsService } from './boards.service';
// import { BoardsController } from './boards.controller';
// import Board from '../../entity/boards.entity';
// import Columns from 'src/entity/columns.entity';
// import { TasksModule } from '../tasks/tasks.module';
// import { LoginModule } from '../login/login.module';
// import { UsersModule } from '../users/users.module';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([Board]),
//     TypeOrmModule.forFeature([Columns]),
//     TasksModule,
//     LoginModule,
//     UsersModule
//   ],
//   providers: [BoardsService],
//   controllers: [BoardsController],
// })
// export class BoardsModule {}