import { Router } from 'express';
import { CreateCarController } from '@modules/cars/useCases/createCars/CreateCarController';
import { ListAvailableController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableController = new ListAvailableController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get('/available', listAvailableController.handle);

export { carsRoutes };
