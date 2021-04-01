import crypto from 'crypto';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

const generate = () => {
  return crypto.randomBytes(20).toString('hex');
};

describe('Specifications Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it('Should be able to create a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: generate(),
      description: generate(),
      daily_rate: 200,
      license_plate: generate(),
      fine_amount: 60,
      brand: generate(),
      category_id: generate()
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: generate(),
      description: generate()
    });

    const specification_id = [specification.id];

    createCarSpecificationUseCase.execute({
      car_id: car.id,
      specification_id
    });
  });

  it('Should not be able to create a new specification to the non-existent car', async () => {
    expect(async () => {
      const car_id = generate();
      const specification_id = [generate()];

      createCarSpecificationUseCase.execute({
        car_id,
        specification_id
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
