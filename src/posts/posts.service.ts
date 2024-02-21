// posts.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import Post from './post.entity';
import PostNotFoundException from './exception/postNotFund.exception';
import User from 'src/users/user.entity';



@Injectable()
export default class PostsService {
  
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    
  ) {}
  

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({ where: { id },relations: ['author'] });
    if (post) {
      return post;
    }
    throw new PostNotFoundException(id);
  }

  async updatePost(id: number, post: UpdatePostDto) {
    await this.postsRepository.update(id, post);
    const updatedPost = await this.postsRepository.findOne({ where: { id },relations: ['author'] });
    if (updatedPost) {
      return updatedPost;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }


  async deletePost(id: number) {
    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
  async getAllPosts(offset?: number, limit?: number) {
    const [items, count] = await this.postsRepository.findAndCount({
      relations: ['author'],
      order: {
        id: 'ASC'
      },
      skip: offset,
      take: limit
    });
   
    return {
      items,
      count
    }
  }

  async createPost(post: CreatePostDto, user: User) {
    const newPost = await this.postsRepository.create({
      ...post,
      author: user,
    });
    await this.postsRepository.save(newPost);
    return newPost;
  }

  async searchForPosts(search: string, offset: number, limit: number) {
    return this.postsRepository
      .createQueryBuilder('post')
      .where('post.title LIKE :search', { search: `%${search}%` })
      .orWhere('post.content LIKE :search', { search: `%${search}%` })
      .orderBy('post.id', 'ASC')
      .skip(offset)
      .take(limit)
      .getMany();
  }
 
  

  // async searchForPosts(text: string) {
  //   const results = await this.postsSearchService.search(text);
  //   const ids = results.map(result => result.id);
  //   if (!ids.length) {
  //     return [];
  //   }
  //   return this.postsRepository
  //     .find({
  //       where: { id: In(ids) }
  //     });
  // }
  

}
