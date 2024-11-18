<script setup lang="ts">
import { GoogleMap, Marker } from 'vue3-google-map'
import { useGlobalStore } from '@/helpers/global'
import AutoCompelete from './AutoComplete.vue'

const props = defineProps(['lat', 'lon'])
const emit = defineEmits(['update:lat', 'update:lon'])

const store = useGlobalStore()

const googleKey = ref<string>('AIzaSyCjHYJOtDUkEdA47TQ1hcEcDf9F_aBx3Ow')

// set location
const center = ref({
 lat: props.lat ? Number(props.lat) : store.coords.latitude,
 lng: props.lon ? Number(props.lon) : store.coords.longitude
})

watchEffect(() => {
  center.value = {
    lat: props.lat ? Number(props.lat) : store.coords.latitude,
    lng:  props.lon ? Number(props.lon) : store.coords.longitude
  }  
})

// copy location to watch on it
const toWatch = ref({
 lat: 0,
 lng: 0
})

watch(() => toWatch.value, (newValue, oldValue) => {
  center.value = {
    lat: newValue.lat,
    lng: newValue.lng
  }
  emit('update:lat', newValue.lat)
  emit('update:lon', newValue.lng)
})

// Update mark on click on the map
const updateMarkerPosition = (event: any) => {
  center.value = {
    lat: event.latLng.lat(),
    lng: event.latLng.lng()
  }
  emit('update:lat', event.latLng.lat())
  emit('update:lon', event.latLng.lng())
}
</script>

<template>
  <div class="position-relative mt-10 mb-10">
    <AutoCompelete v-model:value="toWatch" />
    <GoogleMap
      :api-key="googleKey"
      style="width: 100%; height: 500px"
      :center="center"
      :clickableIcons="true"
      :zoom="15"
      @click="updateMarkerPosition"
    >
      <Marker
        :options="{ position: center }"  
      />
    </GoogleMap>
  </div>
</template>
