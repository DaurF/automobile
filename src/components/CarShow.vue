<template>
  <div>
    <h3 class="heading-tertiary">{{ fullName }}</h3>
    <BaseTreeView v-if="details.length" :list="details" />
    <div v-else class="not-found">
      <span class="not-found__text">Деталей не найдено</span>
      <b-button variant="success" @click="$bvModal.show('modal')">
        Добавить деталь
      </b-button>
    </div>
    <b-modal id="modal">
      <template #modal-title> Добавить новую деталь </template>
      <b-form @submit="handleSubmit()">
        <b-form-group
          id="input-group-name"
          label="Название"
          label-for="input-name"
          description="Поле ввода название детали"
        >
          <b-form-input
            id="input-name"
            v-model.trim="form.name"
            type="text"
            placeholder="Кузов"
            required
          >
          </b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-price"
          label="Цена"
          label-for="input-price"
          description="Поле ввода цены детали ($)"
        >
          <b-form-input
            id="input-price"
            v-model.number="form.price"
            type="number"
            placeholder="500"
            required
            min="0"
            max="9999999"
          >
          </b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-quantity"
          label="Количество"
          label-for="input-quantity"
          :description="`Поле ввода кол-во детали (1-20): ${form.quantity}`"
        >
          <b-form-input
            id="input-quantity"
            v-model.number="form.quantity"
            min="1"
            max="30"
            type="range"
          />
        </b-form-group>
      </b-form>
      <template #modal-footer>
        <b-button
          variant="outline-danger"
          class="mt-3"
          @click="$bvModal.hide('modal')"
        >
          Отмена
        </b-button>
        <b-button variant="success" class="mt-3" @click="handleSubmit">
          Создать
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Car from "@/shared/models/car";
import CarDetail from "@/shared/models/detail";
import { mapGetters } from "vuex";

export default Vue.extend({
  data() {
    return {
      form: {
        name: null,
        price: null,
        quantity: 1,
      },
    };
  },
  computed: {
    ...mapGetters(["carById", "detailsByCarId"]),
    id(): string {
      return this.$route.params.id;
    },
    car(): Car {
      return this.carById(this.id);
    },
    fullName(): string {
      if (this.car) {
        return `${this.car.brand} ${this.car.model}`;
      }
      return "Машина не выбрана";
    },
    details(): CarDetail[] {
      return this.detailsByCarId(this.id);
    },
  },
  methods: {
    handleSubmit() {
      this.$store.dispatch("createDetail", {
        carId: this.id,
        data: { ...this.form },
      });
      this.reset();
      this.$bvModal.hide("modal");
    },
    reset() {
      this.form.name = this.form.price = null;
      this.form.quantity = 1;
    },
  },
});
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;

  &__text {
    font-size: 1.1rem;
  }
}
</style>
