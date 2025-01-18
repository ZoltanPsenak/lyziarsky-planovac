<template>
  <div v-if="resort" class="resort-detail">
    <h2>{{ resort.name }}</h2>
    <img :src="getImageUrl(resort.image)" :alt="resort.name" class="resort-image" />
    <p class="description">{{ resort.description }}</p>
    
    <hr class="section-divider" />
    <div class="section">
      <h3>Mapa a Popis Trás</h3>
      <img :src="getImageUrl(resort.map)" :alt="'Mapa strediska'" class="resort-map" />
      <p>{{ resort.trailDescription }}</p>
    </div>
    
    <hr class="section-divider" />
    <div class="section">
      <h3>Informácie o Vstupenkách</h3>
      <p>Cena skipasu: <strong>{{ resort.ticketInfo.price }} €</strong></p>
      <p>Zľavy: {{ resort.ticketInfo.discounts }}</p>
      <p><a :href="resort.ticketInfo.onlinePurchaseLink" target="_blank" class="button">Kúpiť skipas online</a></p>
    </div>
    
    <hr class="section-divider" />
    <div class="section">
      <h3>Stav Snehu a Zjazdoviek</h3>
      <p>Teplota: <strong>{{ resort.weather.temperature }}°C</strong></p>
      <p>Snehové podmienky: {{ resort.weather.snow }}</p>
      <p>Vietor: {{ resort.weather.wind }} km/h</p>
      <p>Zjazdovky: {{ resort.slopes.open }} / {{ resort.slopes.total }} otvorené</p>
      <p>Vleky: {{ resort.lifts.open }} / {{ resort.lifts.total }} otvorené</p>
    </div>
    
    <hr class="section-divider" />
    <div class="section">
      <h3>Recenzie a Hodnotenia</h3>
      <ul class="reviews-list">
        <li v-for="review in resort.reviews" :key="review.id" class="review-item">
          <h4>{{ review.user }}</h4>
          <p>Hodnotenie: <strong>{{ review.rating }} / 5</strong></p>
          <p>{{ review.comment }}</p>
        </li>
      </ul>
    </div>

    <hr class="section-divider" />
    <div class="section">
      <h3>Hotely</h3>
      <ul class="hotels-list">
        <li v-for="hotel in resort.hotels" :key="hotel.name" class="hotel-item">
          <h4>{{ hotel.name }}</h4>
          <p>Cena za noc: <strong>{{ hotel.price_per_night }} €</strong></p>
          <p>Maximálny počet osôb na izbu: {{ hotel.max_persons_per_room }}</p>
          <img :src="getImageUrl(hotel.image)" :alt="hotel.name" class="hotel-image" />
        </li>
      </ul>
    </div>

    <hr class="section-divider" />
    <div class="section" v-if="resort.experiences && resort.experiences.length">
      <h3>Zážitky</h3>
      <ul class="experiences-list">
        <li v-for="experience in resort.experiences" :key="experience.slug" class="experience-item">
          <h4>{{ experience.name }}</h4>
          <p>{{ experience.description }}</p>
          <img :src="getImageUrl(experience.image)" :alt="experience.name" class="experience-image" />
        </li>
      </ul>
    </div>
  </div>
  <div v-else class="loading">
    <p>Načítavam údaje...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSkiResortsStore } from '@/stores/skiResorts'

interface Resort {
  name: string;
  image: string;
  description: string;
  map: string;
  trailDescription: string;
  ticketInfo: {
    price: number;
    discounts: string;
    onlinePurchaseLink: string;
  };
  weather: {
    temperature: number;
    snow: string;
    wind: number;
  };
  slopes: {
    open: number;
    total: number;
  };
  lifts: {
    open: number;
    total: number;
  };
  reviews: {
    id: number;
    user: string;
    rating: number;
    comment: string;
  }[];
  hotels: {
    name: string;
    price_per_night: number;
    max_persons_per_room: number;
    image: string;
  }[];
  experiences: {
    slug: string;
    name: string;
    description: string;
    image: string;
  }[];
}

const route = useRoute()
const skiResortsStore = useSkiResortsStore()
const resort = ref<Resort | null>(null)

onMounted(() => {
  const resortId = route.params.id
  resort.value = skiResortsStore.getResortById(Number(resortId)) || null
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
  max-width: 800px;
  margin: 0 auto;
  background-color: var(--color-background-soft);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.resort-image, .hotel-image, .experience-image {
  width: 100%;
  max-width: 600px;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.description {
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.section {
  margin-bottom: 2rem;
  width: 100%;
}

.section h3 {
  margin-bottom: 1rem;
  color: var(--vt-c-orange);
}

.section-divider {
  width: 100%;
  border: 0;
  height: 1px;
  background: var(--color-border);
  margin: 2rem 0;
}

.button {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: var(--vt-c-orange);
  color: var(--vt-c-white);
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: var(--vt-c-orange-soft);
}

.reviews-list, .hotels-list, .experiences-list {
  list-style: none;
  padding: 0;
  text-align: center;
}

.review-item, .hotel-item, .experience-item {
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 600px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
</style>