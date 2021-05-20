import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// BillFin styles
import './styles/main.scss'

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
