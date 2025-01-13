<template>
    <div class="itinerary-list">
      <h2>Itineráre (Zoznam plánov)</h2>
      <div class="sorting-options">
        <label for="sort-by">Triediť podľa:</label>
        <select v-model="sortBy" id="sort-by">
          <option value="date">Dátum</option>
          <option value="destination">Destinácia</option>
          <option value="type">Typ cesty</option>
        </select>
      </div>
      <div class="itinerary-items">
        <div v-for="itinerary in sortedItineraries" :key="itinerary.id" class="itinerary-item">
          <h3>{{ itinerary.title }}</h3>
          <p>Dátum: {{ itinerary.date }}</p>
          <p>Destinácia: {{ itinerary.destination }}</p>
          <p>Typ cesty: {{ itinerary.type }}</p>
          <button @click="viewDetails(itinerary)">Zobraziť Detaily</button>
          <button @click="duplicateItinerary(itinerary)">Duplikovať</button>
          <button @click="editItinerary(itinerary)">Upraviť</button>
          <button @click="deleteItinerary(itinerary.id)">Vymazať</button>
        </div>
      </div>
      <div v-if="selectedItinerary" class="itinerary-details">
        <h3>Detaily Itinerára</h3>
        <p><strong>Časový harmonogram:</strong></p>
        <ul>
          <li v-for="activity in selectedItinerary.schedule" :key="activity.time">
            {{ activity.time }} - {{ activity.activity }}
          </li>
        </ul>
        <p><strong>Plánované aktivity:</strong></p>
        <ul>
          <li v-for="activity in selectedItinerary.activities" :key="activity">
            {{ activity }}
          </li>
        </ul>
        <button @click="closeDetails">Zavrieť</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useItineraryStore } from '@/stores/itineraryStore'
  
  const itineraryStore = useItineraryStore()
  
  const sortBy = ref('date')
  const selectedItinerary = ref(null)
  
  const sortedItineraries = computed(() => {
    return [...itineraryStore.itineraries].sort((a, b) => {
      if (sortBy.value === 'date') {
        return new Date(a.date) - new Date(b.date)
      } else if (sortBy.value === 'destination') {
        return a.destination.localeCompare(b.destination)
      } else if (sortBy.value === 'type') {
        return a.type.localeCompare(b.type)
      }
      return 0
    })
  })
  
  const viewDetails = (itinerary) => {
    selectedItinerary.value = itinerary
  }
  
  const closeDetails = () => {
    selectedItinerary.value = null
  }
  
  const duplicateItinerary = (itinerary) => {
    itineraryStore.addItinerary({ ...itinerary, id: Date.now() })
  }
  
  const editItinerary = (itinerary) => {
    alert(`Edit itinerary: ${itinerary.title}`)
  }
  
  const deleteItinerary = (id) => {
    itineraryStore.deleteItinerary(id)
  }
  </script>
  
  <style scoped>
  .itinerary-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .sorting-options {
    margin-bottom: 1rem;
  }
  
  .itinerary-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
  
  .itinerary-item {
    background-color: var(--color-background-soft);
    border: 1px solid var(--color-border);
    padding: 1rem;
    border-radius: 8px;
    width: 300px;
  }
  
  .itinerary-details {
    background-color: var(--color-background-soft);
    border: 1px solid var(--color-border);
    padding: 1rem;
    border-radius: 8px;
    width: 80%;
    margin-top: 2rem;
  }
  
  button {
    margin-top: 0.5rem;
    background-color: var(--vt-c-indigo);
    color: var(--vt-c-white);
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
    border-radius: 8px;
  }
  
  button:hover {
    background-color: var(--vt-c-indigo-soft);
  }
  </style>