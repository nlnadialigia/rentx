import { inject, injectable } from 'tsyringe';
import { Car } from '@modules/cars/entities/Car';
import { ICarsRpository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

// @injectable()
class CreateCarUseCase {
  constructor(
    // @inject('CarsRepository')
    private carsRepository: ICarsRpository
  ) {}
  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id
  }: IRequest): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      license_plate
    );

    if (carAlreadyExists) {
      throw new AppError('Car already exists!');
    }

    const car = this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    });

    return car;
  }
}

export { CreateCarUseCase };
