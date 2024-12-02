<script setup lang="ts">
import { ref } from 'vue';
import Button from './components/Button.vue';
import Card from './components/Card.vue';
import Input from './components/Input.vue';
import { TodoStatus } from './todo.enum';
import { TodoProps } from './todo.types';
import TodoField from './components/TodoField.vue';

const textAdd = ref<string>('')

let todos = ref<Array<TodoProps>>([])

const onInput = (e: { target: { value: string } }) => {
  textAdd.value = e.target.value;
};

function handleAdd() {
  todos.value = [
    ...todos.value,
    {
      id: Math.random().toString(),
      status: TodoStatus.PENDING,
      description: textAdd.value
    }
  ]

  textAdd.value = ''
}

function handleRemove(id: string) {
  todos.value = todos.value.filter(todo => todo.id !== id)
}

function handleStatus(id: string, isCompleted: boolean) {
  todos.value = todos.value.map(todo => todo.id === id ? ({ ...todo, status: isCompleted ? TodoStatus.COMPLETED : TodoStatus.PENDING }) : todo)
}

function handleEdit(id: string, description: string) {
  todos.value = todos.value.map(todo => todo.id === id ? ({ ...todo, description }) : todo)
}

</script>

<template>
  <header>
    <h1 class="text-center text-6xl font-medium text-info-600 tracking-wide">VueTodo</h1>
  </header>
  <Card class="mt-8 w-full max-w-4xl mx-auto grid">
    <div class="grid gap-6">
      <div class="flex flex-col gap-2">
        <h3 class="text-primary-600 font-medium text-2xl">Adicionar tarefa</h3>
        <div class="flex gap-2">
          <Input v-model="textAdd" @input="onInput" placeholder="Nova tarefa" />
          <Button rounded="full" class="grid justify-self-end" @click="handleAdd">+</Button>
        </div>
      </div>

      <div class="grid gap-2">
        <h3 class="text-2xl font-medium text-primary-600 tracking-wide mb-2">Tarefas</h3>
        <TodoField :todos="todos" @remove="handleRemove" @status="handleStatus" @edit="handleEdit" />

      </div>
    </div>
  </Card>
</template>
