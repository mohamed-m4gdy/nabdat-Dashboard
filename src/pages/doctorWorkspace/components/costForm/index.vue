<script setup lang="ts">
import type Iform from './Iform'
import validation from './validation'
// get form helper
import formHock from '@/helpers/formHock'

const prop = defineProps(['workspaceId'])
const emit = defineEmits(['close', 'updateForm'])
const {t : $t} = useI18n()

const showFrom = ref<boolean>(true)

const formSetup: Iform = {
  cost: null,
  follow_up_cost:  null,
  allow_online_pay: false
}

const { item, loading, getInputError, saveItem, serverErrors } = formHock<Iform>(`doctorworkspace/cost`, 'edit', formSetup, validation, prop.workspaceId )

// approve method
const submit = async () => {
  const response = await saveItem()
  if (response.status) emit('updateForm')
}
</script>

<template>
  <VDialog
    v-model="showFrom"
    persistent
    width="500"
  >
    <!-- Dialog Content -->
    <VCard :title="$t('Workspace cost')">
      <DialogCloseBtn
        variant="text"
        size="small"
        @click="$emit('close')"
      />

      <FormModel
        :loading="loading"
        :errors="[]"
        :server-errors="serverErrors"
        @save-item="submit"
      >
        <VRow class="my-3 mx-3">
          <VCol
            cols="12"
          >
            <VTextField
              v-model="item.cost"
              type="number"
              :label="$t('Cost')"
              :error-messages="getInputError('cost')"
              :suffix="$t('EGP')"
              persistent-placeholder
            />
          </VCol>
          <VCol
            cols="12"
          >
            <VTextField
              v-model="item.follow_up_cost"
              :label="$t('Follow up cost')"
              type="number"
              :error-messages="getInputError('follow_up_cost')"
              :suffix="$t('EGP')"
              persistent-placeholder
            />
          </VCol>
          <VCol
            cols="12"
          >
            <VCheckbox
              v-model="item.allow_online_pay"
              :label="$t('Online Payment')"
            />
          </VCol>
        </VRow>
      </FormModel>

      <VCardActions>
        <VSpacer />
        <VBtn
          v-if="!loading"
          @click="submit"
        >
          {{ $t('Save') }}
        </VBtn>
        <VBtn v-if="loading">
          {{ $t('Loading') }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
