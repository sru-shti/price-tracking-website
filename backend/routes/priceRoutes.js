const express = require('express');
const router = express.Router();
const Price = require('../models/price');
const { scrapePrice } = require('../utils/priceUtils');
const { sendEmailNotification } = require('../utils/emailUtils');

// Endpoint to scrape product price given URL and platform
router.post('/scrape', async (req, res) => {
  const { productUrl, platform, productId } = req.body;
  try {
    const data = await scrapePrice(productUrl, platform);
    // Save to DB
    const priceEntry = new Price({
      productId,
      platform,
      price: data.price,
      inStock: data.inStock,
      saleEvent: data.saleEvent || ''
    });
    await priceEntry.save();

    // TODO: check price drop and send email notifications (implement later)

    res.json({ currentPrice: data.price, inStock: data.inStock });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to scrape price' });
  }
});

module.exports = router;
