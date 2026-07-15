import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart } = useContext(StoreContext);
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. <Link to="/" style={{ color: 'blue', textDecoration: 'underline' }}>Go back</Link></p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          <div>
            {cart.map(item => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-info">
                  <h3 style={{ fontSize: '1.125rem' }}>{item.name}</h3>
                  <p style={{ color: 'var(--secondary-color)', marginTop: '0.25rem' }}>${item.price} x {item.qty}</p>
                </div>
                <button onClick={() => removeFromCart(item._id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'red' }}>
                  <Trash2 size={24} />
                </button>
              </div>
            ))}
          </div>
          <div style={{ padding: '2rem', background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', height: 'fit-content' }}>
            <h2>Order Summary</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0', padding: '1rem 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
              <span>Total ({cart.reduce((acc, item) => acc + item.qty, 0)} items)</span>
              <span style={{ fontWeight: 'bold' }}>${total}</span>
            </div>
            <button className="btn" onClick={() => alert('Mock Payment Gateway: Success!')}>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}
