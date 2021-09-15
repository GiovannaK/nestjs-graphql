import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import TestUtil from './../common/test/TestUtil';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  beforeEach(() => {
    mockRepository.find.mockReset();
    mockRepository.findOne.mockReset();
    mockRepository.create.mockReset();
    mockRepository.save.mockReset();
    mockRepository.update.mockReset();
    mockRepository.delete.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllUsers', () => {
    it('Should be list all users', async () => {
      const user = TestUtil.giveMeAvalidUser();
      mockRepository.find.mockReturnValue([user, user]);
      const users = await service.findAllUsers();
      expect(users).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findUserById', () => {
    it('should find a existing user ', async () => {
      const user = TestUtil.giveMeAvalidUser();
      mockRepository.findOne.mockReturnValue(user);
      const userFound = await service.findUserById(
        '39ac1395-5729-4667-836a-62fdeb7f8a3d',
      );
      expect(userFound).toMatchObject({
        name: user.name,
        email: user.email,
        id: user.id,
      });
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
    it('should return a exception when does not found a user', async () => {
      mockRepository.findOne.mockReturnValue(null);
      expect(service.findUserById('3')).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });
  describe('create user', () => {
    it('should create a user ', async () => {
      const user = TestUtil.giveMeAvalidUser();
      mockRepository.save.mockReturnValue(user);
      mockRepository.create.mockReturnValue(user);
      const createdUser = await service.createUser(user);
      expect(createdUser).toMatchObject(user);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });
    it('should return a exception when does not create a user', async () => {
      const user = TestUtil.giveMeAvalidUser();
      mockRepository.save.mockReturnValue(null);
      mockRepository.create.mockReturnValue(user);

      await service.createUser(user).catch((e) => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e).toMatchObject({
          message: 'Could not save user',
        });
      });
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });
  });
  describe('updateUser', () => {
    it('should update a valid user', async () => {
      const user = TestUtil.giveMeAvalidUser();
      const updatedUser = { name: 'Updated Name' };
      mockRepository.findOne.mockReturnValue(user);
      mockRepository.update.mockReturnValue({
        ...user,
        ...updatedUser,
      });
      mockRepository.create.mockReturnValue({
        ...user,
        ...updatedUser,
      });

      const resultUser = await service.updateUser(
        '39ac1395-5729-4667-836a-62fdeb7f8a3d',
        { ...user, name: 'Updated Name' },
      );

      expect(resultUser).toMatchObject(updatedUser);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const user = TestUtil.giveMeAvalidUser();
      mockRepository.delete.mockReturnValue(user);
      mockRepository.findOne.mockReturnValue(user);

      const deletedUser = await service.deleteUser(
        '39ac1395-5729-4667-836a-62fdeb7f8a3d',
      );

      expect(deletedUser).toBe(true);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('should not delete a inexisting user', async () => {
      const user = TestUtil.giveMeAvalidUser();
      mockRepository.delete.mockReturnValue(null);
      mockRepository.findOne.mockReturnValue(user);

      const deletedUser = await service.deleteUser('1');

      expect(deletedUser).toBe(false);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    });
  });
});
