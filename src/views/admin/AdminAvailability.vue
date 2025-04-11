<template>
  <div class="p-4 sm:p-6 lg:p-8 ml-64">
    <header class="mb-8">
      <h2 class="text-2xl sm:text-3xl font-bold text-[#4d2e7d]">Manage Availability</h2>
      <p class="text-sm sm:text-base text-gray-700 mt-2">View and manage crew member availability.</p>
    </header>

    <!-- Filters -->
    <div class="bg-white shadow rounded-lg p-4 sm:p-6 mb-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
          <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div class="flex-1">
              <label class="text-xs text-gray-500 mb-1">From</label>
              <input 
                type="date" 
                v-model="filters.startDate"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div class="flex-1">
              <label class="text-xs text-gray-500 mb-1">To</label>
              <input 
                type="date" 
                v-model="filters.endDate"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Position</label>
          <select 
            v-model="filters.position"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="">All Positions</option>
            <option value="referee">Referee</option>
            <option value="scorekeeper">Scorekeeper</option>
            <option value="timekeeper">Timekeeper</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select 
            v-model="filters.status"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="">All Statuses</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong class="font-bold">Error!</strong>
      <span class="block sm:inline"> {{ error }}</span>
    </div>

    <!-- Availability Table -->
    <div v-else class="bg-white shadow rounded-lg overflow-hidden">
      <div v-if="filteredAvailability.length === 0" class="text-center py-8 text-gray-500">
        No availability records found
      </div>
      
      <!-- Mobile View -->
      <div class="block sm:hidden">
        <div v-for="(record, index) in paginatedAvailability" :key="index" class="border-b border-gray-200 p-4">
          <div class="flex items-center mb-3">
            <div class="flex-shrink-0 h-10 w-10">
              <img class="h-10 w-10 rounded-full" :src="record.crewMember.avatar" alt="" />
            </div>
            <div class="ml-3">
              <div class="text-sm font-medium text-gray-900">{{ record.crewMember.name }}</div>
              <div class="text-xs text-gray-500">{{ record.crewMember.email }}</div>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-xs font-medium text-gray-500">Position:</span>
              <span class="px-2 text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                {{ record.position }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-xs font-medium text-gray-500">Date:</span>
              <span class="text-xs text-gray-900">{{ formatDate(record.date) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-xs font-medium text-gray-500">Status:</span>
              <span :class="getStatusClass(record.status)" class="px-2 text-xs leading-5 font-semibold rounded-full">
                {{ record.status }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-xs font-medium text-gray-500">Notes:</span>
              <span class="text-xs text-gray-900">{{ record.notes || 'No notes' }}</span>
            </div>
            <div class="flex justify-end space-x-3 mt-3">
              <button 
                @click="editAvailability(record)"
                class="text-sm text-purple-600 hover:text-purple-900"
              >
                Edit
              </button>
              <button 
                @click="deleteAvailability(record)"
                class="text-sm text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop View -->
      <div class="hidden sm:block overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crew Member</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(record, index) in paginatedAvailability" :key="index">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img class="h-10 w-10 rounded-full" :src="record.crewMember.avatar" alt="" />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ record.crewMember.name }}</div>
                    <div class="text-sm text-gray-500">{{ record.crewMember.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {{ record.position }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(record.date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(record.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ record.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                {{ record.notes || 'No notes' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button 
                  @click="editAvailability(record)"
                  class="text-purple-600 hover:text-purple-900 mr-3"
                >
                  Edit
                </button>
                <button 
                  @click="deleteAvailability(record)"
                  class="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="filteredAvailability.length > 0" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <!-- Mobile Pagination -->
        <div class="flex-1 flex justify-between sm:hidden">
          <button 
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span class="text-sm text-gray-700">
            Page {{ currentPage }} of {{ totalPages }}
          </span>
          <button 
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        
        <!-- Desktop Pagination -->
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing
              <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
              to
              <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredAvailability.length) }}</span>
              of
              <span class="font-medium">{{ filteredAvailability.length }}</span>
              results
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button 
                @click="currentPage--"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button 
                v-for="page in totalPages"
                :key="page"
                @click="currentPage = page"
                :class="[
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                  currentPage === page
                    ? 'z-10 bg-purple-50 border-purple-500 text-purple-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
              <button 
                @click="currentPage++"
                :disabled="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import api from '@/utils/axios';

export default {
  name: "AdminAvailability",
  setup() {
    console.log('AdminAvailability component is being mounted');
    const loading = ref(false);
    const error = ref(null);
    const availabilityData = ref([]);
    const currentPage = ref(1);
    const itemsPerPage = 10;
    
    const filters = ref({
      startDate: '',
      endDate: '',
      position: '',
      status: ''
    });

    // Fetch availability data
    const fetchAvailability = async () => {
      loading.value = true;
      error.value = null;
      try {
        const response = await api.get('/availability');
        availabilityData.value = response.data;
      } catch (err) {
        error.value = 'Failed to fetch availability data. Please try again later.';
        console.error('Error fetching availability:', err);
      } finally {
        loading.value = false;
      }
    };

    // Filter availability data
    const filteredAvailability = computed(() => {
      return availabilityData.value.filter(record => {
        const matchesDate = (!filters.value.startDate || new Date(record.date) >= new Date(filters.value.startDate)) &&
                          (!filters.value.endDate || new Date(record.date) <= new Date(filters.value.endDate));
        const matchesPosition = !filters.value.position || record.position.toLowerCase() === filters.value.position.toLowerCase();
        const matchesStatus = !filters.value.status || record.status.toLowerCase() === filters.value.status.toLowerCase();
        
        return matchesDate && matchesPosition && matchesStatus;
      });
    });

    // Pagination
    const totalPages = computed(() => Math.ceil(filteredAvailability.value.length / itemsPerPage));
    const paginatedAvailability = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredAvailability.value.slice(start, end);
    });

    // Format date
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    };

    // Get status class
    const getStatusClass = (status) => {
      switch (status.toLowerCase()) {
        case 'available':
          return 'bg-green-100 text-green-800';
        case 'unavailable':
          return 'bg-red-100 text-red-800';
        case 'pending':
          return 'bg-yellow-100 text-yellow-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    // Edit availability
    const editAvailability = async (record) => {
      try {
        // Implement edit functionality
        console.log('Editing availability:', record);
      } catch (err) {
        error.value = 'Failed to edit availability. Please try again.';
        console.error('Error editing availability:', err);
      }
    };

    // Delete availability
    const deleteAvailability = async (record) => {
      if (confirm('Are you sure you want to delete this availability record?')) {
        try {
          await api.delete(`/availability/${record.id}`);
          await fetchAvailability();
        } catch (err) {
          error.value = 'Failed to delete availability. Please try again.';
          console.error('Error deleting availability:', err);
        }
      }
    };

    onMounted(() => {
      fetchAvailability();
    });

    return {
      loading,
      error,
      filters,
      filteredAvailability,
      paginatedAvailability,
      currentPage,
      totalPages,
      formatDate,
      getStatusClass,
      editAvailability,
      deleteAvailability
    };
  }
};
</script>

<style scoped>
/* All styles are managed via Tailwind CSS utility classes */
</style> 