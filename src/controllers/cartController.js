const cartService = require('../services/cartService');

const createCart = (req, res) => {
    const newCart = cartService.createCart();
    res.status(201).json(newCart);
};

const getCartProducts = (req, res) => {
    const cid = req.params.cid;
    const cart = cartService.getCartById(cid);
    res.json(cart);
};

const addProductToCart = (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const updatedCart = cartService.addProductToCart(cid, pid);
    res.json(updatedCart);
};

module.exports = {
    createCart,
    getCartProducts,
    addProductToCart,
};