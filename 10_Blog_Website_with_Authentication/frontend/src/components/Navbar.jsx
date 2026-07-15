import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <BookOpen size={24} />
        NexusBlog
      </Link>
      <div className="nav-links">
        {user ? (
          <>
            <span style={{ fontWeight: '600' }}>{user.username}</span>
            <button onClick={handleLogout} className="secondary">
              <LogOut size={18} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login"><button className="secondary">Login</button></Link>
            <Link to="/register"><button>Register</button></Link>
          </>
        )}
      </div>
    </nav>
  );
}
