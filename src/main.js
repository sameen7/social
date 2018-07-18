import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import axios from 'axios'
// import iView from 'iview';
//import home from './components/home'
//import search from './components/search'
//import number from './components/number'
//import route from './components/route'
//import upload from './components/upload'
// import 'iview/dist/styles/iview.css';

import { Layout, MenuItem, Icon } from 'iview';
Vue.component('Layout', Layout);
Vue.component('MenuItem', MenuItem);
Vue.component('Icon', Icon);

// Vue.use(iView);
Vue.use(VueRouter);

const home = r => require.ensure([], () => r(require('./components/home')), 'home')
const search = r => require.ensure([], () => r(require('./components/search')), 'search')
const number = r => require.ensure([], () => r(require('./components/number')), 'number')
const route = r => require.ensure([], () => r(require('./components/route')), 'route')
const upload = r => require.ensure([], () => r(require('./components/upload')), 'upload')
const login = r => require.ensure([], () => r(require('./components/login')), 'login')
const register = r => require.ensure([], () => r(require('./components/register')), 'register')



var router = new VueRouter({
  routes: [{
    path: '/',
    name: 'home',
    component: home
  },{
    path: '/search',
    name: 'search',
    component: search
  },{
    path: '/number',
    name: 'number',
    component: number
  },{
    path: '/route',
    name: 'route',
    component: route
  },{
    path: '/upload',
    name: 'upload',
    component: upload
  },{
      path: '/login',
      name: 'login',
      component: login
  },{
      path: '/register',
      name: 'register',
      component: register
  }]
});

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})


