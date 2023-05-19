export default interface CarDetail {
  car_id?: string;
  parent_id?: string;
  id: string;
  name: string;
  _price: number;
  quantity: number;
  children: string[];
  readonly total_price: number;
}
