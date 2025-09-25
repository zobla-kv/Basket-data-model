import { Product } from './Product';
import database from './Database';

class Basket<T extends Product> {
  private _products: T[];

  constructor(products: T[]) {
    this._products = products;
  }

  get products() {
    return this._products;
  }

  add(code: T['code']): T['code'] {
    return database.addToBasket(code);
  }

  price(): string {
    return database.getBasketTotalPrice();
  }
}

export default Basket;
