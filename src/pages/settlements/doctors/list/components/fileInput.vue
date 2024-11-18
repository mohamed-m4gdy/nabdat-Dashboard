<script setup lang="ts">
import axios from '@axios'
import { linkGnirator } from '@/helpers/linkGenrator'
import avatar1 from '@images/avatars/avatar-1.png'

const props = defineProps(['value', 'imageWrapper', 'label', 'items', 'index', 'minus'])
const emit = defineEmits(['update:value', 'removeIndex'])

const image = ref('')
const link = ref('')
const loading = ref(false)
const error = ref<string[]>([])

const removeFile = () => {
  link.value = ''
  emit('update:value', '')
}

const showError = (errors: string[]) => {
  removeFile()
  error.value = errors
  setTimeout(() => {error.value = []}, 3000)
}

const upladFile = (event: any) => {
  loading.value = true
  const file = event.target.files[0]
  image.value = URL.createObjectURL(file)
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
    link.value = response.data.data[0].url
    emit('update:value', response.data.data[0].path)
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

</script>

<template>
  <VRow
    class="align-center justify-center p-relative"
    :class="props.imageWrapper"
  >
    <div
      v-if="!props.imageWrapper"
      class="linkContainer"
    >
      <div>{{ link }}</div>
    </div>
    <div
      v-if="props.imageWrapper"
      class="imageContainer"
    >
      <!-- 👉 photo -->
      <VAvatar
        rounded="sm"
        :size="150"
      >
        <template v-if="loading">
            <VImg
              :src="image"
              style="opacity: 0.5;"
            />
        </template>
        <template v-else >
          
          <template v-if="link">
            <VImg :src="link" />
          </template>
          <template v-else-if="items">
            <VImg :src="items" />
          </template>
          <template v-else>
            <VIcon
              size="100"
              icon="mdi-cloud-upload-outline"
              class="me-3"
            />
          </template>
        </template>
      </VAvatar>

      <div
        v-if="props.minus"
        class="minus"
      >
        <VIcon
          icon="mdi-minus-box"
          size="25"
          @click=" emit('removeIndex', props.index)"
        />
      </div>
    </div>
    <VCol
      md="12"
      cols="12"
      class="uploadImage"
    >
      <VFileInput
        v-if="!loading"
        prepend-icon="mdi-camera"
        accept="image/png, image/jpeg, image/bmp"
        @change="upladFile"
      />
    </VCol>
    <p class="text-red" style="color: rgb(255,76,81);text-align: center;" v-for="err in error">{{err}}</p>
  </VRow>
</template>

<style lang="scss">
  .border-top {
    h4 {
      border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity)) !important;
    }
  }
  .p-relative {
    position: relative;
  }
  .imageWrapper {
    .imageContainer {
      padding: 20px;
      border: dashed 1px #ffffff3d;
      position: relative;
    }
  }
  .v-theme--light {
    .imageWrapper {
      .imageContainer {
        border: 1px dashed rgb(5 2 2 / 33%);
      }
    }
  }
  .imageWrapper {
    .uploadImage {
      .v-input__prepend {
        display: none;
      }
    }
  }
  .imageWrapper {
    .uploadImage {
      .v-input__control {
        border: 1px solid red;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;
        z-index: 1;
      }
    }
  }
  .linkContainer {
    position: absolute;
    left: 20%;
    overflow: hidden;
    width: 70%;
    white-space: nowrap;
    direction: rtl;
  }
  .v-theme--dark {
    .uploadImage {
      .v-field__outline {
        color: #ffffff38 !important;
      }
    }
  }
  .v-theme--light {
    .uploadImage {
      .v-field__outline {
        color: #8080805c !important
      }
    }
  }
  .minus {
    position: absolute;
    top: 0;
    background: none !important;
    z-index: 989;
    right: 0;
    min-width: 10px !important;
    height: 30px !important;
  }
</style>
