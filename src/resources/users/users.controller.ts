import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import User from "src/entity/user.entity";
import { JwtLoginGuard } from "src/resources/login/jwt-login.guards";
import { CreateUsersDto } from "../dto/create-users.dto";
import { UsersService } from './users.service';

@Controller('/users')
@UseGuards(JwtLoginGuard)
export class UsersController{
    constructor(private usersService: UsersService) {}

    @Get()
    async getAll() {
        const users = await this.usersService.getAll()
        return (users as User[]).map(User.toResponse)
    }

    @Post()
    async create(@Body() dto: CreateUsersDto) {
        const user = await this.usersService.create(dto)
        return User.toResponse((user as User))
    }

    @Get(':id')
    async get(@Param('id') id: string) {
        const user = await this.usersService.get(id)
        return User.toResponse((user as User))
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: CreateUsersDto) {
        const user = await this.usersService.update(id, dto)
        return User.toResponse((user as User))
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.usersService.remove(id)
    }
}