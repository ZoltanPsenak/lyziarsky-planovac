<template>
  <div class="cost-calculator">
    <h2>Kalkulačka Nákladov</h2>
    <div v-for="resort in skiResorts" :key="resort.id" class="resort">
      <img :src="getImageUrl(resort.image)" :alt="resort.name" />
      <h3>{{ resort.name }}</h3>
      <p>{{ resort.description }}</p>
      <button @click="calculateCost(resort)">Vypočítať Náklady</button>
    </div>
    <h3>Detaily Nákladov</h3>
    <p v-if="costDetails">{{ costDetails }}</p>
  </div>
</template>

<script setup lang="ts">
import { useSkiResortsStore } from '@/stores/skiResorts'
import { ref, computed } from 'vue'

const skiResortsStore = useSkiResortsStore()
const skiResorts = computed(() => skiResortsStore.skiResorts)
const costDetails = ref('')

const calculateCost = (resort) => {
  costDetails.value = `Náklady na ${resort.name} vypočítané.`
}

const getImageUrl = (imageName) => {
  return new URL(`../assets/${imageName}`, import.meta.url).href
}
</script>

<style scoped>
.cost-calculator {
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