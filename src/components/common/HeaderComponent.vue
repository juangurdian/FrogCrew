<template>
    <header class="main-header">
      <div class="logo-container">
        <!-- Replace logo.png with your actual logo asset -->
        <img src="@/assets/logo.png" alt="FrogCrew Logo" class="logo" />
        <div class="brand-info">
          <h1>FrogCrew</h1>
          <span class="tagline">Streamlining Crew Scheduling for TCU Sports Broadcasting</span>
        </div>
      </div>
      <nav class="main-nav">
        <ul>
          <li><router-link to="/" active-class="active">Home</router-link></li>
          <li><router-link to="/GameSchedule" active-class="active">Schedule</router-link></li>
          <li><router-link to="/profile" active-class="active">Profile</router-link></li>
          <li><router-link to="/crew" active-class="active">Crew List</router-link></li>
          <li><router-link to="/notifications" active-class="active">Notifications</router-link></li>
        </ul>
      </nav>
      <div class="user-info">
        <!-- This is a placeholder; later you can integrate real user data -->
        <span class="user-name">Welcome, John Doe</span>
        <button class="logout-btn">Logout</button>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    name: 'MainHeaderComponent'
    // Future enhancements: use props or Vuex to manage and display real user info.
  }
  </script>
  
  <style scoped>
  .main-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #2c3e50;
    padding: 1rem 2rem;
    color: #fff;
    flex-wrap: wrap;
  }
  
  .logo-container {
    display: flex;
    align-items: center;
  }
  
  .logo {
    width: 50px;
    height: 50px;
    margin-right: 0.75rem;
  }
  
  .brand-info h1 {
    margin: 0;
    font-size: 1.75rem;
  }
  
  .tagline {
    font-size: 0.85rem;
    color: #bdc3c7;
  }
  
  .main-nav ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
  }
  
  .main-nav li {
    margin: 0 1rem;
  }
  
  .main-nav a {
    color: #ecf0f1;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;
  }
  
  .main-nav a:hover,
  .main-nav a.active {
    color: #1abc9c;
  }
  
  .user-info {
    display: flex;
    align-items: center;
  }
  
  .user-name {
    margin-right: 1rem;
  }
  
  .logout-btn {
    background-color: #e74c3c;
    border: none;
    padding: 0.5rem 1rem;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .logout-btn:hover {
    background-color: #c0392b;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .main-header {
      flex-direction: column;
      align-items: flex-start;
    }
    .main-nav ul {
      flex-direction: column;
      width: 100%;
    }
    .main-nav li {
      margin: 0.5rem 0;
    }
    .user-info {
      margin-top: 1rem;
    }
  }
  </style>
  