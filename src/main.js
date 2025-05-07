import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { createPinia } from 'pinia'

import './styles/base.css'
import './styles/variables.css'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')
