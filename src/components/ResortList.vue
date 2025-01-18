<template>
  <div class="resort-list">
    <h2>Vyberte si stredisko</h2>
    <ul>
      <li v-for="resort in skiResorts" :key="resort.id">
        <router-link :to="{ name: 'hotels', params: { resortId: resort.id } }">
          <img :src="getImageUrl(resort.image)" :alt="resort.name" />
          <h3>{{ resort.name }}</h3>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useSkiResortsStore } from '@/stores/skiResorts'
import { ref } from 'vue'

const skiResortsStore = useSkiResortsStore()
const skiResorts = ref(skiResortsStore.skiResorts)

const getImageUrl = (imageName: string) => {
  return new URL(`../assets/${imageName}`, import.meta.url).href
}
</script>

<style scoped>
.resort-list ul {
  list-style: none;
  padding: 0;
}

.resort-list li {
  margin-bottom: 1rem;
}

.resort-list img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>