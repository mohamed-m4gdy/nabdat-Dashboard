// function to Get Current Location
export function useGeolocation() {
  const coords = ref({ latitude: 30.0605514245151, longitude: 31.220548152923584 })
  const isSupported = 'navigator' in window && 'geolocation' in navigator

  let watcher: any = null
  onMounted(() => {
    if (isSupported)
      watcher = navigator.geolocation.watchPosition(
        position => (coords.value = position.coords)
      )
  })
  onUnmounted(() => {
    if (watcher) navigator.geolocation.clearWatch(watcher)
  })

  return { coords, isSupported }
}
