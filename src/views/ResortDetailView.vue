<template>
  <div v-if="resort" class="resort-detail">
    <h2>{{ resort.name }}</h2>
    <img :src="getImageUrl(resort.image)" :alt="resort.name" class="resort-image" />
    <p>{{ resort.description }}</p>
    
    <h3>Mapa a Popis Trás</h3>
    <img :src="getImageUrl(resort.map)" :alt="'Mapa strediska'" class="resort-map" />
    <p>{{ resort.trailDescription }}</p>
    
    <h3>Informácie o Vstupenkách</h3>
    <p>Cena skipasu: {{ resort.ticketInfo.price }} €</p>
    <p>Zľavy: {{ resort.ticketInfo.discounts }}</p>
    <p><a :href="resort.ticketInfo.onlinePurchaseLink" target="_blank">Kúpiť skipas online</a></p>
    
    <h3>Stav Snehu a Zjazdoviek</h3>
    <p>Teplota: {{ resort.weather.temperature }}°C</p>
    <p>Snehové podmienky: {{ resort.weather.snow }}</p>
    <p>Vietor: {{ resort.weather.wind }} km/h</p>
    <p>Zjazdovky: {{ resort.slopes.open }} / {{ resort.slopes.total }} otvorené</p>
    <p>Vleky: {{ resort.lifts.open }} / {{ resort.lifts.total }} otvorené</p>
    
    <h3>Recenzie a Hodnotenia</h3>
    <ul class="reviews-list">
      <li v-for="review in resort.reviews" :key="review.id" class="review-item">
        <h4>{{ review.user }}</h4>
        <p>Hodnotenie: {{ review.rating }} / 5</p>
        <p>{{ review.comment }}</p>
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

.resort-image, .resort-map {
  width: 100%;
  max-width: 600px;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.reviews-list {
  list-style: none;
  padding: 0;
}

.review-item {
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 600px;
}
</style>