import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '../views/Home.vue'
import Tag from '../views/Tag.vue'
import Signup from '../views/Signup.vue'
import Addplace from '../views/Addplace.vue'
import Addhotel from '../views/Addhotel.vue'
import Business from '../views/Business.vue'
import List from '../views/List.vue'
import Placeinfo from '../views/Placeinfo.vue'
import Profile from '../views/Profile.vue'
import Aboutus from '../views/Aboutus.vue'
import SignIn from '../views/SignIn.vue'
import Editplace from '../views/Editplace.vue'
import hotelEdit from '../views/hotelEdit.vue'
import Listhotel from '../views/Listhotel.vue'



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
    path: '/hotelEdit',
    name: 'hotelEdit',
    component: hotelEdit,
    props: true
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
    props: true,
    component: Addplace
  },
  {
    path: '/Addhotel',
    name: 'Addhotel',
    component: Addhotel
  },
  {
    path: '/Business',
    name: 'Business',
    component: Business
  },
  {
    path: '/Edit/:pid',
    name: 'Editplace',
    component: Editplace,
    props:true
  },
  {
    path: '/hotelEdit/:uid',
    name: 'hotelEdit',
    component: hotelEdit,
    props:true
  },
  {
    path: '/List/:filter/:var',
    name: 'List',
    props: true,
    component: List,
  },
  {
    path: '/Listhotel',
    name: 'Listhotel',
    component: Listhotel,
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