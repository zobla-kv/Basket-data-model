import { Product } from './Product';

class Basket<T extends Product> {
  private _products: T[];

  constructor(products: T[]) {
    this._products = products;
  }

  get products() {
    return this._products;
  }

  add(product: T): T['code'] {
    this._products.push(product);
    return product.code;
  }

  price(): string {
    let price = 0;

    this._products.forEach((product) => {
      const productNumericPrice = parseFloat(product.price.replace('$', ''));
      price += productNumericPrice;
    });

    return `$${price.toFixed(2)}`;
  }
}

export default Basket;
