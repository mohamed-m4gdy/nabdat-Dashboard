<script setup lang="ts">
import axios from '@axios'
import { linkGnirator } from '@/helpers/linkGenrator'

const props = defineProps(['value', 'label'])
const emit = defineEmits(['change'])


const path = ref(props.value)
const link = ref(props.value)
const loading = ref(false)
const error = ref<string[]>([])

const removeFile = () => {
  path.value = ''
  link.value = ''
  emit('change', '')
}

const showError = (errors: string[]) => {
  removeFile()
  error.value = errors
  setTimeout(() => {error.value = []}, 3000)
}

const upladFile = (event: any) => {
  loading.value = true
  const file = event.target.files[0]
  const formData = new FormData()
  formData.append('media[0]', file)
  event.target.value = null


  axios.post(linkGnirator('media/add'),
    formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  ).then(response => {
    path.value = response.data.data[0].path
    link.value = response.data.data[0].url
    emit('change', response.data.data[0].path)
    loading.value = false
  }).catch (err => {
    if (err.response?.data?.errors) {
      const serverErrors: string[] = []
      for (const key in err.response.data.errors)
            serverErrors.push(err.response.data.errors[key][0])
      showError(serverErrors)
    } else {
      showError(['Error in uploading file'])
    }
    loading.value = false
  })
}
watch(() => props.value, value => {
  if (path.value != value) {
    path.value = value
    link.value = value
  }
})
</script>

<template>
  <div class="p-relative">
    <div class="d-flex">
      <VIcon
        v-if="!loading"
        size="20"
        icon="mdi-paperclip"
      />
      <VIcon
        v-if="loading"
        size="20"
        icon="mdi-loading"
        class="rotating"
      />
      <p class="ms-2">{{ path ? path : $t('No file chosen')}}</p>
    </div>
    <input v-if="!loading" type="file" accept="image/png, image/jpeg, image/bmp" @change="upladFile" />
  </div>
  <a :href="link" v-if="link" target="_blank">{{ $t('Show file') }}</a>
</template>

<style lang="scss" scoped>
  .p-relative {
    position: relative;
  }
  .mtstep {
    margin-top: 20px;
  }
  input {
    position: absolute;
    top: 0;
    left: 0px;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  p {
    text-overflow: ellipsis;
    overflow: hidden;
    width: 70%;
    height: 20px;
    white-space: nowrap;
  }
  @-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.rotating {
  -webkit-animation: rotating 2s linear infinite;
  -moz-animation: rotating 2s linear infinite;
  -ms-animation: rotating 2s linear infinite;
  -o-animation: rotating 2s linear infinite;
  animation: rotating 2s linear infinite;
}

</style>
