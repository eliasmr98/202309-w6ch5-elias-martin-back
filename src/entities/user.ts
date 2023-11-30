import { ImgData } from '../types/img.data.js';
import { Film } from './film.js';

export type LoginUser = {
  email: string;
  passwd: string;
};

export type User = LoginUser & {
  id: string;
  name: string;
  surname: string;
  age: number;
  films: Film[];
  avatar: ImgData;
  role: 'Admin' | 'User';
};
