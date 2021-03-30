import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Car } from '../entities/Car';

interface ICarsRpository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
}

export { ICarsRpository };
