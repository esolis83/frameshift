import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMovies } from '../hooks/useMovies';
import { MovieCard } from '../components/MovieCard/MovieCard';

export default function Search() {
  const [params] = useSearchParams();
  const q = params.get('q') ?? '';
  const { data: movies } = useMovies();

  const results = (movies ?? []).filter(
    (m) =>
      m.title.toLowerCase().includes(q.toLowerCase()) ||
      m.genre.some((g) => g.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ paddingTop: 'calc(var(--nav-height) + 2rem)', padding: 'calc(var(--nav-height) + 2rem) 2rem 2rem' }}
    >
      <h1 style={{ fontSize: 'var(--font-size-xl)', marginBottom: '1.5rem' }}>
        {q ? `Results for "${q}"` : 'Search'}
      </h1>
      {results.length === 0 && q && (
        <p style={{ color: 'var(--text-muted)' }}>No titles matched your search.</p>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </motion.main>
  );
}
