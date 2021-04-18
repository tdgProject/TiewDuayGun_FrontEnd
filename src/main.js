import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'


const app = createApp(App)
app.component('nav-bar',NavBar)
app.component('foot',Footer)
app.use(router).mount('#app')