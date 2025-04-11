<template>
  <div class="p-6">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Crew Dashboard</h1>
      <p class="mt-1 text-sm text-gray-600">Welcome to your crew dashboard. Here's an overview of your schedule and availability.</p>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <!-- Upcoming Shifts -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100 text-blue-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500">Upcoming Shifts</h3>
            <p class="text-2xl font-semibold text-gray-900">{{ upcomingShiftsCount }}</p>
          </div>
        </div>
      </div>

      <!-- Hours This Week -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100 text-green-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500">Hours This Week</h3>
            <p class="text-2xl font-semibold text-gray-900">{{ hoursThisWeek }}</p>
          </div>
        </div>
      </div>

      <!-- Availability Status -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full" :class="availabilityStatusClass">
            <svg class="w-6 h-6" :class="availabilityIconClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500">Availability Status</h3>
            <p class="text-2xl font-semibold" :class="availabilityTextClass">{{ availabilityStatus }}</p>
          </div>
        </div>
      </div>

      <!-- Pending Requests -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500">Pending Requests</h3>
            <p class="text-2xl font-semibold text-gray-900">{{ pendingRequestsCount }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Calendar and Upcoming Shifts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Mini Calendar -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Your Schedule</h2>
          <div class="grid grid-cols-7 gap-1 text-center">
            <div v-for="day in ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']" :key="day" class="text-sm font-medium text-gray-500">
              {{ day }}
            </div>
            <div v-for="(day, index) in calendarDays" :key="index" 
                 :class="[
                   'p-2 text-sm rounded-full cursor-pointer',
                   day.isToday ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100',
                   day.hasShifts ? 'font-bold' : ''
                 ]">
              {{ day.date }}
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming Shifts -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Upcoming Shifts</h2>
          <div class="space-y-4">
            <div v-for="shift in upcomingShifts" :key="shift.id" class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-900">{{ shift.title }}</p>
                <p class="text-xs text-gray-500">{{ shift.date }} at {{ shift.time }}</p>
              </div>
              <div class="flex items-center space-x-2">
                <span class="px-2 py-1 text-xs rounded-full" :class="shift.statusClass">
                  {{ shift.status }}
                </span>
                <button class="text-blue-600 hover:text-blue-800 text-sm">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Availability and Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Availability -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Your Availability</h2>
          <div class="space-y-4">
            <div v-for="period in availabilityPeriods" :key="period.id" class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-900">{{ period.title }}</p>
                <p class="text-xs text-gray-500">{{ period.date }}</p>
              </div>
              <div class="flex items-center">
                <span class="px-2 py-1 text-xs rounded-full" :class="period.statusClass">
                  {{ period.status }}
                </span>
              </div>
            </div>
            <button class="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Update Availability
            </button>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
          <div class="space-y-4">
            <div v-for="activity in recentActivities" :key="activity.id" class="flex items-start">
              <div class="flex-shrink-0">
                <div :class="activity.iconBg" class="p-2 rounded-full">
                  <svg class="w-5 h-5" :class="activity.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="activity.iconPath" />
                  </svg>
                </div>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">{{ activity.description }}</p>
                <p class="text-xs text-gray-500">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CrewHome',
  data() {
    return {
      upcomingShiftsCount: 5,
      hoursThisWeek: 24,
      availabilityStatus: 'Available',
      pendingRequestsCount: 2,
      calendarDays: Array.from({ length: 35 }, (_, i) => ({
        date: i + 1,
        isToday: i + 1 === new Date().getDate(),
        hasShifts: [1, 5, 12, 15, 20, 25].includes(i + 1)
      })),
      upcomingShifts: [
        {
          id: 1,
          title: 'Morning News Broadcast',
          date: 'Today',
          time: '6:00 AM - 9:00 AM',
          status: 'Confirmed',
          statusClass: 'bg-green-100 text-green-800'
        },
        {
          id: 2,
          title: 'Sports Coverage',
          date: 'Tomorrow',
          time: '2:00 PM - 5:00 PM',
          status: 'Pending',
          statusClass: 'bg-yellow-100 text-yellow-800'
        }
      ],
      availabilityPeriods: [
        {
          id: 1,
          title: 'Next Week',
          date: 'Mar 1 - Mar 7',
          status: 'Available',
          statusClass: 'bg-green-100 text-green-800'
        },
        {
          id: 2,
          title: 'Week After',
          date: 'Mar 8 - Mar 14',
          status: 'Limited',
          statusClass: 'bg-yellow-100 text-yellow-800'
        }
      ],
      recentActivities: [
        {
          id: 1,
          description: 'Shift confirmed: Morning News Broadcast',
          time: '2 hours ago',
          iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600'
        },
        {
          id: 2,
          description: 'Availability updated for next week',
          time: '1 day ago',
          iconPath: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600'
        }
      ]
    }
  },
  computed: {
    availabilityStatusClass() {
      return {
        'bg-green-100': this.availabilityStatus === 'Available',
        'bg-yellow-100': this.availabilityStatus === 'Limited',
        'bg-red-100': this.availabilityStatus === 'Unavailable'
      }
    },
    availabilityIconClass() {
      return {
        'text-green-600': this.availabilityStatus === 'Available',
        'text-yellow-600': this.availabilityStatus === 'Limited',
        'text-red-600': this.availabilityStatus === 'Unavailable'
      }
    },
    availabilityTextClass() {
      return {
        'text-green-900': this.availabilityStatus === 'Available',
        'text-yellow-900': this.availabilityStatus === 'Limited',
        'text-red-900': this.availabilityStatus === 'Unavailable'
      }
    }
  }
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style> 