<script lang="ts" setup>
import { reactive } from 'vue';

type AppButtonProps = {
  rounded?: "small" | 'medium' | 'large';
  variant?: 'contained' | 'outline';
  color?: 'primary' | 'secondary' | 'error'
  isDisabled?: boolean
}

const { rounded = 'medium', variant = 'contained', color = 'primary', isDisabled = false } = defineProps<AppButtonProps>();

const classObject = reactive({
  base: true,
  contained: variant === 'contained',
  outline: variant === 'outline',
  'rounded-small': rounded === 'small',
  'rounded-medium': rounded === 'medium',
  'rounded-large': rounded === 'large',
  error: color === 'error'
});

const emit = defineEmits<{ (e: "click"): void }>()

</script>

<template>
  <button
    :disabled="isDisabled"
    :data-variant="variant"
    :class="classObject"
    @click="emit('click')"
  >
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
  @apply text-lg font-bold tracking-widest;
}

.rounded-small {
  @apply rounded-sm;
}

.rounded-medium {
  @apply rounded-md;
}

.rounded-large {
  @apply rounded-full;
}

.contained {
  @apply bg-gradient-to-br from-primary-600/60 to-primary-600 hover:shadow-primary-600/40 text-primary-50;
  @apply hover:bg-gradient-to-tr hover:from-primary-600/80 hover:to-primary-700/80 active:bg-gradient-to-r active:bg-primary-600;
}

.outline {
  @apply border-0 border-secondary-500 text-secondary-500 hover:bg-secondary-200 active:bg-secondary-300/40; 
}

.error {
  @apply data-[variant='contained']:bg-gradient-to-br data-[variant='contained']:from-error-600/60 data-[variant='contained']:to-error-600 data-[variant='contained']:hover:shadow-error-600/40 data-[variant='contained']:text-error-50;
  @apply data-[variant='contained']:hover:bg-gradient-to-tr data-[variant='contained']:hover:from-error-600/80 data-[variant='contained']:hover:to-error-700/80 data-[variant='contained']:active:bg-gradient-to-r data-[variant='contained']:active:bg-error-600;

  @apply data-[variant='outline']:border-0 data-[variant='outline']:border-error-500 data-[variant='outline']:text-error-500 data-[variant='outline']:hover:bg-error-200 data-[variant='outline']:active:bg-error-300/40;
}
</style>