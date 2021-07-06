import { Body, Controller, Post} from "@nestjs/common";
import { CreateLoginDto } from "../dto/create-login.dto";
import { CreateUsersDto } from "../dto/create-users.dto";
import { LoginService } from './login.service';

@Controller()
export class LoginController{
    constructor(private loginService: LoginService) {}

    @Post('/login')
    async login(@Body() dto: CreateLoginDto) {
        return await this.loginService.login(dto)
    }

    @Post('/registration')
    async registration(@Body() dto: CreateUsersDto) {
        return await this.loginService.registration(dto)
    }
}