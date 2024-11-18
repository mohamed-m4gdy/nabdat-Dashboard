import linkGenrator from './linkGenrator'
import axios from '@axios'

const showHock = (path: string) => {
  const itemId = ref(0)
  const item = ref<any>({})
  const loading = ref<boolean>(false)
  const error = ref<boolean>(false)

  // dilog controlers
  const showDialog = ref(false)

  // this method get item from end point
  const fetchItem = async (): Promise<void> => {
    // open loading
    loading.value = true

    // empty item
    item.value = {}

    // get item form backend
    axios.get(
      linkGenrator(path + itemId.value),
    )
      .then(response => {
        item.value = response.data.data

        // stop loader
        loading.value = false
      })
      .catch(() => {
        loading.value = false
        error.value = true
      })
  }

  // open popUp
  const show = (id: number) => {
      itemId.value = id
      showDialog.value = true
      fetchItem()
  }

  // close popUp
  const close = () => showDialog.value = false

  return { item, loading, error, fetchItem, show, close, showDialog }
}

export default showHock
