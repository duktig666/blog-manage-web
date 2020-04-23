import Vue from 'vue'
import Router from 'vue-router'

// import HelloWorld from '../components/HelloWorld';
// import Login from '../page/Login';
// import NavBar from '../page/NavBar';
// import manage from '../page/blog/manage'

Vue.use(Router);

//禁止Router打印全局异常
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};
function route (path, file, name, children) {
    return {
        exact: true,
        path,
        name,
        children,
        component: () => import('../page' + file)
    }
}
export default new Router({
    routes: [
        route("/login",'/Login',"Login"),// /login路径，路由到登录组件
        {
            path:"/", // 根路径，路由到 navBar组件
            component: () => import('../page/NavBar'),
            redirect:"/blog/manage",
            children:[ // 其它所有组件都是 navBar组件
                route("/blog/manage","/blog/Manage","Manage"),
                route("/blog/recycle","/blog/Recycle","Recycle"),
                route("/blog/write","/blog/Write","Write"),
                route("/label","/Label","Label"),
                route("/observe","/Observe","Observe"),
                route("/type","/Type","Type"),

            ]
        }
    ]
    // routes: [
    //     // 默认路径
    //     {path:'/',redirect:'/login'},
    //     {path: '/helloWorld',name: 'HelloWorld', component: HelloWorld,children:[]},
    //     {path: '/login', name: "login", component: Login},
    //     {path: '/navBar', name: "navBar", component: NavBar,children:[
    //             {path: '/login', name: "login", component: Login},
    //         ]},
    // ]
})

