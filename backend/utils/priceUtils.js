const puppeteer = require('puppeteer');

async function scrapePrice(url, platform) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  
  let price = 0;
  let inStock = true;
  let saleEvent = '';

  if(platform === 'flipkart') {
    price = await page.$eval('._30jeq3._16Jk6d', el => el.textContent).catch(() => '');
    price = parseInt(price.replace(/[^\d]/g, ''));
    inStock = !(await page.$eval('._16FRp0', el => el.textContent).catch(() => 'In Stock')).toLowerCase().includes('out of stock');
    saleEvent = await page.$eval('._3rrtr6', el => el.textContent).catch(() => '');
  } else if(platform === 'amazon') {
    price = await page.$eval('#priceblock_ourprice, #priceblock_dealprice', el => el.textContent).catch(() => '');
    price = parseInt(price.replace(/[^\d]/g, ''));
    inStock = !(await page.$eval('#availability span', el => el.textContent).catch(() => 'In Stock')).toLowerCase().includes('out of stock');
    saleEvent = ''; // Amazon sale event scraping can be enhanced
  }

  await browser.close();
  return { price, inStock, saleEvent };
}

module.exports = { scrapePrice };
