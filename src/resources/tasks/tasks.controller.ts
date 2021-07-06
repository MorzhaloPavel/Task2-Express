// import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
// import { CreateTasksDto } from "../dto/create-tasks.dto";
// import { JwtLoginGuard } from "../login/jwt-login.guards";
// import { TasksService } from './tasks.service';

// @Controller('/boards/:boardId/tasks')
// @UseGuards(JwtLoginGuard)
// export class TasksController{
//     constructor(private tasksService: TasksService) {}

//     @Get()
//     async getAll(@Param('boardId') boardId: string) {
//         return await this.tasksService.getAll(boardId)
//     }

//     @Post()
//     async create(
//         @Param('boardId') boardId: string,
//         @Body() dto: CreateTasksDto) {
//         return await this.tasksService.create(boardId, dto)
//     }

//     @Get(':id')
//     async get(
//         @Param('boardId') boardId: string,
//         @Param('id') id: string) {
//         return await this.tasksService.get(boardId, id)
//     }

//     @Put(':id')
//     async update(
//         @Param('boardId') boardId: string,
//         @Param('id') id: string, 
//         @Body() dto: CreateTasksDto) {
//         return await this.tasksService.update(boardId, id, dto)
//     }

//     @Delete(':id')
//     async remove(
//         @Param('boardId') boardId: string,
//         @Param('id') id: string) {
//         return this.tasksService.remove(boardId, id)
//     }
// }