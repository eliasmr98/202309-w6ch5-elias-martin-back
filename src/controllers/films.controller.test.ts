import { Request, Response } from 'express';
import { FilmsController } from './films.controller';
import { FilmsFileRepo } from '../repos/films.file.repo';

describe('Given FilmsController class', () => {
  describe('When we instantiate it', () => {
    const mockData = [{}];
    FilmsFileRepo.prototype.getAll = jest.fn().mockResolvedValue(mockData);

    const controller = new FilmsController();

    const mockRequest: Request = {
      body: {},
    } as Request;

    const mockResponse: Response = {
      json: jest.fn(),
    } as unknown as Response;

    test('Then getAll should...', async () => {
      await controller.getAll(mockRequest, mockResponse);
      expect(mockResponse.json).toHaveBeenCalledWith(mockData);
    });
  });
});
