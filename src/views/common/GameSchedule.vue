<template>
  <div class="game-schedule p-8 ml-64">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl font-bold text-gray-800 mb-4">Game Schedule</h2>
      <p class="text-gray-600 mb-6">Review the upcoming games and their details below:</p>
      
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Game Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Game Time</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opponent</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required Positions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="game in games" :key="game.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(game.date) }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ game.time }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ game.opponent }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ game.venue }}</td>
              <td class="px-6 py-4">
                <ul class="space-y-1">
                  <li v-for="position in game.positions" :key="position" class="text-sm text-gray-600">
                    {{ position }}
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-6 flex justify-end">
        <router-link to="/schedule" class="btn-primary">
          View Detailed Schedule
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameSchedule",
  data() {
    return {
      games: [
        {
          id: 1,
          date: "2025-04-10",
          time: "7:00 PM",
          opponent: "Team A",
          venue: "Stadium 1",
          positions: ["Producer", "Camera Operator", "Audio Engineer"]
        },
        {
          id: 2,
          date: "2025-04-15",
          time: "6:30 PM",
          opponent: "Team B",
          venue: "Stadium 2",
          positions: ["Director", "Graphics Operator", "EVS Replay"]
        },
        {
          id: 3,
          date: "2025-04-20",
          time: "8:00 PM",
          opponent: "Team C",
          venue: "Stadium 3",
          positions: ["Technical Director", "Bug Operator", "Camera (Handheld)"]
        }
      ]
    };
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  }
};
</script>

<style scoped>
.btn-primary {
  @apply bg-tcu-purple text-white px-4 py-2 rounded-lg hover:bg-tcu-purple-dark transition-colors;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .game-schedule {
    margin-left: 0;
    padding: 1rem;
  }
}
</style>
  