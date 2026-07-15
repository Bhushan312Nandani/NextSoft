import { Menu, Moon, Sun, Bell, UserCircle } from 'lucide-react';

export default function Header({ theme, toggleTheme, toggleSidebar }) {
  return (
    <header className="header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button className="btn-icon menu-toggle" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '500' }}>Dashboard Overview</h2>
      </div>
      
      <div className="header-actions">
        <button className="btn-icon" onClick={toggleTheme} title="Toggle Theme">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <button className="btn-icon" title="Notifications">
          <Bell size={20} />
        </button>
        <button className="btn-icon" title="Profile">
          <UserCircle size={24} />
        </button>
      </div>
    </header>
  );
}
