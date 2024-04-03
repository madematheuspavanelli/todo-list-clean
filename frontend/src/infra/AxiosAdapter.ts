import axios from "axios";
import { HTTPClient } from "./HTTPClient";

export class AxiosAdapter implements HTTPClient {
  async get(url: string): Promise<any> {
    const response = await axios.get(url);
    return response.data;
  }
  async post(url: string, body: any): Promise<any> {
    const response = await axios.get(url, body);
    return response.data;
  }
  async put(url: string, body: any): Promise<any> {
    const response = await axios.put(url, body);
    return response.data;
  }
  async delete(url: string): Promise<any> {
    const response = await axios.delete(url);
    return response.data;
  }
}