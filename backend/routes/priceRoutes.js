const express = require('express');
const router = express.Router();
const Price = require('../models/price');
const { scrapePrice } = require('../utils/priceUtils');
const { sendEmailNotification } = require('../utils/emailUtils');
const authenticateFirebaseToken = require('../middleware/authMiddleware');

router.post('/track', authenticateFirebaseToken, async (req, res) => {
  // Access authenticated user as req.user
  const userId = req.user.uid;
  // Your existing price tracking logic here
  res.json({ message: `User ${userId} track request received` });
});


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
