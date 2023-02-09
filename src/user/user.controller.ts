import { CreateUserDto } from './dto/createUser.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('users')
  async createUser(
    @Body('student') createUserDto: CreateUserDto,
  ): Promise<any> {
    console.log('createUser', createUserDto);
    return await this.userService.createUser(createUserDto);
  }
}
