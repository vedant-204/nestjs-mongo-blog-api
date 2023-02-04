import { Body, Controller, Get, Delete, Post, Param, Put, UseGuards } from '@nestjs/common';
import PostsService from './posts.service';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard'

@Controller('posts')
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param(){ id }: FindOneParams) {
    return this.postsService.getPostById(Number(id));
  }
  
  @Post()
  @UseGuards(JwtAuthenticationGuard)  
    async createPost(@Body() post: CreatePostDto) {
    return this.postsService.createPost(post);
  }

  @Put(':id')
  @UseGuards(JwtAuthenticationGuard)  
  async replacePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postsService.updatePost(Number(id), post);
  }
  
  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    this.postsService.deletePost(Number(id));
  }
}
