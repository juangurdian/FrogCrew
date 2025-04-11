<template>
  <div class="flex">
    <AdminSidebar />
    <div class="flex-1 p-6 ml-64">
      <div class="invite-crew">
        <div class="header">
          <h1>Invite Crew Members</h1>
          <p>Send invitations to new crew members to join the team</p>
        </div>

        <div class="invite-form">
          <div class="form-section">
            <h2>Single Invite</h2>
            <form @submit.prevent="sendSingleInvite">
              <div class="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  v-model="singleInvite.email" 
                  placeholder="crew.member@example.com"
                  required
                />
              </div>
              <div class="form-group">
                <label>Position</label>
                <select v-model="singleInvite.position" required>
                  <option value="">Select Position</option>
                  <option value="camera">Camera Operator</option>
                  <option value="audio">Audio Technician</option>
                  <option value="director">Director</option>
                  <option value="producer">Producer</option>
                  <option value="editor">Video Editor</option>
                </select>
              </div>
              <div class="form-group">
                <label>Message (Optional)</label>
                <textarea 
                  v-model="singleInvite.message" 
                  placeholder="Add a personal message to the invitation"
                  rows="3"
                ></textarea>
              </div>
              <button type="submit" class="submit-btn">Send Invitation</button>
            </form>
          </div>

          <div class="divider">
            <span>OR</span>
          </div>

          <div class="form-section">
            <h2>Bulk Invite</h2>
            <form @submit.prevent="sendBulkInvite">
              <div class="form-group">
                <label>Upload CSV File</label>
                <div class="file-upload">
                  <input 
                    type="file" 
                    accept=".csv"
                    @change="handleFileUpload"
                    ref="fileInput"
                  />
                  <button 
                    type="button" 
                    class="upload-btn"
                    @click="$refs.fileInput.click()"
                  >
                    Choose File
                  </button>
                  <span v-if="bulkInvite.fileName">{{ bulkInvite.fileName }}</span>
                </div>
                <small>CSV format: email,position,message</small>
              </div>
              <button 
                type="submit" 
                class="submit-btn"
                :disabled="!bulkInvite.file"
              >
                Send Bulk Invitations
              </button>
            </form>
          </div>
        </div>

        <div class="recent-invites" v-if="recentInvites.length > 0">
          <h2>Recent Invitations</h2>
          <table class="invites-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Position</th>
                <th>Status</th>
                <th>Sent Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="invite in recentInvites" :key="invite.id">
                <td>{{ invite.email }}</td>
                <td>{{ invite.position }}</td>
                <td>
                  <span :class="['status-badge', getStatusClass(invite.status)]">
                    {{ invite.status }}
                  </span>
                </td>
                <td>{{ formatDate(invite.sentDate) }}</td>
                <td>
                  <button 
                    @click="resendInvite(invite)"
                    class="action-btn"
                    :disabled="invite.status === 'pending'"
                  >
                    Resend
                  </button>
                  <button 
                    @click="cancelInvite(invite)"
                    class="action-btn cancel"
                    :disabled="invite.status !== 'pending'"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSidebar from '@/components/admin/AdminSidebar.vue';

export default {
  name: 'InviteCrew',
  components: {
    AdminSidebar
  },
  data() {
    return {
      singleInvite: {
        email: '',
        position: '',
        message: ''
      },
      bulkInvite: {
        file: null,
        fileName: ''
      },
      recentInvites: [
        {
          id: 1,
          email: 'john.doe@example.com',
          position: 'Camera Operator',
          status: 'pending',
          sentDate: '2024-03-15'
        },
        {
          id: 2,
          email: 'jane.smith@example.com',
          position: 'Audio Technician',
          status: 'accepted',
          sentDate: '2024-03-14'
        }
      ]
    }
  },
  methods: {
    sendSingleInvite() {
      // TODO: Implement API call to send invitation
      console.log('Sending single invite:', this.singleInvite)
      this.recentInvites.unshift({
        id: Date.now(),
        email: this.singleInvite.email,
        position: this.singleInvite.position,
        status: 'pending',
        sentDate: new Date().toISOString().split('T')[0]
      })
      this.singleInvite = {
        email: '',
        position: '',
        message: ''
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.bulkInvite.file = file
        this.bulkInvite.fileName = file.name
      }
    },
    sendBulkInvite() {
      // TODO: Implement API call to send bulk invitations
      console.log('Sending bulk invites:', this.bulkInvite)
      this.bulkInvite = {
        file: null,
        fileName: ''
      }
    },
    resendInvite(invite) {
      // TODO: Implement API call to resend invitation
      console.log('Resending invite:', invite)
    },
    cancelInvite(invite) {
      // TODO: Implement API call to cancel invitation
      console.log('Canceling invite:', invite)
      invite.status = 'cancelled'
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    },
    getStatusClass(status) {
      return {
        'pending': 'status-pending',
        'accepted': 'status-accepted',
        'declined': 'status-declined',
        'cancelled': 'status-cancelled'
      }[status]
    }
  }
}
</script>

<style scoped>
.invite-crew {
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

.invite-form {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 30px;
  margin-bottom: 40px;
}

.form-section {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-section h2 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 18px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

input[type="email"],
select,
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  resize: vertical;
}

.file-upload {
  display: flex;
  align-items: center;
  gap: 10px;
}

.file-upload input[type="file"] {
  display: none;
}

.upload-btn {
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn {
  padding: 10px 20px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.submit-btn:hover {
  background-color: #1565c0;
}

.submit-btn:disabled {
  background-color: #bdbdbd;
  cursor: not-allowed;
}

.divider {
  display: flex;
  align-items: center;
  justify-content: center;
}

.divider span {
  background-color: white;
  padding: 0 10px;
  color: #666;
}

.recent-invites {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.invites-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.invites-table th,
.invites-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.invites-table th {
  background-color: #f5f5f5;
  font-weight: 500;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status-pending {
  background-color: #fff3e0;
  color: #ef6c00;
}

.status-accepted {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status-declined {
  background-color: #ffebee;
  color: #c62828;
}

.status-cancelled {
  background-color: #f5f5f5;
  color: #616161;
}

.action-btn {
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 8px;
  font-size: 12px;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn.cancel {
  background-color: #f44336;
  color: white;
}
</style> 