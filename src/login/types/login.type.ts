import { LoginEntity } from '../login.entity';

export type LoginType = Omit<LoginEntity, 'hashPassword' | 'password'>;
