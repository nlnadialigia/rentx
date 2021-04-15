import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async findAvailable(
    brand?: string,
    name?: string,
    category_id?: string
  ): Promise<Car[]> {
    let carsAvailable = this.cars.filter((car) => car.available === true);

    if (category_id) {
      carsAvailable = carsAvailable.filter(
        (car) => car.category_id === category_id
      );
    }

    if (name) {
      carsAvailable = carsAvailable.filter((car) => car.name === name);
    }

    if (brand) {
      carsAvailable = carsAvailable.filter((car) => car.brand === brand);
    }

    return carsAvailable;
  }

  async findByLincensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    });

    this.cars.push(car);

    return car;
  }
}

export { CarsRepositoryInMemory };
