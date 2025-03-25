<template>
    <div class="other-profile">
      <button class="btn-back" @click="goBack">← Back</button>
      <div class="profile-card">
        <img src="@/assets/default-avatar.png" alt="Profile Picture" class="profile-pic" />
        <h2>{{ crewMember.firstName }} {{ crewMember.lastName }}</h2>
        <p class="role"><strong>Role:</strong> {{ crewMember.role }}</p>
        <p class="qualified"><strong>Qualified Position:</strong> {{ crewMember.qualifiedPosition }}</p>
        <p class="contact"><strong>Email:</strong> {{ crewMember.email }}</p>
        <p class="contact"><strong>Phone:</strong> {{ crewMember.phone }}</p>
        <!-- You can add more details as needed -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "OtherCrewProfile",
    data() {
      return {
        // In a real application, fetch the crew member data using a parameter (e.g., ID) and an API call.
        crewMember: {
          firstName: "Jane",
          lastName: "Doe",
          role: "Camera Operator",
          qualifiedPosition: "Camera (Handheld)",
          email: "jane.doe@tcusports.edu",
          phone: "123-456-7890"
        }
      };
    },
    methods: {
      goBack() {
        // Navigate back to the previous page, e.g., crew list or dashboard.
        this.$router.back();
      }
    }
  };
  </script>
  
  <style scoped>
  .other-profile {
    max-width: 600px;
    margin: 2rem auto;
    padding: 1rem;
    font-family: Arial, sans-serif;
  }
  
  .btn-back {
    background: none;
    border: none;
    color: #42b983;
    font-size: 1rem;
    cursor: pointer;
    margin-bottom: 1rem;
  }
  
  .profile-card {
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    text-align: center;
  }
  
  .profile-pic {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 1rem;
  }
  
  h2 {
    margin-bottom: 0.5rem;
    color: #2c3e50;
  }
  
  p {
    margin: 0.5rem 0;
    color: #34495e;
  }
  
  strong {
    color: #2c3e50;
  }
  </style>
  