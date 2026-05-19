import { motion } from 'framer-motion';
import type { Movie } from '../../data/mockMovies';
import { useHoverVideo } from '../../hooks/useHoverVideo';
import { useModalStore } from '../../store/modalStore';
import styles from './MovieCard.module.css';

interface MovieCardProps {
  movie: Movie;
}

// Scale lives on the inner wrapper so it never conflicts with the layoutId exit animation.
const scaleVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.08, transition: { duration: 0.3, ease: 'easeOut' as const } },
};

const overlayVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.2 } },
};

export function MovieCard({ movie }: MovieCardProps) {
  const openModal = useModalStore((s) => s.openModal);
  const { videoRef, onMouseEnter, onMouseLeave } = useHoverVideo(movie.previewClipUrl);

  return (
    // layoutId anchor — position/size only, no transforms
    <motion.div
      className={styles.card}
      layoutId={`card-${movie.id}`}
      onClick={() => openModal(movie)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && openModal(movie)}
    >
      {/* inner wrapper owns hover scale + overlay variants */}
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
          src={movie.posterUrl}
          alt={movie.title}
          className={styles.poster}
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
            {movie.genre[0]} · {movie.year} · ★ {movie.rating.toFixed(1)}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
