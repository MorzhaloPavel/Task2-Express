import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import Task from 'src/entity/tasks.entity';
import { UsersModule } from '../users/users.module';
import { LoginModule } from '../login/login.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    forwardRef(() => UsersModule),
    LoginModule
  ],
  providers: [TasksService],
  controllers: [TasksController],
  exports: [TasksService]
})
export class TasksModule {}