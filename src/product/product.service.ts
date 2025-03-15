import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  // Table 선언
  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;
  //product getALL
  async getProducts(): Promise<Product[]> {
    const products = await this.productRepository.find();
    return products;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = await this.productRepository.create(createProductDto);
    await this.productRepository.save(createProductDto);
    return newProduct;
  }

  // 1가지 가져오기
  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id: id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async updateProdct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const findProduct = await this.productRepository.findOneBy({ id: id });
    if (!findProduct) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    await this.productRepository.update(id, updateProductDto);
    return findProduct;
  }

  async deleteProduct(id: string) {
    const findProduct = await this.productRepository.findOneBy({ id: id });
    if (!findProduct) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    await this.productRepository.delete(findProduct);
    return id;
  }
}
