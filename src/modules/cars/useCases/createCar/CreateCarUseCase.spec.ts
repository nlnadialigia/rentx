import crypto from 'crypto';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/inMemory/CarsRepositoryinMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

const generate = () => {
  return crypto.randomBytes(10).toString('hex');
};

describe('Create car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('Should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: generate(),
      description: generate(),
      daily_rate: 100,
      license_plate: generate(),
      fine_amount: 60,
      brand: generate(),
      category_id: generate()
    });

    expect(car).toHaveProperty('id');
  });

  it('Should not be able to create a car with existing license plate', async () => {
    expect(async () => {
      const car1 = {
        name: generate(),
        description: generate(),
        daily_rate: 100,
        license_plate: generate(),
        fine_amount: 60,
        brand: generate(),
        category_id: generate()
      };

      await createCarUseCase.execute(car1);

      await createCarUseCase.execute({
        name: generate(),
        description: generate(),
        daily_rate: 100,
        license_plate: car1.license_plate,
        fine_amount: 60,
        brand: generate(),
        category_id: generate()
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: generate(),
      description: generate(),
      daily_rate: 100,
      license_plate: generate(),
      fine_amount: 60,
      brand: generate(),
      category_id: generate()
    });

    expect(car.available).toBe(true);
  });
});
