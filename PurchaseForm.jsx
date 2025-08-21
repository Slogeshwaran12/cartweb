// PurchaseForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const PurchaseForm = ({ productId, onSuccess }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (quantity < 1) {
      alert('Quantity must be at least 1');
      return;
    }

    setLoading(true);

    axios.post('http://localhost:8000/api/orders', {
      product_id: productId,
      quantity: quantity
    })
      .then(() => {
        alert('Order placed successfully!');
        onSuccess();
      })
      .catch(error => {
        console.error('Order failed:', error);
        alert('Failed to place order.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="card purchase-form">
      <h3>Purchase Product #{productId}</h3>

      <label>
        Quantity:{' '}
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
        />
      </label>

      <br /><br />

      <button type="button" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Placing Order...' : 'Place Order'}
      </button>
    </div>
  );
};

export default PurchaseForm;
