<template>
  <ul class="list">
    <CarListItem v-for="car in list" :key="car.id" :car="car" />
  </ul>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import Car from "@/shared/models/car";
import CarListItem from "./CarListItem.vue";

export default Vue.extend({
  components: {
    CarListItem,
  },
  props: {
    list: {
      type: Array as PropType<Array<Car>>,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.list {
  width: 28rem;
  border: 1px solid #dedede;
  padding: 1rem;
}
</style>
