import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import SettingsView from '../views/SettingsView'
import OrderBookView from '../views/OrderBookView.vue'
import store from '../store/store'



const router = createRouter({
    routes: [      
      {
        path: '/order',
        component: OrderBookView
      },      
      {
        path: '/',
        component: SettingsView
      }],
  history: createWebHistory()
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')