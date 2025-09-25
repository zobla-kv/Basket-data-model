import { Product } from './Product';
import database from './Database';

class Basket<T extends Product> {
  private _products: T[];
  private _chargeRules = database.chargeRules;
  private _specialOffer = database.specialOffer;

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
      const productPrice = this._getNumericPrice(product.price);
      price += productPrice;
    });

    price = price - this._getShippingCost(price);

    price = price - this._specialOffer.getDiscount(this._products);

    return `$${price.toFixed(2)}`;
  }

  // transform '$0' -> 0
  private _getNumericPrice(price: string): number {
    return parseFloat(price.replace('$', ''));
  }

  private _getShippingCost(total: number): number {
    const parsedRules = Object.entries(this._chargeRules)
      .map(([key, value]) => ({
        threshold: parseInt(key.replace('$', '')),
        cost: parseFloat(value.replace('$', '')),
      }))
      .sort((a, b) => a.threshold - b.threshold);

    for (const rule of parsedRules) {
      if (total < rule.threshold) {
        return rule.cost;
      }
    }

    return parsedRules[parsedRules.length - 1].cost;
  }
}

export default Basket;
