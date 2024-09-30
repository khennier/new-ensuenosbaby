import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');  // Petición al backend
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Últimos Lanzamientos</h1>
      <div className="product-list">
        {products.map(product => (
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

export default HomePage;
