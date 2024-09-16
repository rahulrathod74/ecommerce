const express = require('express');
const Cart = require('../models/Cart');
const products = require('../models/Product');
const router = express.Router();

const cart = new Cart();

router.get('/products', (req, res) => {
  res.json(products);
});

router.post('/add-to-cart', (req, res) => {
  const { productId, quantity } = req.body;
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.addToCart(product, quantity);
    res.json({ message: 'Added to cart' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

router.post('/remove-from-cart', (req, res) => {
  const { productId, quantity } = req.body;
  cart.removeFromCart(productId, quantity);
  res.json({ message: 'Removed from cart' });
});

router.get('/view-cart', (req, res) => {
  res.json(cart.viewCart());
});

router.get('/checkout', (req, res) => {
  let totalCost = cart.calculateTotalCost();
  const discounts = applyDiscounts(cart.items);
  totalCost -= discounts;
  res.json({ totalCost, discountsApplied: discounts });
});

const applyDiscounts = (cartItems) => {
  let discount = 0;
  cartItems.forEach(item => {
    if (item.product.category === 'Fashion' && item.quantity >= 2) {
      discount += Math.floor(item.quantity / 2) * item.product.price;
    }
    if (item.product.category === 'Electronics') {
      discount += item.product.price * item.quantity * 0.1;
    }
  });
  return discount;
};

module.exports = router;
