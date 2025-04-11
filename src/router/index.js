import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import store from '@/store';

// Import admin views
import AdminLayout from '@/views/admin/layout/AdminLayout.vue';
import AdminHome from '@/views/admin/AdminHome.vue';
import AdminSchedule from '@/views/admin/schedule/Schedule.vue';
import AdminAvailability from '@/views/admin/AdminAvailability.vue';
import AdminCrew from '@/views/admin/AdminCrew.vue';
import InviteCrew from '@/views/admin/InviteCrew.vue';
import ManageCrew from '@/views/admin/ManageCrew.vue';
import ShiftApprovals from '@/views/admin/ShiftApprovals.vue';
import Reports from '@/views/admin/Reports.vue';

// Import common views
import UserLogin from '@/views/common/Login.vue';
import UserSignup from '@/views/common/Signup.vue';
import GameSchedule from '@/views/common/GameSchedule.vue';
import CrewHome from '@/views/crew/CrewHome.vue';
import CrewAvailability from '@/views/crew/CrewAvailability.vue';
import CrewSchedule from '@/views/crew/CrewSchedule.vue';

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: '',
        name: 'AdminHome',
        component: AdminHome
      },
      {
        path: 'schedule',
        name: 'AdminSchedule',
        component: AdminSchedule
      },
      {
        path: 'availability',
        name: 'AdminAvailability',
        component: AdminAvailability
      },
      {
        path: 'crew',
        name: 'AdminCrew',
        component: AdminCrew
      },
      {
        path: 'invite-crew',
        name: 'InviteCrew',
        component: InviteCrew
      },
      {
        path: 'manage-crew',
        name: 'ManageCrew',
        component: ManageCrew
      },
      {
        path: 'shift-approvals',
        name: 'ShiftApprovals',
        component: ShiftApprovals
      },
      {
        path: 'reports',
        name: 'Reports',
        component: Reports
      }
    ]
  },
  {
    path: '/crew',
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'CrewHome',
        component: CrewHome
      },
      {
        path: 'availability',
        name: 'CrewAvailability',
        component: CrewAvailability
      },
      {
        path: 'schedule',
        name: 'CrewSchedule',
        component: CrewSchedule
      }
    ]
  },
  {
    path: '/schedule',
    name: 'GameSchedule',
    component: GameSchedule
  },
  {
    path: '/login',
    name: 'Login',
    component: UserLogin
  },
  {
    path: '/signup',
    name: 'Signup',
    component: UserSignup
  },
  { path: '/:pathMatch(.*)*', redirect: '/dashboard' }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Add navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const currentMode = store.state.currentMode
  
  // If trying to access admin routes while in crew mode
  if (to.path.startsWith('/admin') && currentMode === 'crew') {
    next('/crew')
    return
  }
  
  // If trying to access crew routes while in admin mode
  if (to.path.startsWith('/crew') && currentMode === 'admin') {
    next('/admin')
    return
  }
  
  next()
});

export default router;
