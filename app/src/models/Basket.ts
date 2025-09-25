import { Product } from './Product';

class Basket<T extends Product> {
  private _items: T[] = [];
}

export default Basket;
