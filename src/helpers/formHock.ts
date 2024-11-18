import { useToast } from 'vue-toastification'
import { useVuelidate } from '@vuelidate/core'
import linkGenrator from './linkGenrator'
import axios from '@axios'
import i18n from '@/plugins/i18n'

const toast = useToast()

const formHock = <formType> (path: string, action: string, formSetup: formType, rules: any, editId = 0, hosptailId = 0) => {
  // form parameters logic
  const item = ref<formType>(formSetup)
  const loading = ref<boolean>(false)
  const uploadLoading = ref<boolean>(false)
  const serverErrors = ref<string[]>([])

  // asign validation
  const validate = useVuelidate(rules, item)

  // this method save item in create and edit items
  const saveItem = async (): Promise<{ status: boolean, data?: any }> => {
    // stop if file is uploading
    if (uploadLoading.value) {
      // add message
      serverErrors.value.push('Pleas wait to upload files')

      // return to stop
      return {
        status: false,
      }
    }

    // stop if not valid
    const valid = await validate.value.$validate()
    if (!valid) {
      if (validate.value.$errors.length > 1) {
        toast.error(`${validate.value.$errors[0].$message} ${i18n.global.t('and')} ${validate.value.$errors.length - 1} ${i18n.global.t('more')}`)
      } else {
        toast.error(`${validate.value.$errors[0].$message}`)
      }
      // return to stop
      return {
        status: false,
      }
    }

    // prepare function
    serverErrors.value = []
    loading.value = true

    // if type is create
    if (action == 'add') {
      try {
        const data = await axios.post(
          linkGenrator(path),
          item.value,
        )

        toast.success(i18n.global.t('Added new item successfully'))

        // stop loading
        loading.value = false

        // return to stop
        return {
          status: true,
          data: data.data
        }
      }
      catch (error: any) {
        loading.value = false

        // handel error and push to errors
        if (error.code == 'ERR_NETWORK') {
          serverErrors.value.push('Netwerk error you have error in your network')
        }
        else if (error.response?.status == '422') {
          for (const key in error.response.data.errors)
            serverErrors.value.push(error.response.data.errors[key][0])
        }

        // return to stop
        return {
          status: false,
        }
      }
    }

    // if type is create
    if (action == 'hospital') {
      try {
        await axios.post(
          linkGenrator(`${path}/${hosptailId}/doctor/${editId}`),
          item.value,
        )

        toast.success(i18n.global.t('Added new item successfully'))

        // stop loading
        loading.value = false

        // return to stop
        return {
          status: true,
        }
      }
      catch (error: any) {
        loading.value = false

        // handel error and push to errors
        if (error.code == 'ERR_NETWORK') {
          serverErrors.value.push('Netwerk error you have error in your network')
        }
        else if (error.response?.status == '422') {
          for (const key in error.response.data.errors)
            serverErrors.value.push(error.response.data.errors[key][0])
        }

        // return to stop
        return {
          status: false,
        }
      }
    }

    // if type is patch
    if (action == 'patch') {
      try {
        await axios.patch(
          linkGenrator(path),
          item.value,
        )

        toast.success(i18n.global.t('Item updated successfully'))

        // stop loading
        loading.value = false

        // return to stop
        return {
          status: true,
        }
      }
      catch (error: any) {
        loading.value = false

        // handel error and push to errors
        if (error.code == 'ERR_NETWORK') {
          serverErrors.value.push('Netwerk error you have error in your network')
        }
        else if (error.response?.status == '422') {
          for (const key in error.response.data.errors)
            serverErrors.value.push(error.response.data.errors[key][0])
        }

        // return to stop
        return {
          status: false,
        }
      }
    }

    // if type ie edit
    else if (action == 'edit') {
      try {
        await axios.put(
          linkGenrator(editId ? `${path}/${editId}` : path),
          item.value,
        )

        toast.success(i18n.global.t('Item updated successfully'))

        // stop loading
        loading.value = false

        // return to stop
        return {
          status: true,
        }
      }
      catch (error: any) {
        // stop loader
        loading.value = false

        // handel error and push to errors
        if (error.code == 'ERR_NETWORK') {
          serverErrors.value.push('Netwerk error you have error in your network')
        }
        else if (error.response?.status == '422') {
          for (const key in error.response.data.errors)
            serverErrors.value.push(error.response.data.errors[key])
        }

        // return to stop
        return {
          status: false,
        }
      }
    }

    else if (action == 'editPath') {
      try {
        await axios.put(
          linkGenrator(path),
          item.value,
        )

        toast.success(i18n.global.t('Item updated successfully'))

        // stop loading
        loading.value = false

        // return to stop
        return {
          status: true,
        }
      }
      catch (error: any) {
        // stop loader
        loading.value = false

        // handel error and push to errors
        if (error.code == 'ERR_NETWORK') {
          serverErrors.value.push('Netwerk error you have error in your network')
        }
        else if (error.response?.status == '422') {
          for (const key in error.response.data.errors)
            serverErrors.value.push(error.response.data.errors[key])
        }

        // return to stop
        return {
          status: false,
        }
      }
    }

    // return to stop
    return {
      status: false,
    }
  }

  // get item from  data base
  const getItem = () => {
    // start loading
    loading.value = true

    // start get item
    axios.get(
      linkGenrator(editId ? `${path}/${editId}/edit` : `${path}/edit`),
    )
      .then(response => {
      // push to item
        item.value = response.data.data

        // stop loading
        loading.value = false
      }).catch(() => {
        serverErrors.value.push('Error in get item')

        // stop loading
        loading.value = false
      })
  }


  // get item from  data base
  const getDoctor = () => {
    // start loading
    loading.value = true

    // start get item
    axios.get(
      linkGenrator(`${path}/${hosptailId}/doctor/${editId}`),
    )
      .then(response => {
      // push to item
        item.value = response.data.data

        // stop loading
        loading.value = false
      }).catch(() => {
        serverErrors.value.push('Error in get item')

        // stop loading
        loading.value = false
      })
  }



  // get input error
  const getInputError = (path: string) => validate.value.$errors.filter((el: any) => el.$propertyPath == path).map((el: any) => el.$message)

  // update uploading value
  const updateUploadLoading = (value: boolean) => uploadLoading.value = value

  // get item on edit
  if (action == 'edit')
    getItem()

  if (action == 'hospital')
  getDoctor()

  // erturn hock params
  return { item, loading, uploadLoading, serverErrors, saveItem, getItem, getInputError, updateUploadLoading }
}

export default formHock
