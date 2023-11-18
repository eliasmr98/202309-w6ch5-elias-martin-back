import { Router as createRouter } from 'express';
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from '../controller/films.controller.js';

export const filmsRouter = createRouter();

filmsRouter.get('/', getAll);
filmsRouter.get('/:id', getById);
filmsRouter.post('/', create);
filmsRouter.patch('/:id', update);
filmsRouter.delete('/:id', remove);
