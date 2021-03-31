import { NextFunction, Request, Response } from 'express';
import { UsersRepository } from '@modules/accounts/infra/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const { id } = request.user;

  const repository = new UsersRepository();
  const user = await repository.findById(id);

  if (!user.isAdmin) {
    throw new AppError('User is not admin!');
  }

  return next();
}
