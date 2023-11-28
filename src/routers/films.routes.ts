import { Router as createRouter } from 'express';
import { FilmsController } from '../controllers/films.controller.js';
import createDebug from 'debug';
import { FilmsMongoRepo } from '../repos/films/films.mongo.repo.js';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { FileInterceptor } from '../middleware/file.interceptor.js';

const debug = createDebug('W7E:films:router');

export const filmsRouter = createRouter();
debug('Starting');

const repo = new FilmsMongoRepo();
const controller = new FilmsController(repo);
const interceptor = new AuthInterceptor();
const fileInterceptor = new FileInterceptor();

filmsRouter.get(
  '/',
  // Opcional interceptor.authorization.bind(interceptor),
  controller.getAll.bind(controller)
);
filmsRouter.get('/search', controller.search.bind(controller));
filmsRouter.get('/:id', controller.getById.bind(controller));
filmsRouter.post(
  '/',
  interceptor.authorization.bind(interceptor),
  fileInterceptor.singleFileStore('filmFrontImg').bind(fileInterceptor),
  controller.create.bind(controller)
);
filmsRouter.patch(
  '/:id',
  interceptor.authorization.bind(interceptor),
  interceptor.authenticationFilms.bind(interceptor),
  controller.update.bind(controller)
);
filmsRouter.delete(
  '/:id',
  interceptor.authorization.bind(interceptor),
  interceptor.authenticationFilms.bind(interceptor),
  controller.delete.bind(controller)
);
