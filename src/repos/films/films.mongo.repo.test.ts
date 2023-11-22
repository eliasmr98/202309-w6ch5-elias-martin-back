import { Film } from '../../entities/film.js';
import { FilmsMongoRepo } from './films.mongo.repo.js';
import { HttpError } from '../../types/http.error.js';
import { FilmModel } from './films.mongo.model.js';

jest.mock('./films.mongo.model.js');

describe('Given FilmsMongoRepo class', () => {
  let mockId: string;
  let mockName: string;
  let mockData: Partial<Film>[];

  beforeEach(() => {
    mockId = '1';
    mockName = 'Godzilla VS Goku';
    mockData = [{ id: mockId, name: mockName }];

    (FilmModel.find as jest.Mock).mockResolvedValue(mockData);
    (FilmModel.findById as jest.Mock).mockResolvedValue(mockData[0]);
    (FilmModel.create as jest.Mock).mockResolvedValue(mockData[0]);
    (FilmModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockData[0]);
    (FilmModel.findByIdAndDelete as jest.Mock).mockResolvedValue(mockData[0]);
  });

  describe('When we instantiate it without errors', () => {
    test('Then getAll should return the list of films', async () => {
      const repo = new FilmsMongoRepo();
      const result = await repo.getAll();
      expect(result).toEqual(mockData);
    });

    test('Then getById should return the film with the specified id', async () => {
      const repo = new FilmsMongoRepo();
      const result = await repo.getById(mockId);
      expect(result).toEqual(mockData[0]);
    });

    test('Then getById should throw HttpError for non-existent id', async () => {
      const repo = new FilmsMongoRepo();
      const nonExistentId = 'non-existent-id';
      (FilmModel.findById as jest.Mock).mockResolvedValue(null);
      await expect(repo.getById(nonExistentId)).rejects.toThrow(HttpError);
    });

    test('Then create should add a new film and return it', async () => {
      const repo = new FilmsMongoRepo();
      const newFilm = { name: mockName } as Omit<Film, 'id'>;
      const result = await repo.create(newFilm);
      expect(result).toEqual(mockData[0]);
    });

    test('Then update should modify an existing film and return it', async () => {
      const repo = new FilmsMongoRepo();
      const updatedFilm = { name: mockName };
      const result = await repo.update(mockId, updatedFilm);
      expect(result).toStrictEqual({
        id: mockId,
        name: mockName,
      });
    });

    test('Then update should throw HttpError for non-existent id', async () => {
      const repo = new FilmsMongoRepo();
      const nonExistentId = 'non-existent-id';
      (FilmModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
      await expect(repo.update(nonExistentId, {})).rejects.toThrow(HttpError);
    });

    test('Then delete should remove an existing film', async () => {
      const repo = new FilmsMongoRepo();
      await repo.delete(mockId);
    });

    test('Then delete should throw HttpError for non-existent id', async () => {
      const repo = new FilmsMongoRepo();
      const nonExistentId = 'non-existent-id';
      (FilmModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);
      await expect(repo.delete(nonExistentId)).rejects.toThrow(HttpError);
    });
  });
});
