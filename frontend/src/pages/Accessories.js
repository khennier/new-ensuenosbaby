import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Accessories = () => {
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    const fetchAccessories = async () => {
      const { data } = await axios.get('/api/products?category=accessories');
      setAccessories(data);
    };
    fetchAccessories();
  }, []);

  return (
    <div>
      <h1>Accesorios</h1>
      <div className="product-list">
        {accessories.map(product => (
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

export default Accessories;
