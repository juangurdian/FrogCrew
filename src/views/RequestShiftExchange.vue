<template>
    <div class="shift-exchange">
      <h2>Request Shift Exchange</h2>
      <p>If you are unable to work your scheduled shift, please fill out the form below to request coverage.</p>
      <form @submit.prevent="submitRequest">
        <div class="form-group">
          <label for="game">Select Game/Shift<span class="required">*</span></label>
          <select id="game" v-model="exchangeRequest.gameId" required>
            <option disabled value="">Select a game</option>
            <option v-for="game in scheduledGames" :key="game.id" :value="game.id">
              {{ game.date }} - {{ game.opponent }} ({{ game.shift }})
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="reason">Reason for Request<span class="required">*</span></label>
          <select id="reason" v-model="exchangeRequest.reason" required>
            <option disabled value="">Select a reason</option>
            <option value="personal">Personal reasons</option>
            <option value="health">Health issues</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="form-group">
          <label for="message">Additional Details (optional)</label>
          <textarea id="message" v-model="exchangeRequest.message" placeholder="Provide additional details if needed"></textarea>
        </div>
        <button type="submit" class="btn-submit">Submit Request</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "RequestShiftExchange",
    data() {
      return {
        // Sample data; in a real application, this would be fetched from your backend API.
        scheduledGames: [
          { id: 1, date: "2025-04-10", opponent: "Team A", shift: "Morning" },
          { id: 2, date: "2025-04-15", opponent: "Team B", shift: "Evening" },
          { id: 3, date: "2025-04-20", opponent: "Team C", shift: "Afternoon" }
        ],
        exchangeRequest: {
          gameId: "",
          reason: "",
          message: ""
        }
      };
    },
    methods: {
      submitRequest() {
        // Validate that required fields are set (HTML required will also enforce this).
        console.log("Shift exchange request submitted:", this.exchangeRequest);
        alert("Your shift exchange request has been submitted.");
        // TODO: Replace this with an API call to handle the request.
      }
    }
  };
  </script>
  
  <style scoped>
  .shift-exchange {
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
    text-align: center;
    color: #2c3e50;
  }
  
  p {
    margin-bottom: 1.5rem;
    color: #34495e;
    text-align: center;
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
  
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  .form-group textarea {
    resize: vertical;
    min-height: 80px;
  }
  
  .btn-submit {
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
  