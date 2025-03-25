<template>
    <div class="submit-availability">
      <h2>Submit Your Availability</h2>
      <p>Please select the games for which you are available:</p>
      <form @submit.prevent="submitAvailability">
        <div v-for="game in availableGames" :key="game.id" class="game-item">
          <label>
            <input type="checkbox" v-model="game.available" />
            <span>
              <strong>{{ game.date }}</strong> - {{ game.opponent }} at {{ game.venue }}
            </span>
          </label>
        </div>
        <button type="submit" class="btn-submit">Submit Availability</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "SubmitAvailability",
    data() {
      return {
        // Sample data; in a real application, fetch these from your backend API.
        availableGames: [
          { id: 1, date: "2025-04-10", opponent: "Team A", venue: "Stadium 1", available: false },
          { id: 2, date: "2025-04-15", opponent: "Team B", venue: "Stadium 2", available: false },
          { id: 3, date: "2025-04-20", opponent: "Team C", venue: "Stadium 3", available: false }
        ]
      };
    },
    methods: {
      submitAvailability() {
        // Filter selected games
        const selectedGames = this.availableGames.filter(game => game.available);
        // Placeholder: Log and alert the selected games.
        console.log("Submitting availability for games:", selectedGames);
        alert(`Availability submitted for ${selectedGames.length} game(s)!`);
        
        // TODO: Replace with API call to store availability on the backend.
      }
    }
  };
  </script>
  
  <style scoped>
  .submit-availability {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #f7f7f7;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
  }
  
  h2 {
    margin-bottom: 1rem;
    color: #2c3e50;
  }
  
  p {
    margin-bottom: 1.5rem;
    color: #34495e;
  }
  
  .game-item {
    margin-bottom: 1rem;
    padding: 0.75rem;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    display: flex;
    align-items: center;
  }
  
  .game-item label {
    width: 100%;
    cursor: pointer;
  }
  
  .btn-submit {
    margin-top: 1.5rem;
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
  
  .btn-submit:hover {
    background-color: #369870;
  }
  </style>
  