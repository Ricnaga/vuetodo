<script setup lang="ts">
import { ref } from 'vue';
import { TodoProps } from '../todo.types';
import Button from './Button.vue';
import Input from './Input.vue';

const { todos } = defineProps<{ todos: Array<TodoProps>; }>()
const emit = defineEmits<{
    (e: 'remove', id: string): void
    (e: 'status', id: string, isCompleted: boolean): void
    (e: 'edit', id: string, description: string): void
}>()

const fieldRow = ref<Array<TodoProps>>([])

const onInput = (description:string, todo:TodoProps) => {
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
        <p class="text-error-600 font-medium text-2xl">Você não possui tarefas</p>
    </div>

    <div v-else v-for="todo in todos" :key="todo.id" class="flex gap-4 items-center">
        <input type="checkbox" @click="emit('status', todo.id, ($event.target as HTMLInputElement).checked)">
        <div class="flex-1">
            <p v-if="!fieldRow.find(row => row.id === todo.id)" :data-status="todo.status" class="todo__description">{{
                todo.description }}</p>

            <Input v-else :model-value="todo.description" @update="description => onInput(description, todo)"
                placeholder="Tarefa" />
        </div>

        <div class="grid grid-cols-2 gap-2 ml-auto">
            <Button @click="handleEdit(todo)">Editar</Button>
            <Button @click="emit('remove', todo.id)">Excluir</Button>
        </div>
    </div>
</template>

<style scoped>
.todo__description {
    @apply text-secondary-600 font-medium text-2xl text-left transition-all;
    @apply data-[status='COMPLETED']:line-through data-[status='COMPLETED']:text-gray-400;
}
</style>