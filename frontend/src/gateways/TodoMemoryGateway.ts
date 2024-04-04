import { TodoGateway } from "./TodoGateway";

export class TodoMemoryGateway implements TodoGateway {
  todos: any;

  constructor() {
    this.todos = [
      { id: crypto.randomUUID(), description: "Learn TS", done: true },
      {
        id: crypto.randomUUID(),
        description: "Updagrade from Nuxt 2 to Nuxt 3",
        done: false,
      },
      { id: crypto.randomUUID(), description: "Buy food", done: false },
    ];
  }

  getTodos(): Promise<any> {
    return this.todos;
  }
  async addItem(item: any): Promise<any> {
    this.todos.push(item);
  }
  async updateItem(item: any): Promise<any> {
    const todo = this.todos.find((todo) => todo.id === item.id);
    if (todo) {
      todo.done = item.done;
    }
  }
  async removeItem(id: string): Promise<any> {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1);
    }
  }
}
