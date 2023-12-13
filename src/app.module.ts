import { Database } from './config/database.config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TodosModule, TypeOrmModule.forRoot(Database.connect())],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
