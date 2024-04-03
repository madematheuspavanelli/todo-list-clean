import express, { Request, Response } from "express";
import cors from "cors";
import crypto from "crypto";

const app = express();
app.use(express.json());
app.use(cors());

const todos = [
  { id: crypto.randomUUID(), description: "Learn TS", done: true },
  {
    id: crypto.randomUUID(),
    description: "Updagrade from Nuxt 2 to Nuxt 3",
    done: false,
  },
  { id: crypto.randomUUID(), description: "Buy food", done: false },
];

app.get("/todos", (request: Request, response: Response) => {
  return response.json(todos);
});

app.post("/todos", (request: Request, response: Response) => {
  todos.push(request.body);
  return response.status(201).end();
});

app.put("/todos/:id", (request: Request, response: Response) => {
  const todo = todos.find((todo) => todo.id === request.params.id);
  if (todo) {
    todo.done = request.body.done;
  }
  return response.status(204).end();
});

app.delete("/todos/:id", (request: Request, response: Response) => {
  const todo = todos.find((todo) => todo.id === request.params.id);
  if (todo) {
    todos.splice(todos.indexOf(todo), 1);
  }
  return response.status(204).end();
});

app.listen(3333);
