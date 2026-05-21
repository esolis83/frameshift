import { motion } from 'framer-motion';
import type { Movie } from '../../data/mockMovies';
import { useHoverVideo } from '../../hooks/useHoverVideo';
import { useModalStore } from '../../store/modalStore';
import { TOP_RATED_THRESHOLD } from '../../constants';
import styles from './MovieCard.module.css';

interface MovieCardProps {
  movie: Movie;
}

const scaleVariants = {
  rest:  { scale: 1 },
  hover: { scale: 1.04, transition: { duration: 0.3, ease: 'easeOut' as const } },
};

const overlayVariants = {
  rest:  { opacity: 0, y: 6 },
  hover: { opacity: 1, y: 0, transition: { duration: 0.22 } },
};

export function MovieCard({ movie }: MovieCardProps) {
  const openModal = useModalStore((s) => s.openModal);
  const { videoRef, onMouseEnter, onMouseLeave } = useHoverVideo(movie.previewClipUrl);

  return (
    <motion.div
      className={styles.card}

      onClick={() => openModal(movie)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && openModal(movie)}
    >
      {movie.rating >= TOP_RATED_THRESHOLD && (
        <div className={styles.badge}>★ Top Rated</div>
      )}
      <motion.div
        className={styles.inner}
        initial="rest"
        whileHover="hover"
        animate="rest"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        variants={scaleVariants}
      >
        <img
          src={movie.backdropUrl || movie.posterUrl}
          alt={movie.title}
          className={styles.backdrop}
          loading="lazy"
        />
        {movie.previewClipUrl && (
          <video
            ref={videoRef}
            src={movie.previewClipUrl}
            className={styles.preview}
            muted
            loop
            playsInline
          />
        )}
        <motion.div className={styles.overlay} variants={overlayVariants}>
          <p className={styles.title}>{movie.title}</p>
          <p className={styles.meta}>
            <span className={styles.rating}>★ {movie.rating.toFixed(1)}</span>
            <span className={styles.dot}>·</span>
            <span>{movie.genre[0]}</span>
            <span className={styles.dot}>·</span>
            <span>{movie.year}</span>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
