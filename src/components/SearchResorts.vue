<template>
  <div class="search-resorts">
    <h2>Vyhľadávanie Stredísk</h2>
    <div v-for="resort in skiResorts" :key="resort.id" class="resort" @click="viewDetails(resort.id)">
      <img :src="getImageUrl(resort.image)" :alt="resort.name" />
      <h3>{{ resort.name }}</h3>
      <p>{{ resort.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSkiResortsStore } from '@/stores/skiResorts'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const skiResortsStore = useSkiResortsStore()
const skiResorts = computed(() => skiResortsStore.skiResorts)
const router = useRouter()

const getImageUrl = (imageName: string) => {
  return new URL(`../assets/${imageName}`, import.meta.url).href
}

const viewDetails = (id: number) => {
  router.push({ name: 'resort-detail', params: { id } })
}
</script>

<style scoped>
.search-resorts {
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
  cursor: pointer; 
}

.resort:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.resort img {
  width: 100%;
  height: auto;
}

.resort h3 {
  margin: 0.5rem 0;
}

.resort p {
  margin: 0.5rem 0;
}
</style>