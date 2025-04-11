<template>
  <div class="crew-availability">
    <div class="header">
      <h1>My Availability</h1>
      <p>Manage your availability and time off requests</p>
    </div>

    <div class="filters">
      <div class="filter-group">
        <label>Date Range</label>
        <div class="date-range">
          <input type="date" v-model="startDate" />
          <span>to</span>
          <input type="date" v-model="endDate" />
        </div>
      </div>
      <div class="filter-group">
        <label>Status</label>
        <select v-model="statusFilter">
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <button class="add-availability" @click="showAddModal = true">
        Add Availability
      </button>
    </div>

    <div v-if="loading" class="loading">Loading availability...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <table class="availability-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredAvailability" :key="item.id">
            <td>{{ formatDate(item.date) }}</td>
            <td>
              <span :class="['status-badge', getStatusClass(item.status)]">
                {{ item.status }}
              </span>
            </td>
            <td>{{ item.notes }}</td>
            <td>
              <button @click="editAvailability(item)" class="edit-btn">Edit</button>
              <button @click="deleteAvailability(item.id)" class="delete-btn">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal" class="modal">
      <div class="modal-content">
        <h2>{{ editingAvailability ? 'Edit' : 'Add' }} Availability</h2>
        <form @submit.prevent="saveAvailability">
          <div class="form-group">
            <label>Date</label>
            <input type="date" v-model="formData.date" required />
          </div>
          <div class="form-group">
            <label>Status</label>
            <select v-model="formData.status" required>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
          <div class="form-group">
            <label>Notes</label>
            <textarea v-model="formData.notes" rows="3"></textarea>
          </div>
          <div class="modal-actions">
            <button type="button" @click="showAddModal = false">Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CrewAvailability',
  data() {
    return {
      loading: false,
      error: null,
      startDate: '',
      endDate: '',
      statusFilter: 'all',
      showAddModal: false,
      editingAvailability: null,
      formData: {
        date: '',
        status: 'available',
        notes: ''
      },
      availability: [
        {
          id: 1,
          date: '2024-03-15',
          status: 'available',
          notes: 'Available all day'
        },
        {
          id: 2,
          date: '2024-03-16',
          status: 'unavailable',
          notes: 'Out of town'
        }
      ]
    }
  },
  computed: {
    filteredAvailability() {
      return this.availability.filter(item => {
        const dateMatch = (!this.startDate || item.date >= this.startDate) &&
                         (!this.endDate || item.date <= this.endDate)
        const statusMatch = this.statusFilter === 'all' || item.status === this.statusFilter
        return dateMatch && statusMatch
      })
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    },
    getStatusClass(status) {
      return {
        'available': 'status-available',
        'unavailable': 'status-unavailable',
        'pending': 'status-pending'
      }[status]
    },
    editAvailability(item) {
      this.editingAvailability = item
      this.formData = { ...item }
      this.showAddModal = true
    },
    deleteAvailability(id) {
      if (confirm('Are you sure you want to delete this availability record?')) {
        this.availability = this.availability.filter(item => item.id !== id)
      }
    },
    saveAvailability() {
      if (this.editingAvailability) {
        // Update existing availability
        const index = this.availability.findIndex(item => item.id === this.editingAvailability.id)
        this.availability[index] = { ...this.formData, id: this.editingAvailability.id }
      } else {
        // Add new availability
        const newId = Math.max(...this.availability.map(item => item.id), 0) + 1
        this.availability.push({ ...this.formData, id: newId })
      }
      this.showAddModal = false
      this.editingAvailability = null
      this.formData = {
        date: '',
        status: 'available',
        notes: ''
      }
    }
  }
}
</script>

<style scoped>
.crew-availability {
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
  align-items: flex-end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-group label {
  font-weight: 500;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 10px;
}

.date-range input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 150px;
}

.add-availability {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.add-availability:hover {
  background-color: #45a049;
}

.availability-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.availability-table th,
.availability-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.availability-table th {
  background-color: #f5f5f5;
  font-weight: 500;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status-available {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status-unavailable {
  background-color: #ffebee;
  color: #c62828;
}

.status-pending {
  background-color: #fff3e0;
  color: #ef6c00;
}

.edit-btn,
.delete-btn {
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 8px;
}

.edit-btn {
  background-color: #2196F3;
  color: white;
}

.delete-btn {
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

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
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

.modal-actions button[type="button"] {
  background-color: #f5f5f5;
}

.modal-actions button[type="submit"] {
  background-color: #4CAF50;
  color: white;
}
</style> 