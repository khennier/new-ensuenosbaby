
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GirlsClothing = () => {
  const [girlsClothing, setGirlsClothing] = useState([]);

  useEffect(() => {
    const fetchGirlsClothing = async () => {
      const { data } = await axios.get('/api/products?category=girls');
      setGirlsClothing(data);
    };
    fetchGirlsClothing();
  }, []);

  return (
    <div>
      <h1>Ropa para Niñas</h1>
      <div className="product-list">
        {girlsClothing.map(product => (
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

export default GirlsClothing;
