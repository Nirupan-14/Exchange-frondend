<template>
  <div class="page-container">
    <div class="form-box">
      <h1 class="form-heading">💰 Enter USD to LKR Exchange Rate</h1>

      <form @submit.prevent="submitRate" class="form-spacing">
        <div>
          <label for="date" class="input-label">📅 Date</label>
          <input
            type="date"
            id="date"
            v-model="form.date"
            class="input-field"
            required
            :max="today"
          />
        </div>

        <div>
          <label for="rate" class="input-label">💱 Exchange Rate</label>
          <input
            type="number"
            step="0.0001"
            min="0"
            id="rate"
            v-model.number="form.rate"
            class="input-field input-margin-bottom"
            placeholder="e.g. 367.4567"
            required
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="submit-button"
        >
          {{ loading ? '🔄 Saving...' : '💾 Save Rate' }}
        </button>
      </form>

      <!-- Message -->
      <transition name="fade">
        <div
          v-if="message"
          class="message-box"
          :class="messageClass"
        >
          {{ message }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'


const today = new Date().toISOString().slice(0, 10)

const form = ref({
  date: today,
  rate: null,
})

const loading = ref(false)
const message = ref('')
const messageClass = ref('')

const submitRate = async () => {
  if (!form.value.rate || form.value.rate <= 0) {
    message.value = '⚠️ Please enter a valid rate greater than 0.'
    messageClass.value = 'message-error'
    return
  }

  loading.value = true
  message.value = ''
  try {
    const response = await axios.post('/api/exchange-rate/store', {
      date: form.value.date,
      rate: form.value.rate,
    })
    message.value = response.data.message || '✅ Rate saved successfully!'
    messageClass.value = 'message-success'
  } catch (error) {
    console.error(error)
    message.value = error.response?.data?.error || '❌ Failed to save rate.'
    messageClass.value = 'message-error'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.page-container {
  min-height: 50vh;
  background: linear-gradient(to bottom right, #f0f9ff, #ffffff);
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-box {
  max-width: 28rem;
  width: 100%;
  padding: 2rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  animation: fade-in 0.5s ease-out;
}

.form-heading {
  font-size: 1.75rem;
  font-weight: 700;
  text-align: center;
  color: #1e3a8a;
  margin-bottom: 1rem;
}

/* Replace space-y-5 from Tailwind: vertical spacing between children */
.form-spacing > div + div {
  margin-top: 1.25rem; /* approx 5 * 0.25rem */
}

.input-label {
  font-weight: 600;
  display: block;
  margin-bottom: 0.5rem;
  color: #374151;
}

.input-field {
  width: 100%;
  padding: 0.6rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  transition: all 0.2s;
  outline: none;
  font-size: 1rem;
  box-sizing: border-box;
}

.input-field:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

/* Replace mb-5 Tailwind with pure CSS margin-bottom */
.input-margin-bottom {
  margin-bottom: 1.25rem;
}

.submit-button {
  width: 100%;
  background-color: #2563eb;
  color: white;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: background-color 0.2s ease;
  border: none;
  cursor: pointer;
}

.submit-button:hover:not(:disabled) {
  background-color: #1e40af;
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Message box styling */
.message-box {
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 0.375rem;
  text-align: center;
  font-weight: 500;
  user-select: none;
  word-break: break-word;
}

/* Replace Tailwind bg-red-100 text-red-700 */
.message-error {
  background-color: #fee2e2; /* red-100 */
  color: #991b1b; /* red-700 */
}

/* Replace Tailwind bg-green-100 text-green-700 */
.message-success {
  background-color: #d1fae5; /* green-100 */
  color: #065f46; /* green-700 */
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Animations */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
