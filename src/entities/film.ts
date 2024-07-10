import { ImgData } from '../types/img.data.js';
import { User } from './user.js';

export type Film = {
  id: string;
  name: string;
  era: string;
  year: string;
  filmFrontImg: ImgData;
  director: string;
  author: User;
};
