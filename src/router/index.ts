import VueRouter from "vue-router";

import TheHome from "@/pages/TheHome.vue";
import CarShow from "@/components/CarShow.vue";

const routes = [
  {
    path: "/",
    name: "TheHome",

    component: TheHome,
    children: [
      {
        path: "/car/:id",
        name: "CarShow",
        component: CarShow,
        params: true,
      },
    ],
  },
];

export default new VueRouter({
  mode: "history",
  routes,
});
