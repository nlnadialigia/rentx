import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

class ListAvailableController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, name, category_id } = request.query;

    const listAvailableUseCase = container.resolve(ListAvailableCarsUseCase);

    const cars = await listAvailableUseCase.execute({
      name: name as string,
      brand: brand as string,
      category_id: category_id as string
    });

    return response.json(cars);
  }
}

export { ListAvailableController };
