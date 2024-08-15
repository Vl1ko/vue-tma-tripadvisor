import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import Home from './views/HomeVue.vue'

import UserPage from './views/UserPage.vue'

import Add from './views/Add.vue'
import EditPage from './views/EditPage.vue'
import AdminView from './views/AdminView.vue'
import StatsView from './views/StatsView.vue'
import MemberView from './views/MemverView.vue'
import FilterPage from './views/FilterPage.vue'
import AllContactView from './views/AllContactView.vue'

const app = createApp(App)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    props: true
  },
  {
    path: '/:Sort',
    name: 'homef',
    component: Home,
    props: true
  },
  {
    path: '/filters',
    name: 'filters',
    component: FilterPage
  },
  {
    path: '/user/:id/:avatar/:name/:services/:cities/:description/:tg/:phone1/:phone2/:inst/:vk/:promo/:tg_id',
    name: 'user',
    component: UserPage,
    props: true
  },
  {
    path: '/edit/:id/:avatar/:name/:services/:cities/:description/:tg/:phone1/:phone2/:inst/:vk/:promo/:tg_id',
    name: 'edit',
    component: EditPage,
    props: true
  },
  {
    path: '/add',
    name: 'add',
    component: Add
  },
  {
    path: '/admins',
    name: 'admins',
    component: AdminView
  },
  {
    path: '/stats/:contact',
    name: 'stats',
    component: StatsView,
    props: true
  },
  {
    path: '/member',
    name: 'member',
    component: MemberView
  },
  {
    path: '/allcontacts',
    name: 'allcontacts',
    component: AllContactView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(router)

app.mount('#app')
