<template>
  <div class="home-view">
    <header class="hero">
      <h1>Vitajte v Lyžiarskom Plánovači!</h1>
      <p>Naplánujte si dokonalý lyžiarsky víkend preskúmaním našich stredísk, vytvorením itinerára a správou rezervácií.</p>
    </header>
    <section class="info-section">
      <h2>Čo plánovač obsahuje:</h2>
      <ul>
        <li>Vyhľadávanie lyžiarskych stredísk</li>
        <li>Vytváranie a správa itinerára</li>
        <li>Výpočet nákladov a trás</li>
        <li>Vykonávanie rezervácií</li>
        <li>Prijímanie upozornení</li>
      </ul>
    </section>
    <section class="featured-resorts">
      <h2>Odporúčané Lyžiarske Strediská</h2>
      <div class="resorts-list">
        <div v-for="resort in skiResorts" :key="resort.id" class="resort">
          <img :src="getImageUrl(resort.image)" :alt="resort.name" />
          <h3>{{ resort.name }}</h3>
          <p>{{ resort.description }}</p>
          <RouterLink :to="{ name: 'resort-detail', params: { id: resort.id } }">Zobraziť Detaily</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSkiResortsStore } from '@/stores/skiResorts'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const skiResortsStore = useSkiResortsStore()
const skiResorts = computed(() => skiResortsStore.skiResorts)

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

.info-section {
  margin: 2rem 0;
  padding: 2rem;
  background-color: var(--color-background-soft);
  border-radius: 8px;
  width: 80%;
}

.info-section ul {
  list-style: none;
  padding: 0;
}

.info-section li {
  margin: 0.5rem 0;
}

.featured-resorts {
  margin: 2rem 0;
  width: 80%;
}

.resorts-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.resort {
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  padding: 1rem;
  border-radius: 8px;
  transition: box-shadow 0.3s;
  width: 300px;
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

.resort a {
  display: inline-block;
  margin-top: 0.5rem;
  color: var(--vt-c-indigo);
  text-decoration: none;
  font-weight: bold;
}

.resort a:hover {
  text-decoration: underline;
}
</style>