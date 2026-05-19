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
        className={styles.content}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <p className={styles.genres}>{movie.genre.join(' · ')}</p>
        <h1 className={styles.title}>{movie.title}</h1>
        <p className={styles.synopsis}>{movie.synopsis}</p>
        <div className={styles.meta}>
          <span>{movie.year}</span>
          <span>{movie.duration}</span>
          <span className={styles.rating}>★ {movie.rating.toFixed(1)}</span>
        </div>
        <Link to={`/movie/${movie.slug}`} className={styles.cta}>
          More Info
        </Link>
      </motion.div>
    </section>
  );
}
