import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Schedule from '../views/Schedule.vue'
import Profile from '../views/Profile.vue'
import SubmitAvailability from '../views/SubmitAvailability.vue'
import RequestShiftExchange from '../views/RequestShiftExchange.vue'
import AcceptRejectShiftExchange from '../views/AcceptRejectShiftExchange.vue'
import CrewListPage from '../views/CrewList.vue'
import GameSchedule from '../views/GameSchedule.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/schedule', name: 'Schedule', component: Schedule },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/submit-availability', name: 'SubmitAvailability', component: SubmitAvailability },
  { path: '/shift-exchange', name: 'RequestShiftExchange', component: RequestShiftExchange },
  { path: '/shift-response', name: 'AcceptRejectShiftExchange', component: AcceptRejectShiftExchange },
  { path: '/crew', name: 'CrewList', component: CrewListPage },
  { path: '/game-schedule', name: 'GameSchedule', component: GameSchedule }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
