import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
import router from './router/index.js'
import ElementPlus from 'element-plus'
import * as ElementPlusIcons from '@element-plus/icons-vue'
import './assets/main.css'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)

for (const i in ElementPlusIcons) {
  app.component(i, ElementPlusIcons[i])
}

if (window.global === undefined) {
  window.global = window
}

app.mount('#app')
