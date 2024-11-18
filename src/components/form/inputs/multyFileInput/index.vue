<template>
    <div
        class="rounded-lg border pa-1"
    >
        <VList
            lines="three"
            density="compact"
            select-strategy="classic"
        >
            <VListSubheader>{{ label }}</VListSubheader>

            <VListItem v-for="(file, index) in files">
                <div class="d-flex" :key="index">
                    <VIcon
                        class="text-danger me-4 mw-30"
                        size="20"
                        icon="mdi-close"
                        @click="removeIndex"
                    />
                    <div class="w-100">
                        <innerFileInput
                            image-wrapper="imageWrapper"
                            minus="true"
                            :value="file"
                            @change="(value: string) => updateFile(value, index)"
                        />
                    </div>
                </div>
            </VListItem>

            <VListItem  @click="addFileInput">
                <VIcon
                    icon="mdi-plus-box"
                    size="22"
                /> {{ $t('Add file') }}
            </VListItem>

        </VList>
        <div class="v-input--error" v-if="typeof errorMessages != 'undefined' && errorMessages.length">
            <div class="v-input__details" v-if="typeof errorMessages != 'undefined' && errorMessages.length">
                <div class="v-messages" role="alert" aria-live="polite" id="input-10-messages">
                        <div class="v-messages__message"  v-for="error in errorMessages">{{error}}</div>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">

const props = defineProps(['label', 'value', 'errorMessages'])
const emit = defineEmits(['update:value', 'change'])


// To add new File inpput
const files = ref<string[]>([''])
const addFileInput = () => files.value.push('')

// To remove File inpput
const removeIndex = (index: number) => {
    if(files.value.length > 1) files.value.splice(index, 1)
}

// to update file
const updateFile = (value: string, index: number) => {
    files.value[index] = value
}

// if data changed
watch(files, (value) => emit('update:value', value), {deep: true})
// if date came from props
watch(() => props.value, value => files.value = value)

</script>
<style scoped>
.v-list-item--density-compact.v-list-item--three-line {
    min-height: 2px !important;
}
.mw-30 {
    min-width: 30px;
}
</style>