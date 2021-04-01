import crypto from 'crypto';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

const generate = () => {
  return crypto.randomBytes(20).toString('hex');
};

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('Should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: generate(),
      description: generate(),
      daily_rate: 200,
      license_plate: generate(),
      fine_amount: 60,
      brand: generate(),
      category_id: generate()
    });

    expect(car).toHaveProperty('id');
  });

  it('Should not be able to create a car with license plate existent', () => {
    expect(async () => {
      createCarUseCase.execute({
        name: generate(),
        description: generate(),
        daily_rate: 100,
        license_plate: 'abc-1020',
        fine_amount: 60,
        brand: generate(),
        category_id: generate()
      });

      createCarUseCase.execute({
        name: generate(),
        description: generate(),
        daily_rate: 100,
        license_plate: 'abc-1020',
        fine_amount: 60,
        brand: generate(),
        category_id: generate()
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to create a car with available true by default', () => {
    createCarUseCase.execute({
      name: generate(),
      description: generate(),
      daily_rate: 100,
      license_plate: generate(),
      fine_amount: 60,
      brand: generate(),
      category_id: generate()
    });
  });
});
