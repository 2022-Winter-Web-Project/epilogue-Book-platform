import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
// import VueAxios from "vue-axios";
import VueRouter from "vue-router";

// Vue.config.globalProperties.axios = axios;
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(VueRouter);
Vue.use(axios);
// Vue.use(VueAxios);
import { MainPage, LoginPage, RegisterPage, DetailPage} from "./pages";

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
  },
  {
    path: "/detail",
    component: DetailPage,
  }
];

const router = new VueRouter({
  routes,
});

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
