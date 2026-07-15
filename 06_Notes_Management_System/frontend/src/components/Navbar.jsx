import { useAuth } from '../context/AuthContext';
import { LogOut, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar glass">
      <div className="nav-brand">
        <BookOpen size={24} />
        <span>NexusNotes</span>
      </div>
      <div className="nav-actions">
        <button onClick={handleLogout} className="btn-icon" title="Logout">
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
}
