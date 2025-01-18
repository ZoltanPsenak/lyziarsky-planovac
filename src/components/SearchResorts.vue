<template>
  <div class="search-resorts">
    <h2>Vyhľadávanie stredísk</h2>
    <input type="text" v-model="searchQuery" placeholder="Zadajte názov strediska" />
    <div class="resort-grid">
      <div v-for="resort in filteredResorts" :key="resort.id" class="resort-item" @click="viewDetails(resort.id)">
        <img :src="getImageUrl(resort.image)" :alt="resort.name" class="resort-thumbnail" />
        <h3>{{ resort.name }}</h3>
        <p>{{ resort.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSkiResortsStore } from '@/stores/skiResorts'
import { useRouter } from 'vue-router'

const skiResortsStore = useSkiResortsStore()
const searchQuery = ref('')
const router = useRouter()

const filteredResorts = computed(() => {
  return skiResortsStore.skiResorts.filter(resort =>
    resort.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

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
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

input[type="text"] {
  padding: 0.5rem;
  width: 100%;
  max-width: 400px;
  margin-bottom: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

.resort-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  width: 100%;
}

.resort-item {
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: box-shadow 0.3s;
}

.resort-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.resort-thumbnail {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
}
</style>