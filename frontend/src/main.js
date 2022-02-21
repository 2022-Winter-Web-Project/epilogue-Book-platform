import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
// import VueAxios from "vue-axios";
import VueRouter from "vue-router";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Vue.config.globalProperties.axios = axios;
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(VueRouter);
Vue.use(axios);
Vue.use(BootstrapVue);
// Vue.use(VueAxios);
import {
  MainPage,
  LoginPage,
  RegisterPage,
  DetailPage,
  PostUploadPage,
  ListPage,
  UserProfile,
  FAQPage,
  AboutPage,
  ContactPage,
  ListSearchPage,
} from "./pages";

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
    path: "/detail/:postId",
    component: DetailPage,
  },
  {
    path: "/postUpload/:postId",
    component: PostUploadPage,
  },
  {
    path: "/list",
    component: ListPage,
  },
  {
    path: "/userProfile",
    component: UserProfile,
  },
  {
    path: "/FAQ",
    component: FAQPage,
  },
  {
    path: "/about",
    component: AboutPage,
  },
  {
    path: "/contact",
    component: ContactPage,
  },
  {
    path: "/search/:keyword",
    component: ListSearchPage,
  },
];

const router = new VueRouter({
  routes,
});

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
