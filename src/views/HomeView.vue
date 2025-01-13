<template>
  <div class="home-view">
    <header class="hero">
      <div class="header-content">
        <h1>Vitajte v Lyžiarskom Plánovači!</h1>
        <p>Naplánujte si dokonalý lyžiarsky víkend preskúmaním našich stredísk, vytvorením itinerára a správou rezervácií.</p>
      </div>
    </header>
    <section class="map-overview">
      <img src="@/assets/mapa.jpg" alt="Mapa lyžiarskych stredísk" class="map-image" />
    </section>
    <section class="resort-overview">
      <h2>Prehľad Počasia a Podmienok na Lyžovanie</h2>
      <div class="resort-details">
        <div v-for="resort in skiResorts" :key="resort.id" class="resort-item">
          <img :src="getImageUrl(resort.image)" :alt="resort.name" class="resort-thumbnail" />
          <h3>{{ resort.name }}</h3>
          <p><font-awesome-icon :icon="getWeatherIcon(resort.weather.condition)" /> Teplota: {{ resort.weather.temperature }}°C</p>
          <p>Snehové podmienky: {{ resort.weather.snow }}</p>
          <p>Vietor: {{ resort.weather.wind }} km/h</p>
          <p>Zjazdovky: {{ resort.slopes.open }} / {{ resort.slopes.total }} otvorené</p>
          <p>Vleky: {{ resort.lifts.open }} / {{ resort.lifts.total }} otvorené</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSkiResortsStore } from '@/stores/skiResorts'
import { computed } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSun, faCloud, faSnowflake, faWind } from '@fortawesome/free-solid-svg-icons'

library.add(faSun, faCloud, faSnowflake, faWind)

const skiResortsStore = useSkiResortsStore()
const skiResorts = computed(() => skiResortsStore.skiResorts)

const getWeatherIcon = (condition) => {
  switch (condition) {
    case 'sunny':
      return 'sun'
    case 'cloudy':
      return 'cloud'
    case 'snowy':
      return 'snowflake'
    case 'windy':
      return 'wind'
    default:
      return 'cloud'
  }
}

const getImageUrl = (imageName: string) => {
  return new URL(`../assets/${imageName}`, import.meta.url).href
}
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.hero {
  background: url('@/assets/hero-bg.jpg') no-repeat center center;
  background-size: cover;
  color: var(--vt-c-white);
  padding: 4rem 2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  width: 100%;
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.map-overview {
  margin: 2rem 0;
}

.map-image {
  width: 100%;
  max-width: 800px;
  border-radius: 8px;
}

.resort-overview {
  margin: 2rem 0;
  width: 80%;
}

.resort-details {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.resort-item {
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  padding: 1rem;
  border-radius: 8px;
  width: 300px;
  text-align: center;
}

.resort-thumbnail {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
}
</style>