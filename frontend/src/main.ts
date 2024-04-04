import { createApp } from "vue";

import App from "@/App.vue";
import { AxiosAdapter } from "@/infra/AxiosAdapter";
import { TodoHTTPGateway } from "@/gateways/TodoHTTPGateway";

const app = createApp(App);

const httpClient = new AxiosAdapter();
const todoGateway = new TodoHTTPGateway(httpClient, "http://localhost:3333");
app.provide("todoGateway", todoGateway);

app.mount("#app");
