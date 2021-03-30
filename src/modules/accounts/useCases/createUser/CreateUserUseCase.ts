import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { UsersRepository } from '@modules/accounts/infra/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject(UsersRepository)
    private usersRepository: IUsersRepository
  ) {}

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
