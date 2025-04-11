import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/main.css'
// import store from './store'  // Uncomment if using Vuex

const app = createApp(App)
app.use(router)
app.use(store)
// .use(store)  // Uncomment if using Vuex
app.mount('#app')
