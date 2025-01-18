<template>
  <div class="notifications">
    <h2>Upozornenia</h2>
    <div class="content">
      <div class="resorts" :class="{ 'single-resort': subscribedResort }">
        <div v-for="resort in displayedResorts" :key="resort.id" class="resort">
          <img :src="getImageUrl(resort.image)" :alt="resort.name" class="resort-image" />
          <h3>{{ resort.name }}</h3>
          <p>{{ resort.description }}</p>
          <button class="subscribe-button" @click="subscribeToNotifications(resort)">Prihlásiť sa na upozornenia</button>
          <button class="unsubscribe-button" @click="unsubscribeFromNotifications(resort)">Zrušiť odber upozornení</button>
        </div>
      </div>
      <div class="notifications-list" v-if="subscribedResort">
        <h3>Detaily Upozornení</h3>
        <p v-if="notificationDetails">{{ notificationDetails }}</p>
        <div v-if="currentEvent" class="event-notification">
          <p>{{ currentEvent }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSkiResortsStore } from '@/stores/skiResorts'
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Resort {
  id: number;
  name: string;
  image: string;
  description: string;
}

const skiResortsStore = useSkiResortsStore()
const skiResorts = computed(() => skiResortsStore.skiResorts)
const notificationDetails = ref('')
const currentEvent = ref('')
const subscribedResort = ref<Resort | null>(null)

const events = [
  'Začalo snežiť!',
  'Na svahu sa koná akcia!',
  'Zlepšili sa podmienky na lyžovanie!',
  'Nová reštaurácia otvorená v stredisku!',
  'Zľavy na skipasy!'
]

const displayedResorts = computed(() => {
  return subscribedResort.value ? [subscribedResort.value] : skiResorts.value
})

const subscribeToNotifications = (resort: Resort) => {
  subscribedResort.value = resort
  notificationDetails.value = `Prihlásený na upozornenia pre ${resort.name}.`
}

const unsubscribeFromNotifications = (resort: Resort) => {
  if (subscribedResort.value?.id === resort.id) {
    subscribedResort.value = null
    notificationDetails.value = `Zrušený odber upozornení pre ${resort.name}.`
  }
}

const getImageUrl = (imageName: string) => {
  return new URL(`../assets/${imageName}`, import.meta.url).href
}

const showRandomEvent = () => {
  if (subscribedResort.value) {
    const randomEvent = events[Math.floor(Math.random() * events.length)]
    currentEvent.value = `${subscribedResort.value.name}: ${randomEvent}`
  }
}

let eventInterval: number | undefined

onMounted(() => {
  eventInterval = setInterval(showRandomEvent, 10000)
})

onUnmounted(() => {
  if (eventInterval) {
    clearInterval(eventInterval)
  }
})
</script>

<style scoped>
.notifications {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
}

.resorts {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  width: 100%;
}

.single-resort {
  flex-direction: column;
  align-items: center;
  width: 50%;
}

.resort {
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  transition: box-shadow 0.3s;
  width: calc(33% - 20px); /* Three items per row */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.single-resort .resort {
  width: 100%;
}

.resort:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.resort-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.notifications-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
}

.event-notification {
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 8px;
  width: 80%;
  text-align: center;
}

button {
  margin-top: 1rem;
}

.subscribe-button {
  background-color: green;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 8px;
}

.subscribe-button:hover {
  background-color: darkgreen;
}

.unsubscribe-button {
  background-color: red;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 8px;
}

.unsubscribe-button:hover {
  background-color: darkred;
}
</style>