<template>
    <div class="login-page">
      <h2>Login</h2>
      <form @submit.prevent="loginUser">
        <div class="form-group">
          <label for="email">Email<span class="required">*</span></label>
          <input type="email" id="email" v-model="credentials.email" required />
        </div>
        <div class="form-group">
          <label for="password">Password<span class="required">*</span></label>
          <input type="password" id="password" v-model="credentials.password" required />
        </div>
        <button type="submit" class="btn-login">Login</button>
      </form>
      <p class="signup-link">
        Don't have an account? <router-link to="/signup">Sign Up</router-link>
      </p>
    </div>
  </template>
  
  <script>
  export default {
    name: "UserLogin",
    data() {
      return {
        credentials: {
          email: "",
          password: ""
        }
      };
    },
    methods: {
      loginUser() {
        // Placeholder login logic; replace with API integration.
        console.log("Logging in with", this.credentials);
        alert("Login successful!");
        // Navigate to the dashboard/home page.
        this.$router.push("/");
      }
    }
  };
  </script>
  
  <style scoped>
  .login-page {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    background: #f7f7f7;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    font-family: Arial, sans-serif;
  }
  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
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
  .form-group input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .btn-login {
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
  .btn-login:hover {
    background-color: #369870;
  }
  .signup-link {
    text-align: center;
    margin-top: 1rem;
  }
  .signup-link a {
    color: #42b983;
    text-decoration: none;
  }
  .signup-link a:hover {
    text-decoration: underline;
  }
  </style>
  