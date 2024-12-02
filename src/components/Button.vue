<script lang="ts" setup>
const { rounded = 'md' } = defineProps<{ rounded?: "sm" | 'md' | 'full' }>()
const emit = defineEmits<{ (e: "click"): void }>()


</script>

<template>
    <button :data-rounded="rounded" class="base" @click="emit('click')">
        <slot>
            Button
        </slot>
    </button>
</template>

<style scoped>
.base {
    @apply max-w-fit h-10;
    @apply transition-all ease-in-out hover:scale-105 active:scale-100;
    @apply inline-flex items-center gap-2 px-4 py-2;
    @apply hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none;
    @apply bg-gradient-to-br from-primary-600/60 to-primary-600 hover:shadow-primary-600/40;
    @apply hover:bg-gradient-to-tr hover:from-primary-600/80 hover:to-primary-700/80 active:bg-gradient-to-r active:bg-primary-600;
    @apply text-lg font-bold text-primary-50 tracking-widest;
    @apply data-[rounded='sm']:rounded-sm data-[rounded='md']:rounded-md data-[rounded='full']:rounded-full;
}
</style>