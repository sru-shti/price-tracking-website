const axios = require('axios');
const cheerio = require('cheerio');

async function scrapePrice(productUrl, platform) {
  try {
    const { data } = await axios.get(productUrl);
    const $ = cheerio.load(data);

    let price = null;
    let inStock = true; // default
    let productId = null;
    let saleEvent = '';

    if (platform === 'exampleRetailer') {
      // Example selectors, replace with real CSS selectors for this retailer
      price = $('#price').text().trim();
      price = parseFloat(price.replace(/[^0-9\.]/g, ''));

      inStock = !$('.out-of-stock').length;

      productId = $('meta[name="product-id"]').attr('content') || 'unknown';
      saleEvent = $('.sale-tag').text().trim() || '';
    }

    // Add more platform cases here...

    if (!price) {
      throw new Error('Price not found');
    }

    return { price, inStock, productId, saleEvent };
  } catch (error) {
    console.error('Error scraping price:', error.message);
    throw error;
  }
}

module.exports = { scrapePrice };
