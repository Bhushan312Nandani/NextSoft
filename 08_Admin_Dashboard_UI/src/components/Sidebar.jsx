import { LayoutDashboard, Users, ShoppingCart, Settings, X, Activity } from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <Activity size={28} color="var(--primary-color)" />
        <span>Nexus Admin</span>
        <button className="btn-icon menu-toggle" onClick={onClose} style={{ marginLeft: 'auto' }}>
          <X size={24} />
        </button>
      </div>
      
      <nav className="nav-menu">
        <a href="#" className="nav-item active">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </a>
        <a href="#" className="nav-item">
          <Users size={20} />
          <span>Users</span>
        </a>
        <a href="#" className="nav-item">
          <ShoppingCart size={20} />
          <span>Products</span>
        </a>
        <a href="#" className="nav-item">
          <Settings size={20} />
          <span>Settings</span>
        </a>
      </nav>
    </aside>
  );
}
