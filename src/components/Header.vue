<template>
    <Header />
  
    <!-- Header with Links -->
    <header class="header">
      <nav>
        <button @click="activeTab = 'viewer'" :class="{ active: activeTab === 'viewer' }">📊 Viewer</button>
        <button @click="activeTab = 'insert'" :class="{ active: activeTab === 'insert' }">📝 Insert</button>
      </nav>
    </header>
  
    <!-- Conditional View Rendering -->
    <div v-if="activeTab === 'viewer'">
      <ExchangeRateViewer />
    </div>
  
    <div v-else-if="activeTab === 'insert'">
      <ExchangeRateEntry />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const activeTab = ref('viewer')
  
  import Header from './components/Header.vue'
  import ExchangeRateViewer from './components/ExchangeRateViewer.vue'
  import ExchangeRateEntry from './components/ExchangeRateEntry.vue'
  </script>
  
  <style scoped>
  .header {
    display: flex;
    justify-content: center;
    gap: 1rem;
    background-color: #eff6ff;
    padding: 1rem;
    border-bottom: 1px solid #d1d5db;
  }
  nav button {
    padding: 0.5rem 1rem;
    border: none;
    background-color: transparent;
    font-weight: bold;
    cursor: pointer;
  }
  nav button.active {
    color: #1d4ed8;
    border-bottom: 2px solid #1d4ed8;
  }
  </style>
  