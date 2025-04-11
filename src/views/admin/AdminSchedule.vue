<template>
  <div class="min-h-screen bg-gray-100">
    <div class="ml-64 p-4 md:p-8">
      <div class="max-w-7xl mx-auto">
        <!-- Header Section -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-800">Game Schedule Management</h1>
          <p class="text-gray-600 mt-2">Manage game schedules and crew assignments</p>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-4 mb-8">
          <button @click="showCreateModal = true" class="btn-primary">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Create New Game
          </button>
          <button @click="exportSchedule" class="btn-secondary">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Schedule
          </button>
        </div>

        <!-- Schedule Table -->
        <div class="bg-white rounded-xl shadow-sm overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opponent</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crew Assigned</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="game in games" :key="game.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(game.date) }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ game.time }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ game.opponent }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ game.venue }}</td>
                <td class="px-6 py-4">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                        :class="game.crewAssigned ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'">
                    {{ game.crewAssigned ? 'Assigned' : 'Pending' }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                        :class="getStatusClass(game.status)">
                    {{ game.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button @click="editGame(game)" class="text-tcu-purple hover:text-tcu-purple-dark mr-3">
                    Edit
                  </button>
                  <button @click="assignCrew(game)" class="text-tcu-purple hover:text-tcu-purple-dark">
                    Assign Crew
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Create Game Modal -->
        <div v-if="showCreateModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div class="bg-white rounded-lg p-8 max-w-2xl w-full">
            <h2 class="text-2xl font-bold mb-4">Create New Game</h2>
            <form @submit.prevent="createGame">
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Date</label>
                  <input type="date" v-model="newGame.date" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-tcu-purple focus:ring-tcu-purple">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Time</label>
                  <input type="time" v-model="newGame.time" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-tcu-purple focus:ring-tcu-purple">
                </div>
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">Opponent</label>
                <input type="text" v-model="newGame.opponent" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-tcu-purple focus:ring-tcu-purple">
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">Venue</label>
                <input type="text" v-model="newGame.venue" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-tcu-purple focus:ring-tcu-purple">
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">Required Positions</label>
                <div class="mt-2 space-y-2">
                  <div v-for="position in positions" :key="position" class="flex items-center">
                    <input type="checkbox" :id="position" v-model="newGame.positions" :value="position" class="h-4 w-4 text-tcu-purple focus:ring-tcu-purple border-gray-300 rounded">
                    <label :for="position" class="ml-2 block text-sm text-gray-900">{{ position }}</label>
                  </div>
                </div>
              </div>
              <div class="flex justify-end gap-4">
                <button type="button" @click="showCreateModal = false" class="btn-secondary">
                  Cancel
                </button>
                <button type="submit" class="btn-primary">
                  Create Game
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminSchedule',
  data() {
    return {
      showCreateModal: false,
      games: [
        {
          id: 1,
          date: '2024-04-15',
          time: '19:00',
          opponent: 'Texas Longhorns',
          venue: 'Amon G. Carter Stadium',
          crewAssigned: true,
          status: 'Scheduled'
        },
        {
          id: 2,
          date: '2024-04-20',
          time: '18:30',
          opponent: 'Baylor Bears',
          venue: 'Amon G. Carter Stadium',
          crewAssigned: false,
          status: 'Pending'
        }
      ],
      positions: [
        'Producer',
        'Director',
        'Technical Director',
        'Camera Operator',
        'Audio Engineer',
        'Graphics Operator',
        'EVS Replay',
        'Bug Operator'
      ],
      newGame: {
        date: '',
        time: '',
        opponent: '',
        venue: '',
        positions: []
      }
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    getStatusClass(status) {
      switch (status) {
        case 'Scheduled':
          return 'bg-green-100 text-green-800'
        case 'Pending':
          return 'bg-yellow-100 text-yellow-800'
        case 'Cancelled':
          return 'bg-red-100 text-red-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    },
    createGame() {
      // TODO: Implement API call to create game
      console.log('Creating game:', this.newGame)
      this.showCreateModal = false
      this.resetNewGame()
    },
    editGame(game) {
      // TODO: Implement edit functionality
      console.log('Editing game:', game)
    },
    assignCrew(game) {
      // TODO: Implement crew assignment
      console.log('Assigning crew for game:', game)
    },
    exportSchedule() {
      // TODO: Implement export functionality
      console.log('Exporting schedule')
    },
    resetNewGame() {
      this.newGame = {
        date: '',
        time: '',
        opponent: '',
        venue: '',
        positions: []
      }
    }
  }
}
</script>

<style scoped>
.btn-primary {
  @apply bg-tcu-purple text-white px-4 py-2 rounded-lg hover:bg-tcu-purple-dark transition-colors flex items-center;
}

.btn-secondary {
  @apply bg-white text-tcu-purple border border-tcu-purple px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center;
}
</style> 