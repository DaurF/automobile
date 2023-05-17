import Car from "@/shared/models/car";
import CarDetail from "@/shared/models/detail";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    cars: [
      {
        id: "1",
        brand: "Toyota",
        model: "Camry",
        url: "https://www.cnet.com/a/img/resize/2bf1d319e1b6b6135eaa226c0a48b2c557501a8b/hub/2021/08/20/4b392287-347f-4374-b152-69e0366821a7/2021-toyota-camry-trd-4.jpg?auto=webp&width=1200",
        details: ["123", "345"],
      },
      {
        id: "2",
        brand: "Lamborghini",
        model: "Aventador",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Lamborghini_Aventador_LP700-4_Orange.jpg/1200px-Lamborghini_Aventador_LP700-4_Orange.jpg",
        details: [],
      },
    ] as Car[],
    details: [
      {
        car_id: "1",
        id: "123",
        name: "Кузов",
        quantity: 5,
        _price: 100,
        children: [],
      },
      {
        car_id: "1",
        id: "345",
        name: "Дурик",
        quantity: 1,
        _price: 10,
        children: ["999"],
      },
      {
        parent_id: "345",
        id: "999",
        name: "Окно",
        quantity: 4,
        _price: 40,
        children: ["888"],
      },
      {
        parent_id: "999",
        id: "888",
        name: "Стекло",
        quantity: 10,
        _price: 20,
        children: [],
      },
      {
        car_id: "2",
        id: "555",
        name: "Кузов",
        quantity: 1,
        _price: 500,
        children: [],
      },
    ] as CarDetail[],
  },
  getters: {
    cars({ cars }) {
      return cars;
    },
    details({ details }): CarDetail[] {
      return details;
    },
    carById(_, { cars }) {
      return (id: string) => cars.find((car: Car) => car.id === id);
    },
    detailById(_, { details }) {
      return (id: string) =>
        details.find((detail: CarDetail) => detail.id === id);
    },
    /**
     * Возвращает общую цену автомобиля.
     * @param {string} id - id автомобиля.
     */
    carDetailsPrice(_, { details, detailsPrice }) {
      return (id: string) => {
        const carDetails = details.filter(
          (detail: CarDetail) => detail.car_id === id
        );

        if (carDetails.length === 0) {
          return 0;
        }

        return carDetails.reduce(
          (total: number, detail: CarDetail) =>
            total + detailsPrice(detail.id, true),
          0
        );
      };
    },
    /**
     * Возвращает общую цену деталей (если car = true, учитывает quantity каждой детали).
     * @param {string} id - id детали, сумму которой нужно посчитать.
     * @param {boolean} car - если true, то считает цену детали для общей цены на автомобиль (учитывает кол-во деталей дополнительно)
     */
    detailsPrice({ details }, getters) {
      return (id: string, car?: boolean): number => {
        const detail = getters.detailById(id);
        const childDetails = details.filter(detail => detail.parent_id === id);

        if (childDetails.length === 0) {
          if (car) {
            return detail._price * detail.quantity;
          }
          return getters.detailById(id)._price;
        }

        const price = childDetails.reduce(
          (total: number, detail: CarDetail) =>
            total + getters.detailsPrice(detail.id, car),
          0
        );

        if (car) {
          return price * detail.quantity;
        }

        return price;
      };
    },
  },
});

export default store;
