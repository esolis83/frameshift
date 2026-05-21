import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Movie } from '../../data/mockMovies';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  movie: Movie;
}

export function HeroSection({ movie }: HeroSectionProps) {
  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${movie.backdropUrl})` }}
    >
      <div className={styles.gradient} />
      <motion.div
        className={styles.glassPanel}
        initial={{ opacity: 0, x: -28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <p className={styles.genreTag}>{movie.genre[0]}</p>
        <h1 className={styles.title}>{movie.title}</h1>
        <p className={styles.synopsis}>{movie.synopsis}</p>
        <div className={styles.meta}>
          <span className={styles.rating}>★ {movie.rating.toFixed(1)}</span>
          <span className={styles.metaDot}>·</span>
          <span>{movie.year}</span>
          <span className={styles.metaDot}>·</span>
          <span>{movie.duration}</span>
        </div>
        <div className={styles.actions}>
          <Link to={`/movie/${movie.slug}`} className={styles.ctaPrimary}>
            More Info
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
