export const addToCart = (cart, product, quantity) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
        existingItem.quantity += quantity;
    }
    else {
        cart.push({ product, quantity });
    }
    return cart;
};
export const calculateTotal = (cart) => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
};
