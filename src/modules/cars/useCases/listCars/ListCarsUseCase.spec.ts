import crypto from 'crypto';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListCarsUseCase } from './ListCarsUseCase';

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

const generate = () => {
  return crypto.randomBytes(10).toString('hex');
};

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it('Should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: generate(),
      description: generate(),
      daily_rate: 150,
      license_plate: generate(),
      fine_amount: 50,
      brand: generate(),
      category_id: generate()
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: generate(),
      description: generate(),
      daily_rate: 150,
      license_plate: generate(),
      fine_amount: 50,
      brand: generate(),
      category_id: generate()
    });

    const cars = await listCarsUseCase.execute({
      name: car.name
    });

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by brandy', async () => {
    const car = await carsRepositoryInMemory.create({
      name: generate(),
      description: generate(),
      daily_rate: 150,
      license_plate: generate(),
      fine_amount: 50,
      brand: generate(),
      category_id: generate()
    });

    const cars = await listCarsUseCase.execute({
      brand: car.brand
    });

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by category_id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: generate(),
      description: generate(),
      daily_rate: 150,
      license_plate: generate(),
      fine_amount: 50,
      brand: generate(),
      category_id: generate()
    });

    const cars = await listCarsUseCase.execute({
      category_id: car.category_id
    });

    expect(cars).toEqual([car]);
  });
});
