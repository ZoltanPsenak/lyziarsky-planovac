<template>
  <header class="header">
    <img alt="Logo Lyžiarskeho Plánovača" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <nav class="nav">
      <RouterLink to="/">Domov</RouterLink>
      <RouterLink to="/search">Vyhľadávanie Stredísk</RouterLink>
      <RouterLink to="/itinerary">Plánovač Itinerára</RouterLink>
      <RouterLink to="/route">Trasy a Náklady</RouterLink>
      <RouterLink to="/reservations">Rezervácie</RouterLink>
      <RouterLink to="/notifications">Upozornenia</RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--vt-c-indigo);
  color: var(--vt-c-white);
  padding: 1rem;
  text-align: center;
}

.logo {
  display: block;
  margin-bottom: 1rem;
}

.nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.nav a {
  color: var(--vt-c-white);
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s;
}

.nav a:hover {
  background-color: var(--vt-c-indigo-soft);
}
</style>