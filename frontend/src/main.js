import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import VueRouter from "vue-router";

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(VueRouter);

import { MainPage, LoginPage, RegisterPage } from "./pages";

const routes = [
  {
    path: "/",
    component: MainPage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/register",
    component: RegisterPage,
  }
];

const router = new VueRouter({
  routes,
});

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
