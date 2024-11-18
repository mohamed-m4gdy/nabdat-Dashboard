<script setup>
import { ref } from 'vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const props = defineProps(['value', 'label'])

const emit = defineEmits(['update:value'])

const content = ref('')

const editorConfig = ref({
  // The configuration of the editor.
  fillEmptyBlocks: false,
  basicEntities: false,
  entities: false,
  entities_greek: false,
  entities_latin: false,
  entities_additional: '',
  minHeight: '350px',
  color: 'red',
})

watchEffect(() => {
  content.value = props.value
})
watch(content, value => {
  emit('update:value', value)
})
</script>

<template>
  <label
    class="cklabel"
    for="editor"
  > {{ props.label }} </label>
  <Ckeditor
    v-model="content"
    :editor="ClassicEditor"
    :config="editorConfig"
    tag-name="textarea"
  />
</template>

<style lang="css">
.v-theme--light .ck.ck-content.ck-editor__editable {
  min-height: 200px;
  color: #000;
}
 .v-theme--dark .ck.ck-content.ck-editor__editable {
   min-height: 200px;
   color: #fff;
   background-color: #3F3F3F !important;
   border: 1px solid #ffffff2e !important;
  }
.v-theme--dark .ck.ck-toolbar.ck-toolbar_grouping {
  background-color: #3F3F3F !important;
  border: 1px solid #ffffff2e !important;
}
.v-theme--dark .ck.ck-toolbar__items * {
  color: #fff !important;
  background-color: #3F3F3F !important;
}
.v-theme--dark .ck.ck-toolbar__items *:hover {
  color: #fff !important;
  background-color: #2d2d2d !important;
}
.cklabel {
  font-size: 16px;
    margin-bottom: 2px;
    display: block;
}
</style>
