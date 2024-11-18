/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import layoutsPlugin from '@/plugins/layouts'
import vuetify from '@/plugins/vuetify'
import i18n from '@/plugins/i18n'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@core/scss/template/index.scss'
import '@styles/styles.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import ckeditor from '@ckeditor/ckeditor5-vue'
import axios from '@axios'
import { useThemeConfig } from '@core/composable/useThemeConfig'
import type { PluginOptions } from 'vue-toastification'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { useToast } from 'vue-toastification'

const toast = useToast()

axios.interceptors.response.use(null, function(error) {
  toast.error(error.response?.data?.message)
  return Promise.reject(error);
});


// asign token to axios
const token = localStorage.getItem('token')
if (token)
  axios.defaults.headers.common.authorization = `Bearer ${JSON.parse(token as string)}`

// asign lang to axios
const lang = localStorage.getItem('lang') ?? 'ar'
const deviceToken = localStorage.getItem('deviceToken')

i18n.global.locale.value = lang


const getDeviceType = (userAgent: string) => {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) {
    return "ios"
  }
  if (
    /Android/.test(
      ua
    )
  ) {
    return "mobile"
  }
  return "desktop"
}

const userAgentString = window.navigator.userAgent;
const deviceType = getDeviceType(userAgentString);




axios.defaults.headers.common['Accept-Language'] = lang
axios.defaults.headers.common['device-lang'] = lang
axios.defaults.headers.common['device-type'] = deviceType;
axios.defaults.headers.common['device-token'] = deviceToken;

const { isAppRtl } = useThemeConfig()

isAppRtl.value = lang === 'ar'

const options: PluginOptions = {
  position: isAppRtl.value ? 'top-left' : 'top-right',
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: isAppRtl.value,
}

loadFonts()

// Create vue app
const app = createApp(App)

// Use plugins
app.use(vuetify)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(layoutsPlugin)
app.use(ckeditor)
app.use(Toast, options)

// Mount vue app
app.mount('#app')
