import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '../components/HelloWorld';
import Login from '../components/Login';
import NavBar from '../components/NavBar';


Vue.use(Router);

//禁止Router打印全局异常
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

export default new Router({
    routes: [
        // 默认路径
        {path:'/',redirect:'/login'},
        {path: '/helloWorld',name: 'HelloWorld', component: HelloWorld,children:[]},
        {path: '/login', name: "login", component: Login},
        {path: '/navBar', name: "navBar", component: NavBar},
    ]
})

