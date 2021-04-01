import { ICarsRpository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  car_id: string;
  specification_id: string[];
}

class CreateCarSpecificationUseCase {
  constructor(
    private carsRepository: ICarsRpository,
    private specificationRepository: ISpecificationsRepository
  ) {}
  async execute({ car_id, specification_id }: IRequest): Promise<void> {
    const carAlreadyExists = await this.carsRepository.findById(car_id);

    if (!carAlreadyExists) {
      throw new AppError('Car does not exist!');
    }

    const specifications = await this.specificationRepository.findByIds(
      specification_id
    );

    carAlreadyExists.specifications = specifications;

    await this.carsRepository.create(carAlreadyExists);
  }
}

export { CreateCarSpecificationUseCase };
