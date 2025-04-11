<template>
  <div class="min-h-screen bg-gray-100">
    <div class="ml-64 p-4 md:p-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Reports</h1>
        <p class="text-gray-600 mb-6">View and analyze crew performance and scheduling reports.</p>

        <!-- Report Filters -->
        <div class="mb-6">
          <div class="flex flex-col md:flex-row gap-4 mb-4">
            <div class="flex-1">
              <label for="date-range" class="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <input
                type="date"
                id="date-range"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div class="flex-1">
              <label for="report-type" class="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
              <select
                id="report-type"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="performance">Performance</option>
                <option value="scheduling">Scheduling</option>
                <option value="availability">Availability</option>
              </select>
            </div>
          </div>
          <button
            class="w-full md:w-auto px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Generate Report
          </button>
        </div>

        <!-- Report Table -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shifts</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">John Doe</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Camera Operator</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">15</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Excellent</td>
              </tr>
              <!-- More rows as needed -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminReports"
};
</script>

<style scoped>
/* Add any additional styles here */
</style> 