const fs = require('fs');
const path = './data/products.json';
const Product = require('../models/productModel');

const loadProducts = () => {
    return JSON.parse(fs.readFileSync(path));
};


const saveProducts = (data) => {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
};

const getProducts = (limit) => {
    const data = loadProducts();
    return limit ? data.slice(0, limit) : data;
};

const getProductById = (pid) => {
    const data = loadProducts();
    return data.find(product => product.id === pid);
};

const addProduct = (productData) => {
    const data = loadProducts();
    const newProduct = new Product(Date.now().toString(), ...Object.values(productData));
    data.push(newProduct);
    saveProducts(data);
    return newProduct;
};

const updateProduct = (pid, updatedData) => {
    const data = loadProducts();
    const index = data.findIndex(product => product.id === pid);
    if (index !== -1) {
        data[index] = { ...data[index], ...updatedData };
        saveProducts(data);
        return data[index];
    }
    return null;
};

const deleteProduct = (pid) => {
    const data = loadProducts();
    const newData = data.filter(product => product.id !== pid);
    saveProducts(newData);
};

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};


