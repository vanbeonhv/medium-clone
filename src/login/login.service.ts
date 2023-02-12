import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { LoginEntity } from './login.entity';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from 'config';
import { LoginInterface } from './types/loginResponse';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(LoginEntity)
    private readonly loginRepository: Repository<LoginEntity>,
  ) {}
  async Login(loginDto: LoginDto): Promise<LoginEntity> {
    const userByEmail = await this.loginRepository.findOne({
      where: { email: loginDto.email },
      select: ['id', 'email', 'bio', 'image', 'password'],
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

  generateJWT(userLogin: LoginEntity): string {
    return sign(
      {
        id: userLogin.id,
        email: userLogin.email,
        bio: userLogin.bio,
        image: userLogin.image,
      },
      JWT_SECRET,
    );
  }
  buildLoginResponse(userLogin: LoginEntity): LoginInterface {
    return {
      user: {
        ...userLogin,
        token: this.generateJWT(userLogin),
      },
    };
  }
}
