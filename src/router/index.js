import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '../views/Home.vue'
import Tag from '../views/Tag.vue'
import Signup from '../views/Signup.vue'
import SignIn from '../views/SignIn.vue'
import Addplace from '../views/Addplace.vue'
import Business from '../views/Business.vue'
import List from '../views/List.vue'
import Placeinfo from '../views/Placeinfo.vue'
import Profile from '../views/Profile.vue'
import Aboutus from '../views/Aboutus.vue'



const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Tag',
    name: 'Tag',
    component: Tag
  },
  {
    path: '/Aboutus',
    name: 'Aboutus',
    component: Aboutus
  },
  {
    path: '/Signin',
    name: 'Signin',
    component: SignIn
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/Addplace',
    name: 'Addplace',
    component: Addplace
  },
  {
    path: '/Business',
    name: 'Business',
    component: Business
  },
  {
    path: '/List/:filter/:var',
    name: 'List',
    props: true,
    component: List,
  },
  {
    path: '/Placeinfo/:pid',
    name: 'Placeinfo',
    props: true,
    component: Placeinfo,
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: Profile
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router