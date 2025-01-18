<template>
  <div class="hotel-list">
    <h2>Vyberte si hotel</h2>
    <ul>
      <li v-for="hotel in filteredHotels" :key="hotel.name">
        <router-link :to="{ name: 'costCalculator', params: { resortId: resortId, hotelName: hotel.name } }">
          <img :src="getImageUrl(hotel.image)" :alt="hotel.name" />
          <h3>{{ hotel.name }}</h3>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useSkiResortsStore } from '@/stores/skiResorts'
import { ref, computed } from 'vue'

const props = defineProps({
  resortId: Number,
  excludeHotel: Object
})

const route = useRoute()
const skiResortsStore = useSkiResortsStore()
const resort = computed(() => skiResortsStore.getResortById(props.resortId))
const hotels = ref(resort.value ? resort.value.hotels : [])

const filteredHotels = computed(() => {
  return hotels.value.filter(hotel => hotel.name !== props.excludeHotel?.name)
})

const getImageUrl = (imageName: string) => {
  return new URL(`../assets/${imageName}`, import.meta.url).href
}
</script>

<style scoped>
.hotel-list ul {
  list-style: none;
  padding: 0;
}

.hotel-list li {
  margin-bottom: 1rem;
}

.hotel-list img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>