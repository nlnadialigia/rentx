import crypto from 'crypto';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryinMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
const generate = () => {
  return crypto.randomBytes(20).toString('hex');
};

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryinMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryinMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryinMemory);
  });

  it('Should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      name: generate(),
      email: generate(),
      password: generate(),
      driver_license: generate()
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    expect(result).toHaveProperty('token');
  });
});
