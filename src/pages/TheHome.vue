<template>
  <div class="home">
    <header class="header">
      <h1 class="heading-primary header__title">Car Details</h1>
    </header>
    <main class="main">
      <b-list-group>
        <router-link to="/d">
          <BaseCard
            img-url="https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?cs=srgb&dl=pexels-pixabay-358070.jpg&fm=jpg"
            title="Chevrolet"
            subtitle="Corvette"
          />
        </router-link>
        <b-list-group-item href="#" active
          >Link with active state</b-list-group-item
        >
        <b-list-group-item href="#">Action links are easy</b-list-group-item>
        <b-list-group-item href="#foobar" disabled
          >Disabled link</b-list-group-item
        >
      </b-list-group>
    </main>
  </div>
</template>

<script lang="ts">
import Car from "@/shared/models/car";

export default {
  name: "TheHome",
  data() {
    return {
      cars: [
        {
          brand: "Toyota",
          model: "Camry",
          details: [{ name: "Dauren" }],
        },
      ] as Car[],
    };
  },
};
</script>

<style scoped lang="scss">
.main {
  display: grid;
  grid-template-columns: 30rem 2fr;
  max-width: 90rem;
  margin: 0 auto;
}

.header {
  &__title {
    text-align: center;
  }
}
</style>
