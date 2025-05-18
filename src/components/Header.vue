<template>
    <header class="header">
      <div class="header-content">
        <h1 class="header-title">Exchange Rate Dashboard</h1>
        <div class="nav-buttons">
          <button
            @click="$emit('change-view', 'rates')"
            class="nav-button"
            :class="{ active: activeView === 'rates' }"
          >
            View Rates
          </button>
          <button
            @click="$emit('change-view', 'login')"
            class="nav-button"
            :class="{ active: activeView === 'login' }"
          >
            Login
          </button>
          <button
            @click="$emit('change-view', 'register')"
            class="nav-button"
            :class="{ active: activeView === 'register' }"
          >
            Register
          </button>
          <button
            @click="$emit('change-view', 'view')"
            class="nav-button"
            :class="{ active: activeView === 'view' }"
          >
            RateEntry
          </button>
        </div>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    name: 'Header',
    props: {
      activeView: {
        type: String,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .header {
    background-color: #2563eb;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .header-content {
    max-width: 1120px;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .header-title {
    color: white;
    font-size: 1.25rem;
    font-weight: bold;
  }
  
  .nav-buttons {
    display: flex;
    gap: 1rem;
  }
  
  .nav-button {
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    border: none;
    background-color: #1e40af;
    color: white;
    font-weight: normal;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .nav-button:hover {
    background-color: #1c3aa9;
  }
  
  .nav-button.active {
    background-color: white;
    color: #2563eb;
    font-weight: 600;
  }
  </style>
  