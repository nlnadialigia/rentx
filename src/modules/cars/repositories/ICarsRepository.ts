import { ICreateCarDTO } from '../dtos/ICreateCarDTO';

interface ICarsRpository {
  create(data: ICreateCarDTO): Promise<void>;
}

export { ICarsRpository };
