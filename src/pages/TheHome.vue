<template>
  <div class="home">
    <header class="header">
      <h1 class="heading-primary header__title">Автомобили</h1>
    </header>
    <main class="main">
      <CarList :list="cars" />
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CarList from "@/components/CarList.vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "TheHome",
  components: {
    CarList,
  },
  data() {
    return {};
  },

  computed: {
    ...mapGetters(["cars"]),
  },
});
</script>

<style scoped lang="scss">
.main {
  display: flex;
  max-width: 90rem;
  margin: 0 auto;
  column-gap: 1.5rem;
}

.header {
  padding: 1rem 0;

  &__title {
    text-align: center;
  }
}
</style>
