import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const category = new Category(createCategoryDto);

    if (createCategoryDto.parent_id) {
      const parentCategory = await this.categoriesRepository.findOneBy({
        id: createCategoryDto.parent_id,
      });
      if (!parentCategory) {
        throw new NotFoundException('Parent category not found');
      }
      category.parent = parentCategory;
    }
    return this.entityManager.save(category);
  }

  findAll() {
    return this.categoriesRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
