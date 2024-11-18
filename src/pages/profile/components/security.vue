<script setup lang="ts">
import { helpers, minLength, required } from '@vuelidate/validators'
import formHock from '@/helpers/formHock'

interface updatePassword {
  old_password: string
  password: string
}

// prepare item
const formSetup: updatePassword = {
  old_password: '',
  password: '',
}

// validation
const rules = {
  old_password: {
    required: helpers.withMessage('Old password is required', required),
    minLength: helpers.withMessage('Old password must be bigger than or equal 8', minLength(8)),
  },
  password: {
    required: helpers.withMessage('Password is required', required),
    minLength: helpers.withMessage('Password must be bigger than or equal 8', minLength(8)),
  },
}

const { item, loading, getInputError, saveItem, serverErrors } = formHock<updatePassword>('admin/reset-password/profile', 'add', formSetup, rules)

const router = useRouter()

const submitItem = async () => {
  const response = await saveItem()
  if (response.status) {
    // go back
    router.go(-1)
  }
  else {
    // scroll to top screen
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Generate random password
const generatePassword = () => item.value.password = `#${Math.random().toString(36).slice(2)}${Math.random().toString(36).toUpperCase().slice(2)}`
</script>

<template>
  <VCard
    id="invoice-list"
    :title="$t('Update password')"
  >
    <Form
      :loading="loading"
      :server-errors="serverErrors"
      @save-item="submitItem"
    >
      <VRow>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="item.old_password"
            :label="$t('Old password')"
            :error-messages="getInputError('old_password')"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="item.password"
            :label="$t('Password')"
            :error-messages="getInputError('password')"
            append-inner-icon="mdi-plus-circle"
            @click:append-inner="generatePassword"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        />
      </VRow>
    </Form>
  </VCard>
</template>
