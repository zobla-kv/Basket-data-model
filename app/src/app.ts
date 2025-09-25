import database from './models/Database';
import Catalogue from './models/Catalogue';
import Basket from './models/Basket';

const catalogue = new Catalogue(database.widgets.items);
const basket = new Basket(catalogue.products);
