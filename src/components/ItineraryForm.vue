<template>
  <div class="itinerary-form">
    <h2>Nový Itinerár</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="title">Názov:</label>
        <input type="text" v-model="title" id="title" required />
      </div>
      <div class="form-group">
        <label for="date">Dátum:</label>
        <input type="date" v-model="date" id="date" required />
      </div>
      <div class="form-group">
        <label for="destination">Destinácia:</label>
        <select v-model="destination" id="destination" required>
          <option v-for="resort in skiResorts" :key="resort.id" :value="resort.name">{{ resort.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="type">Typ cesty:</label>
        <select v-model="type" id="type" required>
          <option value="pracovné">Pracovné</option>
          <option value="dovolenkové">Dovolenkové</option>
          <option value="rodinné">Rodinné</option>
        </select>
      </div>
      <button type="submit">Pridať Itinerár</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useItineraryStore } from '@/stores/itineraryStore'
import { useSkiResortsStore } from '@/stores/skiResorts'

const itineraryStore = useItineraryStore()
const skiResortsStore = useSkiResortsStore()
const skiResorts = skiResortsStore.skiResorts

const title = ref('')
const date = ref('')
const destination = ref('')
const type = ref('')

const submitForm = () => {
  itineraryStore.addItinerary({
    title: title.value,
    date: date.value,
    destination: destination.value,
    type: type.value,
    schedule: [],
    activities: []
  })


  title.value = ''
  date.value = ''
  destination.value = ''
  type.value = ''
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