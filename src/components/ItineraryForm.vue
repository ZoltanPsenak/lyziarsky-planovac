<template>
  <div class="itinerary-form">
    <h2>Nový Itinerár</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="title">Názov:</label>
        <input type="text" v-model="title" id="title" required placeholder="Zadajte názov itinerára" />
      </div>
      <div class="form-group">
        <label for="destination">Destinácia:</label>
        <div class="resort-options">
          <div
            v-for="resort in skiResorts"
            :key="resort.id"
            :class="['resort-option', { selected: resort === selectedResort }]"
            @click="selectResort(resort)"
          >
            <img :src="getImageUrl(resort.image)" :alt="resort.name" class="resort-image" /> {{ resort.name }}
          </div>
        </div>
      </div>
      <div v-if="selectedResort" class="form-group">
        <label for="hotel">Hotel:</label>
        <div class="hotel-grid">
          <div
            v-for="hotel in hotels"
            :key="hotel.name"
            :class="['hotel-item', { selected: hotel === selectedHotel }]"
            @click="selectHotel(hotel)"
          >
            <img :src="getImageUrl(hotel.image)" :alt="hotel.name" class="hotel-thumbnail" /> {{ hotel.name }}
          </div>
        </div>
      </div>
      <div v-if="selectedHotel">
        <div class="form-group">
          <label for="startDate">Dátum začiatku:</label>
          <input type="date" v-model="startDate" id="startDate" required placeholder="Vyberte dátum začiatku" />
        </div>
        <div class="form-group">
          <label for="endDate">Dátum konca:</label>
          <input type="date" v-model="endDate" id="endDate" required placeholder="Vyberte dátum konca" />
        </div>
        <div class="form-group">
          <label for="nights">Počet nocí:</label>
          <input type="number" v-model="nights" id="nights" readonly placeholder="Automaticky vypočítané" />
        </div>
        <div class="form-group">
          <label for="adults">Počet dospelých:</label>
          <input type="number" v-model="adults" id="adults" required placeholder="Zadajte počet dospelých" />
        </div>
        <div class="form-group">
          <label for="children">Počet detí:</label>
          <input type="number" v-model="children" id="children" required placeholder="Zadajte počet detí" />
        </div>
        <div class="form-group">
          <label for="type">Typ cesty:</label>
          <select v-model="type" id="type" required>
            <option value="" disabled>Vyberte typ cesty</option>
            <option value="pracovné">Pracovné</option>
            <option value="dovolenkové">Dovolenkové</option>
            <option value="rodinné">Rodinné</option>
          </select>
        </div>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <button type="submit">Pridať Itinerár</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useItineraryStore } from '@/stores/itineraryStore'
import { useSkiResortsStore } from '@/stores/skiResorts'
import { useRouter } from 'vue-router'

const itineraryStore = useItineraryStore()
const skiResortsStore = useSkiResortsStore()
const skiResorts = skiResortsStore.skiResorts
const router = useRouter()

const title = ref('')
const destination = ref('')
const hotel = ref('')
const startDate = ref('')
const endDate = ref('')
const nights = ref(0)
const adults = ref(0)
const children = ref(0)
const type = ref('')

const selectedResort = ref(null)
const selectedHotel = ref(null)
const errorMessage = ref('')

const hotels = computed(() => {
  return selectedResort.value ? selectedResort.value.hotels : []
})

const selectResort = (resort) => {
  selectedResort.value = resort
  selectedHotel.value = null
}

const selectHotel = (hotel) => {
  selectedHotel.value = hotel
}

const getImageUrl = (imageName: string) => {
  return new URL(`../assets/${imageName}`, import.meta.url).href
}

const calculatedNights = computed(() => {
  if (startDate.value && endDate.value) {
    const start = new Date(startDate.value)
    const end = new Date(endDate.value)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }
  return 0
})

watch([startDate, endDate], () => {
  nights.value = calculatedNights.value
})

const submitForm = () => {
  const totalPersons = adults.value + children.value
  if (selectedHotel.value && totalPersons > selectedHotel.value.max_persons_per_room) {
    errorMessage.value = `Príliš veľa osôb. Maximálny počet osôb na izbu je ${selectedHotel.value.max_persons_per_room}.`
    return
  }

  itineraryStore.addItinerary({
    title: title.value,
    destination: selectedResort.value.name,
    hotel: selectedHotel.value.name,
    startDate: startDate.value,
    endDate: endDate.value,
    nights: nights.value,
    adults: adults.value,
    children: children.value,
    type: type.value,
    schedule: [],
    activities: []
  })

  title.value = ''
  selectedResort.value = null
  selectedHotel.value = null
  startDate.value = ''
  endDate.value = ''
  nights.value = 0
  adults.value = 0
  children.value = 0
  type.value = ''
  errorMessage.value = ''

  router.push('/reservations')
}
</script>

<style scoped>
.itinerary-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group select {
  padding: 0.5rem;
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

.resort-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.resort-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 10px;
  transition: background-color 0.3s;
  width: calc(50% - 10px);
}

.resort-option:hover {
  background-color: var(--vt-c-indigo-soft);
}

.resort-option.selected {
  background-color: var(--vt-c-indigo);
  color: var(--vt-c-white);
}

.resort-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.hotel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  width: 100%;
}

.hotel-item {
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: box-shadow 0.3s;
}

.hotel-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.hotel-item.selected {
  background-color: var(--vt-c-indigo);
  color: var(--vt-c-white);
}

.hotel-thumbnail {
  width: 100%;
  height: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.error-message {
  color: red;
  margin-top: 1rem;
}

button {
  margin-top: 1rem;
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