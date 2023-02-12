import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';
import { LoginInterface } from './types/loginResponse';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async Login(@Body('user') loginDto: LoginDto): Promise<LoginInterface> {
    const user = await this.loginService.Login(loginDto);
    if (user) {
      const loginResponse = await this.loginService.buildLoginResponse(user);
      return loginResponse;
    }
  }
}
