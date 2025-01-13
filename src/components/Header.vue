<template>
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/search">Search Resorts</RouterLink>
        <RouterLink to="/itinerary">Itinerary Planner</RouterLink>
        <RouterLink to="/route">Route & Costs</RouterLink>
        <RouterLink to="/reservations">Reservations</RouterLink>
        <RouterLink to="/notifications">Notifications</RouterLink>
        <RouterLink to="/statistics">Statistics</RouterLink>
      </nav>
    </header>
  </template>
  
  <script setup lang="ts">
  import { RouterLink } from 'vue-router'
  </script>
  
  <style scoped>
  header {
    line-height: 1.5;
    max-height: 100vh;
  }
  
  .logo {
    display: block;
    margin: 0 auto 2rem;
  }
  
  nav {
    width: 100%;
    font-size: 12px;
  }
  </style>