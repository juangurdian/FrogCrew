<template>
    <div class="shift-exchange-response">
      <h2>Shift Exchange Request</h2>
      <div class="exchange-card" v-if="exchangeRequest">
        <p>
          <strong>Game:</strong>
          {{ exchangeRequest.game.date }} - {{ exchangeRequest.game.opponent }} ({{ exchangeRequest.game.shift }})
        </p>
        <p>
          <strong>Requested Reason:</strong>
          {{ exchangeRequest.reason }}
        </p>
        <p>
          <strong>Additional Details:</strong>
          {{ exchangeRequest.message || 'N/A' }}
        </p>
      </div>
      <div class="actions" v-if="exchangeRequest">
        <button class="btn-accept" @click="acceptRequest">Accept</button>
        <button class="btn-reject" @click="rejectRequest">Reject</button>
      </div>
      <div v-else>
        <p>No shift exchange requests available at the moment.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AcceptRejectShiftExchange",
    data() {
      return {
        // Sample request data; in a production scenario, fetch this from an API
        exchangeRequest: {
          id: 101,
          game: { date: "2025-04-15", opponent: "Team B", shift: "Evening" },
          reason: "Personal reasons",
          message: "I have a conflicting appointment."
        }
      };
    },
    methods: {
      acceptRequest() {
        console.log("Accepted shift exchange request:", this.exchangeRequest);
        alert("You have accepted the shift exchange request.");
        // TODO: Replace with an API call to update the request status on the backend.
      },
      rejectRequest() {
        console.log("Rejected shift exchange request:", this.exchangeRequest);
        alert("You have rejected the shift exchange request.");
        // TODO: Replace with an API call to update the request status on the backend.
      }
    }
  };
  </script>
  
  <style scoped>
  .shift-exchange-response {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #f7f7f7;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #2c3e50;
  }
  
  .exchange-card {
    background-color: #fff;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 1.5rem;
  }
  
  .exchange-card p {
    margin: 0.5rem 0;
  }
  
  .actions {
    display: flex;
    justify-content: space-between;
  }
  
  .btn-accept,
  .btn-reject {
    flex: 1;
    padding: 0.75rem;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;
    margin: 0 0.5rem;
  }
  
  .btn-accept {
    background-color: #42b983;
  }
  
  .btn-accept:hover {
    background-color: #369870;
  }
  
  .btn-reject {
    background-color: #e74c3c;
  }
  
  .btn-reject:hover {
    background-color: #c0392b;
  }
  </style>
  