import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import axios from 'axios'
import qs from 'qs'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false;
Vue.withCredentials=true;
Vue.prototype.$http = axios;
Vue.prototype.$qs = qs;

// axios.defaults.baseURL = 'localhost:8090/api';
//
// axios.loadData = async function (url) {
//   const resp = await axios.get(url);
//   return resp.data;
// };

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app');
