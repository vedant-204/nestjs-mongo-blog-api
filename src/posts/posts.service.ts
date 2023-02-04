import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { Post } from './posts.schema'

@Injectable()
export default class PostsService {
  constructor(@InjectModel('posts') private readonly postsModel: Model<Posts>) {}
  
  getAllPosts() {
    return this.postsModel.find();
  }

  async getPostById(id:number){
    const post = this.postsModel.findOne({
      where: {id,}
    });
    if (post) {
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }
  
  async createPost(post:CreatePostDto){
    const newPost = await this.postsModel.create(post)
    await this.newPost.save();
    return newPost;
  }
  async updatePost(id:number, post:UpdatePostDto){ 
    await this.postsModel.update(id, post) 
    const updatedPost = await this.postsModel.findOne({
      where: {id,}
    });
    if (updatedPost){
      return updatedPost;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async deletePost(id:number){
    const deleteResponse = await this.postsModel.delete(id)
    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
