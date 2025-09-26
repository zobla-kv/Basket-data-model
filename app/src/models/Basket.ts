import { Product } from './Product';
import database from './Database';

export interface ChargeRules {
  rules: {
    [threshold: string]: string;
  };
  getDeliveryFee: (total: number) => number;
}

export interface SpecialOffer {
  text: string;
  getDiscount: (products: Product[]) => number;
}

class Basket<T extends Product> {
  private _products: T[];
  private _chargeRules: ChargeRules;
  private _specialOffer: SpecialOffer;

  constructor(
    products: T['code'][],
    chargeRules: ChargeRules,
    specialOffer: SpecialOffer
  ) {
    this._products = database.getBasketItems(products) as T[];
    this._chargeRules = chargeRules;
    this._specialOffer = specialOffer;
  }

  get products() {
    return this._products;
  }

  get chargeRules() {
    return this._chargeRules;
  }

  get specialOffer() {
    return this._specialOffer;
  }

  add(code: T['code']): T['code'] {
    const product = database.addToBasket(code) as T;
    this._products.push(product);
    return code;
  }

  total(): string {
    return database.getBasketTotalPrice();
  }
}

export default Basket;
