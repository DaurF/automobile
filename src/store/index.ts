import Car from "@/shared/models/car";
import CarDetail from "@/shared/models/detail";
import Vue from "vue";
import Vuex from "vuex";
import { nanoid } from "nanoid";

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
        details: ["555"],
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
        get total_price() {
          return this.quantity * this._price;
        },
      },
      {
        car_id: "1",
        id: "345",
        name: "Двигатель",
        quantity: 1,
        _price: 10,
        children: ["999"],
        get total_price() {
          return this.quantity * this._price;
        },
      },
      {
        parent_id: "345",
        id: "999",
        name: "Окно",
        quantity: 4,
        _price: 40,
        children: ["888"],
        get total_price() {
          return this.quantity * this._price;
        },
      },
      {
        parent_id: "999",
        id: "888",
        name: "Стекло",
        quantity: 10,
        _price: 20,
        children: [],
        get total_price() {
          return this.quantity * this._price;
        },
      },
      {
        car_id: "2",
        id: "555",
        name: "Кузов",
        quantity: 1,
        _price: 500,
        children: [],
        get total_price() {
          return this.quantity * this._price;
        },
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
    detailsByCarId({ details }) {
      return (id: string) => {
        console.log(
          details.filter((detail: CarDetail) => detail.car_id === id)
        );
        return details.filter((detail: CarDetail) => detail.car_id === id);
      };
    },
    detailsByParentId(_, { details }) {
      return (id: string) => {
        return details.filter((detail: CarDetail) => detail.parent_id === id);
      };
    },
    detailById(_, { details }) {
      return (id: string) =>
        details.find((detail: CarDetail) => detail.id === id);
    },
    /**
     * Возвращает общую цену автомобиля.
     * @param {string} id - id автомобиля.
     */
    carDetailsPrice(_, { detailsPrice, detailsByCarId }) {
      return (id: string) => {
        const carDetails = detailsByCarId(id);

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
    descendantDetailsByParentId({ details }, getters) {
      return (id: string) => {
        const detail = details.find(detail => detail.id === id);
        if (!detail?.children.length) {
          return [detail?.id];
        }
        return [
          detail?.id,
          ...detail.children.map(id => getters.descendantDetailsByParentId(id)),
        ];
      };
    },
  },
  actions: {
    createDetail({ commit }, { parentId, carId, data }) {
      const id = nanoid();
      console.log(id);

      const detail: CarDetail = {
        id,
        name: data.name,
        _price: data.price,
        quantity: data.quantity,
        children: [],
        get total_price(): number {
          return this.quantity * this._price;
        },
      };

      if (parentId) {
        detail.parent_id = parentId;
        commit("appendChildToParent", { parentId, childId: id });
      } else {
        detail.car_id = carId;
        commit("appendChildToParent", { carId, childId: id });
      }

      commit("addDetail", { detail });
    },
    updateDetail({ commit, getters }, { id, data }) {
      const detail = getters.detailById(id);
      console.log(detail);
      const newDetail = {
        ...detail,
        ...data,
      };
      console.log(newDetail);
      commit("updateDetail", { newDetail });
    },
    createCar({ commit }, { data }) {
      const car = {
        ...data,
        id: nanoid(),
        details: [],
      };

      commit("addCar", { car });
    },
    deleteDetail(
      { commit, getters: { descendantDetailsByParentId, detailById, carById } },
      { id }
    ) {
      const descendants = descendantDetailsByParentId(id).flat(99);
      const detailToRemove = detailById(id);
      console.log(detailToRemove);
      if ("parent_id" in detailToRemove) {
        const parent_id = detailToRemove.parent_id;
        const parent_detail = detailById(parent_id);
        const index = parent_detail.children.findIndex(
          (detailId: string) => detailId === id
        );
        commit("deleteChildId", { parent_detail, child_index: index });
        commit("deleteMultipleDetailsByIds", { ids: descendants });
      } else {
        const car_id = detailToRemove.car_id;
        const car = carById(car_id);
        const index = car.details.findIndex(
          (detailId: string) => detailId === id
        );
        commit("deleteChildId", { car, child_index: index });
        commit("deleteMultipleDetailsByIds", { ids: descendants });
      }
    },
  },
  mutations: {
    addDetail({ details }, { detail }) {
      details.push(detail);
    },
    addCar({ cars }, { car }) {
      cars.push(car);
    },
    appendChildToParent({ details, cars }, { parentId, carId, childId }) {
      if (parentId) {
        const parentDetail = details.find(detail => detail.id === parentId);
        parentDetail?.children.push(childId);
      } else {
        const car = cars.find(car => car.id === carId);
        car?.details.push(childId);
      }
    },
    deleteChildId(_, { car, parent_detail, child_index }) {
      parent_detail && parent_detail.children.splice(child_index, 1);
      car && car.details.splice(child_index, 1);
    },
    deleteMultipleDetailsByIds(state, { ids }) {
      state.details = state.details.filter(detail => !ids.includes(detail.id));
    },
    updateDetail({ details }, { newDetail }) {
      const index = details.findIndex(detail => detail.id === newDetail.id);
      console.log(newDetail);
      console.log(index);
      details[index] = newDetail;
    },
  },
});

export default store;
