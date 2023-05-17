import CarDetail from "./detail";

export default interface Car {
  brand: string;
  model: string;
  details: CarDetail[];
}
