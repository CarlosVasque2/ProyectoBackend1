const cartService = require('../services/cartService');

const getCarts = async (req, res) => {
    try {
        const carts = await cartService.getCarts();
        return res.json(carts);
    } catch (error) {
        console.error(`Error in getCarts: ${error.message}`);
        return res.status(500).json({ status: 'error', message: 'Error retrieving carts', error: error.message });
    }
};

const getCartById = async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartService.getCartById(cid);
        if (cart) {
            return res.json(cart);
        }
        return res.status(404).json({ status: 'error', message: 'Cart not found' });
    } catch (error) {
        console.error(`Error in getCartById: ${error.message}`);
        return res.status(500).json({ status: 'error', message: 'Error retrieving cart', error: error.message });
    }
};

const addCart = async (req, res) => {
    try {
        const newCart = await cartService.addCart(req.body);
        return res.status(201).json(newCart);
    } catch (error) {
        console.error(`Error in addCart: ${error.message}`);
        return res.status(500).json({ status: 'error', message: 'Error adding cart', error: error.message });
    }
};

const updateCart = async (req, res) => {
    const { cid } = req.params;
    try {
        const updatedCart = await cartService.updateCart(cid, req.body);
        if (updatedCart) {
            return res.json(updatedCart);
        }
        return res.status(404).json({ status: 'error', message: 'Cart not found' });
    } catch (error) {
        console.error(`Error in updateCart: ${error.message}`);
        return res.status(500).json({ status: 'error', message: 'Error updating cart', error: error.message });
    }
};

const deleteCart = async (req, res) => {
    const { cid } = req.params;
    try {
        await cartService.deleteCart(cid);
        return res.status(204).send();
    } catch (error) {
        console.error(`Error in deleteCart: ${error.message}`);
        return res.status(500).json({ status: 'error', message: 'Error deleting cart', error: error.message });
    }
};

module.exports = {
    getCarts,
    getCartById,
    addCart,
    updateCart,
    deleteCart
};

