import { Module } from '@nestjs/common';
import  { MongooseModule }  from  "@nestjs/mongoose";
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
dotenv.config();


@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_HOST),
    UsersModule,
    TasksModule,
    AuthModule,
  ]
})

export class AppModule {
  
}
