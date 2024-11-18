<script lang="ts" setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import avatar1 from '@images/avatars/avatar-1.png'
import { avatarText } from '@core/utils/formatters'
import linkGenrator from '@/helpers/linkGenrator'
import axios from '@axios'
import { getMessaging, onMessage } from "firebase/messaging"
import { useToast } from 'vue-toastification'
import { POSITION } from "vue-toastification"

const toast = useToast()

const router = useRouter()

// Variables
const scroll = ref()
const item = ref<any>([])
const fullItem = ref<any>()
const currentPage = ref(1)
const isLoading = ref(false)
const resetData = ref(false)

// Fetch items
const fetchItems = async (page: number) => {
 isLoading.value = true
 axios.get(
  linkGenrator(`notifications?page=${page}`))
  .then(response => {
    fullItem.value = response.data
    if (resetData.value) {
      item.value = response.data?.data.data
      resetData.value = false
      currentPage.value = 1
    } else {
      item.value = [...item.value ,...response.data?.data.data]
    }
  })
  .catch((error) => {
    console.error(error)
  })
 isLoading.value = false
}

// Load more data on scrolling
const loadMoreItems = () => {
  if (currentPage.value < fullItem.value.data.last_page) {
    const nextPage = currentPage.value + 1
    fetchItems(nextPage)
    currentPage.value = nextPage
  }
}

// Get height to load more items
const handleScroll = (event: any) => {
 const { scrollTop, clientHeight, scrollHeight } = event.target
 if (scrollTop + clientHeight >= scrollHeight) {
    loadMoreItems()
 }
}

// Fetch on first render
onMounted(() => {
 fetchItems(currentPage.value)
})

// Mark as read and navigate to the booking page and reset data
const goToPageAndMarkAsRead = (item: any) => {
  // Mark the item as read
  axios.put(linkGenrator(`notifications/read/${item.id}`))
  .then(() => {
    // Reset data
    resetData.value = true
    fetchItems(1)
    if (item.data.type === 'hospital_details_update') {
      router.push(`/approvals/approvalshospitalinfo/${item.data.data.approval_id}/data/list`)  
    } 

    else if (item.data.type === 'new_hospital_doctor') {
      router.push(`/approvals/approvalshospitaldoctor/${item.data.data.approval_id}/data/list`)
    }

    else if (item.data.type === 'new_branch') {
      router.push(`/approvals/approvalsbranch/${item.data.data.approval_id}/data/list`) 
    }
    else if (item.data.type === 'update_branch') {
      router.push(`/approvals/approvalsbranch/${item.data.data.approval_id}/data/list`) 
    }

    else if (item.data.type === 'new_hospital_workspace') {
      router.push(`/approvals/approvalshospitalsworkspace/${item.data.data.approval_id}/data/list`)
    }
    else if (item.data.type === 'update_hospital_workspace') {
      router.push(`/approvals/approvalshospitalsworkspace/${item.data.data.approval_id}/data/list`)
    }
    else {
      // Navigate to the new page
      router.push(`/booking/visit/show/${item.data.data.booking_id}`)
    }
  })
  .catch(error => {
    console.error("Error marking item as read:", error)
  })
}


const messaging = getMessaging()
const forceUpdate = ref(false)

onMessage(messaging, (payload) => {
  resetData.value = true
  fetchItems(1)
  toast.info(payload?.data?.title || 'New Notification', { position: POSITION.TOP_CENTER })
})
</script>

<template>
  <IconBtn id="notification-btn">
    <VBadge
      color="error"
      bordered
      :content="fullItem?.params?.unread_count"
      offset-x="1"
      offset-y="1"
    >
      <VIcon icon="mdi-bell-outline" />
    </VBadge>

    <VMenu
      activator="parent"
      width="380px"
      offset="14px"
    >
      <VCard class="d-flex flex-column">
        <!-- 👉 Header -->
        <VCardItem class="notification-section">
          <VCardTitle class="text-lg">
            {{ $t('Notifications') }}
          </VCardTitle>
        </VCardItem>

        <VDivider />

        <!-- 👉 Notifications list -->
        <PerfectScrollbar
          @ps-scroll-y="handleScroll"
          ref="scroll"
          :options="{ wheelPropagation: false }"
          style="max-block-size: 23.75rem;"
        >
          <VList class="py-0" :key="forceUpdate">
            <template
              v-for="(notification, index) in item"
              :key="notification.id"
            >
              <VDivider v-if="index > 0" />
              <VListItem
                link
                lines="one"
                min-height="66px"
                @click="goToPageAndMarkAsRead(notification)"
                class="list-item-hover-class"
              >
                <!-- Slot: Prepend -->
                <!-- Handles Avatar: Image, Icon, Text -->
                <template #prepend>
                  <VListItemAction start>
                    <VAvatar
                      size="40"
                      :color="notification.color && notification.icon ? notification.color : undefined"
                      :image="avatar1 || undefined"
                      :variant="notification.img ? undefined : 'tonal' "
                    >
                      <span v-if="notification.text">{{ avatarText(notification.text) }}</span>
                    </VAvatar>
                  </VListItemAction>
                </template>

                <VListItemTitle>{{ notification?.data?.title }}</VListItemTitle>
                <VListItemSubtitle>{{ notification?.data?.message }}</VListItemSubtitle>
                <span class="text-xs text-disabled">{{ notification.created_at }}</span>

                <!-- Slot: Append -->
                <template #append>
                  <div class="d-flex flex-column align-center gap-4">
                    <VBadge
                      dot
                      :color="!notification.read_at ? 'primary' : '#a8aaae'"
                      :class="`${notification.read_at ? 'visible-in-hover' : ''} ms-1`"
                    />
                  </div>
                </template>
              </VListItem>
            </template>
            <VListItem
              v-show="!item?.length"
              class="text-center text-medium-emphasis"
              style="block-size: 56px;"
            >
              <VListItemTitle>{{$t('No Notification Found')}}!</VListItemTitle>
            </VListItem>
          </VList>
        </PerfectScrollbar>

        <VDivider />


        <VCardItem class="notification-section">
          <VCardTitle class="text-lg">
          </VCardTitle>
        </VCardItem>
      </VCard>
    </VMenu>
  </IconBtn>
</template>

<style lang="scss">
.notification-section {
  padding: 14px !important;
}

.notification-footer {
  padding-block: 0.9375rem !important;
}

.list-item-hover-class {
  .visible-in-hover {
    display: none;
  }
}
</style>
