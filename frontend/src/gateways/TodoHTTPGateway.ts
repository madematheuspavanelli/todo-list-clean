import { HTTPClient } from "@/infra/HTTPClient";
import { TodoGateway } from "./TodoGateway";

export class TodoHTTPGateway implements TodoGateway {
  constructor(
    readonly httpClient: HTTPClient,
    readonly baseURL: string,
  ) {}

  getTodos(): Promise<any> {
    return this.httpClient.get(`${this.baseURL}/todos`);
  }
  async addItem(item: any): Promise<any> {
    await this.httpClient.post(`${this.baseURL}/todos`, item);
  }
  async updateItem(item: any): Promise<any> {
    await this.httpClient.put(`${this.baseURL}/todos/${item.id}`, item);
  }
  async removeItem(id: string): Promise<any> {
    await this.httpClient.delete(`${this.baseURL}/todos/${id}`);
  }
}
