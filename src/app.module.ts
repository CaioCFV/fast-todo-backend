import { Module } from '@nestjs/common';
import  { MongooseModule }  from  "@nestjs/mongoose";
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://root:DTBURieO6d9vbuvd@cluster0.kpyrn.gcp.mongodb.net/app?retryWrites=true&w=majority'),
    UsersModule,
    TasksModule,
    AuthModule
  ]
})
export class AppModule {}
