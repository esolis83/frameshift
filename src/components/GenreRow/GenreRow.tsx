import { useRef } from 'react';
import { motion } from 'framer-motion';
import type { Movie } from '../../data/mockMovies';
import { MovieCard } from '../MovieCard/MovieCard';
import styles from './GenreRow.module.css';

interface GenreRowProps {
  genre: string;
  movies: Movie[];
}

// Row slides up and fades in — triggered by Browse's staggerChildren
const rowVariants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

// Cards stagger left-to-right within the row
const cardContainerVariants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, x: -18 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
};

export function GenreRow({ genre, movies }: GenreRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  function scroll(direction: 'left' | 'right') {
    rowRef.current?.scrollBy({ left: direction === 'right' ? 600 : -600, behavior: 'smooth' });
  }

  return (
    // motion.section inherits hidden/show from Browse's stagger parent
    <motion.section className={styles.section} variants={rowVariants}>
      <h2 className={styles.heading}>{genre}</h2>
      <div className={styles.rowWrapper}>
        <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => scroll('left')} aria-label="Scroll left">‹</button>

        {/* Card stagger container */}
        <motion.div
          className={styles.row}
          ref={rowRef}
          variants={cardContainerVariants}
          initial="hidden"
          animate="show"
        >
          {movies.map((movie) => (
            // Wrapper owns the stagger animation — MovieCard's layoutId is untouched
            <motion.div key={movie.id} variants={cardVariants} style={{ flexShrink: 0 }}>
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </motion.div>

        <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => scroll('right')} aria-label="Scroll right">›</button>
      </div>
    </motion.section>
  );
}
