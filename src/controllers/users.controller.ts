import { NextFunction, Request, Response } from 'express';
import createDebug from 'debug';
import { UsersMongoRepo } from '../repos/users/users.mongo.repo.js';
import { Auth } from '../services/auth.js';
import { Controller } from './controller.js';
import { User } from '../entities/user.js';

const debug = createDebug('W7E:users:controller');

export class UsersController extends Controller<User> {
  constructor(protected repo: UsersMongoRepo) {
    super(repo);
    debug('Instantiated');
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = req.body.tokenUserId
        ? await this.repo.getById(req.body.tokenUserId)
        : await this.repo.login(req.body);

      const data = {
        user: result,
        token: Auth.signJWT({
          id: result.id,
          email: result.email,
        }),
      };
      res.status(202);
      res.statusMessage = 'Accepted';
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
}
