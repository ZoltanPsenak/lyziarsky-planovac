import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SearchView from '@/views/SearchView.vue'
import ItineraryView from '@/views/ItineraryView.vue'
import RouteView from '@/views/RouteView.vue'
import CostView from '@/views/CostView.vue'
import ReservationsView from '@/views/ReservationsView.vue'
import NotificationsView from '@/views/NotificationsView.vue'
import ResortDetailView from '@/views/ResortDetailView.vue'
import ResortList from '@/components/ResortList.vue'
import HotelList from '@/components/HotelList.vue'
import CostCalculator from '@/components/CostCalculator.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/search', component: SearchView },
  { path: '/itinerary', component: ItineraryView },
  { path: '/route', component: RouteView },
  { path: '/cost', component: CostView },
  { path: '/reservations', component: ReservationsView },
  { path: '/notifications', component: NotificationsView },
  { path: '/resort/:id', name: 'resort-detail', component: ResortDetailView, props: true },
  { path: '/resorts', name: 'resorts', component: ResortList },
  { path: '/hotels/:resortId', name: 'hotels', component: HotelList },
  { path: '/cost-calculator/:resortId/:hotelName', name: 'costCalculator', component: CostCalculator }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.name === 'resort-detail') {
      return { top: 100 } 
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router