import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { ExpressRequest } from 'src/types/expressRequest.interface';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from 'config';
import { UserService } from '../user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) { }
  async use(req: ExpressRequest, _: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
    } else {
      const token: string = req.headers.authorization.split(' ')[1];

      try {
        const decode = verify(token, JWT_SECRET);
        const user = await this.userService.findById(decode.id);
        req.user = user;
      } catch (err) {
        req.user = null;
      }
    }
    next();
  }
}
