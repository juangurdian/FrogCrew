<template>
  <div class="flex">
    <AdminSidebar />
    <div class="flex-1 p-6 ml-64">
      <div class="manage-crew">
        <div class="header">
          <h1>Manage Crew Members</h1>
          <p>View and manage your crew members' information and status</p>
        </div>

        <div class="filters">
          <div class="filter-group">
            <label>Search</label>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search by name, email, or position"
            />
          </div>
          <div class="filter-group">
            <label>Position</label>
            <select v-model="positionFilter">
              <option value="">All Positions</option>
              <option value="camera">Camera Operator</option>
              <option value="audio">Audio Technician</option>
              <option value="director">Director</option>
              <option value="producer">Producer</option>
              <option value="editor">Video Editor</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Status</label>
            <select v-model="statusFilter">
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="on_leave">On Leave</option>
            </select>
          </div>
        </div>

        <div class="crew-table-container">
          <table class="crew-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Position</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="member in filteredCrew" :key="member.id">
                <td>{{ member.name }}</td>
                <td>{{ member.email }}</td>
                <td>{{ formatPosition(member.position) }}</td>
                <td>
                  <span :class="['status-badge', getStatusClass(member.status)]">
                    {{ formatStatus(member.status) }}
                  </span>
                </td>
                <td>{{ formatDate(member.joinDate) }}</td>
                <td>
                  <button @click="editMember(member)" class="action-btn edit">
                    Edit
                  </button>
                  <button 
                    @click="toggleStatus(member)" 
                    :class="['action-btn', member.status === 'active' ? 'deactivate' : 'activate']"
                  >
                    {{ member.status === 'active' ? 'Deactivate' : 'Activate' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Edit Member Modal -->
        <div v-if="editingMember" class="modal">
          <div class="modal-content">
            <h2>Edit Crew Member</h2>
            <form @submit.prevent="saveMember">
              <div class="form-group">
                <label>Name</label>
                <input 
                  type="text" 
                  v-model="editingMember.name" 
                  required
                />
              </div>
              <div class="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  v-model="editingMember.email" 
                  required
                />
              </div>
              <div class="form-group">
                <label>Position</label>
                <select v-model="editingMember.position" required>
                  <option value="camera">Camera Operator</option>
                  <option value="audio">Audio Technician</option>
                  <option value="director">Director</option>
                  <option value="producer">Producer</option>
                  <option value="editor">Video Editor</option>
                </select>
              </div>
              <div class="form-group">
                <label>Status</label>
                <select v-model="editingMember.status" required>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="on_leave">On Leave</option>
                </select>
              </div>
              <div class="modal-actions">
                <button type="button" @click="editingMember = null">Cancel</button>
                <button type="submit">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSidebar from '@/components/admin/AdminSidebar.vue';

export default {
  name: 'ManageCrew',
  components: {
    AdminSidebar
  },
  data() {
    return {
      searchQuery: '',
      positionFilter: '',
      statusFilter: '',
      editingMember: null,
      crewMembers: [
        {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          position: 'camera',
          status: 'active',
          joinDate: '2024-01-15'
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          position: 'audio',
          status: 'on_leave',
          joinDate: '2024-02-01'
        },
        {
          id: 3,
          name: 'Mike Johnson',
          email: 'mike.johnson@example.com',
          position: 'director',
          status: 'active',
          joinDate: '2024-01-20'
        }
      ]
    }
  },
  computed: {
    filteredCrew() {
      return this.crewMembers.filter(member => {
        const matchesSearch = 
          member.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          member.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          this.formatPosition(member.position).toLowerCase().includes(this.searchQuery.toLowerCase())
        
        const matchesPosition = !this.positionFilter || member.position === this.positionFilter
        const matchesStatus = !this.statusFilter || member.status === this.statusFilter
        
        return matchesSearch && matchesPosition && matchesStatus
      })
    }
  },
  methods: {
    formatPosition(position) {
      const positions = {
        'camera': 'Camera Operator',
        'audio': 'Audio Technician',
        'director': 'Director',
        'producer': 'Producer',
        'editor': 'Video Editor'
      }
      return positions[position] || position
    },
    formatStatus(status) {
      const statuses = {
        'active': 'Active',
        'inactive': 'Inactive',
        'on_leave': 'On Leave'
      }
      return statuses[status] || status
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    },
    getStatusClass(status) {
      return {
        'active': 'status-active',
        'inactive': 'status-inactive',
        'on_leave': 'status-on-leave'
      }[status]
    },
    editMember(member) {
      this.editingMember = { ...member }
    },
    saveMember() {
      const index = this.crewMembers.findIndex(m => m.id === this.editingMember.id)
      if (index !== -1) {
        this.crewMembers[index] = { ...this.editingMember }
      }
      this.editingMember = null
    },
    toggleStatus(member) {
      const newStatus = member.status === 'active' ? 'inactive' : 'active'
      const index = this.crewMembers.findIndex(m => m.id === member.id)
      if (index !== -1) {
        this.crewMembers[index].status = newStatus
      }
    }
  }
}
</script>

<style scoped>
.manage-crew {
  padding: 20px;
}

.header {
  margin-bottom: 30px;
}

.header h1 {
  font-size: 24px;
  margin-bottom: 8px;
}

.header p {
  color: #666;
}

.filters {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.filter-group {
  flex: 1;
}

.filter-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

input[type="text"],
input[type="email"],
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.crew-table-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.crew-table {
  width: 100%;
  border-collapse: collapse;
}

.crew-table th,
.crew-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.crew-table th {
  background-color: #f5f5f5;
  font-weight: 500;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status-active {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status-inactive {
  background-color: #ffebee;
  color: #c62828;
}

.status-on-leave {
  background-color: #fff3e0;
  color: #ef6c00;
}

.action-btn {
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 8px;
  font-size: 12px;
}

.action-btn.edit {
  background-color: #2196F3;
  color: white;
}

.action-btn.activate {
  background-color: #4CAF50;
  color: white;
}

.action-btn.deactivate {
  background-color: #f44336;
  color: white;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
}

.modal-content h2 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.modal-actions button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-actions button:first-child {
  background-color: #f5f5f5;
}

.modal-actions button:last-child {
  background-color: #1976d2;
  color: white;
}
</style> 