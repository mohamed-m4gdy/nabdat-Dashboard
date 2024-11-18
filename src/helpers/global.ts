import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    payOnline_id: null,
    coords: { latitude: 30.060849585503465, longitude: 31.235122309153954 },
  }),
  actions: {
    setPayOnline_id(newPayOnline_id: any) {
      this.payOnline_id = newPayOnline_id
    },
    setCoords(e: any) {
      this.coords = e
    }
  },
})
