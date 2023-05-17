import Vue from "vue";
import VueRouter from "vue-router";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import App from "./App.vue";

import BaseCard from "./components/BaseCard.vue";
import BaseTable from "./components/BaseTable.vue";

import "./assets/main.scss";

Vue.config.productionTip = false;

Vue.component("BaseCard", BaseCard);
Vue.component("BaseTable", BaseTable);

Vue.use(VueRouter);

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

new Vue({
  router,
  render: h => h(App),
}).$mount("#app");
