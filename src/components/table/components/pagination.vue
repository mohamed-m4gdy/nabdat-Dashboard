<script setup lang="ts">
defineProps(['options', 'totalPages', 'totalItems'])
defineEmits(['changePage'])
</script>
<template>
    <div class="d-flex justify-end flex-wrap gap-x-6 pa-2">
        <div class="d-flex align-center gap-x-2 text-sm">
            {{ $t('Rows Per Page') }}:
            <VSelect 
                v-model="options.per_page"
                class="per-page-select text-high-emphasis" 
                variant="plain" 
                density="compact"
                :items="[10, 15, 20, 25, 50, 100]" 
            />
        </div>
        <span class="d-flex align-center text-sm text-high-emphasis me-2"> {{(options.page - 1) * options.per_page + 1}}  - {{(options.page) * options.per_page < totalItems ? (options.page) * options.per_page : totalItems}} {{$t('of')}} {{ totalItems }} </span>

        <div class="d-flex gap-x-2 align-center me-2">
            <VBtn class="flip-in-rtl" icon="mdi-chevron-left" variant="text" density="comfortable" color="default"
                :disabled="options.page <= 1" @click="$emit('changePage', options.page - 1)" />

            <VBtn class="flip-in-rtl" icon="mdi-chevron-right" density="comfortable" variant="text" color="default"
                :disabled="options.page >= totalPages" @click="$emit('changePage', options.page + 1)" />
        </div>
    </div>
</template>
