import { useEffect, useState, useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

export default function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(StoreContext);

  useEffect(() => {
    // Generate mock products if backend is empty to show UI immediately
    const mockProducts = Array.from({length: 8}, (_, i) => ({
      _id: String(i+1),
      name: `Premium Product ${i+1}`,
      price: (Math.random() * 100 + 10).toFixed(2),
      image: `https://picsum.photos/seed/${i+10}/400/300`,
      countInStock: 10
    }));
    setProducts(mockProducts);
    
    // Attempt fetch from backend
    axios.get('http://localhost:5000/api/products').then(res => {
      if(res.data.length > 0) setProducts(res.data);
    }).catch(err => console.log('Using mock data, backend not available'));
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Latest Products</h1>
      <div className="product-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.name} className="product-img" />
            <div className="product-info">
              <h3 className="product-title">{product.name}</h3>
              <p className="product-price">${product.price}</p>
              <button 
                className="btn" 
                style={{ marginTop: '1rem' }} 
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
