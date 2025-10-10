import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';

function TrackProduct() {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState('');
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const trackProduct = async (productUrl, platform) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error('User not signed in');

    const token = await user.getIdToken();

    const response = await fetch('http://localhost:5000/api/prices/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ productUrl, platform }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product data');
    }
    return response.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setProductData(null);

    try {
      const data = await trackProduct(url, platform);
      setProductData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Track Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="url" placeholder="Product URL" value={url} onChange={e => setUrl(e.target.value)} required />
        <input type="text" placeholder="Platform" value={platform} onChange={e => setPlatform(e.target.value)} required />
        <button type="submit" disabled={loading}>Track</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {productData && (
        <div>
          <p>Price: ${productData.currentPrice}</p>
          <p>{productData.inStock ? 'In Stock' : 'Out of Stock'}</p>
        </div>
      )}
    </div>
  );
}

export default TrackProduct;
