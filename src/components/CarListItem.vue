<template>
  <li>
    <router-link :to="{ name: 'CarShow', params: { id: car.id } }">
      <BaseCard :img-url="car.url" :title="car.brand" :subtitle="car.model">
        <span class="price"> Цена: {{ price }} </span>
      </BaseCard>
    </router-link>
  </li>
</template>

<script lang="ts">
import Vue from "vue";
import { PropType } from "vue";
import Car from "@/shared/models/car";
import { mapGetters } from "vuex";

export default Vue.extend({
  props: {
    car: {
      type: Object as PropType<Car>,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["carDetailsPrice"]),
    price(): number {
      return this.carDetailsPrice(this.car.id);
    },
  },
});
</script>

<style scoped lang="scss">
.price {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
}
</style>
