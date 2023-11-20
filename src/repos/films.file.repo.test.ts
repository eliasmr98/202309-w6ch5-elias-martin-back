import { Film } from '../entities/film';
import { HttpError } from '../types/http.error';
import { FilmsFileRepo } from './films.file.repo';
import fs from 'fs/promises';

jest.mock('fs/promises');

describe('Given FilmsFileRepo class', () => {
  describe('When we instantiate it', () => {
    const mockData = '[{"id": "1", "name": "Test"}]';
    fs.readFile = jest.fn().mockResolvedValue(mockData);
    fs.writeFile = jest.fn();

    const repo = new FilmsFileRepo();
    const mockId = '1';
    test('Then getAll should return the list of films', async () => {
      const result = await repo.getAll();
      expect(result).toStrictEqual(JSON.parse(mockData));
    });
    test('Then getById should return the film with the specified id', async () => {
      const result = await repo.getById(mockId);
      const expectedFilm = JSON.parse(mockData).find(
        (film: Film) => film.id === mockId
      );
      expect(result).toEqual(expectedFilm);
    });
    test('Then create should add a new film and return it', async () => {
      const mockData = '[]';
      const mockName = 'Godzilla VS Goku';
      fs.readFile = jest.fn().mockResolvedValue(mockData);
      const repo = new FilmsFileRepo();

      const newFilm = { name: mockName } as Omit<Film, 'id'>;
      const result = await repo.create(newFilm);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name', mockName);

      const updatedData = await repo.getAll();
      expect(updatedData).toHaveLength(1);
      expect(updatedData[0]).toEqual(result);
    });
    test('Then update should modify an existing film and return it', async () => {
      const mockName = 'Godzilla de las galaxias';
      const updatedFilm = { name: mockName };
      const result = await repo.update(mockId, updatedFilm);

      const expectedFilm = { id: mockId, name: mockName };
      const updatedData = await repo.getAll();

      expect(result).toEqual(expectedFilm);
      expect(updatedData).toHaveLength(1);
      expect(updatedData[0]).toEqual(result);
    });
    test('Then delete should remove an existing film', async () => {
      await repo.delete(mockId);
      const updatedData = await repo.getAll();
      expect(updatedData).toHaveLength(0);
    });
    test('Then delete should throw HttpError for non-existent id', async () => {
      const nonExistentId = 'non-existent-id';
      await expect(repo.delete(nonExistentId)).rejects.toThrow(HttpError);
    });
  });
});
