import Vue from "vue";
import VueRouter from "vue-router";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import App from "./App.vue";
import store from "./store";

import BaseCard from "@/shared/components/BaseCard.vue";
import BaseTable from "@/shared/components/BaseTable.vue";
import BaseTreeView from "@/shared/components/BaseTreeView.vue";
import BaseDropdown from "@/shared/components/BaseDropdown.vue";

import "./assets/main.scss";

Vue.config.productionTip = false;

Vue.component("BaseDropdown", BaseDropdown);
Vue.component("BaseCard", BaseCard);
Vue.component("BaseTable", BaseTable);
Vue.component("BaseTreeView", BaseTreeView);

Vue.use(VueRouter);

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
