<!-- ExchangeRateUSD.vue -->
<template>
    <USD title="💱 USD to LKR Exchange Rates" currencyCode="usd-lkr" />
    <AUD title="💱 AUD to LKR Exchange Rates" currencyCode="aud-lkr" />
    <CAD title="💱 CAD to LKR Exchange Rates" currencyCode="cad-lkr" />
    <GBP title="💱 GBP to LKR Exchange Rates" currencyCode="gbp-lkr" />
  </template>
  
  <script setup>
  import USD from './Entry/USDEntry.vue'
  import AUD from './Entry/AUDEntry.vue'
  import CAD from './Entry/CADEntry.vue'
  import GBP from './Entry/GBPEntry.vue'
  </script>
  