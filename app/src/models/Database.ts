import { Product } from './Product';
import Widget from './Widget';

interface IDatabase {
  widgets: {
    items: Widget[];
    add: (widget: Product) => Product['code'];
  };
  chargeRules: {
    [threshold: string]: string;
  };
  specialOffer: {
    text: string;
    getDiscount: (products: Product[]) => number;
  };
}

class Database implements IDatabase {
  private readonly _widgets: IDatabase['widgets'] = {
    items: [
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
    ],
    add: (widget: Product) => this._handleAddWidget(widget),
  };

  private _chargeRules: IDatabase['chargeRules'] = {
    $50: '$4.95',
    $89: '$2.95',
    $90: '$0',
  };

  private _specialOffer: IDatabase['specialOffer'] = {
    text: 'buy one red widget, get the second half price',
    getDiscount: (products: Product[]) => {
      const redWidget = this._widgets.items.find((w) => w.code === 'R01');
      if (!redWidget) {
        return 0;
      }

      const redCount = products.filter((p) => p.code === 'R01').length;
      if (redCount < 2) {
        return 0;
      }

      const redPrice = parseFloat(redWidget.price.replace('$', ''));

      return Math.floor(redPrice / 2);
    },
  };

  get widgets() {
    return this._widgets;
  }

  get chargeRules() {
    return this._chargeRules;
  }

  get specialOffer() {
    return this._specialOffer;
  }

  private _handleAddWidget(widget: Widget): Widget['code'] {
    this.widgets.items.push(widget);
    return widget.code;
  }
}

export default new Database();
