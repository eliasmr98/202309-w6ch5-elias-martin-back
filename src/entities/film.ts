import { User } from './user.js';

export type Film = {
  id: string;
  name: string;
  producer: string;
  era: string;
  year: string;
  img: string;
  director: string;
  author: User;
};
