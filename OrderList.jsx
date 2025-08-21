// OrderList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/orders')
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="card order-list">
      <h2>Orders</h2>
      {loading && <p>Loading orders...</p>}
      {!loading && orders.length === 0 && <p>No orders found.</p>}

      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <strong>Order #{order.id}</strong> - Product ID: {order.product_id} - Quantity: {order.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
