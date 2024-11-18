<script setup lang="ts">
import { useTheme } from 'vuetify'
import ScrollToTop from '@core/components/ScrollToTop.vue'
import { useThemeConfig } from '@core/composable/useThemeConfig'
import { hexToRgb } from '@layouts/utils'
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken } from "firebase/messaging"

const { syncInitialLoaderTheme, syncVuetifyThemeWithTheme: syncConfigThemeWithVuetifyTheme, isAppRtl, handleSkinChanges } = useThemeConfig()

const { global } = useTheme()

const firebaseConfig = {
  apiKey: "AIzaSyDEF6Aa40owGZ0K8C1_35sr6MEZdZ19udw",
  authDomain: "nabdat-854e6.firebaseapp.com",
  databaseURL: "https://nabdat-854e6-default-rtdb.firebaseio.com",
  projectId: "nabdat-854e6",
  storageBucket: "nabdat-854e6.appspot.com",
  messagingSenderId: "627959663340",
  appId: "1:627959663340:web:5c2d58dfb70e84b50473c9",
  measurementId: "G-QN39P260QJ"
}

initializeApp(firebaseConfig)

const messaging = getMessaging()

getToken(messaging, { vapidKey: 'BCTsqLZAm_HbuZIZiudAA64pvUVIEGMJweuzLpKdj6DKlAH_21u72fQQD8E-ZMgKvER7DYItep1EM-K2_TPgIU0' }).then((currentToken) => {
  if (currentToken) {
    localStorage.setItem('deviceToken', currentToken)
    // ...
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err: any) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});


// ℹ️ Sync current theme with initial loader theme
syncInitialLoaderTheme()
syncConfigThemeWithVuetifyTheme()
handleSkinChanges()
</script>

<template>
  <VLocaleProvider :rtl="isAppRtl">
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
      <RouterView />
      <ScrollToTop />
    </VApp>
  </VLocaleProvider>
</template>
