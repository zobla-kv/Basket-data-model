import database from './models/Database';
import Basket from './models/Basket';
import Widget from './models/Widget';

const { basketItems, chargeRules, specialOffer } = database;

const basket = new Basket<Widget>(basketItems, chargeRules, specialOffer);
