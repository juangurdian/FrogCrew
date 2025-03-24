import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'  // Uncomment if using Vuex

createApp(App)
  .use(router)
  // .use(store)  // Uncomment if using Vuex
  .mount('#app')
