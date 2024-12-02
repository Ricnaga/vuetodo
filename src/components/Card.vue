<template>
    <div class="card_container">
        <div class="card_content">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.card_container {
    @apply flex items-center justify-center mb-6;
}

.card_content {
    @apply w-full p-4 bg-white border border-primary-50 rounded-lg shadow-lg text-center;
}
</style>