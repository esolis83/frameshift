import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMovie } from '../hooks/useMovies';
import styles from './MovieDetail.module.css';

export default function MovieDetail() {
  const { slug = '' } = useParams<{ slug: string }>();
  const { data: movie, isLoading, isError } = useMovie(slug);

  if (isLoading) return (
    <div className={styles.loading}>
      <div style={{ width: 40, height: 40, border: '3px solid rgba(245,158,11,0.15)', borderTop: '3px solid var(--accent)', borderRadius: '50%', animation: 'spin 0.9s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (isError || !movie) return (
    <div className={styles.error}>
      <p className={styles.errorText}>Movie not found.</p>
      <Link to="/" className={styles.errorLink}>← Back to Browse</Link>
    </div>
  );

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* ── Backdrop hero ── */}
      <div
        className={styles.hero}
        style={{ backgroundImage: `url(${movie.backdropUrl})` }}
      >
        <div className={styles.heroGradient} />
        <Link to="/" className={styles.back}>← Browse</Link>
      </div>

      {/* ── Glass info panel (overlaps hero) ── */}
      <motion.div
        className={styles.infoPanel}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
      >
        <div className={styles.glassPanelInner}>
          <img
            src={movie.posterUrl || movie.backdropUrl}
            alt={movie.title}
            className={styles.poster}
          />
          <div className={styles.info}>
            <span className={styles.genreTag}>{movie.genre[0]}</span>
            <h1 className={styles.title}>{movie.title}</h1>
            <div className={styles.meta}>
              <span className={styles.rating}>★ {movie.rating.toFixed(1)}</span>
              <span className={styles.metaDot}>·</span>
              <span>{movie.year}</span>
              <span className={styles.metaDot}>·</span>
              <span>{movie.duration}</span>
            </div>
            <p className={styles.synopsis}>{movie.synopsis}</p>
          </div>
        </div>
      </motion.div>

      {/* ── Body ── */}
      <motion.div
        className={styles.body}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
      >
        {/* Cast */}
        {movie.cast.length > 0 && (
          <section>
            <h2 className={styles.sectionHeading}>Cast</h2>
            <ul className={styles.castGrid}>
              {movie.cast.map((c) => (
                <li key={c.name} className={styles.castCard}>
                  <strong>{c.name}</strong>
                  {c.role && <span className={styles.castRole}> — {c.role}</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Trailer */}
        {movie.trailerUrl && (
          <section>
            <h2 className={styles.sectionHeading}>Trailer</h2>
            <div className={styles.trailerWrapper}>
              <iframe
                className={styles.trailerFrame}
                src={movie.trailerUrl}
                title={`${movie.title} trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        )}
      </motion.div>
    </motion.div>
  );
}
