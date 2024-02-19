import { Column, Entity, JoinTable, ManyToMany, ManyToOne,Index , PrimaryGeneratedColumn } from 'typeorm';
import User from '../users/user.entity';
import Category from '../categories/category.entity';
 
@Entity()
class Post {
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column()
  public title: string;
 
  @Column({ nullable: true })
  public content: string;
 
  @Column({ nullable: true })
  public category?: string;

  @Index()
  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;
 
  @ManyToMany(() => Category, (category: Category) => category.posts)
  @JoinTable()
  public categories: Category[];

  @Column('text', { array: true,nullable: true })
  public paragraphs: string[];

  
}
 
export default Post;