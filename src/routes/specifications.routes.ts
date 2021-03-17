import { Router } from 'express';
import { createSpecificationControler } from '../modules/cars/useCases/createSpecification';

const specificationsRoutes = Router();

specificationsRoutes.post('/', (request, response) => {
  return createSpecificationControler.handle(request, response);
});

export { specificationsRoutes };
