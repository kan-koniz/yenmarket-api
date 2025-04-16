require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

const products = require('./data/products.json');
const categories = require('./data/categories.json');

app.use(cors());

app.get('/api/categories', (req, res) => {
  res.json(categories);
});

app.get('/api/products', (req, res) => {
  const { category, page = 1, limit = 10, fields } = req.query;

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);

  let filtered = products;

  if (category) {
    filtered = filtered.filter((product) => product.categorySlug === category);
  }

  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;
  let paginatedItems = filtered.slice(startIndex, endIndex);

  if (fields) {
    const fieldList = fields.split(',');
    paginatedItems = paginatedItems.map((product) => {
      const selected = {};
      for (const field of fieldList) {
        selected[field] = product[field];
      }
      return selected;
    });
  }

  res.json({
    total: filtered.length,
    page: pageNum,
    limit: limitNum,
    data: paginatedItems,
  });
});

app.get('/api/products/:slug', (req, res) => {
  const product = products.find((item) => item.slug === req.params.slug);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API server is running at http://localhost:${PORT}`);
});
