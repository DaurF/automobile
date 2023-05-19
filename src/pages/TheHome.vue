<template>
  <div class="home">
    <header class="header">
      <h1 class="heading-primary header__title">Автомобили</h1>
      <b-button variant="success" @click.prevent="exportExcel"
        >Скачать таблицу</b-button
      >
    </header>
    <main class="main">
      <CarList :list="cars" />
      <router-view />
    </main>
  </div>
</template>

<script>
import { utils, writeFile } from "xlsx";
import CarList from "@/components/CarList.vue";
import { mapGetters } from "vuex";

export default {
  name: "TheHome",
  components: {
    CarList,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["cars", "details"]),
  },
  methods: {
    exportExcel() {
      const carsSheetData = [
        ["ID", "Марка", "Модель", "Картинка", "Детали"],
        ...this.cars.map(car => [
          car.id,
          car.brand,
          car.model,
          car.url,
          car.details.join(", "),
        ]),
      ];
      const detailsSheetData = [
        ["ID", "Название", "Цена", "Кол-во", "Детали", "Стоимость"],
        ...this.details.map(detail => [
          detail.id,
          detail.name,
          detail._price,
          detail.quantity,
          detail.children.join(", "),
          detail.total_price,
        ]),
      ];
      const workbook = utils.book_new();
      const carsSheet = utils.sheet_add_aoa(
        utils.aoa_to_sheet([]),
        carsSheetData
      );
      const detailsSheet = utils.sheet_add_aoa(
        utils.aoa_to_sheet([]),
        detailsSheetData
      );
      utils.book_append_sheet(workbook, carsSheet, "Машины");
      utils.book_append_sheet(workbook, detailsSheet, "Детали");

      writeFile(workbook, "cars.xlsx");
    },
  },
};
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
  display: flex;
  justify-content: center;
  gap: 2rem;

  &__title {
    text-align: center;
  }
}
</style>
