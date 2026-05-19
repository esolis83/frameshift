import { motion } from 'framer-motion';
import { useMovies } from '../hooks/useMovies';
import { HeroSection } from '../components/HeroSection/HeroSection';
import { GenreRow } from '../components/GenreRow/GenreRow';
import type { Movie } from '../data/mockMovies';

export default function Browse() {
  const { data: movies, isLoading, isError } = useMovies();

  if (isLoading) return <div style={{ padding: '8rem 2rem', color: 'var(--text-muted)' }}>Loading…</div>;
  if (isError || !movies) return <div style={{ padding: '8rem 2rem', color: 'var(--accent)' }}>Failed to load movies.</div>;

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
