import { useRef } from 'react';
import type { Movie } from '../../data/mockMovies';
import { MovieCard } from '../MovieCard/MovieCard';
import styles from './GenreRow.module.css';

interface GenreRowProps {
  genre: string;
  movies: Movie[];
}

export function GenreRow({ genre, movies }: GenreRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  function scroll(direction: 'left' | 'right') {
    rowRef.current?.scrollBy({ left: direction === 'right' ? 600 : -600, behavior: 'smooth' });
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{genre}</h2>
      <div className={styles.rowWrapper}>
        <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => scroll('left')} aria-label="Scroll left">
          ‹
        </button>
        <div className={styles.row} ref={rowRef}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => scroll('right')} aria-label="Scroll right">
          ›
        </button>
      </div>
    </section>
  );
}
