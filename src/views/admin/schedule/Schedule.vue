<template>
  <div class="max-w-7xl mx-auto">
    <header class="mb-8">
      <h2 class="text-3xl font-bold text-[#4d2e7d]">Create Schedule</h2>
      <p class="text-gray-700 mt-2">Create and manage game schedules for your crew.</p>
    </header>

    <!-- Schedule Creation Form -->
    <div class="bg-white shadow rounded-lg p-6 mb-8">
      <form @submit.prevent="createSchedule">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Game Date</label>
            <input type="date" v-model="schedule.date" 
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Game Time</label>
            <input type="time" v-model="schedule.time" 
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input type="text" v-model="schedule.location" placeholder="Enter game location" 
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Opponent</label>
            <input type="text" v-model="schedule.opponent" placeholder="Enter opponent name" 
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" required />
          </div>
        </div>
        <div class="mt-6">
          <button type="submit" class="bg-[#4d2e7d] hover:bg-purple-700 text-white px-6 py-2 rounded-lg shadow">
            Create Schedule
          </button>
        </div>
      </form>
    </div>

    <!-- Schedule List -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opponent</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(item, index) in schedules" :key="index">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.date }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.time }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.location }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.opponent }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="getStatusClass(item.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                {{ item.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button class="text-purple-600 hover:text-purple-900 mr-3">Edit</button>
              <button class="text-red-600 hover:text-red-900">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminSchedule",
  data() {
    return {
      schedule: {
        date: '',
        time: '',
        location: '',
        opponent: ''
      },
      schedules: [
        {
          date: '2024-03-15',
          time: '19:00',
          location: 'Main Arena',
          opponent: 'Team A',
          status: 'Scheduled'
        },
        {
          date: '2024-03-20',
          time: '20:00',
          location: 'Secondary Court',
          opponent: 'Team B',
          status: 'Pending'
        }
      ]
    };
  },
  methods: {
    createSchedule() {
      // Add schedule creation logic here
      console.log('Creating schedule:', this.schedule);
    },
    getStatusClass(status) {
      switch (status.toLowerCase()) {
        case 'scheduled':
          return 'bg-green-100 text-green-800';
        case 'pending':
          return 'bg-yellow-100 text-yellow-800';
        case 'cancelled':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    }
  }
};
</script>

<style scoped>
/* All styles are managed via Tailwind CSS utility classes */
</style> 