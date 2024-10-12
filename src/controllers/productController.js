const productService = require('../services/productService');

const getProducts = async (req, res) => {
    try {
        const { limit = 10, page = 1, sort = '', query = '' } = req.query;

        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            sort: sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {},
            lean: true 
        };

        const filter = {};
        if (query) {
            filter.$or = [
                { title: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } }
            ];
        }

        const result = await productService.getProducts(filter, options);
        
        return res.json({
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.hasPrevPage ? page - 1 : null,
            nextPage: result.hasNextPage ? page + 1 : null,
            page: parseInt(page),
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
            nextLink: result.hasNextPage ? `?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null
        });
    } catch (error) {
        console.error(`Error in getProducts: ${error.message}`);
        return res.status(500).json({ status: 'error', message: 'Error retrieving products', error: error.message });
    }
};

const getProductById = async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await productService.getProductById(pid);
        if (product) {
            return res.json(product);
        }
        return res.status(404).json({ status: 'error', message: 'Product not found' });
    } catch (error) {
        console.error(`Error in getProductById: ${error.message}`);
        return res.status(500).json({ status: 'error', message: 'Error retrieving product', error: error.message });
    }
};

const addProduct = async (req, res) => {
    try {
        const newProduct = await productService.addProduct(req.body);
        return res.status(201).json(newProduct);
    } catch (error) {
        console.error(`Error in addProduct: ${error.message}`);
        return res.status(500).json({ status: 'error', message: 'Error adding product', error: error.message });
    }
};

const updateProduct = async (req, res) => {
    const { pid } = req.params;
    try {
        const updatedProduct = await productService.updateProduct(pid, req.body);
        if (updatedProduct) {
            return res.json(updatedProduct);
        }
        return res.status(404).json({ status: 'error', message: 'Product not found' });
    } catch (error) {
        console.error(`Error in updateProduct: ${error.message}`);
        return res.status(500).json({ status: 'error', message: 'Error updating product', error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const { pid } = req.params;
    try {
        await productService.deleteProduct(pid);
        return res.status(204).send();
    } catch (error) {
        console.error(`Error in deleteProduct: ${error.message}`);
        return res.status(500).json({ status: 'error', message: 'Error deleting product', error: error.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};



