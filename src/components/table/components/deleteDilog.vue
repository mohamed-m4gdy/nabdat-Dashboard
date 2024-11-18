<script setup lang="ts">
defineProps(['deleteText'])

const emit = defineEmits(['deleteItem'])

const openDilog = ref(true)
const loading = ref(false)

const deleteItem = () => {
    emit('deleteItem');
    loading.value = true;
}

</script>
<template>
    <VDialog v-model="openDilog" persistent class="v-dialog-sm">
        <!-- Dialog Content -->
        <VCard :title="deleteText ? deleteText.attention : $t('Attention')">
            <DialogCloseBtn variant="text" size="small" @click="$emit('colseDelete')" />

            <VCardText>
                {{ deleteText ? deleteText.areYouReallySureToDeleteTheItem : $t('are you really sure to delete the item') }}
            </VCardText>

            <VCardActions>
                <VSpacer />
                <VBtn color="error" @click="$emit('colseDelete')">
                    {{ deleteText ? deleteText.confirm : $t('Close') }}
                </VBtn>
                <VBtn color="success" @click="deleteItem" v-if="!loading">
                    {{ $t('Confirm') }}
                </VBtn>
                <VBtn color="dissabled" v-if="loading">
                    {{ $t('Loading') }}
                </VBtn>
            </VCardActions>
        </VCard>
    </VDialog>
</template>