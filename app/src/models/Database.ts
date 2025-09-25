import type Widget from './Widget';

const widgets: Widget[] = [
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

class Database {
  public readonly items: readonly unknown[] = widgets;
}

export default new Database();
