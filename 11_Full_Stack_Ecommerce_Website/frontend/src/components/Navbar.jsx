import { Link } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';

export default function Navbar() {
  const { cart } = useContext(StoreContext);
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="navbar">
      <Link to="/" className="brand">NexusStore</Link>
      <div className="nav-icons">
        <Link to="/cart" className="icon-badge">
          <ShoppingCart size={24} />
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </Link>
        <Link to="/login" className="icon-badge">
          <User size={24} />
        </Link>
      </div>
    </nav>
  );
}
