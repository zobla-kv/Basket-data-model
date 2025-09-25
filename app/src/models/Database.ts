import { Product } from './Product';
import Widget from './Widget';

interface IDatabase {
  widgets: {
    items: Widget[];
    add: (widget: Product) => Product['code'];
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

  get widgets() {
    return this._widgets;
  }

  private _handleAddWidget(widget: Widget): Widget['code'] {
    this.widgets.items.push(widget);
    return widget.code;
  }
}

export default new Database();
