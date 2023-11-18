import { Router as createRouter } from 'express';
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from '../controller/examples.controller.js';

export const examplesRouter = createRouter();

examplesRouter.get('/', getAll);
examplesRouter.get('/:id', getById);
examplesRouter.post('/', create);
examplesRouter.patch('/:id', update);
examplesRouter.delete('/:id', remove);
