import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SearchView from '@/views/SearchView.vue'
import ItineraryView from '@/views/ItineraryView.vue'
import RouteView from '@/views/RouteView.vue'
import CostView from '@/views/CostView.vue'
import ReservationsView from '@/views/ReservationsView.vue'
import NotificationsView from '@/views/NotificationsView.vue'
import ResortDetailView from '@/views/ResortDetailView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/search', component: SearchView },
  { path: '/itinerary', component: ItineraryView },
  { path: '/route', component: RouteView },
  { path: '/cost', component: CostView },
  { path: '/reservations', component: ReservationsView },
  { path: '/notifications', component: NotificationsView },
  { path: '/resort/:id', name: 'resort-detail', component: ResortDetailView, props: true },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router