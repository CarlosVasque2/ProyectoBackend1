const express = require('express');
const router = express.Router();
const fs = require('fs');

const productsFilePath = './data/products.json';

const getProducts = () => {
  const data = fs.readFileSync(productsFilePath, 'utf-8');
  return JSON.parse(data);
};

router.get('/', (req, res) => {
  const products = getProducts();
  const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
  res.json(products.slice(0, limit));
});

router.get('/:pid', (req, res) => {
  const products = getProducts();
  const product = products.find(p => p.id === req.params.pid);
  if (product) res.json(product);
  else res.status(404).json({ message: 'Producto no encontrado' });
});

router.post('/', (req, res) => {
  const products = getProducts();
  const newProduct = {
    id: (products.length + 1).toString(),  // Generar ID
    ...req.body,
    status: true,
  };
  products.push(newProduct);
  fs.writeFileSync(productsFilePath, JSON.stringify(products));
  res.status(201).json(newProduct);
});

router.put('/:pid', (req, res) => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === req.params.pid);
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body, id: products[index].id };
    fs.writeFileSync(productsFilePath, JSON.stringify(products));
    res.json(products[index]);
  } else res.status(404).json({ message: 'Producto no encontrado' });
});

router.delete('/:pid', (req, res) => {
  let products = getProducts();
  products = products.filter(p => p.id !== req.params.pid);
  fs.writeFileSync(productsFilePath, JSON.stringify(products));
  res.json({ message: 'Producto eliminado' });
});

module.exports = router;
