const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ msg: 'Product not found' });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.post('/', protect, admin, async (req, res) => {
  try {
    const product = new Product({
      name: 'Sample name',
      price: 0,
      description: 'Sample description',
      image: '/images/sample.jpg',
      countInStock: 0
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
