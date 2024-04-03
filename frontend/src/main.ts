import { createApp } from "vue";

import App from "@/App.vue";
import { AxiosAdapter } from "@/infra/AxiosAdapter";

const app = createApp(App);

const httpAdapter = new AxiosAdapter();
app.provide("httpClient", httpAdapter);

app.mount("#app");
