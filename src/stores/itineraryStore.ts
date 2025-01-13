import { defineStore } from 'pinia'

export const useItineraryStore = defineStore('itinerary', {
  state: () => ({
    itineraries: []
  }),
  actions: {
    addItinerary(itinerary) {
      this.itineraries.push({ ...itinerary, id: Date.now() })
    },
    updateItinerary(updatedItinerary) {
      const index = this.itineraries.findIndex(itinerary => itinerary.id === updatedItinerary.id)
      if (index !== -1) {
        this.itineraries[index] = updatedItinerary
      }
    },
    deleteItinerary(id) {
      this.itineraries = this.itineraries.filter(itinerary => itinerary.id !== id)
    }
  }
})