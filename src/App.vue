<template>
  <div>
    <Header :activeView="activeView" @change-view="activeView = $event" />
    <main>
      <component :is="currentComponent" />
    </main>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import RatesView from './components/ExchangeRateViewer.vue'
import LoginView from './components/LoginView.vue'
import RegisterView from './components/RegisterView.vue'
import usd from './components/Entry.vue'

export default {
  components: { Header, RatesView, LoginView, RegisterView, usd },
  data() {
    return {
      activeView: 'rates'
    }
  },
  computed: {
    currentComponent() {
      switch (this.activeView) {
        case 'rates': return 'RatesView'
        case 'login': return 'LoginView'
        case 'register': return 'RegisterView'
        case 'view': return 'usd'
        default: return 'usd'
      }
    }
  }
}
</script>
