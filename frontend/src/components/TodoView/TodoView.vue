<script setup>
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-vue-next";

const todos = ref([]);
const description = ref("");
async function addTodo() {
  if (!description.value) return;
  if (todos.value.some((todo) => todo.description === description.value))
    return;
  if (todos.value.filter((todo) => !todo.done).length > 4) return;
  const newTodo = {
    id: Math.random().toString(36).slice(2, 7),
    description: description.value,
    done: false,
  };
  todos.value.push(newTodo);
  description.value = "";
  await axios.post("http://localhost:3333/todos", newTodo);
}
async function removeItem(item) {
  todos.value.splice(
    todos.value.findIndex((todo) => todo === item),
    1,
  );
  await axios.delete(`http://localhost:3333/todos/${item.id}`);
}
async function toggleItem(todo) {
  todo.done = !todo.done;
  await axios.put(`http://localhost:3333/todos/${todo.id}`, todo);
}
onMounted(async () => {
  const response = await axios.get("http://localhost:3333/todos");
  todos.value = response.data;
});

const completed = computed(() => {
  return todos.value.filter((todo) => todo.done).length;
});

const completedPercentage = computed(() => {
  return Math.round((completed.value / todos.value.length) * 100);
});
</script>

<template>
  <div
    class="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-900"
  >
    <Card class="w-96">
      <CardHeader>
        <CardTitle>Todo List</CardTitle>
        <CardDescription
          >Completed: {{ completed }} of {{ todos.length }} (<span
            class="completedPercentage"
            >{{ completedPercentage }}%</span
          >)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p v-if="todos.length === 0">No items</p>
        <div v-else class="space-y-4">
          <div
            v-for="todo in todos"
            :key="todo"
            class="flex items-center"
            :class="{ 'text-gray-400 line-through': todo.done }"
          >
            <Checkbox
              :checked="todo.done"
              class="mr-2"
              @click="toggleItem(todo)"
            />
            <span>{{ todo.description }}</span>
            <Button
              class="ml-auto bg-red-600 px-2 hover:bg-red-700"
              @click="removeItem(todo)"
            >
              <Trash2 class="w-4- h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter class="flex items-center justify-between gap-4 pt-4">
        <Input
          placeholder="Add new todo"
          v-model="description"
          @keypress.enter="addTodo"
        />
        <Button class="px-3" @click="addTodo">
          <Plus class="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
