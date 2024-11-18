import linkGenrator from './linkGenrator'
import axios from '@axios'

const fetchHock = (path: string, itemId: number | boolean = false, type: string | boolean = false) => {
  const item = ref<any>({})
  const loading = ref<boolean>(false)
  const error = ref<boolean>(false)



  // this method get item from end point
  const fetchItem = async (): Promise<void> => {
    // open loading
    loading.value = true

    // empty item
    item.value = {}

    if (type === 'edit') {
      axios.get(
        linkGenrator(path + '/' + itemId + '/edit'),
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
    } else if (type === 'compare') {
      axios.get(
        linkGenrator(path + '/' + itemId + '/compare'),
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
    } else {
      // get item form backend
      axios.get(
        linkGenrator(path + '/' + itemId),
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
  }


  fetchItem()

  return { item, loading, error, fetchItem }
}

export default fetchHock
