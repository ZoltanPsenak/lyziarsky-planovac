<template>
  <div class="cost-calculator">
    <h2>Kalkulačka Nákladov</h2>
    <div v-for="resort in skiResorts" :key="resort.id" class="resort">
      <img :src="getImageUrl(resort.image)" :alt="resort.name" />
      <h3>{{ resort.name }}</h3>
      <p>{{ resort.description }}</p>
      <div class="form-group">
        <label for="numAdults">Počet dospelých:</label>
        <input type="number" v-model.number="numAdults" id="numAdults" min="0" />
      </div>
      <div class="form-group">
        <label for="numChildren">Počet detí:</label>
        <input type="number" v-model.number="numChildren" id="numChildren" min="0" />
      </div>
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
const numAdults = ref(0)
const numChildren = ref(0)

const calculateCost = (resort) => {
  const adultTicketPrice = resort.ticketInfo.price
  const childTicketPrice = 0 
  const totalCost = (numAdults.value * adultTicketPrice) + (numChildren.value * childTicketPrice)
  costDetails.value = `Náklady na ${resort.name}: ${totalCost} EUR (Dospelí: ${numAdults.value}, Deti: ${numChildren.value})`
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

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input {
  padding: 0.5rem;
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

button {
  margin-top: 1rem;
  background-color: var(--vt-c-indigo);
  color: var(--vt-c-white);
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 8px;
}

button:hover {
  background-color: var(--vt-c-indigo-soft);
}
</style>