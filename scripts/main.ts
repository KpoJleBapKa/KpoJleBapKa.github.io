import { findProduct, filterByPrice } from './functions/searchProduct';
import { addToCart, calculateTotal } from './functions/cartFunctions';
import { electronics, clothing } from './data/sampleData';
import { CartItem } from './types/CartItem';
import { BaseProduct } from './types/BaseProduct';

const phone = findProduct(electronics, 1);
const cheapClothing = filterByPrice(clothing, 600);

let cart: CartItem<BaseProduct>[] = []; 
if (phone) {
  cart = addToCart(cart, phone, 1);
}

const total = calculateTotal(cart);

console.log('Знайдений товар:', phone);
console.log('Дешевий одяг:', cheapClothing);
console.log('Кошик:', cart);
console.log('Загальна вартість:', total);
