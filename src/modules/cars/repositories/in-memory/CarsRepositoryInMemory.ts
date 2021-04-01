import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRpository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRpository {
  cars: Car[] = [];
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

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === license_plate);

    return car;
  }

  async findAvailable(
    brand?: string,
    name?: string,
    category_id?: string
  ): Promise<Car[]> {
    let carsAvailable = this.cars.filter((car) => car.available);
    if (brand) {
      carsAvailable = carsAvailable.filter((car) => car.brand === brand);
    }
    if (category_id) {
      carsAvailable = carsAvailable.filter(
        (car) => car.category_id === category_id
      );
    }
    if (name) {
      carsAvailable = carsAvailable.filter((car) => car.name === name);
    }
    return carsAvailable;
  }

  async findById(car_id: string): Promise<Car> {
    const car = this.cars.find((car) => car.id === car_id);

    return car;
  }
}

export { CarsRepositoryInMemory };
