<template>
  <header class="header">
    <div class="header-content">
      <img alt="Logo Lyžiarskeho Plánovača" class="logo" src="@/assets/logo.svg" width="40" height="40" />
      <nav class="nav">
        <RouterLink to="/">Domov</RouterLink>
        <RouterLink to="/search">Vyhľadávanie</RouterLink>
        <RouterLink to="/itinerary">Itinerária</RouterLink>
        <RouterLink to="/route">Trasy a náklady</RouterLink>
        <RouterLink to="/reservations">Rezervácie</RouterLink>
        <RouterLink to="/notifications">Upozornenia</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.header {
  width: 100%;
  background-color: var(--vt-c-indigo);
  color: var(--vt-c-white);
  padding: 1rem 0;
  text-align: center;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  border-radius: 8px;
}

.nav a:hover {
  background-color: var(--vt-c-indigo-soft);
}
</style>