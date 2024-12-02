<script setup lang="ts">

const { placeholder, modelValue } = defineProps<{ placeholder?: string; modelValue: string }>()
const emit = defineEmits<{
    (e: 'update', value: string): void
}>();

</script>

<template>
    <div class="relative h-10 w-full min-w-[256px]">
        <input class="input_base peer" placeholder=" " :value="modelValue"
            @input="emit('update', ($event.target as HTMLInputElement).value)" />
        <label v-show="!!placeholder" class="label_base before:content[' '] after:content[' ']">
            {{ placeholder }}
        </label>
    </div>
</template>

<style scoped>
.input_base {
    @apply focus:shadow-lg size-full rounded-md p-3 transition-all;
    @apply bg-white disabled:bg-primary-50;
    @apply text-primary-800 font-sans text-base font-normal outline outline-0 focus:outline-0;
    @apply border-primary-200 placeholder-shown:border-primary-200 placeholder-shown:border-t-primary-400 focus:border-primary-500 border placeholder-shown:border focus:border-2 focus:border-t-transparent disabled:border-0;
}

.label_base {
    @apply text-base font-medium leading-tight text-primary-500 peer-disabled:text-transparent;
    @apply peer-placeholder-shown:text-base peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-primary-500 peer-disabled:peer-placeholder-shown:text-primary-500 peer-focus:text-base peer-focus:leading-tight peer-focus:text-primary-500;
    @apply before:border-t before:border-l before:border-primary-200 after:border-t after:border-r after:border-primary-200 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-primary-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-primary-500 peer-disabled:before:border-transparent peer-disabled:after:border-transparent;
    @apply pointer-events-none absolute left-0 -top-2.5 flex size-full select-none transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:transition-all;
}
</style>