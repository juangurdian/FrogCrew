<template>
    <div class="crew-list-page">
      <h2>Crew List for Game</h2>
      <div class="game-info">
        <h3>{{ game.date }} - {{ game.opponent }} at {{ game.venue }}</h3>
      </div>
      <table class="crew-table">
        <thead>
          <tr>
            <th>Role</th>
            <th>Name</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in crewMembers" :key="member.id">
            <td>{{ member.role }}</td>
            <td>{{ member.name }}</td>
            <td>{{ member.contact }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CrewListPage',
    data() {
      return {
        // Sample game details; replace with API data as needed.
        game: {
          date: '2025-04-15',
          opponent: 'Team B',
          venue: 'Stadium 2'
        },
        // Sample crew member data.
        crewMembers: [
          { id: 1, role: 'Producer', name: 'Jane Doe', contact: '555-1234' },
          { id: 2, role: 'Camera Operator', name: 'John Smith', contact: '555-5678' },
          { id: 3, role: 'Audio Engineer', name: 'Alice Johnson', contact: '555-9012' }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .crew-list-page {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    background: #f9f9f9;
    border-radius: 8px;
    font-family: Arial, sans-serif;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 1rem;
    color: #2c3e50;
  }
  
  .game-info {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  .crew-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .crew-table th,
  .crew-table td {
    padding: 0.75rem;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  .crew-table th {
    background-color: #42b983;
    color: #fff;
  }
  </style>
  