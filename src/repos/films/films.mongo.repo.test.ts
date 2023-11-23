import { FilmsMongoRepo } from './films.mongo.repo';
import { FilmModel } from './films.mongo.model.js';
// Temp import { UsersMongoRepo } from '../users/users.mongo.repo.js';
// Temp import { Film } from '../../entities/film.js';

jest.mock('./films.mongo.model.js');
// Temp jest.mock('../users/users.mongo.repo.js');

describe('Given FilmsMongoRepo', () => {
  let repo: FilmsMongoRepo;
  beforeEach(() => {
    repo = new FilmsMongoRepo();
  });
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

      // FilmModel.create = jest.fn().mockResolvedValue({
      //   id: '1',
      //   name: 'Test Film',
      //   author: { id: '1' },
      // });

      // UsersMongoRepo.prototype.getById = jest
      //   .fn()
      //   .mockResolvedValue({ films: [], id: '1' }) as jest.Mock;
      // UsersMongoRepo.prototype.update = jest
      //   .fn()
      //   .mockResolvedValue(undefined) as jest.Mock;
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
    // Temp test('Then it should execute create', async () => {
    //   const newMockItem = {
    //     name: 'Test Film',
    //     author: { id: '1' },
    //   } as unknown as Omit<Film, 'id'>;
    //   const result = await repo.create(newMockItem);

    //   expect(FilmModel.create as jest.Mock).toHaveBeenCalledWith(newMockItem);
    //   expect(UsersMongoRepo.prototype.getById).toHaveBeenCalledWith('1');
    //   expect(UsersMongoRepo.prototype.update).toHaveBeenCalledWith('1', {
    //     id: '1',
    //     films: ['1'],
    //   });

    //   expect(result).toEqual({
    //     id: '1',
    //     name: 'Test Film',
    //     author: { id: '1', films: ['1'] },
    //   });
    // });
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
      expect(repo.getById('')).rejects.toThrow();
    });
  });
});
