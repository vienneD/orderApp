import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    
    children:[ {
      path: '/',
    name: '/order',
    component: () => import('../pages/home/Order.vue')
    },{
      path: '/about',
      name: '/about',
      
      component: () => import('../pages/home/About.vue')
    },{
      path: '/comment',
      name: '/comment',
      
      component: () => import('../pages/home/Comment.vue')
    },
  ]
  },
 
  
  {
    path: '/goods',
    name: 'goods',
    component:()=>import('../pages/Goods.vue'),
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
