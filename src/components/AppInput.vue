<script setup lang="ts">

const { placeholder, modelValue } = defineProps<{ placeholder?: string, modelValue: string }>()
const emit = defineEmits<{
  (e: 'update', value: string): void
}>();

</script>

<template>
  <div class="relative h-10 w-full md:min-w-[256px]">
    <input
      class="input_base peer"
      placeholder=" "
      :value="modelValue"
      @input="emit('update', ($event.target as HTMLInputElement).value)"
    >
    <label
      v-show="!!placeholder"
      class="label_base before:content[' '] after:content[' ']"
    >
      {{ placeholder }}
    </label>
  </div>
</template>

<style scoped>
.input_base {
  @apply focus:shadow-lg h-full w-full rounded-md border border-primary-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-primary-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-primary-200 placeholder-shown:border-t-primary-200 focus:border-2 focus:border-primary-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-primary-50;
}

.label_base {
  @apply pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-xs font-medium leading-tight text-primary-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-primary-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-primary-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-primary-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-primary-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-primary-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-primary-500;
}
</style>
