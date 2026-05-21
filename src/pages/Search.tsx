import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMovies } from '../hooks/useMovies';
import { MovieCard } from '../components/MovieCard/MovieCard';
import { makeStaggerContainer, fadeUpVariant, pageTransition } from '../lib/variants';
import styles from './Search.module.css';

const gridVariants = makeStaggerContainer(0.06);

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
    <motion.main className={styles.page} {...pageTransition}>
      {q ? (
        <>
          <div className={styles.header}>
            <p className={styles.label}>Search results</p>
            <h1 className={styles.heading}>
              Results for <span className={styles.query}>"{q}"</span>
            </h1>
            <p className={styles.count}>
              {results.length} {results.length === 1 ? 'title' : 'titles'} found
            </p>
          </div>

          {results.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>🎬</div>
              <p className={styles.emptyTitle}>No results found</p>
              <p className={styles.emptyText}>
                Try a different title or genre — Action, Sci-Fi, Drama, Thriller…
              </p>
            </div>
          ) : (
            <motion.div
              className={styles.grid}
              variants={gridVariants}
              initial="hidden"
              animate="show"
            >
              {results.map((movie) => (
                <motion.div key={movie.id} variants={fadeUpVariant}>
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </>
      ) : (
        <div className={styles.prompt}>
          <div className={styles.promptIcon}>🔍</div>
          <p className={styles.promptText}>Type a title or genre to search</p>
        </div>
      )}
    </motion.main>
  );
}
