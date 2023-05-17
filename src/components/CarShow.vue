<template>
  <div>
    <h3 >{{ fullName }}</h3>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Car from "@/shared/models/car";
import { mapGetters } from "vuex";

export default Vue.extend({
  computed: {
    ...mapGetters(["carById"]),
    car(): Car {
      return this.carById(this.$route.params.id);
    },
    fullName(): string {
      return `${this.car.brand} ${this.car.model}`;
    },
  },
});
</script>

<style lang="scss" scoped></style>
