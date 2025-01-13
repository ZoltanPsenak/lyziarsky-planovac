import { defineStore } from 'pinia'
import skiResortsData from '@/data.json'

export const useSkiResortsStore = defineStore('skiResorts', {
  state: () => ({
    skiResorts: skiResortsData.ski_resorts
  }),
  getters: {
    getResortById: (state) => (id: number) => {
      return state.skiResorts.find(resort => resort.id === id)
    }
  }
})