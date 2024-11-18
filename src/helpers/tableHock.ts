import { useToast } from 'vue-toastification'
import linkGenrator from './linkGenrator'
import axios from '@axios'
import i18n from '@/plugins/i18n'
import { setParams, getParams } from './params'

interface options {
  term: string
  page: number
  per_page: number
  orderDir: string
  orderBy: string,
  filters: any
}

const toast = useToast()

const tableHock = <itemType = any>(path: string, noOptions: boolean = false, getOnOpen= true, emptyTable = true, defaultFilter: any = {}, withoHistory = false, deletePath: string | boolean = false) => {
  const items = ref<itemType[]>([])
  const totalPages = ref<number>(0)
  const totalItems = ref<number>(0)
  const loading = ref<boolean>(false)
  const error = ref<boolean>(false)
  const deleteId = ref<number | undefined>(undefined)


  const params = withoHistory ? getParams(): null
  const options = ref<any>(params ? params : {
    term: '',
    page: 1,
    per_page: 15,
    orderDir: 'desc',
    orderBy: 'id',
    filters: {...defaultFilter},
  })
  

  // this method get item from end point
  const fetchItems = async (): Promise<void> => {
    // open loading
    loading.value = true

    // empty total pages
    totalPages.value = 0

    // empty items
    if (emptyTable) items.value = []

    // append params to link
    if(withoHistory)setParams(options.value)

    // Get Items from backend without options
    axios.get(
      linkGenrator(path),
      { params: noOptions ? {} : options.value },
    )
      .then(response => {
        items.value = response.data?.data ?? []
        totalPages.value = response.data?.pagination?.last_page ?? 0
        totalItems.value = response.data?.pagination?.total ?? 0

        // stop loader
        loading.value = false
      })
      .catch(() => {
        loading.value = false
        error.value = true
      })
}

  // this method open delete model
  const openDelete = (id: number) => deleteId.value = id


  // this method close delete model
  const colseDelete = () => deleteId.value = undefined

  // this method send delete order to backend
  const deleteItem = async () => {
    if(deletePath) {
      axios
      .post(
        linkGenrator(`${deletePath}/${deleteId.value}`),
        { _method: 'DELETE' },
      )
      .then(() => {
        // refresh items

        toast.success(i18n.global.t('Item deleted successfully'))
        fetchItems()

        // close model
        deleteId.value = undefined
      })
      .catch(() => {
        // close model
        deleteId.value = undefined
      }) 
    } else {
      axios
       .post(
          linkGenrator(`${path.split('?')[0]}/${deleteId.value}`),
          { _method: 'DELETE' },
        )
        .then(() => {
          // refresh items
  
          toast.success(i18n.global.t('Item deleted successfully'))
          fetchItems()
  
          // close model
          deleteId.value = undefined
        })
        .catch(() => {
          // close model
          deleteId.value = undefined
        })
    }
  }

  // this method change page
  const changePage = (page: number) => {
    options.value.page = page
    fetchItems()
  }

  // this method change search
  const changeSearch = (term: string) => {
    options.value.page = 1
    options.value.term = term
    fetchItems()
  }

  // this method sort items
  const sort = (name: string) => {
    // get frist page
    options.value.page = 1

    // if order name is same
    if (options.value.orderDir == 'asc' && options.value.orderBy == name)
      options.value.orderDir = 'desc'

    else
      options.value.orderDir = 'asc'

    // set order by
    options.value.orderBy = name

    // get items again
    fetchItems()
  }

  // this method change page
  const changeFilter = (filter: any) => {
    options.value.filters = filter
    // fetchItems()
  }

  // add filter
  const addFilter = (key: string, value: string, noKeyFilter: boolean = false) => {
    // add filter to request
    if (noKeyFilter) {
      options.value = { ...options.value, [key]: value}
      options.value.page = 1
    } else {
      options.value.filters[key] = value
      options.value.page = 1
    }

    // get items again
    fetchItems()
  }

  const resetFilter = () => {
    options.value.term = ''
    options.value.page= 1
    options.value.per_page= 15
    options.value.orderDir= 'desc'
    options.value.orderBy= 'id'
    options.value.filters= {...defaultFilter}
    
    fetchItems()
  }

  //run fetch
  if(getOnOpen) fetchItems()

  return { items, totalPages, totalItems, loading, error, deleteId, deleteItem, fetchItems, openDelete, colseDelete, options, changePage, changeSearch, sort, addFilter, changeFilter, resetFilter }
}

export default tableHock
