<script setup>
import VueGoogleAutocomplete from "vue-google-autocomplete"

const prop = defineProps(['value'])
const emit = defineEmits(['update:value'])

const getAddressData = (e) => {
  const selectedValue = ref({lat: e.latitude, lng: e.longitude })
  emit('update:value', selectedValue.value)
}
</script>

<template>
  <div class="autoCompleteWrapper">
    <vue-google-autocomplete 
      id="map"
      classname="v-field__input autoComplete form-control"
      :placeholder="$t('Search for place')"
      v-on:placechanged="getAddressData"
      :country="['eg', 'ae', 'sa']"
    />
  </div>
</template>
<style scoped>
.autoCompleteWrapper {
  position: absolute;
  top: 1px;
  z-index: 5;
  left: 25%;
  width: 50%;
  background: rgb(var(--v-theme-surface));
}
.autoCompleteWrapper .autoComplete {
  padding: 11px;
  border: 1px solid rgb(118, 118, 118);
  width: 90%;
  margin: 5%;
  border-radius: 7px;
}
.v-theme--light .autoCompleteWrapper .autoComplete {
  border: 1px solid rgb(133 133 133 / 58%);
}
</style>
