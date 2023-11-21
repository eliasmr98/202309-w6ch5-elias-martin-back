import { Router as createRouter } from 'express';
import { FilmsController } from '../controllers/films.controller.js';
import createDebug from 'debug';
import { FilmsMongoRepo } from '../repos/films.mongo.repo.js';

const debug = createDebug('W7E:films:router');

export const filmsRouter = createRouter();
debug('Starting');

const repo = new FilmsMongoRepo();
const controller = new FilmsController(repo);

filmsRouter.get('/', controller.getAll.bind(controller));
// Temp filmsRouter.get('/search', controller.search.bind(controller));
filmsRouter.get('/:id', controller.getById.bind(controller));
filmsRouter.post('/', controller.create.bind(controller));
filmsRouter.patch('/:id', controller.update.bind(controller));
// Temp filmsRouter.patch('addUser/:id', controller.update.bind(controller));
// Temp filmsRouter.patch('removeUser/:id', controller.update.bind(controller));
filmsRouter.delete('/:id', controller.delete.bind(controller));
