import VueRouter from "vue-router";

import TheHome from "@/pages/TheHome.vue";

const routes = [{ path: "/", component: TheHome }];

export default new VueRouter({
  mode: "history",
  routes,
});
