import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import * as Joi from '@hapi/joi';
import { ExceptionsLoggerFilter } from './utils/exceptionsLogger.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    PostsModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGO_HOST: Joi.string.required(),
        MONGO_PORT: Joi.string.required(),
        MONGO_USER: Joi.string.required(),
        MONGO_PASSWORD: Joi.string.required(),
        MONGO_DB: Joi.string.required(),
        PORT: Joi.string.required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required()
      }),
    }), 
    DatabaseModule, 
    UsersModule, 
    AuthenticationModule,
    MongooseModule.forRoot('mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_HOST}/${MONGO_DB}')
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    }
  ],
})
export class AppModule {}
