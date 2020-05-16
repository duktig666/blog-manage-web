import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import axios from 'axios'
import qs from 'qs'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = false;
Vue.withCredentials=true;

Vue.prototype.$http = axios;
Vue.prototype.$qs = qs;
axios.defaults.baseURL = 'http://118.89.143.27:8090/api';

Vue.use(ElementUI);
Vue.use(mavonEditor);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app');
