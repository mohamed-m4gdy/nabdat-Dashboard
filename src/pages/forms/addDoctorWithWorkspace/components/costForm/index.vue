<script setup lang="ts">
import type Iform from './Iform'
import validation from './validation'
// get form helper
import formHock from '@/helpers/formHock'

const prop = defineProps(['doctorWorkspaceId'])
const emit = defineEmits(['onSuccess'])


const formSetup: Iform = {
  cost: null,
  follow_up_cost:  null,
  allow_online_pay: false
}

const { item, loading, getInputError, saveItem, serverErrors } = formHock<Iform>(`doctorworkspace/cost`, 'edit', formSetup, validation, prop.doctorWorkspaceId )

// approve method
const submitItem = async () => {
  const response = await saveItem()
  if (response.status) 
    emit('onSuccess')
  else 
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

</script>

<template>
  <div>
      <VAlert class="mb-4" border="start" border-color="error" v-for="error in serverErrors" :key="error">
          {{ error }}
      </VAlert>
  </div>
  <VRow>
    <VCol cols="12">
      <h6 class="text-sm font-weight-medium">
        {{$t('Cost details')}}
      </h6>
      <p class="text-xs mb-0">
        {{$t('Enter cost details')}}
      </p>
    </VCol>
    <VCol
      cols="6"
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
      cols="6"
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
    <VCol cols="12">
      <div class="d-flex justify-end flex-wrap gap-4">
        <VBtn v-if="!loading" @click="submitItem">
          {{ $t('Next') }}
          <VIcon
            icon="mdi-arrow-right"
            end
            class="flip-in-rtl"
          />
        </VBtn>
        <VBtn v-else>
          {{ $t('Loading') }}
        </VBtn>
      </div>
    </VCol>
  </VRow>
</template>
