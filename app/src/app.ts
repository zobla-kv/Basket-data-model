import database from './models/Database';
import Basket from './models/Basket';
import Widget from './models/Widget';

const basket = new Basket<Widget>(
  database.basketItems,
  database.chargeRules,
  database.specialOffer
);
