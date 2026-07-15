import { Star } from 'lucide-react';

export default function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} className="movie-poster" loading="lazy" />
      <div className="movie-info">
        <h3 className="movie-title" title={movie.title}>{movie.title}</h3>
        <div className="movie-meta">
          <span>{movie.year}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fbbf24' }}>
            <Star size={16} fill="currentColor" /> {movie.rating}
          </span>
        </div>
        <span className="movie-genre">{movie.genre}</span>
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {movie.overview}
        </p>
      </div>
    </div>
  );
}
