const express = require('express');
const router = express.Router();
const fs = require('fs');

const cartsFilePath = './data/carts.json';

const getCarts = () => {
  const data = fs.readFileSync(cartsFilePath, 'utf-8');
  return JSON.parse(data);
};

router.post('/', (req, res) => {
  const carts = getCarts();
  const newCart = {
    id: (carts.length + 1).toString(),
    products: [],
  };
  carts.push(newCart);
  fs.writeFileSync(cartsFilePath, JSON.stringify(carts));
  res.status(201).json(newCart);
});

router.get('/:cid', (req, res) => {
  const carts = getCarts();
  const cart = carts.find(c => c.id === req.params.cid);
  if (cart) res.json(cart);
  else res.status(404).json({ message: 'Carrito no encontrado' });
});

router.post('/:cid/product/:pid', (req, res) => {
  const carts = getCarts();
  const cart = carts.find(c => c.id === req.params.cid);
  if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

  const product = cart.products.find(p => p.product === req.params.pid);
  if (product) {
    product.quantity += 1;
  } else {
    cart.products.push({ product: req.params.pid, quantity: 1 });
  }
  fs.writeFileSync(cartsFilePath, JSON.stringify(carts));
  res.json(cart);
});

module.exports = router;
