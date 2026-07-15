import { useState, useEffect, useCallback } from 'react';
import { searchMovies } from './utils/mockData';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      const data = await searchMovies(query, page);
      setMovies(data.results);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [query, page]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchMovies();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query, page, fetchMovies]);

  const handleSearchChange = (val) => {
    setQuery(val);
    setPage(1);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title">Nexus Movies</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem' }}>
          Discover the most popular movies and explore your favorites.
        </p>
      </header>

      <SearchBar value={query} onChange={handleSearchChange} />

      {loading ? (
        <div className="loading-spinner"></div>
      ) : movies.length > 0 ? (
        <>
          <div className="movies-grid">
            {movies.map((movie, index) => (
              <div key={movie.id} style={{ animation: `fadeIn 0.5s ease-out ${index * 0.05}s both` }}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className="btn-page" 
                disabled={page === 1} 
                onClick={() => setPage(p => p - 1)}
              >
                <ChevronLeft size={20} /> Prev
              </button>
              <span style={{ fontWeight: '600' }}>Page {page} of {totalPages}</span>
              <button 
                className="btn-page" 
                disabled={page === totalPages} 
                onClick={() => setPage(p => p + 1)}
              >
                Next <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      ) : (
        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '4rem', fontSize: '1.25rem' }}>
          No movies found for "{query}".
        </div>
      )}
    </div>
  );
}

export default App;
