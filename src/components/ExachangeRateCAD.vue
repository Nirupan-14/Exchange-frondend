<template>
    <div class="page-container">
      <div class="content-box">
        <h1 class="heading">💱 CAD to LKR Exchange Rates</h1>
  
        <!-- Date Picker -->
        <div class="date-picker">
          <label for="end-date" class="date-label">📅 Select End Date:</label>
          <input
            type="date"
            v-model="selectedDate"
            @change="fetchRates"
            class="date-input"
          />
        </div>
  
        <!-- Loading -->
        <div v-if="loading" class="loading-text">
          🔄 Loading exchange rate data...
        </div>
  
        <!-- Results -->
        <div v-else class="rate-section">
          <div class="rate-cards">
            <div class="card blue-card">
              <div class="card-label">Reference Date</div>
              <div class="card-value">{{ referenceDate }}</div>
            </div>
  
            <div class="card green-card">
              <div class="card-label">Weekly Average</div>
              <div class="card-value">{{ averageRate }}</div>
            </div>
  
            <div class="card yellow-card">
              <div class="card-label">Current Rate</div>
              <div v-if="currentRate" class="card-value">{{ currentRate }}</div>
              <div v-else class="no-rate">No exchange rate available for this date.</div>
            </div>
          </div>
  
          <!-- Table -->
          <div class="rates-table-wrapper">
            <h2 class="table-heading">📈 Last 7 Days Rates</h2>
            <table class="rates-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="rate in rates" :key="rate.datetime">
                  <td>{{ rate.date }}</td>
                  <td>{{ rate.time }}</td>
                  <td class="rate-value">{{ rate.rate }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const selectedDate = ref(new Date().toISOString().slice(0, 10))
  const rates = ref([])
  const averageRate = ref(null)
  const currentRate = ref(null)
  const referenceDate = ref(null)
  const loading = ref(false)
  
  const fetchRates = async () => {
    loading.value = true
    try {
      const endDate = selectedDate.value
  
      const [ratesRes, currentRateRes] = await Promise.all([
        axios.get(`/api/cad-rate/last-7-days?end_date=${endDate}`),
        axios
          .get(`/api/cad-rate/by-date?date=${endDate}`)
          .catch(err => {
            if (
              err.response?.data?.error === 'Exchange rate not found for the specified date'
            ) {
              currentRate.value = null
              return null
            } else {
              throw err
            }
          })
      ])
  
      rates.value = ratesRes.data.rates
      averageRate.value = ratesRes.data.average_rate
      referenceDate.value = ratesRes.data.reference_date
  
      currentRate.value = currentRateRes?.data?.rate ?? null
    } catch (error) {
      console.error(error)
      alert('Failed to fetch exchange rates.')
    } finally {
      loading.value = false
    }
  }
  
  onMounted(fetchRates)
  </script>
  
  
  <style scoped>
  .page-container {
    min-height: 100vh;
    background: linear-gradient(to bottom right, #eff6ff, #ffffff);
    padding: 3rem 1rem;
  }
  
  .content-box {
    max-width: 80rem;
    margin: 0 auto;
    padding: 2rem;
    background-color: white;
    border-radius: 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    animation: fade-in 0.6s ease-out;
  }
  
  .heading {
    font-size: 2.5rem;
    font-weight: 800;
    text-align: center;
    color: #1d4ed8;
    text-shadow: 1px 1px #cbd5e1;
  }
  
  .date-picker {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 1.5rem;
  }
  
  @media (min-width: 640px) {
    .date-picker {
      flex-direction: row;
      justify-content: center;
    }
  }
  
  .date-label {
    color: #b91c1c;
    font-weight: 500;
    font-size: 1.125rem;
  }
  
  .date-input {
    padding: 0.5rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    box-shadow: 0 0 0 1px transparent;
    outline: none;
  }
  
  .date-input:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.4);
  }
  
  .loading-text {
    text-align: center;
    font-weight: 600;
    color: #2563eb;
    animation: pulse 1s infinite alternate;
  }
  
  @keyframes pulse {
    from {
      opacity: 0.6;
    }
    to {
      opacity: 1;
    }
  }
  
  .rate-section {
    margin-top: 2rem;
  }
  
  .rate-cards {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  @media (min-width: 768px) {
    .rate-cards {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  .card {
    padding: 1.5rem;
    border-radius: 1rem;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }
  
  .card:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }
  
  .card-label {
    font-size: 0.875rem;
    color: #4b5563;
  }
  
  .card-value {
    font-size: 1.25rem;
    font-weight: bold;
    margin-top: 0.25rem;
  }
  
  .blue-card {
    background-color: #dbeafe;
    color: #1e40af;
  }
  
  .green-card {
    background-color: #d1fae5;
    color: #065f46;
  }
  
  .yellow-card {
    background-color: #fef9c3;
    color: #92400e;
  }
  
  .no-rate {
    color: #dc2626;
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }
  
  .rates-table-wrapper {
    overflow-x: auto;
    margin-top: 2rem;
  }
  
  .table-heading {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 0.25rem;
  }
  
  .rates-table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
  
  .rates-table thead {
    background-color: #2563eb;
    color: white;
  }
  
  .rates-table th,
  .rates-table td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .rates-table tr:hover {
    background-color: #eff6ff;
  }
  
  .rate-value {
    font-weight: 500;
    color: #1d4ed8;
  }
  
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>
  