import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import PostsService from './posts.service';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import FindOneParams from 'src/utils/findOneParams';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import { PaginationParams } from '../utils/types/paginationParams';
 
@Controller('posts')
@UseInterceptors(ClassSerializerInterceptor)
export default class PostsController {
  constructor(
    private readonly postsService: PostsService
  ) {}
 
  // @Get()
  // getAllPosts() {
  //   return this.postsService.getAllPosts();
  // }

  @Get()
  async getPosts(
    @Query('search') search: string,
    @Query() { offset, limit }: PaginationParams
  ) {
    if (search) {
      return this.postsService.searchForPosts(search, offset, limit);
    }
    return this.postsService.getAllPosts(offset, limit);
  }
 
  
@Get(':id')
getPostById(@Param() { id }: FindOneParams) {
  return this.postsService.getPostById(Number(id));
}
@Post()
@UseGuards(JwtAuthenticationGuard)
async createPost(@Body() post: CreatePostDto, @Req() req: RequestWithUser) {
  return this.postsService.createPost(post, req.user, );
}
 
  @Put(':id')
  async replacePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postsService.updatePost(Number(id), post);
  }
 
  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    this.postsService.deletePost(Number(id));
  }
}