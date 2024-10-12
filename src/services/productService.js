const Product = require('../models/productModel');

// Obtener productos con paginación, filtrado y ordenamiento
const getProducts = async (filter, options) => {
    try {
        const result = await Product.paginate(filter, options);
        return result;
    } catch (error) {
        console.error(`Error in getProducts service: ${error.message}`);
        throw new Error('Error retrieving products');
    }
};

// Obtener producto por ID
const getProductById = async (pid) => {
    try {
        return await Product.findById(pid);
    } catch (error) {
        console.error(`Error in getProductById service: ${error.message}`);
        throw new Error('Error retrieving product');
    }
};

// Agregar producto
const addProduct = async (productData) => {
    try {
        const newProduct = new Product(productData);
        return await newProduct.save();
    } catch (error) {
        console.error(`Error in addProduct service: ${error.message}`);
        throw new Error('Error adding product');
    }
};

// Actualizar producto
const updateProduct = async (pid, updatedData) => {
    try {
        return await Product.findByIdAndUpdate(pid, updatedData, { new: true });
    } catch (error) {
        console.error(`Error in updateProduct service: ${error.message}`);
        throw new Error('Error updating product');
    }
};

// Eliminar producto
const deleteProduct = async (pid) => {
    try {
        return await Product.findByIdAndDelete(pid);
    } catch (error) {
        console.error(`Error in deleteProduct service: ${error.message}`);
        throw new Error('Error deleting product');
    }
};

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
};




