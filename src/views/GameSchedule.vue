<template>
    <div class="game-schedule">
      <h2>General Game Schedule</h2>
      <p>Review the upcoming games and their details below:</p>
      <table class="schedule-table">
        <thead>
          <tr>
            <th>Game Date</th>
            <th>Game Time</th>
            <th>Opponent</th>
            <th>Venue</th>
            <th>Required Positions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="game in games" :key="game.id">
            <td>{{ game.date }}</td>
            <td>{{ game.time }}</td>
            <td>{{ game.opponent }}</td>
            <td>{{ game.venue }}</td>
            <td>
              <ul>
                <li v-for="position in game.positions" :key="position">{{ position }}</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="actions">
        <router-link to="/schedule" class="btn-view-details">View Detailed Schedule</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "GameSchedule",
    data() {
      return {
        // Sample game data; later replace with dynamic API data.
        games: [
          {
            id: 1,
            date: "2025-04-10",
            time: "7:00 PM",
            opponent: "Team A",
            venue: "Stadium 1",
            positions: ["Producer", "Camera Operator", "Audio Engineer"]
          },
          {
            id: 2,
            date: "2025-04-15",
            time: "6:30 PM",
            opponent: "Team B",
            venue: "Stadium 2",
            positions: ["Director", "Graphics Operator", "EVS Replay"]
          },
          {
            id: 3,
            date: "2025-04-20",
            time: "8:00 PM",
            opponent: "Team C",
            venue: "Stadium 3",
            positions: ["Technical Director", "Bug Operator", "Camera (Handheld)"]
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .game-schedule {
    max-width: 900px;
    margin: 2rem auto;
    padding: 2rem;
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 1rem;
    color: #2c3e50;
  }
  
  p {
    text-align: center;
    margin-bottom: 2rem;
    color: #34495e;
  }
  
  .schedule-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1.5rem;
  }
  
  .schedule-table th,
  .schedule-table td {
    border: 1px solid #ddd;
    padding: 0.75rem;
    text-align: left;
  }
  
  .schedule-table th {
    background-color: #42b983;
    color: #fff;
  }
  
  .schedule-table ul {
    list-style-type: disc;
    margin: 0;
    padding-left: 1.25rem;
  }
  
  .actions {
    text-align: center;
  }
  
  .btn-view-details {
    display: inline-block;
    background-color: #42b983;
    color: #fff;
    padding: 0.75rem 1.5rem;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s;
  }
  
  .btn-view-details:hover {
    background-color: #369870;
  }
  </style>
  