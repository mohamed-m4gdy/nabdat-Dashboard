<script lang="ts" setup>
defineProps(['title', 'loading', 'errors', 'serverErrors', 'stipForm', 'step', 'steps', 'withoutCard', 'submitText'])
</script>

<template>
    <VCard>
        <VCardText class="gap-4">
            <div>
                <VAlert class="mb-4" border="start" border-color="error" v-for="error in serverErrors" :key="error">
                    {{ error }}
                </VAlert>
            </div>
            <VForm class="mt-2" novalidate>
                <slot />

            </VForm>
        </VCardText>

        <VDivider />

        <VCardText class="d-flex gap-4">
            <VBtn v-if="!loading" @click="$emit('saveItem', $event)">
                {{ submitText ? submitText : $t('Submit') }}
            </VBtn>

            <VBtn v-if="loading">
                {{ $t('Loading') }}
            </VBtn>

        </VCardText>
    </VCard>
</template>
