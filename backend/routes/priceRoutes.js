const express = require('express');
const router = express.Router();
const Price = require('../models/price');
const { scrapePrice } = require('../utils/priceUtils');
const { sendEmailNotification } = require('../utils/emailUtils');
const authenticateFirebaseToken = require('../middleware/authMiddleware');
const admin = require('firebase-admin');

router.post('/track', authenticateFirebaseToken, async (req, res) => {
  // Access authenticated user as req.user
  const userId = req.user.uid;
  // Your existing price tracking logic here
  res.json({ message: `User ${userId} track request received` });
});


// Endpoint to scrape product price given URL and platform
router.post('/scrape', authenticateFirebaseToken, async (req, res) => {
  const { productUrl, platform, productId } = req.body;
  const userId = req.user.uid;

  try {
    const data = await scrapePrice(productUrl, platform);

    const priceEntry = new Price({
      productId,
      platform,
      price: data.price,
      inStock: data.inStock,
      saleEvent: data.saleEvent || ''
    });
    await priceEntry.save();

    // Fetch user email from Firebase Admin SDK
    const userRecord = await admin.auth().getUser(userId);
    const userEmail = userRecord.email;

    const previousEntry = await Price.findOne({ productId, platform }).sort({ createdAt: -1 });

    if (previousEntry && data.price < previousEntry.price) {
      // Price dropped, send notification email
      await sendEmailNotification(userEmail, 'Price Drop Alert', `Price dropped to $${data.price} on ${platform}`);
    }

    res.json({ currentPrice: data.price, inStock: data.inStock });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to scrape price' });
  }
});


module.exports = router;
