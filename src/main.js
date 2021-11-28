import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VuePaginate from "vue-paginate";




const app = createApp(App)
app.use(router).use(store).mount('#app')
app.use(VuePaginate)
app.component('paginate', VuePaginate)
new app({
    el: "#app",
    components: { App },
    template: "<App/>"
  });
  
