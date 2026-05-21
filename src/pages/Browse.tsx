import { motion } from 'framer-motion';
import { useMovies } from '../hooks/useMovies';
import { HeroSection } from '../components/HeroSection/HeroSection';
import { GenreRow } from '../components/GenreRow/GenreRow';
import type { Movie } from '../data/mockMovies';

export default function Browse() {
  const { data: movies, isLoading, isError } = useMovies();

  if (isLoading) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '1.5rem', color: 'var(--text-muted)' }}>
      <div style={{ width: 44, height: 44, border: '3px solid rgba(245,158,11,0.15)', borderTop: '3px solid var(--accent)', borderRadius: '50%', animation: 'spin 0.9s linear infinite' }} />
      <p style={{ fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Loading Frameshift…</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (isError || !movies) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '1rem', color: 'var(--text-muted)' }}>
      <p style={{ fontSize: '1.1rem', color: 'var(--accent)', fontWeight: 700 }}>Could not connect to the server.</p>
      <p style={{ fontSize: '0.875rem' }}>The server may be waking up — please try again.</p>
      <button
        onClick={() => window.location.reload()}
        style={{ marginTop: '0.5rem', padding: '0.55rem 1.5rem', background: 'var(--accent)', color: 'var(--bg-deep)', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 700, fontFamily: 'var(--font-sans)', letterSpacing: '0.03em' }}
      >
        Retry
      </button>
    </div>
  );

  const featured = movies.find((m) => m.isFeatured) ?? movies[0];

  const byGenre = movies.reduce<Record<string, Movie[]>>((acc, movie) => {
    movie.genre.forEach((g) => {
      if (!acc[g]) acc[g] = [];
      acc[g].push(movie);
    });
    return acc;
  }, {});

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <HeroSection movie={featured} />
      <div style={{ padding: '2rem 0' }}>
        {Object.entries(byGenre).map(([genre, genreMovies]) => (
          <GenreRow key={genre} genre={genre} movies={genreMovies} />
        ))}
      </div>
      <footer style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)' }}>
        Powered by WordPress REST API
      </footer>
    </motion.main>
  );
}
