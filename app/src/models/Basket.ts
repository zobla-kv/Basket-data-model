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
  constructor(
    private _products: T['code'][],
    private _chargeRules: ChargeRules,
    private _specialOffer: SpecialOffer
  ) {}

  get products(): T[] {
    return database.getBasketItems(this._products) as T[];
  }

  get chargeRules() {
    return this._chargeRules;
  }

  get specialOffer() {
    return this._specialOffer;
  }

  add(code: T['code']): T['code'] {
    database.addToBasket(code);
    return code;
  }

  total(): string {
    return database.getBasketTotalPrice();
  }
}

export default Basket;
