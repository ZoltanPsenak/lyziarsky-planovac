<template>
  <div class="notifications">
    <h2>Upozornenia</h2>
    <div v-for="resort in skiResorts" :key="resort.id" class="resort">
      <img :src="getImageUrl(resort.image)" :alt="resort.name" />
      <h3>{{ resort.name }}</h3>
      <p>{{ resort.description }}</p>
      <button @click="subscribeToNotifications(resort)">Prihlásiť sa na Upozornenia</button>
    </div>
    <h3>Detaily Upozornení</h3>
    <p v-if="notificationDetails">{{ notificationDetails }}</p>
  </div>
</template>

<script setup lang="ts">
import { useSkiResortsStore } from '@/stores/skiResorts'
import { ref, computed } from 'vue'

const skiResortsStore = useSkiResortsStore()
const skiResorts = computed(() => skiResortsStore.skiResorts)
const notificationDetails = ref('')

const subscribeToNotifications = (resort) => {
  notificationDetails.value = `Prihlásený na upozornenia pre ${resort.name}.`
}

const getImageUrl = (imageName) => {
  return new URL(`../assets/${imageName}`, import.meta.url).href
}
</script>

<style scoped>
.notifications {
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