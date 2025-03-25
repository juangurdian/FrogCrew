<template>
    <div class="dashboard">
      <section class="quick-actions">
        <h2>Quick Actions</h2>
        <div class="actions">
          <router-link to="/submit-availability" class="action-btn">Submit Availability</router-link>
          <router-link to="/schedule" class="action-btn">View Schedule</router-link>
          <router-link to="/profile" class="action-btn">Edit Profile</router-link>
          <router-link to="/shift-exchange" class="action-btn">Request Shift Exchange</router-link>
        </div>
      </section>
  
      <section class="upcoming-games">
        <h2>Upcoming Games</h2>
        <ul>
          <li v-for="game in upcomingGames" :key="game.id">
            <strong>{{ game.date }}</strong> - {{ game.opponent }} at {{ game.venue }}
          </li>
        </ul>
      </section>
  
      <section class="notifications">
        <h2>Notifications</h2>
        <ul>
          <li v-for="notification in notifications" :key="notification.id">
            {{ notification.message }}
          </li>
        </ul>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: "DashboardHome",
    data() {
      return {
        upcomingGames: [
          { id: 1, date: "2025-04-10", opponent: "Team A", venue: "Stadium 1" },
          { id: 2, date: "2025-04-15", opponent: "Team B", venue: "Stadium 2" }
        ],
        notifications: [
          { id: 1, message: "Your availability for Game 1 has been confirmed." },
          { id: 2, message: "Shift exchange request received for Game 2." }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .dashboard {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
  }
  
  .quick-actions {
    margin-bottom: 2rem;
  }
  .quick-actions h2 {
    margin-bottom: 1rem;
  }
  
  .actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .action-btn {
    background-color: #42b983;
    color: #fff;
    padding: 0.75rem 1.5rem;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s;
  }
  
  .action-btn:hover {
    background-color: #369870;
  }
  
  .upcoming-games,
  .notifications {
    margin-bottom: 2rem;
  }
  
  .upcoming-games h2,
  .notifications h2 {
    margin-bottom: 1rem;
  }
  
  .upcoming-games ul,
  .notifications ul {
    list-style-type: none;
    padding: 0;
  }
  
  .upcoming-games li,
  .notifications li {
    background-color: #f9f9f9;
    margin-bottom: 0.5rem;
    padding: 0.75rem;
    border-radius: 4px;
  }
  </style>
  