import { CreateTotoDto } from './interfaces/dto/create-todo.dto';
import { Todo } from './interfaces/todos.interface';
import { TodosService } from './todos.service';
import { Body, Controller, Get, Post, Param, Patch, Delete } from '@nestjs/common';

@Controller('todos')
export class TodosController {
  constructor(readonly todoservice: TodosService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoservice.findOne(id);
  }

  @Get()
  async getList(): Promise<Todo[]> {
    return this.todoservice.findAll();
  }

  @Post()
  create(@Body() newTodo: CreateTotoDto) {
    this.todoservice.create(newTodo);
  }

  @Patch(':id')
  updateTodo(@Param('id') id: string, @Body() todo: CreateTotoDto) {
    return this.todoservice.update(id, todo);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.todoservice.delete(id);
  }
}
