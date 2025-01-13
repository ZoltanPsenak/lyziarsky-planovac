<template>
  <div class="itinerary-planner">
    <h2>Plánovač Itinerára</h2>
    <div v-for="resort in skiResorts" :key="resort.id" class="resort">
      <img :src="getImageUrl(resort.image)" :alt="resort.name" />
      <h3>{{ resort.name }}</h3>
      <p>{{ resort.description }}</p>
      <button @click="addToItinerary(resort)">Pridať do Itinerára</button>
    </div>
    <h3>Váš Itinerár</h3>
    <ul v-if="itinerary.length">
      <li v-for="item in itinerary" :key="item.id">
        {{ item.name }}
        <button @click="removeFromItinerary(item)">Odstrániť</button>
      </li>
    </ul>
    <p v-else>Váš itinerár je prázdny.</p>
  </div>
</template>

<script setup lang="ts">
import { useSkiResortsStore } from '@/stores/skiResorts'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'

interface Resort {
  id: number
  name: string
  description: string
  image: string
}

const skiResortsStore = useSkiResortsStore()
const skiResorts = computed(() => skiResortsStore.skiResorts)
const itinerary: Ref<Resort[]> = ref([])

const addToItinerary = (resort: Resort) => {
  if (!itinerary.value.some(item => item.id === resort.id)) {
    itinerary.value.push(resort)
  }
}

const removeFromItinerary = (resort: Resort) => {
  itinerary.value = itinerary.value.filter(item => item.id !== resort.id)
}

const getImageUrl = (imageName: string) => {
  return new URL(`../assets/${imageName}`, import.meta.url).href
}
</script>

<style scoped>
.itinerary-planner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.resort {
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  transition: box-shadow 0.3s;
  width: 80%;
  max-width: 600px;
}

.resort:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

button {
  margin-top: 1rem;
  background-color: var(--vt-c-indigo);
  color: var(--vt-c-white);
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: var(--vt-c-indigo-soft);
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li button {
  margin-top: 0;
  margin-left: 1rem;
}
</style>