<template>
    <header>
      <h1>FrogCrew</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/schedule">Schedule</router-link>
        <router-link to="/profile">Profile</router-link>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'HeaderComponent'
  }
  </script>
  
  <style scoped>
  header {
    background-color: #333;
    color: #fff;
    padding: 1rem;
  }
  nav a {
    color: #fff;
    margin-right: 1rem;
    text-decoration: none;
  }
  </style>
  