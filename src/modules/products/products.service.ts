import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const product = new Product(createProductDto);
    return this.entityManager.save(product);
  }

  async findAll() {
    return this.productsRepository.find();
  }

  findOne(id: number) {
    return this.productsRepository.findOneBy({ id });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    // let product = await this.productsRepository.findOneBy({ id });
    let product = await this.productsRepository.preload({
      id,
      ...updateProductDto,
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.entityManager.save(product);
  }

  remove(id: number) {
    return this.productsRepository.delete(id);
  }
}
