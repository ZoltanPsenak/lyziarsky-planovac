<template>
  <div class="statistics-tracker">
    <h2>Sledovanie Štatistík</h2>
    <div v-for="resort in skiResorts" :key="resort.id" class="resort">
      <img :src="getImageUrl(resort.image)" :alt="resort.name" />
      <h3>{{ resort.name }}</h3>
      <p>{{ resort.description }}</p>
      <button @click="trackStatistics(resort)">Sledovať Štatistiky</button>
    </div>
    <h3>Detaily Štatistík</h3>
    <p v-if="statisticsDetails">{{ statisticsDetails }}</p>
  </div>
</template>

<script setup lang="ts">
import { useSkiResortsStore } from '@/stores/skiResorts'
import { ref, computed } from 'vue'

interface Resort {
  id: number
  name: string
  description: string
  image: string
}

const skiResortsStore = useSkiResortsStore()
const skiResorts = computed(() => skiResortsStore.skiResorts)
const statisticsDetails = ref('')

const trackStatistics = (resort: Resort) => {
  statisticsDetails.value = `Štatistiky pre ${resort.name} sledované.`
}

const getImageUrl = (imageName: string) => {
  return new URL(`../assets/${imageName}`, import.meta.url).href
}
</script>

<style scoped>
.statistics-tracker {
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
}
</style>