import { FilmsMongoRepo } from './films.mongo.repo';
import { FilmModel } from './films.mongo.model.js';
import { Film } from '../../entities/film';
import { UsersMongoRepo } from '../users/users.mongo.repo';

jest.mock('./films.mongo.model.js');

describe('Given FilmsMongoRepo', () => {
  let repo: FilmsMongoRepo;

  describe('When we isntantiate it without errors', () => {
    const exec = jest.fn().mockResolvedValue('Test');

    beforeEach(() => {
      FilmModel.find = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec,
        }),
      });

      FilmModel.findById = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec,
        }),
      });
      FilmModel.create = jest.fn().mockResolvedValue('Test');
      repo = new FilmsMongoRepo();
    });

    test('Then it should execute getAll', async () => {
      const result = await repo.getAll();
      expect(exec).toHaveBeenCalled();
      expect(result).toBe('Test');
    });

    test('Then it should execute getById', async () => {
      const result = await repo.getById('');
      expect(exec).toHaveBeenCalled();
      expect(result).toBe('Test');
    });

    test('Then it should execute create', async () => {
      UsersMongoRepo.prototype.getById = jest
        .fn()
        .mockResolvedValue({ films: [] });
      UsersMongoRepo.prototype.update = jest.fn();
      const result = await repo.create({ author: {} } as Omit<Film, 'id'>);
      expect(result).toBe('Test');
    });

    test('Then it should execute search', async () => {
      const result = await repo.search({ key: 'era', value: 'Showa' });
      expect(exec).toHaveBeenCalled();
      expect(result).toBe('Test');
    });
  });

  describe('When we isntantiate it WITH errors', () => {
    const exec = jest.fn().mockRejectedValue(new Error('Test'));
    beforeEach(() => {
      FilmModel.findById = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec,
        }),
      });
      repo = new FilmsMongoRepo();
    });

    test('Then it should execute getById', async () => {
      // Cómo testear un error asíncrono
      expect(repo.getById('')).rejects.toThrow();
    });
  });
});
