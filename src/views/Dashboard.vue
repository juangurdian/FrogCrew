<template>
  <div class="p-8 ml-64 mt-16">
    <!-- Welcome Section -->
    <div class="mb-10">
      <h1 class="text-3xl font-bold text-gray-800">Welcome back, <span class="text-tcu-purple">John</span>!</h1>
      <p class="text-gray-600 mt-2">Here's what's happening with your crew today.</p>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <button class="flex items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div class="p-4 bg-purple-100 rounded-full mr-4">
          <svg class="w-7 h-7 text-tcu-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <div class="text-left">
          <h3 class="font-semibold text-gray-800 text-lg">Add New Event</h3>
          <p class="text-sm text-gray-500 mt-1">Schedule a new game or event</p>
        </div>
      </button>

      <button class="flex items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div class="p-4 bg-green-100 rounded-full mr-4">
          <svg class="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <div class="text-left">
          <h3 class="font-semibold text-gray-800 text-lg">Invite Crew</h3>
          <p class="text-sm text-gray-500 mt-1">Add new crew members</p>
        </div>
      </button>

      <button class="flex items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div class="p-4 bg-blue-100 rounded-full mr-4">
          <svg class="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <div class="text-left">
          <h3 class="font-semibold text-gray-800 text-lg">View Reports</h3>
          <p class="text-sm text-gray-500 mt-1">Generate crew reports</p>
        </div>
      </button>
    </div>

    <!-- Summary Widgets -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <h3 class="text-gray-500 font-medium">Upcoming Events</h3>
          <span class="text-3xl font-bold text-tcu-purple">12</span>
        </div>
        <p class="text-sm text-gray-400 mt-2">Next 7 days</p>
        <div class="mt-4 h-2 bg-gray-100 rounded-full">
          <div class="h-2 bg-tcu-purple rounded-full" style="width: 75%"></div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <h3 class="text-gray-500 font-medium">Available Crew</h3>
          <span class="text-3xl font-bold text-green-600">45</span>
        </div>
        <p class="text-sm text-gray-400 mt-2">Ready to work</p>
        <div class="mt-4 h-2 bg-gray-100 rounded-full">
          <div class="h-2 bg-green-500 rounded-full" style="width: 60%"></div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <h3 class="text-gray-500 font-medium">Pending Requests</h3>
          <span class="text-3xl font-bold text-yellow-600">5</span>
        </div>
        <p class="text-sm text-gray-400 mt-2">Shift exchanges</p>
        <div class="mt-4 h-2 bg-gray-100 rounded-full">
          <div class="h-2 bg-yellow-500 rounded-full" style="width: 25%"></div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <h3 class="text-gray-500 font-medium">Total Crew</h3>
          <span class="text-3xl font-bold text-blue-600">78</span>
        </div>
        <p class="text-sm text-gray-400 mt-2">Active members</p>
        <div class="mt-4 h-2 bg-gray-100 rounded-full">
          <div class="h-2 bg-blue-500 rounded-full" style="width: 90%"></div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="mt-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-semibold text-gray-800">Recent Activity</h2>
        <button class="text-tcu-purple hover:text-purple-700 font-medium">View All</button>
      </div>
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <div class="p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full ring-2 ring-tcu-purple ring-opacity-20" src="https://ui-avatars.com/api/?name=Jane+Smith&background=4d2e7d&color=fff" alt="User avatar">
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">Jane Smith</p>
              <p class="text-sm text-gray-500">Submitted availability for next week</p>
            </div>
            <div class="ml-auto text-sm text-gray-500">2 hours ago</div>
          </div>
        </div>
        <div class="p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full ring-2 ring-tcu-purple ring-opacity-20" src="https://ui-avatars.com/api/?name=Mike+Johnson&background=4d2e7d&color=fff" alt="User avatar">
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">Mike Johnson</p>
              <p class="text-sm text-gray-500">Requested shift exchange for Saturday</p>
            </div>
            <div class="ml-auto text-sm text-gray-500">5 hours ago</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppDashboard'
}
</script>

<style scoped>
.text-tcu-purple {
  color: #4d2e7d;
}

.ring-tcu-purple {
  --tw-ring-color: #4d2e7d;
}

.bg-tcu-purple {
  background-color: #4d2e7d;
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Hover effects */
.hover\:shadow-lg:hover {
  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.hover\:shadow-md:hover {
  --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
</style> 