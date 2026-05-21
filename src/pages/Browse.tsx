import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useMovies } from '../hooks/useMovies';
import { HeroSection } from '../components/HeroSection/HeroSection';
import { GenreRow } from '../components/GenreRow/GenreRow';
import { Spinner } from '../components/Spinner/Spinner';
import { INTRO_SEEN_KEY } from '../constants';
import { makeStaggerContainer, pageTransition } from '../lib/variants';
import type { Movie } from '../data/mockMovies';
import styles from './Browse.module.css';

// Computed once at module load — value is stable for the page's lifetime
const ROWS_VARIANTS = makeStaggerContainer(
  0.14,
  sessionStorage.getItem(INTRO_SEEN_KEY) ? 0.3 : 5.8
);

export default function Browse() {
  const { data: movies, isLoading, isError } = useMovies();

  // Hooks before early returns — null-guarded inside
  const featured = useMemo(
    () => movies ? (movies.find((m) => m.isFeatured) ?? movies[0]) : null,
    [movies]
  );

  const byGenre = useMemo(
    () => (movies ?? []).reduce<Record<string, Movie[]>>((acc, movie) => {
      movie.genre.forEach((g) => {
        if (!acc[g]) acc[g] = [];
        acc[g].push(movie);
      });
      return acc;
    }, {}),
    [movies]
  );

  if (isLoading) return (
    <div className={styles.loadingWrap}>
      <Spinner />
      <p className={styles.loadingText}>Loading Frameshift…</p>
    </div>
  );

  if (isError || !movies || !featured) return (
    <div className={styles.errorWrap}>
      <p className={styles.errorTitle}>Could not connect to the server.</p>
      <p className={styles.errorSubtext}>The server may be waking up — please try again.</p>
      <button className={styles.retryBtn} onClick={() => window.location.reload()}>
        Retry
      </button>
    </div>
  );

  return (
    <motion.main {...pageTransition}>
      <HeroSection movie={featured} />
      <motion.div
        className={styles.rowsWrapper}
        variants={ROWS_VARIANTS}
        initial="hidden"
        animate="show"
      >
        {Object.entries(byGenre).map(([genre, genreMovies]) => (
          <GenreRow key={genre} genre={genre} movies={genreMovies} />
        ))}
      </motion.div>
      <footer className={styles.footer}>Powered by WordPress REST API</footer>
    </motion.main>
  );
}
