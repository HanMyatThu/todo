// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VeeValidate from 'vee-validate';
import App from './app/App'
import { store } from './_store';
import { router } from './_helpers';
import Vuetify from 'vuetify'
import BootstrapVue from 'bootstrap-vue'



Vue.use(BootstrapVue);

Vue.use(Vuetify)
Vue.use(VeeValidate);

Vue.config.productionTip = false

// index.js or main.js
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'



// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();

import { userService } from './_services';
userService;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
