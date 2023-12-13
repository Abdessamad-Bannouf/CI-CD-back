import { Todo } from "src/entities/todo.entity";

export class Database {

  public static connect(): object {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'todos',
      entities: [Todo],
      synchronize: true,
    };
  }
}