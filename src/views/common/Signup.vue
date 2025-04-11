<template>
    <div class="signup-page">
      <h2>Sign Up</h2>
      <form @submit.prevent="signupUser">
        <div class="form-group">
          <label for="firstName">First Name<span class="required">*</span></label>
          <input type="text" id="firstName" v-model="user.firstName" required />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name<span class="required">*</span></label>
          <input type="text" id="lastName" v-model="user.lastName" required />
        </div>
        <div class="form-group">
          <label for="email">Email<span class="required">*</span></label>
          <input type="email" id="email" v-model="user.email" required />
        </div>
        <div class="form-group">
          <label for="phone">Phone Number<span class="required">*</span></label>
          <input
            type="tel"
            id="phone"
            v-model="user.phone"
            pattern="\\d{3}-\\d{3}-\\d{4}"
            placeholder="123-456-7890"
            required
          />
        </div>
        <div class="form-group">
          <label for="role">Role<span class="required">*</span></label>
          <select id="role" v-model="user.role" required>
            <option disabled value="">Select Role</option>
            <option value="crewMember">Crew Member</option>
            <option value="admin">Administrator</option>
          </select>
        </div>
        <div class="form-group">
          <label for="qualifiedPosition">Qualified Position<span class="required">*</span></label>
          <input type="text" id="qualifiedPosition" v-model="user.qualifiedPosition" required />
        </div>
        <div class="form-group">
          <label for="password">Password<span class="required">*</span></label>
          <input type="password" id="password" v-model="user.password" required />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password<span class="required">*</span></label>
          <input type="password" id="confirmPassword" v-model="user.confirmPassword" required />
        </div>
        <button type="submit" class="btn-signup">Sign Up</button>
      </form>
      <p class="login-link">
        Already have an account? <router-link to="/login">Login</router-link>
      </p>
    </div>
  </template>
  
  <script>
  export default {
    name: "UserSignup",
    data() {
      return {
        user: {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          role: "",
          qualifiedPosition: "",
          password: "",
          confirmPassword: ""
        }
      };
    },
    methods: {
      signupUser() {
        if (this.user.password !== this.user.confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
        // Placeholder signup logic; replace with API call as needed.
        console.log("User signup data:", this.user);
        alert("Signup successful! Please log in.");
        // Optionally, redirect to the login page after signup.
        this.$router.push("/login");
      }
    }
  };
  </script>
  
  <style scoped>
  .signup-page {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #f7f7f7;
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
  .form-group input,
  .form-group select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .btn-signup {
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
  .btn-signup:hover {
    background-color: #369870;
  }
  .login-link {
    text-align: center;
    margin-top: 1rem;
  }
  .login-link a {
    color: #42b983;
    text-decoration: none;
  }
  .login-link a:hover {
    text-decoration: underline;
  }
  </style>
  