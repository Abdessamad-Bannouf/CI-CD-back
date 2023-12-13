import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTotoDto } from './interfaces/dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Todo } from 'src/entities/todo.entity';

@Injectable()
export class TodosService {
  public constructor(@InjectRepository(Todo) private todosRepository: Repository<Todo>) {}

  findOne(id: number): Promise<Todo> {
    return this.todosRepository.findOneBy({id: id});
  }

  async findAll(): Promise<Todo[]> {
    return this.todosRepository.find();
  }

  create(todo: CreateTotoDto): Promise<InsertResult> {
    return this.todosRepository.insert(todo);
  }

  async update(id: number, todo: Todo): Promise<UpdateResult | NotFoundException> {
    let todoToUpdate = await this.todosRepository.findOneBy({id: id});

    if(!todoToUpdate) {
      return new NotFoundException('Tâche non trouvée :( ');
    }

    if(todo.hasOwnProperty('done')) {
      todoToUpdate.done = todo.done
    }

    if(todo.title) {
      todoToUpdate.title = todo.title;
    }

    if(todo.description) {
      todoToUpdate.description = todo.description;
    }

    return this.todosRepository.update({id: id}, todoToUpdate);
  }

  async delete(id: number): Promise<DeleteResult | Todo[] | object> {
    return this.todosRepository.delete({id: id});
  }
}
