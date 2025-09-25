import { Product } from './Product';

class Catalog<T extends Product[]> {
  private _items: T[] = [];
}

export default Catalog;
