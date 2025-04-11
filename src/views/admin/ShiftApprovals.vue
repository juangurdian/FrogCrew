<template>
  <div class="p-4 sm:p-6 lg:p-8 mx-auto max-w-7xl">
    <header class="mb-8 text-center">
      <h2 class="text-2xl sm:text-3xl font-bold text-[#4d2e7d]">Shift Approvals</h2>
      <p class="text-sm sm:text-base text-gray-700 mt-2">Review and manage pending shift requests from crew members.</p>
    </header>

    <!-- Filters -->
    <div class="bg-white shadow rounded-lg p-4 sm:p-6 mb-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="col-span-1 sm:col-span-2">
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
        <div class="col-span-1">
          <label class="block text-sm font-medium text-gray-700 mb-2">Position</label>
          <select 
            v-model="filters.position"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="">All Positions</option>
            <option value="camera">Camera Operator</option>
            <option value="audio">Audio Technician</option>
            <option value="director">Director</option>
            <option value="producer">Producer</option>
            <option value="editor">Video Editor</option>
          </select>
        </div>
        <div class="col-span-1">
          <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select 
            v-model="filters.status"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div class="col-span-1 sm:col-span-2 lg:col-span-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <input 
            type="text" 
            v-model="filters.search"
            placeholder="Search by name or email"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
      </div>
    </div>

    <!-- Shift Requests Table -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <!-- Desktop View -->
      <div class="hidden md:block overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crew Member</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="request in filteredRequests" :key="request.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-10 w-10 flex-shrink-0">
                    <img 
                      :src="request.crewMember.avatar || 'https://via.placeholder.com/40'" 
                      class="h-10 w-10 rounded-full"
                      :alt="request.crewMember.name"
                    >
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ request.crewMember.name }}</div>
                    <div class="text-sm text-gray-500">{{ request.crewMember.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ request.position }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(request.date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ request.startTime }} - {{ request.endTime }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(request.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ request.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex flex-wrap gap-2 justify-center">
                  <button 
                    v-if="request.status === 'pending'"
                    @click="approveRequest(request)" 
                    class="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors"
                  >
                    Approve
                  </button>
                  <button 
                    v-if="request.status === 'pending'"
                    @click="rejectRequest(request)" 
                    class="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
                  >
                    Reject
                  </button>
                  <button 
                    @click="viewDetails(request)" 
                    class="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile View -->
      <div class="md:hidden">
        <div v-for="request in filteredRequests" :key="request.id" class="p-4 border-b border-gray-200">
          <div class="flex items-start justify-between">
            <div class="flex items-center">
              <div class="h-10 w-10 flex-shrink-0">
                <img 
                  :src="request.crewMember.avatar || 'https://via.placeholder.com/40'" 
                  class="h-10 w-10 rounded-full"
                  :alt="request.crewMember.name"
                >
              </div>
              <div class="ml-4">
                <div class="text-sm font-medium text-gray-900">{{ request.crewMember.name }}</div>
                <div class="text-sm text-gray-500">{{ request.crewMember.email }}</div>
              </div>
            </div>
            <span :class="getStatusClass(request.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
              {{ request.status }}
            </span>
          </div>
          
          <div class="mt-4 grid grid-cols-2 gap-4">
            <div>
              <div class="text-xs text-gray-500">Position</div>
              <div class="text-sm text-gray-900">{{ request.position }}</div>
            </div>
            <div>
              <div class="text-xs text-gray-500">Date</div>
              <div class="text-sm text-gray-900">{{ formatDate(request.date) }}</div>
            </div>
            <div>
              <div class="text-xs text-gray-500">Time</div>
              <div class="text-sm text-gray-900">{{ request.startTime }} - {{ request.endTime }}</div>
            </div>
          </div>

          <div class="mt-4 flex flex-wrap gap-2 justify-center">
            <button 
              v-if="request.status === 'pending'"
              @click="approveRequest(request)" 
              class="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors"
            >
              Approve
            </button>
            <button 
              v-if="request.status === 'pending'"
              @click="rejectRequest(request)" 
              class="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
            >
              Reject
            </button>
            <button 
              @click="viewDetails(request)" 
              class="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- View Details Modal -->
    <div v-if="selectedRequest" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4">
      <div class="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <div class="p-4 sm:p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4 text-center">Shift Request Details</h3>
          <div class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Crew Member</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedRequest.crewMember.name }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Position</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedRequest.position }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Date</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatDate(selectedRequest.date) }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Time</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedRequest.startTime }} - {{ selectedRequest.endTime }}</p>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Notes</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedRequest.notes || 'No notes provided' }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Status</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedRequest.status }}</p>
            </div>
          </div>
          <div class="mt-6 flex justify-center space-x-3">
            <button 
              type="button" 
              @click="selectedRequest = null" 
              class="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShiftApprovals',
  data() {
    return {
      filters: {
        startDate: '',
        endDate: '',
        position: '',
        status: '',
        search: ''
      },
      selectedRequest: null,
      shiftRequests: [
        {
          id: 1,
          crewMember: {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            avatar: null
          },
          position: 'Camera Operator',
          date: '2024-04-15',
          startTime: '09:00',
          endTime: '17:00',
          status: 'pending',
          notes: 'Requesting shift change due to personal appointment'
        },
        {
          id: 2,
          crewMember: {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            avatar: null
          },
          position: 'Audio Technician',
          date: '2024-04-16',
          startTime: '13:00',
          endTime: '21:00',
          status: 'pending',
          notes: 'Available for evening shift'
        }
      ]
    }
  },
  computed: {
    filteredRequests() {
      return this.shiftRequests.filter(request => {
        const matchesDate = (!this.filters.startDate || request.date >= this.filters.startDate) &&
                          (!this.filters.endDate || request.date <= this.filters.endDate)
        
        const matchesPosition = !this.filters.position || 
          request.position.toLowerCase().includes(this.filters.position.toLowerCase())
        
        const matchesStatus = !this.filters.status || 
          request.status.toLowerCase() === this.filters.status.toLowerCase()
        
        const matchesSearch = !this.filters.search || 
          request.crewMember.name.toLowerCase().includes(this.filters.search.toLowerCase()) ||
          request.crewMember.email.toLowerCase().includes(this.filters.search.toLowerCase())
        
        return matchesDate && matchesPosition && matchesStatus && matchesSearch
      })
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    },
    getStatusClass(status) {
      const classes = {
        'pending': 'bg-yellow-100 text-yellow-800',
        'approved': 'bg-green-100 text-green-800',
        'rejected': 'bg-red-100 text-red-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    },
    approveRequest(request) {
      request.status = 'approved'
      // TODO: Implement API call to update status
    },
    rejectRequest(request) {
      request.status = 'rejected'
      // TODO: Implement API call to update status
    },
    viewDetails(request) {
      this.selectedRequest = request
    }
  }
}
</script>

<style scoped>
/* Additional styles can be added here if needed */
</style> 