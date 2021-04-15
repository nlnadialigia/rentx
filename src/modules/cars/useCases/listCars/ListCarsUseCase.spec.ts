import crypto from 'crypto';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/inMemory/CarsRepositoryinMemory';
import { ListCarsUseCase } from './ListCarsUseCase';

let listCarUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

const generate = () => {
  return crypto.randomBytes(8).toString('hex');
};

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it('Should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: generate(),
      description: generate(),
      daily_rate: 100,
      license_plate: generate(),
      fine_amount: 60,
      brand: generate(),
      category_id: generate()
    });

    const cars = await listCarUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: generate(),
      description: generate(),
      daily_rate: 100,
      license_plate: generate(),
      fine_amount: 60,
      brand: generate(),
      category_id: generate()
    });

    const cars = await listCarUseCase.execute({
      brand: car.brand
    });

    console.log(cars);

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by category_id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: generate(),
      description: generate(),
      daily_rate: 100,
      license_plate: generate(),
      fine_amount: 60,
      brand: generate(),
      category_id: generate()
    });

    const cars = await listCarUseCase.execute({
      category_id: car.category_id
    });

    console.log(cars);

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: generate(),
      description: generate(),
      daily_rate: 100,
      license_plate: generate(),
      fine_amount: 60,
      brand: generate(),
      category_id: generate()
    });

    const cars = await listCarUseCase.execute({
      name: car.name
    });

    console.log(cars);

    expect(cars).toEqual([car]);
  });
});
