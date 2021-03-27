import { Router } from 'express';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';

const specificationsRoutes = Router();

const createSpecificationControler = new CreateSpecificationController();

specificationsRoutes.post('/', createSpecificationControler.handle);

export { specificationsRoutes };
