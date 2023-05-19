<template>
  <ul class="list">
    <CarListItem v-for="car in list" :key="car.id" :car="car" />
    <b-dropdown id="dropdown-form" text="Добавить автомобиль" ref="dropdown">
      <b-dropdown-form>
        <b-form-group label="Марка" label-for="brand" @submit.stop.prevent>
          <b-form-input
            v-model="form.brand"
            id="brand"
            size="sm"
            placeholder="Toyota"
          />
        </b-form-group>

        <b-form-group label="Модель" label-for="model">
          <b-form-input
            v-model="form.model"
            id="model"
            size="sm"
            placeholder="Camry"
          />
        </b-form-group>

        <b-form-group label="Фото" label-for="img-url">
          <b-form-input
            v-model="form.url"
            id="img-url"
            size="sm"
            placeholder="https://unsplash.com/photos/tuEtpjghVmg"
          />
        </b-form-group>

        <b-button @click="handleSubmit" variant="success" size="sm">
          Добавить
        </b-button>
      </b-dropdown-form>
    </b-dropdown>
  </ul>
</template>

<script>
import CarListItem from "./CarListItem.vue";

export default {
  components: {
    CarListItem,
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    form: {
      brand: "",
      model: "",
      url: "",
    },
  }),
  methods: {
    handleSubmit() {
      this.$store.dispatch("createCar", { data: { ...this.form } });
      this.$refs.dropdown.hide(true);
    },
  },
};
</script>

<style scoped lang="scss">
.list {
  width: 28rem;
  border: 1px solid #dedede;
  padding: 1rem;
}
</style>
