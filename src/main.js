import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuetify);

new Vue({
  render: h => h(App),
}).$mount('#app');
