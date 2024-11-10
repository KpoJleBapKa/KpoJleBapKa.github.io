import { findProduct, filterByPrice } from './functions/searchProduct.js';
import { addToCart, calculateTotal } from './functions/cartFunctions.js';
import { electronics, clothing } from './data/sampleData.js';
const phone = findProduct(electronics, 1);
const cheapClothing = filterByPrice(clothing, 600);
let cart = [];
if (phone) {
    cart = addToCart(cart, phone, 1);
}
const total = calculateTotal(cart);
console.log('Знайдений товар:', phone);
console.log('Дешевий одяг:', cheapClothing);
console.log('Кошик:', cart);
console.log('Загальна вартість:', total);
