import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../types/http.error.js';
import { Auth } from '../services/auth.js';
import { FilmsMongoRepo } from '../repos/films/films.mongo.repo.js';

const debug = createDebug('W7E:auth:interceptor');

export class AuthInterceptor {
  constructor() {
    debug('Instantiated');
  }

  authorization(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenHeader = req.get('Authorization');
      if (!tokenHeader?.startsWith('Bearer'))
        throw new HttpError(401, 'Unauthorized');
      const token = tokenHeader.split(' ')[1];
      const tokenPayload = Auth.verifyAndGetPayload(token);
      req.body.tokenUserId = tokenPayload.id;
      next();
    } catch (error) {
      next(error);
    }
  }

  async authenticationFilms(req: Request, res: Response, next: NextFunction) {
    try {
      // Eres el usuario
      const userID = req.body.tokenUserId;
      // Quieres actuar sobre la película
      const filmsID = req.params.id;
      const repoFilms = new FilmsMongoRepo();
      const film = await repoFilms.getById(filmsID);
      if (film.author.id !== userID)
        throw new HttpError(401, 'Unauthorized', 'User not valid');
      next();
    } catch (error) {
      next(error);
    }
  }
}
