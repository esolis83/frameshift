import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { Movie } from '../../data/mockMovies';
import { MovieCard } from '../MovieCard/MovieCard';
import { makeStaggerContainer, fadeSlideVariant, rowVariant } from '../../lib/variants';
import styles from './GenreRow.module.css';

interface GenreRowProps {
  genre: string;
  movies: Movie[];
}

const cardContainerVariants = makeStaggerContainer(0.06, 0.1);

// Hoisted to avoid creating a new object on every card render
const CARD_WRAPPER_STYLE = { flexShrink: 0 } as const;

export function GenreRow({ genre, movies }: GenreRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: 'left' | 'right') => {
    rowRef.current?.scrollBy({ left: direction === 'right' ? 600 : -600, behavior: 'smooth' });
  }, []);

  const scrollLeft  = useCallback(() => scroll('left'),  [scroll]);
  const scrollRight = useCallback(() => scroll('right'), [scroll]);

  return (
    <motion.section className={styles.section} variants={rowVariant}>
      <h2 className={styles.heading}>{genre}</h2>
      <div className={styles.rowWrapper}>
        <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={scrollLeft} aria-label="Scroll left">‹</button>

        <motion.div
          className={styles.row}
          ref={rowRef}
          variants={cardContainerVariants}
          initial="hidden"
          animate="show"
        >
          {movies.map((movie) => (
            <motion.div key={movie.id} variants={fadeSlideVariant} style={CARD_WRAPPER_STYLE}>
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </motion.div>

        <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={scrollRight} aria-label="Scroll right">›</button>
      </div>
    </motion.section>
  );
}
