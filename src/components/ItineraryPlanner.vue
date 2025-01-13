<template>
    <div class="itinerary-planner">
      <ItineraryForm />
      <ItineraryList />
    </div>
  </template>
  
  <script setup lang="ts">
  import ItineraryForm from './ItineraryForm.vue'
  import ItineraryList from './ItineraryList.vue'
  </script>
  
  <style scoped>
  .itinerary-planner {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }
  </style>