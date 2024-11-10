// знаходить товар
export const findProduct = (products, id) => {
    if (!Array.isArray(products))
        throw new Error('products має бути масивом');
    if (typeof id !== 'number' || id < 0)
        throw new Error('id має бути додатним числом');
    return products.find(product => product.id === id);
};
// фільтрує за ціною
export const filterByPrice = (products, maxPrice) => {
    if (!Array.isArray(products))
        throw new Error('products має бути масивом');
    if (typeof maxPrice !== 'number' || maxPrice < 0)
        throw new Error('maxPrice має бути додатним числом');
    return products.filter(product => product.price <= maxPrice);
};
