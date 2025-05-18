<template>
  <div class="register-container">
    <h2 class="title">Register</h2>
    <form @submit.prevent="handleRegister" class="register-form">
      <div class="form-group">
        <label for="name">Full Name</label>
        <input
          id="name"
          v-model="name"
          type="text"
          placeholder="Enter your full name"
          required
          autocomplete="name"
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input 
          id="email" 
          v-model="email" 
          type="email" 
          placeholder="Enter your email" 
          required
          autocomplete="email"
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input 
          id="password" 
          v-model="password" 
          type="password" 
          placeholder="Enter your password" 
          required
          autocomplete="new-password"
        />
      </div>

      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input 
          id="confirmPassword" 
          v-model="confirmPassword" 
          type="password" 
          placeholder="Confirm your password" 
          required
          autocomplete="new-password"
        />
      </div>

      <button type="submit" class="btn-register">Register</button>
    </form>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const successMessage = ref('')

async function handleRegister() {
  errorMessage.value = ''
  successMessage.value = ''

  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    errorMessage.value = 'Please fill in all fields.'
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    errorMessage.value = 'Please enter a valid email address.'
    return
  }

  try {
    const response = await axios.post('api/register', {
      name: name.value,
      email: email.value,
      password: password.value,
    })

    successMessage.value = response.data.message || 'Registration successful! You can now login.'

    // Clear form fields after success
    name.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      // Laravel validation errors
      errorMessage.value = Object.values(error.response.data.errors).flat().join(' ')
    } else if (error.response && error.response.data && error.response.data.message) {
      errorMessage.value = error.response.data.message
    } else {
      errorMessage.value = 'An error occurred. Please try again.'
    }
  }
}
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 4vh auto;
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.title {
  margin-bottom: 1.5rem;
  text-align: center;
  color: #2563eb;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

input {
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid #ccc;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 3px #2563eb;
}

.btn-register {
  padding: 0.75rem;
  background-color: #2563eb;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-register:hover {
  background-color: #1e40af;
}

.error-message {
  margin-top: 1rem;
  color: #dc2626;
  font-weight: 600;
  text-align: center;
}

.success-message {
  margin-top: 1rem;
  color: #22c55e;
  font-weight: 600;
  text-align: center;
}
</style>
