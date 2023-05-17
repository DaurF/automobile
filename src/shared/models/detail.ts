export default interface CarDetail {
  car_id?: string;
  parent_id?: string;
  id: string;
  name: string;
  quantity: number;
  _price: number;
  children: string[];
}
