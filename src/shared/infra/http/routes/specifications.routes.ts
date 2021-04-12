import { Router } from 'express';
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const specificationsRoutes = Router();

const createSpecificationControler = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post('/', createSpecificationControler.handle);

export { specificationsRoutes };
