import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository';
import { CreateSpecificationController } from './CreateSpecificationController';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

const specificationsRepository = new SpecificationsRepository();
const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationsRepository
);
const createSpecificationControler = new CreateSpecificationController(
  createSpecificationUseCase
);

export { createSpecificationControler };
