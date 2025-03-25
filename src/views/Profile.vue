<template>
    <div class="profile-page">
      <h2>Your Profile</h2>
      <form @submit.prevent="saveProfile" novalidate>
        <div class="form-group">
          <label for="firstName">First Name<span class="required">*</span></label>
          <input type="text" id="firstName" v-model="profile.firstName" required />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name<span class="required">*</span></label>
          <input type="text" id="lastName" v-model="profile.lastName" required />
        </div>
        <div class="form-group">
          <label for="email">Email<span class="required">*</span></label>
          <input type="email" id="email" v-model="profile.email" required />
        </div>
        <div class="form-group">
          <label for="phone">Phone Number<span class="required">*</span></label>
          <input
            type="tel"
            id="phone"
            v-model="profile.phone"
            pattern="\\d{3}-\\d{3}-\\d{4}"
            placeholder="123-456-7890"
            required
          />
        </div>
        <div class="form-group">
          <label for="role">Role<span class="required">*</span></label>
          <select id="role" v-model="profile.role" required>
            <option disabled value="">Select Role</option>
            <option value="crewMember">Crew Member</option>
            <option value="admin">Administrator</option>
          </select>
        </div>
        <div class="form-group">
          <label for="qualifiedPosition">Qualified Position<span class="required">*</span></label>
          <input type="text" id="qualifiedPosition" v-model="profile.qualifiedPosition" required />
        </div>
        <div class="form-group">
          <label for="password">Password<span class="required">*</span></label>
          <input type="password" id="password" v-model="profile.password" required />
        </div>
        <button type="submit" class="btn-save">Save Profile</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "UserProfile",
    data() {
      return {
        // In a real-world scenario, these values would be fetched from an API
        profile: {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          role: "",
          qualifiedPosition: "",
          password: ""
        }
      };
    },
    methods: {
      saveProfile() {
        // Placeholder for saving the profile.
        // You can add API integration here to submit the profile data to your backend.
        console.log("Profile saved:", this.profile);
        alert("Profile saved successfully!");
      }
    }
  };
  </script>
  
  <style scoped>
  .profile-page {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
  }
  h2 {
    margin-bottom: 1.5rem;
    text-align: center;
    color: #2c3e50;
  }
  .form-group {
    margin-bottom: 1.25rem;
  }
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  .required {
    color: red;
    margin-left: 0.25rem;
  }
  .form-group input,
  .form-group select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .btn-save {
    display: block;
    width: 100%;
    padding: 0.75rem;
    background-color: #42b983;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .btn-save:hover {
    background-color: #369870;
  }
  </style>
  