import crypto from 'crypto';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
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

  it('Should be able to create a new car', () => {
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
