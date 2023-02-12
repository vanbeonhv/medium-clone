import { CreateUserDto } from './dto/createUser.dto';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponseInterface } from './types/userResponse.interface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  /*
   Func createUser is called when create the POST request via Postman
   * Created by: MARC 11.02.2023 16:51:39
   */

  @Post('users')
  // @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    // console.log('createUser', createUserDto);
    const user = await this.userService.createUser(createUserDto);
    const userInfo = this.userService.buildUserResponse(user);
    console.log(userInfo);
    return userInfo;
  }
}
