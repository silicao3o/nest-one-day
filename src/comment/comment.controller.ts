import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { HealthCheck } from '@nestjs/terminus';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(
    @Param('productId') productId: string,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const comment = await this.commentService.createComment(
      productId,
      createCommentDto,
    );
    return comment;
  }

  @Get()
  @HealthCheck()
  async findAll(): Promise<Comment[]> {
    return await this.commentService.findAll();
  }
}
