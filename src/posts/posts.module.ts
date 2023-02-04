import { Module } from '@nestjs/common';
import { MongooseModule }from '@nestjs/mongoose'
import PostsController from './posts.controller';
import PostsService from './posts.service';
import { PostSchema }from './posts.schema'

@Module({
  imports: [MongooseModule.forFeature([{name: "posts", schema: PostsSchema}])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
