import crypto from 'crypto';
import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '../../repositories/inMemory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

const generate = () => {
  return crypto.randomBytes(10).toString('hex');
};

describe('Atuthenticate user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
  });
  it('Should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: generate(),
      email: generate(),
      password: generate(),
      name: generate()
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    expect(result).toHaveProperty('token');
  });

  it('Should not be able to authenticate a non-existent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: generate(),
        password: generate()
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
