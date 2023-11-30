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
      req.body.userId = tokenPayload.id; // Explicación: userId equivaldría a tokenUserId (para poder entender mejor de dónde viene)
      req.body.tokenRole = tokenPayload.role;
      next();
    } catch (error) {
      next(error);
    }
  }

  async authenticationFilms(req: Request, res: Response, next: NextFunction) {
    try {
      // Eres el usuario
      const userID = req.body.userId; // Explicación: userId equivaldría a tokenUserId (para poder entender mejor de dónde viene)
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

  isAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body.tokenRole !== 'Admin')
        throw new HttpError(403, 'Forbidden', 'Not authorized');
      next();
    } catch (error) {
      next(error);
    }
  }
}
