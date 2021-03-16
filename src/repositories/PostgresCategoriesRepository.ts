import { Category } from '../model/Category';
import {
  ICategoriesRepository,
  // eslint-disable-next-line prettier/prettier
  ICreateCategoryDTO
} from './ICategoriesRepository';

class PostgresCategoriesRepository implements ICategoriesRepository {
  findByName(name: string): Category {
    console.log(name);
    return null;
  }
  list(): Category[] {
    return null;
  }
  create({ name, description }: ICreateCategoryDTO): void {
    console.log(name, description);
    return null;
  }
}

export { PostgresCategoriesRepository };
