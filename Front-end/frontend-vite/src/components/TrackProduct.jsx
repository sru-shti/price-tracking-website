import React, { useState } from 'react';
import axios from 'axios';

function TrackProduct() {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState('flipkart');
  const [result, setResult] = useState(null);

  const handleTrack = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/prices/scrape', { productUrl: url, platform });
      setResult(data);
    } catch {
      alert('Failed to track product');
    }
  };

  return (
    <div>
      <input placeholder="Product URL" value={url} onChange={e => setUrl(e.target.value)} />
      <select value={platform} onChange={e => setPlatform(e.target.value)}>
        <option value="flipkart">Flipkart</option>
        <option value="amazon">Amazon</option>
      </select>
      <button onClick={handleTrack}>Track Price</button>
      {result && (
        <div>
          <p>Current Price: ₹{result.currentPrice}</p>
          <p>In Stock: {result.inStock ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
}

export default TrackProduct;
