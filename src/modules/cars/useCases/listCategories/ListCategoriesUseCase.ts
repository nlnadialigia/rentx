import { inject, injectable } from 'tsyringe';
import { Category } from '@modules/cars/entities/Category';
import { CategoriesRepository } from '@modules/cars/repositories/implementations/CategoriesRepository';

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject(CategoriesRepository)
    private categoriesRepository: CategoriesRepository
  ) { }
  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();

    return categories;
  }
}

export { ListCategoriesUseCase };
