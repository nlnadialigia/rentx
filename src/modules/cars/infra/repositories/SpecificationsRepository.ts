import { getRepository, Repository } from 'typeorm';
import { Specification } from '@modules/cars/entities/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository
} from '@modules/cars/repositories/ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private respository: Repository<Specification>;

  constructor() {
    this.respository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.respository.create({
      name,
      description
    });

    await this.respository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.respository.findOne({ name });

    return specification;
  }
}

export { SpecificationsRepository };
