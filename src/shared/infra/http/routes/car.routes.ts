import { Router } from 'express';
import { CreateCarController } from '@modules/cars/useCases/createCars/CreateCarController';

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post('/', createCarController.handle);

export { carsRoutes };
