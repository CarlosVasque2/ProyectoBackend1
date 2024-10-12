const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Obtener todos los carritos
router.get('/', cartController.getCarts);

// Obtener carrito por ID
router.get('/:cid', cartController.getCartById);

// Agregar producto a un carrito
router.post('/:cid/products', cartController.addProductToCart);

// Crear un nuevo carrito
router.post('/', cartController.createCart);

// Actualizar carrito
router.put('/:cid', cartController.updateCart);

// Eliminar carrito
router.delete('/:cid', cartController.deleteCart);

// Eliminar producto del carrito
router.delete('/:cid/products/:pid', cartController.removeProductFromCart);

module.exports = router;

