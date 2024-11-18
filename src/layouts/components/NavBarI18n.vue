<script lang="ts" setup>
import NavBarI18n from '@core/components/I18n.vue'
import { useThemeConfig } from '@core/composable/useThemeConfig'
import type { I18nLanguage } from '@layouts/types'
import axios from 'axios'
import i18n from '@/plugins/i18n'

const { isAppRtl } = useThemeConfig()

const i18nCompLanguages: I18nLanguage[] = [
  {
    label: 'English',
    i18nLang: 'en',
  },
  {
    label: 'Arabic',
    i18nLang: 'ar',
  },
]

const handleLangChange = (lang: string) => {
  // asign token to axios
  localStorage.setItem('lang', lang)
  i18n.global.locale.value = lang
  axios.defaults.headers.common['Accept-Language'] =  lang
  isAppRtl.value = lang === 'ar'
  location.reload()
}
</script>

<template>
  <NavBarI18n
    :languages="i18nCompLanguages"
    @change="handleLangChange"
  />
</template>
