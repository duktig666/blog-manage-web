import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '../components/HelloWorld';
import Login from '../components/Login';


Vue.use(Router);

export default new Router({
    routes: [
        // 默认路径
        {path:'/',redirect:'/login'},
        {path: '/helloWorld',name: 'HelloWorld', component: HelloWorld,children:[]},
        {path: '/login', name: "login", component: Login},
    ]
})

