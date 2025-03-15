import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { Comment } from '../../comment/entities/comment.entity';

@Entity()
export class Product extends BaseEntity {
  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column()
  public price: number;

  @Column()
  public product_imageUrl: string;

  @OneToMany(() => Comment, (comment) => comment.product, {
    eager: true,
    cascade: true,
  })
  public comments: Comment[];
}
