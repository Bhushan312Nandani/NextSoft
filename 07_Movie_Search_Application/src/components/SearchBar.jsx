import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-container">
      <Search className="search-icon" size={24} />
      <input
        type="text"
        className="search-input"
        placeholder="Search for movies..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
