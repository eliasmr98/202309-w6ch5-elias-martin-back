import fs from 'fs/promises';
import { Film } from '../entities/film.js';
import { Repository } from './repo.js';
import { HttpError } from '../types/http.error.js';
import createDebug from 'debug';

const debug = createDebug('W7E:films:file:repo');

export class FilmsFileRepo implements Repository<Film> {
  file: string;
  films: Film[];
  constructor() {
    debug('Instantiated');
    this.file = './data/data.json';
    this.films = [];
    this.loadData();
  }

  private async loadData() {
    const data = await fs.readFile(this.file, { encoding: 'utf-8' });
    this.films = JSON.parse(data);
  }

  async getAll(): Promise<Film[]> {
    return this.films;
  }

  async getById(id: string): Promise<Film> {
    const result = this.films.find((item) => item.id === id);
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result;
  }

  search({ _key, _value }: { _key: string; _value: unknown }): Promise<Film[]> {
    // Temp this.films.find((item) => item[_key] === _value)
    throw new Error('Method not implemented.');
  }

  async create(newItem: Omit<Film, 'id'>): Promise<Film> {
    const result: Film = { ...newItem, id: crypto.randomUUID() };
    const newTasks = [...this.films, result];
    await this.save(newTasks as Film[]);
    return result;
  }

  async update(id: string, updatedItem: Partial<Film>): Promise<Film> {
    let result = this.films.find((item) => item.id === id);
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    result = { ...result, ...updatedItem } as Film;
    const newTasks = this.films.map((item) => (item.id === id ? result : item));
    await this.save(newTasks as Film[]);
    return result;
  }

  async delete(id: string): Promise<void> {
    const newTasks = this.films.filter((item) => item.id !== id);
    if (newTasks.length === this.films.length) {
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }

    await this.save(newTasks);
  }

  private async save(newFilms: Film[]) {
    await fs.writeFile(this.file, JSON.stringify(newFilms), {
      encoding: 'utf-8',
    });
    this.films = newFilms;
  }
}
