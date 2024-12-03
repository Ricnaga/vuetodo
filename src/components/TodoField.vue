<script setup lang="ts">
import { ref } from 'vue';
import { TodoProps } from '../todo.types';
import AppButton from './AppButton.vue';
import AppInput from './AppInput.vue';

const { todos } = defineProps<{ todos: Array<TodoProps> }>()
const emit = defineEmits<{
  (e: 'remove', id: string): void
  (e: 'status', id: string, isCompleted: boolean): void
  (e: 'edit', id: string, description: string): void
}>()

const fieldRow = ref<Array<TodoProps>>([])

const onInput = (description: string, todo: TodoProps) => {
  fieldRow.value = fieldRow.value.map(row => row.id === todo.id ? ({ ...row, description }) : row)
};

function handleEdit(props: TodoProps) {
  const { id } = props

  if (!fieldRow.value.find(row => row.id === props.id)) {
    fieldRow.value = [...fieldRow.value, props]
    return
  }

  emit('edit', id, fieldRow.value.find(row => row.id === id)?.description || '')
  fieldRow.value = fieldRow.value.filter(row => row.id !== props.id)
}

</script>

<template>
  <div v-if="!todos.length">
    <p class="text-error-600 font-medium text-2xl">
      Você não possui tarefas
    </p>
  </div>

  <div
    v-for="todo in todos"
    v-else
    :key="todo.id"
    class="flex flex-col md:flex-row gap-4 md:items-center"
  >
    <div class="flex gap-2">
      <input
        type="checkbox"
        @click="emit('status', todo.id, ($event.target as HTMLInputElement).checked)"
      >
      <div class="flex-1">
        <p
          v-if="!fieldRow.find(row => row.id === todo.id)"
          :data-status="todo.status"
          class="todo__description"
        >
          {{
            todo.description }}
        </p>

        <AppInput
          v-else
          :model-value="todo.description"
          placeholder="Tarefa"
          @update="description => onInput(description, todo)"
        />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2 justify-items-center md:ml-auto">
      <AppButton
        variant="outline"
        @click="handleEdit(todo)"
      >
        Editar
      </AppButton>
      <AppButton
        color="error"
        @click="emit('remove', todo.id)"
      >
        Excluir
      </AppButton>
    </div>
  </div>
</template>

<style scoped>
.todo__description {
  @apply text-secondary-600 font-medium text-2xl text-left transition-all;
  @apply data-[status='COMPLETED']:line-through data-[status='COMPLETED']:text-gray-400;
}
</style>