import Vue from "vue";
import VueRouter from "vue-router";
import VueResource from "vue-resource";
import { routes } from "./routes";
import store from './store/store'
import axios from 'axios'
import App from "./App.vue";

axios.defaults.baseURL ='https://vuejs-api-bcf51.firebaseio.com';
// axios.defaults.headers.common["auth"]="sdjgajsldg";

axios.interceptors.request.use(config=>{
  console.log(config);
  return config;
})

axios.interceptors.response.use(res=>{
  console.log(res);
  return res;
})

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.options.root = 'https://vuejs-api-bcf51.firebaseio.com/'

Vue.filter('currency',(val)=>{
  return '$'+val;
})

const router = new VueRouter({
  mode: "history",
  routes
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
