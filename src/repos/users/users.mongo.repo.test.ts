import { UsersMongoRepo } from './users.mongo.repo';
import { UserModel } from './users.mongo.model.js';
import { LoginUser, User } from '../../entities/user';
import { Auth } from '../../services/auth.js';

jest.mock('./users.mongo.model.js');
jest.mock('../../services/auth.js');

describe('Given UsersMongoRepo', () => {
  Auth.hash = jest.fn();
  Auth.compare = jest.fn().mockResolvedValue(true);
  let repo: UsersMongoRepo;

  describe('When we isntantiate it without errors', () => {
    const exec = jest.fn().mockResolvedValue('Test');

    beforeEach(() => {
      const mockQueryMethod = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec,
        }),
        exec,
      });

      UserModel.find = mockQueryMethod;
      UserModel.findById = mockQueryMethod;
      UserModel.findOne = mockQueryMethod;
      UserModel.findByIdAndUpdate = mockQueryMethod;
      UserModel.create = jest.fn().mockResolvedValue('Test');
      repo = new UsersMongoRepo();
    });

    test('Then it should execute getAll', async () => {
      const result = await repo.getAll();
      expect(exec).toHaveBeenCalled();
      expect(result).toBe('Test');
    });

    test('Then it should execute login', async () => {
      const result = await repo.login({ email: '' } as LoginUser);
      expect(UserModel.findOne).toHaveBeenCalled();
      expect(result).toBe('Test');
    });

    test('Then it should execute getById', async () => {
      const result = await repo.getById('');
      expect(exec).toHaveBeenCalled();
      expect(result).toBe('Test');
    });

    test('Then it should execute create', async () => {
      const result = await repo.create({} as Omit<User, 'id'>);
      expect(Auth.hash).toHaveBeenCalled();
      expect(UserModel.create).toHaveBeenCalled();
      expect(result).toBe('Test');
    });

    test('Then it should execute create', async () => {
      const result = await repo.create({} as Omit<User, 'id'>);
      expect(Auth.hash).toHaveBeenCalled();
      expect(UserModel.create).toHaveBeenCalled();
      expect(result).toBe('Test');
    });
    test('Then it should execute update', async () => {
      const result = await repo.update('1', { id: '1' });
      expect(exec).toHaveBeenCalled();
      expect(result).toBe('Test');
    });
    // Test('Then it should execute search', async () => {
    //   const result = await repo.search({ key: 'name', value: 'Test' });
    //   expect(exec).toHaveBeenCalled();
    //   expect(result).toBe('Test');
    // });
  });

  // Describe('When we isntantiate it WITH errors', () => {
  //   const exec = jest.fn().mockRejectedValue(new Error('Test'));
  //   beforeEach(() => {
  //     UserModel.findById = jest.fn().mockReturnValue({
  //       populate: jest.fn().mockReturnValue({
  //         exec,
  //       }),
  //     });
  //     repo = new UsersMongoRepo();
  //   });

  //   test('Then it should execute getById', async () => {
  //     // Cómo testear un error asíncrono
  //     expect(repo.getById('')).rejects.toThrow();
  //   });
  // });
});
