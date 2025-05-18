<template>
  <div class="login-container">
    <h2 class="title">User Login</h2>
        
    <form class="login-form" @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          v-model="email"
          placeholder="Enter your email"
          required
        />
      </div>
            
      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          v-model="password"
          placeholder="Enter your password"
          required
        />
      </div>
                   
      <button type="submit" class="btn-login" :disabled="isLoading">
        {{ isLoading ? 'Logging in...' : 'Login' }}
      </button>
        
    </form>
        
    <p class="error-message" v-if="error">{{ error }}</p>
    <p class="success-message" v-if="success">{{ success }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const success = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  error.value = ''
  success.value = ''
  isLoading.value = true
    
  try {
    const response = await axios.post('/api/login', {
      email: email.value,
      password: password.value,
    })

    success.value = response.data.message // e.g. "Login successful"
    console.log('User Info:', response.data.user)

    localStorage.setItem('user', JSON.stringify(response.data.user))
    localStorage.setItem('isLoggedIn', 'true')

    email.value = ''
    password.value = ''

    // Wait 2 seconds then redirect
    setTimeout(() => {
      router.push('/welcome')  // 👈 replace with your actual route
    }, 2000)

  } catch (err) {
    if (err.response && err.response.status === 401) {
      error.value = 'Invalid email or password'
    } else {
      error.value = 'An error occurred. Please try again.'
    }
  } finally {
    isLoading.value = false
  }
}

</script>

<style scoped>
.login-container {
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

.login-form {
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

.btn-login {
  padding: 0.75rem;
  background-color: #2563eb;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-login:hover:not(:disabled) {
  background-color: #1e40af;
}

.btn-login:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

.error-message {
  margin-top: 1rem;
  color: #dc2626;
  font-weight: 600;
  text-align: center;
}

.success-message {
  margin-top: 1rem;
  color: #16a34a;
  font-weight: 600;
  text-align: center;
}
</style>