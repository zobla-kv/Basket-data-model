import { Product } from './Product';

class Widget implements Product {
  constructor(
    readonly code: string,
    readonly name: string,
    readonly price: string
  ) {}
}

export default Widget;
