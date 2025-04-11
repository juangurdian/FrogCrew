<template>
  <div class="crew-schedule">
    <div class="header">
      <h1>My Schedule</h1>
      <p>View and manage your upcoming shifts</p>
    </div>

    <div class="filters">
      <div class="filter-group">
        <label>View</label>
        <select v-model="viewType">
          <option value="list">List View</option>
          <option value="calendar">Calendar View</option>
        </select>
      </div>
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
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>

    <div v-if="loading" class="loading">Loading schedule...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <!-- List View -->
      <div v-if="viewType === 'list'" class="schedule-list">
        <div v-for="shift in filteredShifts" :key="shift.id" class="shift-card">
          <div class="shift-header">
            <h3>{{ shift.title }}</h3>
            <span :class="['status-badge', getStatusClass(shift.status)]">
              {{ shift.status }}
            </span>
          </div>
          <div class="shift-details">
            <div class="detail">
              <span class="label">Date:</span>
              <span>{{ formatDate(shift.date) }}</span>
            </div>
            <div class="detail">
              <span class="label">Time:</span>
              <span>{{ shift.time }}</span>
            </div>
            <div class="detail">
              <span class="label">Location:</span>
              <span>{{ shift.location }}</span>
            </div>
            <div class="detail">
              <span class="label">Position:</span>
              <span>{{ shift.position }}</span>
            </div>
          </div>
          <div class="shift-actions">
            <button @click="viewShiftDetails(shift)" class="view-btn">View Details</button>
            <button v-if="shift.status === 'pending'" @click="confirmShift(shift)" class="confirm-btn">Confirm</button>
            <button v-if="shift.status === 'pending'" @click="declineShift(shift)" class="decline-btn">Decline</button>
          </div>
        </div>
      </div>

      <!-- Calendar View -->
      <div v-else class="calendar-view">
        <div class="calendar-header">
          <button @click="previousMonth">&lt;</button>
          <h2>{{ currentMonthYear }}</h2>
          <button @click="nextMonth">&gt;</button>
        </div>
        <div class="calendar-grid">
          <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day" class="calendar-day-header">
            {{ day }}
          </div>
          <div v-for="day in calendarDays" :key="day.date" 
               :class="['calendar-day', { 'has-shift': day.hasShift, 'today': day.isToday }]"
               @click="day.hasShift ? viewDayShifts(day) : null">
            <span class="day-number">{{ day.date }}</span>
            <div v-if="day.hasShift" class="shift-indicator"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Shift Details Modal -->
    <div v-if="selectedShift" class="modal">
      <div class="modal-content">
        <h2>Shift Details</h2>
        <div class="shift-details-modal">
          <div class="detail">
            <span class="label">Title:</span>
            <span>{{ selectedShift.title }}</span>
          </div>
          <div class="detail">
            <span class="label">Date:</span>
            <span>{{ formatDate(selectedShift.date) }}</span>
          </div>
          <div class="detail">
            <span class="label">Time:</span>
            <span>{{ selectedShift.time }}</span>
          </div>
          <div class="detail">
            <span class="label">Location:</span>
            <span>{{ selectedShift.location }}</span>
          </div>
          <div class="detail">
            <span class="label">Position:</span>
            <span>{{ selectedShift.position }}</span>
          </div>
          <div class="detail">
            <span class="label">Status:</span>
            <span :class="['status-badge', getStatusClass(selectedShift.status)]">
              {{ selectedShift.status }}
            </span>
          </div>
          <div class="detail">
            <span class="label">Notes:</span>
            <p>{{ selectedShift.notes }}</p>
          </div>
        </div>
        <div class="modal-actions">
          <button @click="selectedShift = null">Close</button>
          <button v-if="selectedShift.status === 'pending'" @click="confirmShift(selectedShift)" class="confirm-btn">
            Confirm Shift
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CrewSchedule',
  data() {
    return {
      loading: false,
      error: null,
      viewType: 'list',
      startDate: '',
      endDate: '',
      statusFilter: 'all',
      selectedShift: null,
      currentDate: new Date(),
      shifts: [
        {
          id: 1,
          title: 'Morning News Broadcast',
          date: '2024-03-15',
          time: '6:00 AM - 9:00 AM',
          location: 'Main Studio',
          position: 'Camera Operator',
          status: 'confirmed',
          notes: 'Please arrive 30 minutes early for setup'
        },
        {
          id: 2,
          title: 'Sports Coverage',
          date: '2024-03-16',
          time: '2:00 PM - 5:00 PM',
          location: 'Sports Arena',
          position: 'Audio Technician',
          status: 'pending',
          notes: 'Equipment will be provided on-site'
        }
      ]
    }
  },
  computed: {
    filteredShifts() {
      return this.shifts.filter(shift => {
        const dateMatch = (!this.startDate || shift.date >= this.startDate) &&
                         (!this.endDate || shift.date <= this.endDate)
        const statusMatch = this.statusFilter === 'all' || shift.status === this.statusFilter
        return dateMatch && statusMatch
      })
    },
    currentMonthYear() {
      return this.currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })
    },
    calendarDays() {
      const year = this.currentDate.getFullYear()
      const month = this.currentDate.getMonth()
      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)
      const daysInMonth = lastDay.getDate()
      const startingDay = firstDay.getDay()

      const days = []
      // Add empty cells for days before the first of the month
      for (let i = 0; i < startingDay; i++) {
        days.push({ date: '', hasShift: false, isToday: false })
      }

      // Add days of the month
      const today = new Date()
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i)
        const dateStr = date.toISOString().split('T')[0]
        const hasShift = this.shifts.some(shift => shift.date === dateStr)
        days.push({
          date: i,
          hasShift,
          isToday: date.toDateString() === today.toDateString()
        })
      }

      return days
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    },
    getStatusClass(status) {
      return {
        'confirmed': 'status-confirmed',
        'pending': 'status-pending',
        'completed': 'status-completed'
      }[status]
    },
    viewShiftDetails(shift) {
      this.selectedShift = shift
    },
    confirmShift(shift) {
      shift.status = 'confirmed'
      this.selectedShift = null
    },
    declineShift(shift) {
      if (confirm('Are you sure you want to decline this shift?')) {
        this.shifts = this.shifts.filter(s => s.id !== shift.id)
      }
    },
    previousMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1)
    },
    nextMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1)
    },
    viewDayShifts(day) {
      const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day.date)
      const dateStr = date.toISOString().split('T')[0]
      const dayShifts = this.shifts.filter(shift => shift.date === dateStr)
      if (dayShifts.length > 0) {
        this.selectedShift = dayShifts[0]
      }
    }
  }
}
</script>

<style scoped>
.crew-schedule {
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

.schedule-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.shift-card {
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.shift-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.shift-header h3 {
  margin: 0;
  font-size: 18px;
}

.shift-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.detail {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.label {
  font-size: 12px;
  color: #666;
}

.shift-actions {
  display: flex;
  gap: 8px;
}

.view-btn,
.confirm-btn,
.decline-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.view-btn {
  background-color: #2196F3;
  color: white;
}

.confirm-btn {
  background-color: #4CAF50;
  color: white;
}

.decline-btn {
  background-color: #f44336;
  color: white;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status-confirmed {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status-pending {
  background-color: #fff3e0;
  color: #ef6c00;
}

.status-completed {
  background-color: #e3f2fd;
  color: #1565c0;
}

.calendar-view {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.calendar-header button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.calendar-day-header {
  text-align: center;
  font-weight: 500;
  padding: 8px;
}

.calendar-day {
  aspect-ratio: 1;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
}

.calendar-day:hover {
  background-color: #f5f5f5;
}

.calendar-day.has-shift {
  background-color: #e3f2fd;
}

.calendar-day.today {
  background-color: #e8f5e9;
}

.day-number {
  font-size: 14px;
}

.shift-indicator {
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  background-color: #2196F3;
  border-radius: 50%;
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

.shift-details-modal {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
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
  background-color: #4CAF50;
  color: white;
}
</style> 