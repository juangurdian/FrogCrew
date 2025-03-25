<template>
    <footer class="main-footer">
      <div class="footer-content">
        <div class="brand-info">
          <!-- Use your logo image. Replace logo.png with the actual asset if available -->
          <img src="@/assets/logo.png" alt="FrogCrew Logo" class="logo-footer" />
          <div class="brand-text">
            <h2>FrogCrew</h2>
            <p>Streamlining Crew Scheduling for TCU Sports Broadcasting</p>
          </div>
        </div>
        <div class="footer-links">
          <h3>Navigation</h3>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/schedule">Schedule</router-link></li>
            <li><router-link to="/profile">Profile</router-link></li>
            <li><router-link to="/crew">Crew List</router-link></li>
            <li><router-link to="/notifications">Notifications</router-link></li>
          </ul>
        </div>
        <div class="contact-info">
          <h3>Contact Us</h3>
          <p>Email: support@tcusports.edu</p>
          <p>Phone: (123) 456-7890</p>
          <p>Address: 123 Broadcasting Blvd, Fort Worth, TX</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 FrogCrew. All rights reserved.</p>
        <p>Version 1.0</p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'MainFooterComponent'
  }
  </script>
  
  <style scoped>
  .main-footer {
    background-color: #2c3e50;
    color: #ecf0f1;
    padding: 2rem;
    font-family: Arial, sans-serif;
  }
  
  .footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  
  .brand-info {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 250px;
  }
  
  .logo-footer {
    width: 50px;
    height: 50px;
    margin-right: 1rem;
  }
  
  .brand-text h2 {
    margin: 0;
    font-size: 1.5rem;
  }
  
  .brand-text p {
    font-size: 0.9rem;
    margin: 0.25rem 0 0;
  }
  
  .footer-links,
  .contact-info {
    flex: 1;
    min-width: 200px;
    margin: 1rem 0;
  }
  
  .footer-links h3,
  .contact-info h3 {
    margin-bottom: 0.5rem;
  }
  
  .footer-links ul {
    list-style: none;
    padding: 0;
  }
  
  .footer-links li {
    margin-bottom: 0.25rem;
  }
  
  .footer-links a {
    color: #1abc9c;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .footer-links a:hover {
    color: #16a085;
  }
  
  .footer-bottom {
    border-top: 1px solid #7f8c8d;
    margin-top: 2rem;
    padding-top: 1rem;
    text-align: center;
    font-size: 0.85rem;
    color: #bdc3c7;
  }
  
  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
      text-align: center;
    }
    .brand-info,
    .footer-links,
    .contact-info {
      margin-bottom: 1rem;
    }
  }
  </style>
  