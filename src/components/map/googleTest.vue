<script setup>
/* eslint-disable no-undef */
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
// import AutoComplete from './AutoComplete.vue'
import { Loader } from '@googlemaps/js-api-loader'
import { useGeolocation } from '@/helpers/useGeolocation'

const GOOGLE_MAPS_API_KEY = 'AIzaSyCjHYJOtDUkEdA47TQ1hcEcDf9F_aBx3Ow'
const { coords } = useGeolocation()

const currPos = computed(() => ({
  lat: coords.value.latitude,
  lng: coords.value.longitude
}))

const otherPos = ref(null)

const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY })

const mapDiv = ref(null)

let map = ref(null)

let clickListener = null

onMounted(async () => {
  await loader.load()
  map.value = new google.maps.Map(mapDiv.value, {
    center: currPos.value,
    libraries: ['places'],
    zoom: 15
  })
  clickListener = map.value.addListener(
    'click',
    ({ latLng: { lat, lng } }) =>
      (otherPos.value = { lat: lat(), lng: lng() })
  )
  
})
onUnmounted(async () => {
  if (clickListener) clickListener.remove()
})

let line = null

watch([map, currPos, otherPos], () => {
  if (line) line.setMap(null)
  if (map.value && otherPos.value != null)
    line = new google.maps.Polyline({
      path: [currPos.value, otherPos.value],
      map: map.value
    })
})

const haversineDistance = (pos1, pos2) => {
  const R = 3958.8 // Radius of the Earth in miles
  const rlat1 = pos1.lat * (Math.PI / 180) // Convert degrees to radians
  const rlat2 = pos2.lat * (Math.PI / 180) // Convert degrees to radians
  const difflat = rlat2 - rlat1 // Radian difference (latitudes)
  const difflon = (pos2.lng - pos1.lng) * (Math.PI / 180) // Radian difference (longitudes)

  const d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    )
  return d
}

const distance = computed(() =>
  otherPos.value === null
    ? 0
    : haversineDistance(currPos.value, otherPos.value)
)
</script>

<template>
  <div class="d-flex text-center" style="height: 20vh">
    <div class="m-auto">
      <h4>Clicked Position</h4>
      <span v-if="otherPos">
        Latitude: {{ otherPos.lat }}, Longitude:
        {{ otherPos.lng }}
      </span>
      <span v-else>Click the map to select a position</span>
    </div>
  </div>
  <div ref="mapDiv" style="width: 100%; height: 80vh" />
  <!-- <AutoComplete /> -->
</template>

