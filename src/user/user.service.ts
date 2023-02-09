import { CreateUserDto } from './dto/createUser.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  // constructor(private readonly userService: string) {}
  async createUser(createDto: CreateUserDto) {
    return createDto;
  }
}
