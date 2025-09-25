import { Product } from './Product';

class Catalogue<T extends Product> {
  private _products: T[];

  constructor(products: T[]) {
    this._products = products;
  }

  get products() {
    return this._products;
  }
}

export default Catalogue;
