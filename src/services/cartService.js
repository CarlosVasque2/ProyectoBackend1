const fs = require('fs');
const path = './data/carts.json';
const Cart = require('../models/cartModel');

const loadCarts = () => {
    return JSON.parse(fs.readFileSync(path));
};

const saveCarts = (data) => {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
};

const createCart = () => {
    const data = loadCarts();
    const newCart = new Cart(Date.now().toString());
    data.push(newCart);
    saveCarts(data);
    return newCart;
};

const getCartById = (cid) => {
    const data = loadCarts();
    return data.find(cart => cart.id === cid);
};

const addProductToCart = (cid, pid) => {
    const data = loadCarts();
    const cart = data.find(cart => cart.id === cid);
    if (cart) {
        const productIndex = cart.products.findIndex(p => p.product === pid);
        if (productIndex !== -1) {
            cart.products[productIndex].quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }
        saveCarts(data);
        return cart;
    }
    return null;
};

module.exports = {
    createCart,
    getCartById,
    addProductToCart
};
