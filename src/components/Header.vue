<template>
  <header class="header">
    <div class="header-content">
      <img alt="Logo Lyžiarskeho Plánovača" class="logo" src="@/assets/logo.svg" width="40" height="40" />
      <nav class="nav">
        <RouterLink to="/" class="nav-link" active-class="active-link">Domov</RouterLink>
        <RouterLink to="/search" class="nav-link" active-class="active-link">Vyhľadávanie</RouterLink>
        <RouterLink to="/itinerary" class="nav-link" active-class="active-link">Itinerária</RouterLink>
        <RouterLink to="/route" class="nav-link" active-class="active-link">Trasy a náklady</RouterLink>
        <RouterLink to="/reservations" class="nav-link" active-class="active-link">Rezervácie</RouterLink>
        <RouterLink to="/notifications" class="nav-link" active-class="active-link">Upozornenia</RouterLink>
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: block;
  margin-right: 1rem;
}

.nav {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: var(--vt-c-white);
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s, color 0.3s;
  border-radius: 8px;
}

.nav-link:hover {
  background-color: var(--vt-c-indigo-soft);
}

.active-link {
  background-color: var(--vt-c-indigo-light);
  color: var(--vt-c-black);
}
</style>