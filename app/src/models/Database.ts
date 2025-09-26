/**
 * =============================================================================
 *                                D A T A B A S E
 * =============================================================================
 * A producer class for that is single source of truth for the app.
 *
 * Responsibilities:
 *   - Stores all data.
 *   - Provides ways for consumers to read and update the data.
 *   - Calculates delivery fees and special offer discounts.
 *
 * Design Philosophy:
 *   - Producer: Produces data for consumers to use.
 *   - Singleton: Single instance is shared across the app.
 *
 * Usage:
 *   import database from './models/Database';
 *   console.log('widgets: ', database.widgets);
 */

import { Product } from './Product';
import Widget from './Widget';
import type { ChargeRules, SpecialOffer } from './Basket';

interface IDatabase {
  widgets: Widget[];
  basketItems: Product['code'][];
  chargeRules: ChargeRules;
  specialOffer: SpecialOffer;
}

class Database implements IDatabase {
  private _widgets: IDatabase['widgets'] = [
    {
      code: 'R01',
      name: 'Red Widget',
      price: '$32.95',
    },
    {
      code: 'G01',
      name: 'Green Widget',
      price: '$24.95',
    },
    {
      code: 'B01',
      name: 'Blue Widget',
      price: '$7.95',
    },
  ];

  private _basketItems: IDatabase['basketItems'] = ['B01', 'G01'];

  private _chargeRules: IDatabase['chargeRules'] = {
    rules: {
      $50: '$4.95',
      $89: '$2.95',
      $90: '$0',
    },
    getDeliveryFee: (total: number) => this._getChargeRulesDiscount(total),
  };

  private _specialOffer: IDatabase['specialOffer'] = {
    text: 'buy one red widget, get the second half price',
    getDiscount: (products: Product[]) => {
      return this._getSpecialOfferDiscount(products);
    },
  };

  get widgets() {
    return this._widgets;
  }

  get basketItems() {
    return this._basketItems;
  }

  get chargeRules() {
    return this._chargeRules;
  }

  get specialOffer() {
    return this._specialOffer;
  }

  getProductByCode(code: Product['code']): Product {
    return this._widgets.find((p) => p.code === code)!;
  }

  getBasketItems(codes: Product['code'][]): Product[] {
    return codes.map((code) => this.getProductByCode(code));
  }

  addToBasket(code: Product['code']): Product {
    this._basketItems.push(code);
    return this.getProductByCode(code);
  }

  getBasketTotalPrice(): string {
    let price = 0;
    const products: Product[] = [];

    this._basketItems.forEach((code) => {
      const product = this.getProductByCode(code);

      if (!product) {
        return;
      }

      const productPrice = this._getNumericPrice(product.price);
      price += productPrice;
      products.push(product);
    });

    price = price + this._chargeRules.getDeliveryFee(price);

    price = price - this._specialOffer.getDiscount(products);

    return `$${price.toFixed(2)}`;
  }

  // transform '$0' -> 0
  private _getNumericPrice(price: string): number {
    return parseFloat(price.replace('$', ''));
  }

  private _getChargeRulesDiscount(total: number): number {
    const parsedRules = Object.entries(this._chargeRules.rules)
      .map(([key, value]) => ({
        threshold: this._getNumericPrice(key),
        cost: this._getNumericPrice(value),
      }))
      .sort((a, b) => a.threshold - b.threshold);

    for (const rule of parsedRules) {
      if (total < rule.threshold) {
        return rule.cost;
      }
    }

    return parsedRules[parsedRules.length - 1].cost;
  }

  private _getSpecialOfferDiscount(products: Product[]): number {
    const redWidget = products.find((w) => w.code === 'R01');
    if (!redWidget) {
      return 0;
    }

    const redCount = products.filter((p) => p.code === 'R01').length;
    if (redCount < 2) {
      return 0;
    }

    const redPrice = this._getNumericPrice(redWidget.price);

    return redPrice / 2;
  }
}

export default new Database();
