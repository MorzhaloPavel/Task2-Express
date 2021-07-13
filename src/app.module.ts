import { Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { TypeOrmModule } from '@nestjs/typeorm';
import ORMconfig from './common/ormconfig'
import { HttpErrorFilter } from "./shared/http-error.filter";
import { LoggingInterceptor } from "./shared/logging.interceptor";
import { BoardsModule } from "./resources/boards/boards.module";
import { LoginModule } from "./resources/login/login.module";
import { TasksModule } from "./resources/tasks/tasks.module";
import { UsersModule } from "./resources/users/users.module";

@Module({
    imports: [
        TypeOrmModule.forRoot(ORMconfig),
        UsersModule,
        BoardsModule,
        TasksModule,
        LoginModule
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpErrorFilter
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor
        }
    ]
})
export class AppModule {}