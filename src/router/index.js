import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '../views/Home.vue'
import Tag from '../views/Tag.vue'
import Signin from '../views/Signin.vue'
import Signup from '../views/Signup.vue'
import Addplace from '../views/Addplace.vue'
import Business from '../views/Business.vue'
import List from '../views/List.vue'
import Placeinfo from '../views/Placeinfo.vue'
import Profile from '../views/Profile.vue'



const routes = [{
    path: '',
    name: 'Home',
    component: Home
  },
  {
    path: '/Tag',
    name: 'Tag',
    component: Tag
  },
  {
    path: '/Signin',
    name: 'Signin',
    component: Signin
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
    path: '/List',
    name: 'List',
    component: List
  },
  {
    path: '/Placeinfo',
    name: 'Placeinfo',
    component: Placeinfo
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