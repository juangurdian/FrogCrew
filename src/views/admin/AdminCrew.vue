<template>
  <div class="p-6">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Crew Management</h1>
      <p class="mt-1 text-sm text-gray-600">Manage your crew members, their roles, and contact information.</p>
    </div>

    <!-- Action Bar -->
    <div class="flex flex-wrap gap-4 mb-6">
      <button @click="openModal()" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
        Add Crew Member
      </button>
      <router-link 
        to="/admin/manage-crew" 
        class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
      >
        Manage Crew
      </router-link>
      
      <!-- Filters -->
      <div class="flex gap-4 ml-auto">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search by name or email" 
          class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        <select 
          v-model="positionFilter" 
          class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Positions</option>
          <option v-for="position in positions" :key="position" :value="position">
            {{ position }}
          </option>
        </select>
      </div>
    </div>

    <!-- Crew Members Table -->
    <div class="overflow-x-auto bg-white rounded-lg shadow">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="member in filteredCrewMembers" :key="member.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="h-10 w-10 flex-shrink-0">
                  <img 
                    :src="member.avatar || 'https://via.placeholder.com/40'" 
                    class="h-10 w-10 rounded-full"
                    :alt="member.name"
                  >
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ member.name }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ member.email }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ member.position }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="getStatusClass(member.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                {{ member.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button 
                @click="editMember(member)" 
                class="text-blue-600 hover:text-blue-900 mr-4"
              >
                Edit
              </button>
              <button 
                @click="confirmDelete(member)" 
                class="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div class="p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ editingMember ? 'Edit Crew Member' : 'Add New Crew Member' }}
          </h3>
          <form @submit.prevent="saveMember">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Name</label>
                <input 
                  v-model="memberForm.name" 
                  type="text" 
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <input 
                  v-model="memberForm.email" 
                  type="email" 
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Position</label>
                <select 
                  v-model="memberForm.position" 
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option v-for="position in positions" :key="position" :value="position">
                    {{ position }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Status</label>
                <select 
                  v-model="memberForm.status" 
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
            </div>
            <div class="mt-6 flex justify-end space-x-3">
              <button 
                type="button" 
                @click="closeModal" 
                class="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {{ editingMember ? 'Save Changes' : 'Add Member' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div class="p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
          <p class="text-sm text-gray-600">
            Are you sure you want to delete {{ memberToDelete?.name }}? This action cannot be undone.
          </p>
          <div class="mt-6 flex justify-end space-x-3">
            <button 
              @click="showDeleteModal = false" 
              class="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              @click="deleteMember" 
              class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminCrew',
  data() {
    return {
      crewMembers: [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          position: 'Camera Operator',
          status: 'Active',
          avatar: null
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          position: 'Director',
          status: 'Active',
          avatar: null
        },
        // Add more sample data as needed
      ],
      positions: [
        'Camera Operator',
        'Director',
        'Producer',
        'Audio Engineer',
        'Technical Director',
        'Graphics Operator',
        'Floor Manager'
      ],
      searchQuery: '',
      positionFilter: '',
      showModal: false,
      showDeleteModal: false,
      editingMember: null,
      memberToDelete: null,
      memberForm: {
        name: '',
        email: '',
        position: '',
        status: 'Active'
      }
    }
  },
  computed: {
    filteredCrewMembers() {
      return this.crewMembers.filter(member => {
        const matchesSearch = !this.searchQuery || 
          member.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          member.email.toLowerCase().includes(this.searchQuery.toLowerCase())
        
        const matchesPosition = !this.positionFilter || 
          member.position === this.positionFilter

        return matchesSearch && matchesPosition
      })
    }
  },
  methods: {
    getStatusClass(status) {
      const classes = {
        'Active': 'bg-green-100 text-green-800',
        'Inactive': 'bg-red-100 text-red-800',
        'On Leave': 'bg-yellow-100 text-yellow-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    },
    openModal() {
      this.editingMember = null
      this.memberForm = {
        name: '',
        email: '',
        position: '',
        status: 'Active'
      }
      this.showModal = true
    },
    editMember(member) {
      this.editingMember = member
      this.memberForm = { ...member }
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
      this.editingMember = null
      this.memberForm = {
        name: '',
        email: '',
        position: '',
        status: 'Active'
      }
    },
    saveMember() {
      if (this.editingMember) {
        // Update existing member
        const index = this.crewMembers.findIndex(m => m.id === this.editingMember.id)
        if (index !== -1) {
          this.crewMembers[index] = {
            ...this.editingMember,
            ...this.memberForm
          }
        }
      } else {
        // Add new member
        const newMember = {
          id: Math.max(0, ...this.crewMembers.map(m => m.id)) + 1,
          ...this.memberForm
        }
        this.crewMembers.push(newMember)
      }
      this.closeModal()
    },
    confirmDelete(member) {
      this.memberToDelete = member
      this.showDeleteModal = true
    },
    deleteMember() {
      if (this.memberToDelete) {
        const index = this.crewMembers.findIndex(m => m.id === this.memberToDelete.id)
        if (index !== -1) {
          this.crewMembers.splice(index, 1)
        }
      }
      this.showDeleteModal = false
      this.memberToDelete = null
    }
  }
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style> 