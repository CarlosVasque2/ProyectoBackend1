const Cart = require('../models/cartModel');
const { writeFile, readFile } = require('../utils/fileUtils');
const cartsFilePath = './data/carts.json';

// Obtener todos los carritos
const getCarts = async () => {
    try {
        const cartsData = await readFile(cartsFilePath);
        return cartsData;
    } catch (error) {
        console.error(`Error in getCarts service: ${error.message}`);
        throw new Error('Error retrieving carts');
    }
};

// Obtener carrito por ID
const getCartById = async (cid) => {
    try {
        const cartsData = await readFile(cartsFilePath);
        return cartsData.find(cart => cart.id === parseInt(cid)) || null;
    } catch (error) {
        console.error(`Error in getCartById service: ${error.message}`);
        throw new Error('Error retrieving cart');
    }
};

// Crear un nuevo carrito
const createCart = async () => {
    try {
        const cartsData = await readFile(cartsFilePath);
        const newCart = new Cart(cartsData.length + 1);
        cartsData.push(newCart);
        await writeFile(cartsFilePath, cartsData);
        return newCart;
    } catch (error) {
        console.error(`Error in createCart service: ${error.message}`);
        throw new Error('Error creating cart');
    }
};

// Agregar producto a un carrito
const addProductToCart = async (cid, pid) => {
    try {
        const cartsData = await readFile(cartsFilePath);
        const cart = cartsData.find(cart => cart.id === parseInt(cid));

        if (cart) {
            const productIndex = cart.products.findIndex(product => product.id === pid);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += 1; // Incrementar la cantidad si ya existe
            } else {
                cart.products.push({ id: pid, quantity: 1 }); // Agregar nuevo producto
            }
            await writeFile(cartsFilePath, cartsData);
            return cart;
        }
        return null;
    } catch (error) {
        console.error(`Error in addProductToCart service: ${error.message}`);
        throw new Error('Error adding product to cart');
    }
};

// Actualizar carrito
const updateCart = async (cid, updatedData) => {
    try {
        const cartsData = await readFile(cartsFilePath);
        const cartIndex = cartsData.findIndex(cart => cart.id === parseInt(cid));

        if (cartIndex !== -1) {
            cartsData[cartIndex] = { ...cartsData[cartIndex], ...updatedData };
            await writeFile(cartsFilePath, cartsData);
            return cartsData[cartIndex];
        }
        return null;
    } catch (error) {
        console.error(`Error in updateCart service: ${error.message}`);
        throw new Error('Error updating cart');
    }
};

// Eliminar carrito
const deleteCart = async (cid) => {
    try {
        const cartsData = await readFile(cartsFilePath);
        const updatedCarts = cartsData.filter(cart => cart.id !== parseInt(cid));
        await writeFile(cartsFilePath, updatedCarts);
    } catch (error) {
        console.error(`Error in deleteCart service: ${error.message}`);
        throw new Error('Error deleting cart');
    }
};

// Eliminar producto del carrito
const removeProductFromCart = async (cid, pid) => {
    try {
        const cartsData = await readFile(cartsFilePath);
        const cart = cartsData.find(cart => cart.id === parseInt(cid));

        if (cart) {
            cart.products = cart.products.filter(product => product.id !== pid);
            await writeFile(cartsFilePath, cartsData);
            return cart;
        }
        return null;
    } catch (error) {
        console.error(`Error in removeProductFromCart service: ${error.message}`);
        throw new Error('Error removing product from cart');
    }
};

module.exports = {
    getCarts,
    getCartById,
    createCart,
    addProductToCart,
    updateCart,
    deleteCart,
    removeProductFromCart
};


