import { Product } from './Product';
import database from './Database';

class Basket<T extends Product> {
  private _products: T[];

  constructor(codes: T['code'][]) {
    this._products = database.getBasketItems(codes) as T[];
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
