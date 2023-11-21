import { Film } from '../entities/film.js';
import { Repository } from './repo.js';
import { HttpError } from '../types/http.error.js';
import createDebug from 'debug';
import { FilmModel } from './films.mongo.model.js';

const debug = createDebug('W7E:films:mongo:repo');

export class FilmsMongoRepo implements Repository<Film> {
  constructor() {
    debug('Instantiated');
  }

  async getAll(): Promise<Film[]> {
    const result = await FilmModel.find();
    return result;
  }

  async getById(id: string): Promise<Film> {
    const result = await FilmModel.findById(id);
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result;
  }

  search({ _key, _value }: { _key: string; _value: unknown }): Promise<Film[]> {
    // Temp this.films.find((item) => item[_key] === _value)
    throw new Error('Method not implemented.');
  }

  async create(newItem: Omit<Film, 'id'>): Promise<Film> {
    const result: Film = await FilmModel.create(newItem);
    return result;
  }

  async update(id: string, updatedItem: Partial<Film>): Promise<Film> {
    const result = await FilmModel.findByIdAndUpdate(id, updatedItem, {
      new: true,
    });
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await FilmModel.findByIdAndDelete(id);
    if (!result) {
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }
  }
}
