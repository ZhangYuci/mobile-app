import { createApp } from 'vue'
import './style/app.scss'
import 'vant/es/notify/style'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import App from './App.vue'
import router from './router'
import store from './store'
import globalInstall from "./globalInstall"

const app = createApp(App);
app.use(store)
app.use(router)
app.use(globalInstall)
app.mount('#app');
