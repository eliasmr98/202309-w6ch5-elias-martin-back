import { Film } from '../../entities/film.js';
import { FilmModel } from './films.mongo.model.js';
import { Repository } from '../repo.js';
import { HttpError } from '../../types/http.error.js';
import createDebug from 'debug';
import { UsersMongoRepo } from '../users/users.mongo.repo.js';

const debug = createDebug('W7E:films:mongo:repo');

export class FilmsMongoRepo implements Repository<Film> {
  usersRepo: UsersMongoRepo;
  constructor() {
    this.usersRepo = new UsersMongoRepo();
    debug('Instantiated');
  }

  async getAll(): Promise<Film[]> {
    const result = await FilmModel.find()
      .populate('author', {
        films: 0,
      })
      .exec();
    return result;
  }

  async getById(id: string): Promise<Film> {
    const result = await FilmModel.findById(id)
      .populate('author', {
        films: 0,
      })
      .exec();
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result;
  }

  async create(newItem: Omit<Film, 'id'>): Promise<Film> {
    const userID = newItem.author.id;
    newItem.author = await this.usersRepo.getById(userID);
    const result: Film = await FilmModel.create(newItem);

    newItem.author.films.push(result.id as unknown as Film);
    debug(newItem.author);
    await this.usersRepo.update(userID, newItem.author);
    return result;
  }

  async update(id: string, updatedItem: Partial<Film>): Promise<Film> {
    const result = await FilmModel.findByIdAndUpdate(id, updatedItem, {
      new: true,
    })
      .populate('author', {
        notes: 0,
      })
      .exec();
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await FilmModel.findByIdAndDelete(id)
      .populate('author', {
        notes: 0,
      })
      .exec();
    if (!result) {
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }
  }
}
