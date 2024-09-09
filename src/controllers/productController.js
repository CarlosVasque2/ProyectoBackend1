const productService = require('../services/productService');

const getAllProducts = (req, res) => {
    const limit = req.query.limit;
    const products = productService.getProducts(limit);
    res.json(products);
};

const getProductById = (req, res) => {
    const pid = req.params.pid;
    const product = productService.getProductById(pid);
    res.json(product);
};

const addProduct = (req, res) => {
    const productData = req.body;
    const newProduct = productService.addProduct(productData);
    res.status(201).json(newProduct);
};

const updateProduct = (req, res) => {
    const pid = req.params.pid;
    const updatedData = req.body;
    const updatedProduct = productService.updateProduct(pid, updatedData);
    res.json(updatedProduct);
};

const deleteProduct = (req, res) => {
    const pid = req.params.pid;
    productService.deleteProduct(pid);
    res.status(204).send();
};

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
};
