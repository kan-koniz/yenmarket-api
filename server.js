require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const products = require('./data/products.json');

app.use(cors());

app.get('/api/products', (req, res) => {
  res.json(products);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API server is running at http://localhost:${PORT}`);
});
