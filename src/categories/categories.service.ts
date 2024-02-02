import { Injectable } from '@nestjs/common';
import CategoryNotFoundException from './exceptions/categoryNotFound.exception';
import UpdateCategoryDto from './dto/updateCategory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Category from './category.entity';
import { Repository } from 'typeorm';
import CreateCategoryDto from './dto/createCategory.dto';

@Injectable()
export default class CategoriesService {
    
    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>
      ) {}
      getAllCategories(): Promise<Category[]> {
        return this.categoriesRepository.find({
          relations: {
            posts: true,
          },
        });
      }
      async createCategory(category: CreateCategoryDto) {
        const newCategory = await this.categoriesRepository.create(category);
        await this.categoriesRepository.save(newCategory);
        return newCategory;
      }
      
       
      async getCategoryById(id: number) {
        const category = await this.categoriesRepository.findOne({where: {id}, relations: ['posts'] });
        if (category) {
          return category;
        }
        throw new CategoryNotFoundException(id);
      }
       
      async updateCategory(
        id: number,
        category: UpdateCategoryDto,
      ): Promise<Category> {
        await this.categoriesRepository.update(id, category);
        const updatedCategory = await this.categoriesRepository.findOne({
          where: {
            id,
          },
          relations: {
            posts: true,
          },
        });
        if (updatedCategory) {
          return updatedCategory;
        }
        throw new CategoryNotFoundException(id);
      }
}
