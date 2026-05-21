import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMovies } from '../hooks/useMovies';
import { MovieCard } from '../components/MovieCard/MovieCard';
import styles from './Search.module.css';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.3 } },
};

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
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* No query yet */}
      {!q && (
        <div className={styles.prompt}>
          <div className={styles.promptIcon}>🔍</div>
          <p className={styles.promptText}>Type a title or genre to search</p>
        </div>
      )}

      {/* Has query */}
      {q && (
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
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {results.map((movie) => (
                <motion.div key={movie.id} variants={itemVariants}>
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </>
      )}
    </motion.main>
  );
}
