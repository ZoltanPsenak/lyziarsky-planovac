<template>
  <div class="cost-calculator">
    <h1>Porovnávač Lyžiarskych Stredísk</h1>
    <div class="selection-container">
      <div class="selection-column">
        <h3>Vyberte Rezort (ľavá strana):</h3>
        <div class="resort-list">
          <div
            v-for="resort in skiResorts"
            :key="resort.id"
            :class="['resort-item', { selected: resort === leftSelectedResort }]"
            @click="chooseLeftResort(resort)"
          >
            <img :src="getImageUrl(resort.image)" :alt="resort.name" />
            <h4>{{ resort.name }}</h4>
          </div>
        </div>
        <div v-if="leftSelectedResort">
          <h4>Vyberte Hotel:</h4>
          <div class="hotel-list">
            <div
              v-for="hotel in leftSelectedResort.hotels"
              :key="hotel.name"
              :class="['hotel-item', { selected: hotel === leftSelectedHotel }]"
              @click="chooseLeftHotel(hotel)"
            >
              <img :src="getImageUrl(hotel.image)" :alt="hotel.name" />
              <p>{{ hotel.name }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="selection-column">
        <h3>Vyberte Rezort (pravá strana):</h3>
        <div class="resort-list">
          <div
            v-for="resort in skiResorts"
            :key="resort.id"
            :class="['resort-item', { selected: resort === rightSelectedResort }]"
            @click="chooseRightResort(resort)"
          >
            <img :src="getImageUrl(resort.image)" :alt="resort.name" />
            <h4>{{ resort.name }}</h4>
          </div>
        </div>
        <div v-if="rightSelectedResort">
          <h4>Vyberte Hotel:</h4>
          <div class="hotel-list">
            <div
              v-for="hotel in rightSelectedResort.hotels"
              :key="hotel.name"
              :class="['hotel-item', { selected: hotel === rightSelectedHotel }]"
              @click="chooseRightHotel(hotel)"
            >
              <img :src="getImageUrl(hotel.image)" :alt="hotel.name" />
              <p>{{ hotel.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="leftSelectedHotel && rightSelectedHotel">
      <h2>Kalkulačka Nákladov</h2>
      <div class="form-group">
        <label for="numAdults">Počet dospelých:</label>
        <input type="number" v-model.number="numAdults" min="0" />
      </div>
      <div class="form-group">
        <label for="numChildren">Počet detí:</label>
        <input type="number" v-model.number="numChildren" min="0" />
      </div>
      <div class="form-group">
        <label for="numDays">Počet dní lyžovania:</label>
        <input type="number" v-model.number="numDays" min="0" />
      </div>
      <div class="form-group">
        <label for="numNights">Počet nocí:</label>
        <input type="number" v-model.number="numNights" min="0" />
      </div>

      <button class="calculate-button" @click="calculateCost">Vypočítať Náklady</button>
      <div v-if="costDetails">
        <h3>Detailné Náklady</h3>
        <table class="cost-table">
          <thead>
            <tr>
              <th></th>
              <th>Ľavý Rezort</th>
              <th>Pravý Rezort</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lyžovanie dospelí</td>
              <td>{{ leftAdultPrice }} €</td>
              <td>{{ rightAdultPrice }} €</td>
            </tr>
            <tr>
              <td>Lyžovanie deti</td>
              <td>{{ leftHalfPriceKids }} €</td>
              <td>{{ rightHalfPriceKids }} €</td>
            </tr>
            <tr>
              <td>Ubytovanie</td>
              <td>{{ leftHotelPrice }} €</td>
              <td>{{ rightHotelPrice }} €</td>
            </tr>
            <tr>
              <td><strong>Celkom</strong></td>
              <td><strong>{{ leftTotal }} €</strong></td>
              <td><strong>{{ rightTotal }} €</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSkiResortsStore } from '@/stores/skiResorts'

const skiResortsStore = useSkiResortsStore()
const skiResorts = computed(() => skiResortsStore.skiResorts)

const leftSelectedResort = ref(null)
const leftSelectedHotel = ref(null)
const rightSelectedResort = ref(null)
const rightSelectedHotel = ref(null)

const numAdults = ref(0)
const numChildren = ref(0)
const numDays = ref(0)
const numNights = ref(0)
const costDetails = ref('')

const leftAdultPrice = ref(0)
const leftHalfPriceKids = ref(0)
const leftHotelPrice = ref(0)
const leftTotal = ref(0)
const rightAdultPrice = ref(0)
const rightHalfPriceKids = ref(0)
const rightHotelPrice = ref(0)
const rightTotal = ref(0)

const chooseLeftResort = (resort: any) => {
  leftSelectedResort.value = resort
  leftSelectedHotel.value = null
  costDetails.value = ''
}

const chooseLeftHotel = (hotel: any) => {
  leftSelectedHotel.value = hotel
  costDetails.value = ''
}

const chooseRightResort = (resort: any) => {
  rightSelectedResort.value = resort
  rightSelectedHotel.value = null
  costDetails.value = ''
}

const chooseRightHotel = (hotel: any) => {
  rightSelectedHotel.value = hotel
  costDetails.value = ''
}

const calculateCost = () => {
  if (!leftSelectedResort.value || !leftSelectedHotel.value || !rightSelectedResort.value || !rightSelectedHotel.value) {
    costDetails.value = 'Vyberte rezort a hotel na oboch stranách.'
    return
  }
  const leftBasePrice = leftSelectedResort.value.ticketInfo.price
  const rightBasePrice = rightSelectedResort.value.ticketInfo.price
  leftHalfPriceKids.value = (numChildren.value * 0.5) * leftBasePrice * numDays.value
  rightHalfPriceKids.value = (numChildren.value * 0.5) * rightBasePrice * numDays.value
  leftAdultPrice.value = numAdults.value * leftBasePrice * numDays.value
  rightAdultPrice.value = numAdults.value * rightBasePrice * numDays.value
  leftHotelPrice.value = leftSelectedHotel.value.price_per_night * numNights.value
  rightHotelPrice.value = rightSelectedHotel.value.price_per_night * numNights.value
  leftTotal.value = leftHalfPriceKids.value + leftAdultPrice.value + leftHotelPrice.value
  rightTotal.value = rightHalfPriceKids.value + rightAdultPrice.value + rightHotelPrice.value
  costDetails.value = `Cena ľavého rezortu: ${leftTotal.value} € (Lyžovanie: ${leftAdultPrice.value + leftHalfPriceKids.value} €, Ubytovanie: ${leftHotelPrice.value} €)\nCena pravého rezortu: ${rightTotal.value} € (Lyžovanie: ${rightAdultPrice.value + rightHalfPriceKids.value} €, Ubytovanie: ${rightHotelPrice.value} €)`
}

const getImageUrl = (imageName: string) => {
  return new URL(`../assets/${imageName}`, import.meta.url).href
}
</script>

<style scoped>
.cost-calculator {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  background-color: var(--color-background-soft);
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
.selection-container {
  display: flex;
  justify-content: space-between;
}
.selection-column {
  width: 45%;
}
.resort-list, .hotel-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
.resort-item, .hotel-item {
  background-color: transparent;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: box-shadow 0.3s, background-color 0.3s;
  width: 150px;
  text-align: center;
}
.resort-item:hover, .hotel-item:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  background-color: var(--vt-c-indigo-soft);
}
.resort-item.selected, .hotel-item.selected {
  background-color: var(--vt-c-indigo);
  color: var(--vt-c-white);
}
.resort-item img, .hotel-item img {
  width: 100%;
  height: 100px;
  object-fit: cover;
  margin-bottom: 0.5rem;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 1rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: var(--vt-c-orange);
  color: var(--vt-c-white);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 0.5rem;
}

button:hover {
  background-color: var(--vt-c-orange-soft);
}

.calculate-button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
}

.cost-breakdown {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
}

.cost-column {
  width: 45%;
  text-align: left;
}

.cost-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  border-radius: 8px;
  overflow: hidden;
}

.cost-table th, .cost-table td {
  border: 1px solid var(--color-border);
  padding: 0.5rem;
  text-align: center;
}

.cost-table th {
  background-color: var(--vt-c-indigo);
  color: var(--vt-c-white);
}

.cost-table td {
  background-color: var(--color-background-soft);
}
</style>