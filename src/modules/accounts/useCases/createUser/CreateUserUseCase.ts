import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { AppError } from '@errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepository } from '@modules/accounts/repositories/implementations/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject(UsersRepository)
    private usersRepository: IUsersRepository
  ) { }

  async execute({
    name,
    password,
    email,
    driver_license
  }: ICreateUserDTO): Promise<void> {
    const emailAlredyExists = await this.usersRepository.findByEmail(email);

    if (emailAlredyExists) {
      throw new AppError('Email already exits');
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      password: passwordHash,
      email,
      driver_license
    });
  }
}

export { CreateUserUseCase };
