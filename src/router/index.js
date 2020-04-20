import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '../components/HelloWorld';
import Login from '../components/Login';


Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/',
            name: "helloWorld",
            component: HelloWorld
        },
        {
            path: '/',
            redirect: '/Login',
            name: "login",
            component: Login
        }
    ]
})

