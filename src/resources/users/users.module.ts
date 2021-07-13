import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import  User  from '../../entity/user.entity';
import { TasksModule } from '../tasks/tasks.module';
import { LoginModule } from '../login/login.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => LoginModule),
    forwardRef(() => TasksModule),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}