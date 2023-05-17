interface Detail {
  readonly name: string;
  readonly price: number;
  readonly quantity: number;
  readonly children?: CarDetail[];
}

export default class CarDetail implements Detail {
  public constructor(
    public name: string,
    public price: number,
    public quantity: number = 1
  ) {}

  get totalPrice(): number {
    return this.price * this.quantity;
  }
}
