import { CreateUserDto } from './dto/createUser.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginDto } from './dto/login.dto';
import { User } from './decorators/user.decorator';
import { UserEntity } from './user.entity';
import { AuthGuard } from './guard/auth.guard';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller()
export class UserController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly userService: UserService) { }
  /*
   Func createUser is called when create the POST request via Postman
   * Created by: MARC 11.02.2023 16:51:39
   */

  @Post('user')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    const userInfo = this.userService.buildUserResponse(user);
    console.log(userInfo);
    return userInfo;
  }

  @Post('user/login')
  @UsePipes(new ValidationPipe())
  async Login(
    @Body('user') loginDto: LoginDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.Login(loginDto);
    if (user) {
      const loginResponse = await this.userService.buildUserResponse(user);
      return loginResponse;
    }
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async currentUser(
    // @Req() request: ExpressRequest,
    @User() user: UserEntity,
  ): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }

  @Put('user')
  async updateCurrentUser(
    @User('id') currentUserId: number,
    @Body('user') updateUserDto: UpdateUserDto)
    : Promise<UserResponseInterface> {
    const updatedUser = await this.userService.updateUser(currentUserId, updateUserDto)
    return this.userService.buildUserResponse(updatedUser)
  }
}
