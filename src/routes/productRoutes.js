const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Obtener productos con paginación y filtrado
router.get('/', productController.getProducts);

// Obtener producto por ID
router.get('/:pid', productController.getProductById);

// Agregar nuevo producto
router.post('/', productController.addProduct);

// Actualizar producto
router.put('/:pid', productController.updateProduct);

// Eliminar producto
router.delete('/:pid', productController.deleteProduct);

module.exports = router;


