import { HTTPClient } from "@/infra/HTTPClient";
import { TodoGateway } from "./TodoGateway";

export class TodoHTTPGateway implements TodoGateway {
  constructor(readonly httpClient: HTTPClient) {}

  getTodos(): Promise<any> {
    return this.httpClient.get("http://localhost:3333/todos");
  }
  async addItem(item: any): Promise<any> {
    await this.httpClient.post("http://localhost:3333/todos", item);
  }
  async updateItem(item: any): Promise<any> {
    await this.httpClient.put(`http://localhost:3333/todos/${item.id}`, item);
  }
  async removeItem(id: string): Promise<any> {
    await this.httpClient.delete(`http://localhost:3333/todos/${id}`);
  }
}
