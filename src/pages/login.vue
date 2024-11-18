<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import {
  helpers,
  maxLength,
  minLength,
  required,
} from '@vuelidate/validators'
import { VForm } from 'vuetify/components/VForm'

import linkGenrator from '@/helpers/linkGenrator'
import axios from '@axios'
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'
import authV2LoginIllustrationLight from '@images/pages/auth-v2-login-illustration-light.png'
import authV2MaskDark from '@images/pages/auth-v2-mask-dark.png'
import authV2MaskLight from '@images/pages/auth-v2-mask-light.png'
import tree from '@images/pages/tree.png'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'

const authThemeImg = useGenerateImageVariant(authV2LoginIllustrationLight, authV2LoginIllustrationDark, authV2LoginIllustrationBorderedLight, authV2LoginIllustrationBorderedDark, true)

const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)

const route = useRoute()
const router = useRouter()
const refVForm = ref<VForm>()
const isPasswordVisible = ref(false)
const item = ref<any>({})
const loading = ref<boolean>(false)
const serverErrors = ref<string[]>([])
const errors = ref<string>('')

// prepare item
item.value = {
  email: '',
  password: '',
}

// validation
const rules = {
  email: {
    required: helpers.withMessage('Email is required', required),
    minLength: helpers.withMessage('Email must be bigger than or equal 3', minLength(3)),
    maxLength: helpers.withMessage('Email must be smaller than or equal 121', maxLength(121)),
  },
  password: {
    required: helpers.withMessage('Passowrd is required', required),
  },
}

const validate = useVuelidate(rules, item)

const getInputError = (path: string) => validate.value.$errors.filter((el: any) => el.$propertyPath == path).map((el: any) => el.$message)

const login = async () => {
  // stop if not valid
  const valid = await validate.value.$validate()
  if (!valid) {
    // return to stop
    return {
      status: false,
    }
  }

  // prepare function
  serverErrors.value = []
  loading.value = true
  try {
    await axios.post(linkGenrator('auth/login'), item.value).then(response => {
      if (!response.data.success)
        errors.value = response.data.message

      // save token to localstorage
      localStorage.setItem('token', JSON.stringify(response.data.data.token))

      // Redirect to `to` query if exist or redirect to index route
      router.replace(route.query.to ? String(route.query.to) : '/')
    })
    loading.value = false
  }
  catch (error: any) {
    loading.value = false

    // handel error and push to errors
    // eslint-disable-next-line eqeqeq
    if (error.code == 'ERR_NETWORK') {
      serverErrors.value.push('Netwerk error you have error in your network')
    }
    // eslint-disable-next-line eqeqeq
    else if (error.response?.status == '422') {
      for (const key in error.response.data.errors)
        serverErrors.value.push(error.response.data.errors[key][0])
    }
  }
}

const onSubmit = () => {
  login()
}
</script>

<template>
  <div>
    <!-- Title and Logo -->
    <div class="auth-logo d-flex align-start gap-x-3">
      <VNodeRenderer :nodes="themeConfig.app.logo" />

      <h1 class="font-weight-medium leading-normal text-2xl text-uppercase">
        {{ themeConfig.app.title }}
      </h1>
    </div>

    <VRow
      no-gutters
      class="auth-wrapper"
    >
      <VCol
        lg="8"
        class="d-none d-lg-flex align-center justify-center position-relative"
      >
        <VImg
          max-width="768px"
          :src="authThemeImg"
          class="auth-illustration"
        />
        <VImg
          :width="276"
          :src="tree"
          class="auth-footer-start-tree"
        />
        <VImg
          class="auth-footer-mask"
          :src="authThemeMask"
        />
      </VCol>

      <VCol
        cols="12"
        lg="4"
        class="auth-card-v2 d-flex align-center justify-center"
      >
        <VCard
          flat
          :max-width="500"
          class="mt-12 mt-sm-0 pa-4"
        >
          <VCardText>
            <h5 class="text-h5 mb-1">
              {{ $t('Welcome to') }} {{ themeConfig.app.title }}! 👋🏻
            </h5>
            <p class="mb-0">
              {{ $t('Please sign-in to your account and start the adventure') }}
            </p>
          </VCardText>
          <VCardText>
            <VAlert
              color="primary"
              variant="tonal"
            >
              <p class="text-caption text-center mb-2">
                <strong>{{ $t('Admin control panel') }}</strong>
              </p>
            </VAlert>
          </VCardText>

          <VAlert
            v-for="error in serverErrors"
            :key="error"
            class="mb-4"
            border="start"
            border-color="error"
          >
            {{ error }}
          </VAlert>
          <VAlert
            v-if="errors"
            class="mb-4"
            border="start"
            border-color="error"
          >
            {{ errors }}
          </VAlert>
          <VCardText>
            <VForm
              ref="refVForm"
              :errors="[]"
              @submit.prevent="onSubmit"
            >
              <VRow>
                <!-- email -->
                <VCol cols="12">
                  <VTextField
                    v-model="item.email"
                    :label="$t('Email')"
                    :error-messages="getInputError('email')"
                  />
                </VCol>

                <!-- password -->
                <VCol cols="12">
                  <VTextField
                    v-model="item.password"
                    :label="$t('password')"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                    :error-messages="getInputError('password')"
                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  />
                  <VBtn
                    v-if="loading"
                    block
                    type="submit"
                    class="mt-5"
                  >
                    {{ $t('Loading') }}
                  </VBtn>
                  <VBtn
                    v-if="!loading"
                    block
                    type="submit"
                    class="mt-5"
                  >
                    {{ $t('Login') }}
                  </VBtn>
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: true
  loginPage: true
</route>
