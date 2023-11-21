// Import { Request, Response } from 'express';
// import { FilmsController } from './films.controller';
// import { FilmsMongoRepo } from '../repos/films.mongo.repo';

// describe('Given FilmsController class', () => {
//   // Para utilizarlas en el beforeEach primero las declaro
//   let controller: FilmsController;
//   let mockRequest: Request;
//   let mockResponse: Response;
//   let mockNext: jest.Mock;
//   beforeEach(() => {
//     mockRequest = {
//       body: {},
//       params: {},
//     } as Request;
//     mockResponse = {
//       json: jest.fn(),
//     } as unknown as Response;
//     mockNext = jest.fn();
//   });

//   describe('When we instantiate it without errors', () => {
//     beforeEach(() => {
//       const mockRepo = {
//         getAll: jest.fn().mockResolvedValue([{}]),
//         getById: jest.fn().mockResolvedValue({}),
//       } as unknown as FilmsMongoRepo;

//       controller = new FilmsController(mockRepo);
//     });

//     test('Then getAll should...', async () => {
//       await controller.getAll(mockRequest, mockResponse);
//       expect(mockResponse.json).toHaveBeenCalledWith([{}]);
//     });

//     test('Then getById should...', async () => {
//       await controller.getById(mockRequest, mockResponse, mockNext);
//       expect(mockResponse.json).toHaveBeenCalledWith({});
//     });
//   });

//   describe('When we instantiate it with errors', () => {
//     let mockError: Error;
//     beforeEach(() => {
//       mockError = new Error('Mock error');
//       const mockRepo = {
//         getById: jest.fn().mockRejectedValue(mockError),
//       } as unknown as FilmsFileRepo;

//       controller = new FilmsController(mockRepo);
//     });
//     test('Then getById should...', async () => {
//       await controller.getById(mockRequest, mockResponse, mockNext);
//       expect(mockNext).toHaveBeenCalledWith(mockError);
//     });
//   });
// });
