import { IUser } from './user';

export interface IUseAuth extends IUser {
  isAuth: boolean;
}