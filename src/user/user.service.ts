import { CreateUserDto } from './dto/createUser.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }
  /*
   Hàm này để tạo user, nhận Dto để define shape of data, which được truyển vào function. Sau đó dùng userRepository(với `findOne()` method) để check có thằng user này trong database không
   * Created by: MARC 11.02.2023 15:19:11
   */

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    const userByUsername = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (userByEmail || userByUsername) {
      throw new HttpException(
        'Email or username are taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    console.log('newUser', newUser);
    /*
     save the new user to the database
     * Created by: MARC 11.02.2023 16:47:11
     */

    return await this.userRepository.save(newUser);
  }
  async findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { id },
    });
  }
  async Login(loginDto: LoginDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      where: { email: loginDto.email },
      select: ['id', 'email', 'username', 'bio', 'image', 'password'],
    });
    console.log(userByEmail);
    if (!userByEmail) {
      throw new HttpException(
        'Invalid login info',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const isPasswordMatch = await compare(
      loginDto.password,
      userByEmail.password,
    );

    if (!isPasswordMatch) {
      throw new HttpException(
        'Invalid login info',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    delete userByEmail.password;
    return userByEmail;
  }
  async updateUser(currentUserId: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const userById = await this.findById(currentUserId)
    Object.assign(userById, updateUserDto)
    return await this.userRepository.save(userById)
  }

  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        image: user.image,
      },
      JWT_SECRET,
    );
  }
  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }


}
