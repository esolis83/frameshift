import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useModalStore } from '../../store/modalStore';
import styles from './DetailModal.module.css';

export function DetailModal() {
  const { activeMovie, closeModal } = useModalStore();

  useEffect(() => {
    if (!activeMovie) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [activeMovie]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeModal]);

  return (
    <AnimatePresence>
      {activeMovie && (
        <>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeModal}
          />

          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{    opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className={styles.hero}>
              <img src={activeMovie.backdropUrl} alt="" className={styles.heroImage} aria-hidden />
              <div className={styles.heroGradient} />
              <button className={styles.closeBtn} onClick={closeModal} aria-label="Close">✕</button>
            </div>

            <motion.div
              className={styles.body}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.18, duration: 0.2 }}
            >
              <div className={styles.bodyInner}>
                <img src={activeMovie.posterUrl} alt={activeMovie.title} className={styles.poster} />
                <div className={styles.info}>
                  <h2 className={styles.title}>{activeMovie.title}</h2>
                  <p className={styles.meta}>
                    {activeMovie.year} · {activeMovie.duration} · ★&nbsp;{activeMovie.rating.toFixed(1)}
                  </p>
                  <div className={styles.genres}>
                    {activeMovie.genre.map((g) => (
                      <span key={g} className={styles.genreTag}>{g}</span>
                    ))}
                  </div>
                  <p className={styles.synopsis}>{activeMovie.synopsis}</p>
                </div>
              </div>

              {activeMovie.cast.length > 0 && (
                <div className={styles.cast}>
                  <h3 className={styles.castHeading}>Cast</h3>
                  <ul className={styles.castList}>
                    {activeMovie.cast.map((c) => (
                      <li key={c.name} className={styles.castItem}>
                        <strong>{c.name}</strong>
                        <span>{c.role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Link to={`/movie/${activeMovie.slug}`} className={styles.fullPageLink}>
                View full page →
              </Link>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
