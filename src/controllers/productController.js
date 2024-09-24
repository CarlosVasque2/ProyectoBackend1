const productService = require('../services/productService');

const getAllProducts = (req, res) => {
    const products = productService.getAllProducts();
    res.render('home', { products });
};

const createProduct = (req, res) => {
    const newProduct = req.body;
    productService.createProduct(newProduct);
    io.emit('productAdded', newProduct); 
    res.status(201).json(newProduct);
};

module.exports = {
    getAllProducts,
    createProduct,
};

