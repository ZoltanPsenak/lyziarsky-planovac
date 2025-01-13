<template>
  <div v-if="resort" class="resort-detail">
    <h2>{{ resort.name }}</h2>
    <img :src="getImageUrl(resort.image)" :alt="resort.name" class="resort-image" />
    <p>{{ resort.description }}</p>
    <h3>Skúsenosti</h3>
    <ul class="experiences-list">
      <li v-for="experience in resort.experiences" :key="experience.slug" class="experience-item">
        <img :src="getImageUrl(experience.image)" :alt="experience.name" class="experience-image" />
        <div class="experience-info">
          <h4>{{ experience.name }}</h4>
          <p>{{ experience.description }}</p>
        </div>
      </li>
    </ul>
  </div>
  <div v-else class="loading">
    <p>Načítavam údaje...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSkiResortsStore } from '@/stores/skiResorts'

const route = useRoute()
const skiResortsStore = useSkiResortsStore()
const resort = ref(null)

onMounted(() => {
  const resortId = route.params.id
  resort.value = skiResortsStore.skiResorts.find(r => r.id === Number(resortId))
})

const getImageUrl = (imageName: string) => {
  return new URL(`../assets/${imageName}`, import.meta.url).href
}
</script>

<style scoped>
.resort-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
}

.resort-image {
  width: 100%;
  max-width: 600px;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.experiences-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.experience-item {
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1rem;
  width: 300px;
  transition: box-shadow 0.3s;
}

.experience-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.experience-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.experience-info {
  text-align: left;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
}
</style>