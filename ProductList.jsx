import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Helper to extract the last emoji from product name
function extractEmoji(name) {
  const chars = [...name];
  // Check if last char is an emoji by a simple regex (basic emoji range)
  // If you want a more thorough emoji detection, you'd need a library, but this works for your use case
  const emojiRegex = /\p{Emoji}/u;

  let emoji = '';
  let nameWithoutEmoji = name;

  if (emojiRegex.test(chars[chars.length - 1])) {
    emoji = chars.pop();
    nameWithoutEmoji = chars.join('').trim();
  }

  return { emoji, nameWithoutEmoji };
}

const ProductList = ({ onPurchase }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="card product-list grid-layout">
      <h2>Products</h2>
      {products.length === 0 && <p>No products available.</p>}
      <ul>
        {products.map(product => {
          const { emoji, nameWithoutEmoji } = extractEmoji(product.name);
          return (
            <li key={product.id} className="product-card">
              <div className="emoji">{emoji || '📦'}</div>
              <div className="product-info">
                <p className="product-name">{nameWithoutEmoji}</p>
                <p className="product-price">${product.price.toFixed(2)}</p>
              </div>
              <button onClick={() => onPurchase(product.id)}>Purchase</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductList;
