// BoysClothing.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BoysClothing = () => {
  const [boysClothing, setBoysClothing] = useState([]);

  useEffect(() => {
    const fetchBoysClothing = async () => {
      const { data } = await axios.get('/api/products?category=boys');
      setBoysClothing(data);
    };
    fetchBoysClothing();
  }, []);

  return (
    <div>
      <h1>Ropa para Niños</h1>
      <div className="product-list">
        {boysClothing.map(product => (
          <div key={product._id} className="product-item">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Precio: {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoysClothing;
