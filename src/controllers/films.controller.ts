import { NextFunction, Request, Response } from 'express';
import createDebug from 'debug';
import { Repository } from '../repos/repo.js';
import { Film } from '../entities/film.js';
import { Controller } from './controller.js';

const debug = createDebug('W7E:films:controller');

export class FilmsController extends Controller<Film> {
  constructor(protected repo: Repository<Film>) {
    super(repo);
    debug('Instantiated');
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.author = { id: req.body.userId };
      super.create(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}
