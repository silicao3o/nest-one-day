import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //Product get all
  @Get('/all')
  async getAllProducts(): Promise<Product[]> {
    const products = await this.productService.getProducts();
    return products;
  }
  //product create
  @Post('/create')
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    const newProduct: Product =
      await this.productService.createProduct(createProductDto);
    return newProduct;
  }
  //product get product-detail
  @Get('/:id')
  async getOne(@Param('id') id: string): Promise<Product> {
    const product = await this.productService.getProductById(id);
    return product;
  }
  //product update
  @Put('/update/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updateProduct = await this.productService.updateProdct(
      id,
      updateProductDto,
    );
    return updateProduct;
  }
  //product delete
  @Delete('/delete/:id')
  async deleteProduct(@Param('id') id: string): Promise<string> {
    const deleteProduct = await this.productService.deleteProduct(id);
    return deleteProduct;
  }
}
