<template>
  <div class="app-container">
    <header class="header">
      <div class="header-content">
        <h1 class="header-title">Exchange Rate Dashboard</h1>
        <div class="nav-buttons">
          <button 
            @click="activeView = 'rates'"
            class="nav-button"
            :class="{ active: activeView === 'rates' }"
          >
            View Rates
          </button>
          <button 
            @click="activeView = 'entry'"
            class="nav-button"
            :class="{ active: activeView === 'entry' }"
          >
            Enter Rate
          </button>
        </div>
      </div>
    </header>

    <main class="main-content">
      <transition name="fade" mode="out-in">
        <RatesView v-if="activeView === 'rates'" />
        <RateEntryView v-else />
      </transition>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue'
import RatesView from './components/ExchangeRateViewer.vue'
import RateEntryView from './components/ExchangeRateEntry.vue'

export default {
  name: 'App',
  components: {
    RatesView,
    RateEntryView
  },
  setup() {
    const activeView = ref('rates')
    return { activeView }
  }
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background-color: #f3f4f6; /* gray-100 */
  font-family: Arial, sans-serif;
}

.header {
  background-color: #2563eb; /* blue-600 */
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
  background-color: #1e40af; /* blue-700 */
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

.main-content {
  max-width: 1120px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
