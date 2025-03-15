import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { ProductService } from '../product/product.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly productService: ProductService,
  ) {}

  async createComment(
    productId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const { content } = createCommentDto;

    const product = await this.productService.getProductById(productId);

    const newComment = await this.commentRepository.create({
      content,
      product,
    });
    const savedComment = await this.commentRepository.save(newComment);
    return savedComment;
  }

  async findAll(): Promise<Comment[]> {
    return await this.commentRepository.find();
  }
}
