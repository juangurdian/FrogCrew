<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Crew Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Quick Actions -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Quick Actions</h2>
        <div class="space-y-4">
          <router-link
            to="/crew/availability"
            class="block w-full text-center bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
          >
            Submit Availability
          </router-link>
          <router-link
            to="/crew/schedule"
            class="block w-full text-center bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
          >
            View Schedule
          </router-link>
        </div>
      </div>

      <!-- Upcoming Shifts -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Upcoming Shifts</h2>
        <div class="space-y-4">
          <div v-if="upcomingShifts.length === 0" class="text-gray-500">
            No upcoming shifts
          </div>
          <div
            v-for="shift in upcomingShifts"
            :key="shift.id"
            class="border-b pb-2"
          >
            <div class="font-medium">{{ shift.title }}</div>
            <div class="text-sm text-gray-600">{{ shift.date }}</div>
          </div>
        </div>
      </div>

      <!-- Notifications -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Notifications</h2>
        <div class="space-y-4">
          <div v-if="notifications.length === 0" class="text-gray-500">
            No new notifications
          </div>
          <div
            v-for="notification in notifications"
            :key="notification.id"
            class="border-b pb-2"
          >
            <div class="font-medium">{{ notification.title }}</div>
            <div class="text-sm text-gray-600">{{ notification.message }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardView',
  data() {
    return {
      upcomingShifts: [
        {
          id: 1,
          title: 'Football Game vs. Texas',
          date: '2024-04-15 14:00'
        },
        {
          id: 2,
          title: 'Basketball Game vs. Baylor',
          date: '2024-04-18 19:00'
        }
      ],
      notifications: [
        {
          id: 1,
          title: 'New Schedule Available',
          message: 'The schedule for May has been published'
        },
        {
          id: 2,
          title: 'Shift Exchange Request',
          message: 'John requested to exchange shifts on April 20'
        }
      ]
    }
  }
}
</script> 