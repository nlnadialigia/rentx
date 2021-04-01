import { inject, injectable } from 'tsyringe';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRpository } from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
  brand?: string;
  name?: string;
  category_id?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRpository
  ) {}

  async execute({ brand, name, category_id }: IRequest): Promise<Car[]> {
    const cars = this.carsRepository.findAvailable(brand, name, category_id);

    return cars;
  }
}

export { ListAvailableCarsUseCase };
