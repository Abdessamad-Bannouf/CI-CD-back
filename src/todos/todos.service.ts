import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './interfaces/todos.interface';
import { CreateTotoDto } from './interfaces/dto/create-todo.dto';

@Injectable()
export class TodosService {
  todos: Todo[] = [
    {
      id: 1,
      title: 'Sport',
      description: 'Aller à la salle et partir courrir',
      done: false,
    },
    {
      id: 2,
      title: 'Courses',
      description: 'Aller faire ses courses et récupérer le gâteau de mariage',
      done: true,
    },
    {
      id: 3,
      title: 'Entretien professionnel',
      description: 'Se présenter à l\'entreprise pour son entretien à 14h',
      done: true,
    },
  ];

  findOne(id: string) {
    return this.todos.find(todo => todo.id === Number(id));
  }

  findAll(): Todo[] {
    return this.todos;
  }

  create(todo: CreateTotoDto) {
    this.todos = [...this.todos, todo];
  }

  update(id: string, todo: Todo) {
    const todoToUpdate = this.todos.find(t => t.id === +id);
    if(!todoToUpdate) {
      return new NotFoundException('Tâche non trouvée :( ');
    }

    if(todo.hasOwnProperty('done')) {
      todoToUpdate.done = todo.done;
    }

    if(todo.title) {
      todoToUpdate.title = todo.title;
    }

    if(todo.description) {
      todoToUpdate.description = todo.description;
    }

    const updatedTodos = this.todos.map(t => t.id !== +id ? t: todoToUpdate);
    this.todos = [...updatedTodos];

    return {updatedTodo: 1, todo: todoToUpdate};
  }

  delete(id: string) {
    const nbOfTodosBeforeDelete = this.todos.length;
    this.todos = this.todos.filter(t => t.id !== +id);
    if(this.todos.length < nbOfTodosBeforeDelete) {
      return { deletedTodos: 1, nbTodos: this.todos.length };
    } else {
      return { deletedTodos: 0, nbTodos: this.todos.length };
    }

  }
}
