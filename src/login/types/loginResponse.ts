import { LoginType } from './login.type';

export interface LoginInterface {
  user: LoginType & { token: string };
}
