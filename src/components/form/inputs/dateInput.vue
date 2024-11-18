<script setup lang="ts">

const props = defineProps(['value', 'label', 'errorMessages'])

const emit = defineEmits(['update:value'])

const content = ref<string>('')

watch(() => props.value, (first, second) => {if (first != second) content.value = first})

</script>

<template>
    <AppDateTimePicker
        v-model:model-value="content"
        @update:model-value="emit('update:value', content)"
        :label="label"
        clear-icon="mdi-close"
        :class="typeof errorMessages != 'undefined' && errorMessages.length ? 'v-field--dirty v-field--error v-field--variant-outlined' : ''"
    />
    <div class="v-input--error" v-if="typeof errorMessages != 'undefined' && errorMessages.length">
        <div class="v-input__details" v-if="typeof errorMessages != 'undefined' && errorMessages.length">
            <div class="v-messages" role="alert" aria-live="polite" id="input-10-messages">
                    <div class="v-messages__message"  v-for="error in errorMessages">{{error}}</div>
            </div>
        </div>
    </div>
</template>
