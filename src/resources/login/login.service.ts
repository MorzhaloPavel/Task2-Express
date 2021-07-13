import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { CreateLoginDto } from "../dto/create-login.dto";
import { CreateUsersDto } from '../dto/create-users.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class LoginService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(dto: CreateLoginDto) {
    const user = await this.usersService.getUserByLogin(dto.login);
    if(!user) {
      throw new ForbiddenException('Invalid Login')
    }

    const comparePassword = bcrypt.compareSync(dto.password, user.password)
    if(!comparePassword) {
      throw new ForbiddenException('Invalid Password')
    }

    const token = this.jwtService.sign({userId: user.id, login: user.login})
    return {token}
  }

  async registration(dto: CreateUsersDto) {
    const user = await this.usersService.getUserByLogin(dto.login);
    if(user) {
      throw new ForbiddenException('The user is already registered')
    }
    const newUser = await this.usersService.create(dto)
    const token = this.jwtService.sign({userId: newUser.id, login: newUser.login})
    return {token}
  }
}