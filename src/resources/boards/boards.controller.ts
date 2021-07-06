// import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
// import { CreateBoardsDto } from "../dto/create-boards.dto";
// import { JwtLoginGuard } from "../login/jwt-login.guards";
// import { BoardsService } from './boards.service';

// @Controller('/boards')
// @UseGuards(JwtLoginGuard)
// export class BoardsController{
//     constructor(private usersService: BoardsService) {}

//     @Get()
//     async getAll() {
//         return await this.usersService.getAll()
//     }

//     @Post()
//     async create(@Body() dto: CreateBoardsDto) {
//         return await this.usersService.create(dto)
//     }

//     @Get(':id')
//     async get(@Param('id') id: string) {
//         return await this.usersService.get(id)
//     }

//     @Put(':id')
//     async update(@Param('id') id: string, @Body() dto: CreateBoardsDto) {
//         return await this.usersService.update(id, dto)
//     }

//     @Delete(':id')
//     async remove(@Param('id') id: string) {
//         return this.usersService.remove(id)
//     }
// }