import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './IntroAnimation.module.css';

const LETTERS = 'FRAMESHIFT'.split('');
const TYPING_INTERVAL = 105; // ms per letter
const AFTER_TYPED_PAUSE = 950; // ms of glow before exit begins

interface IntroAnimationProps {
  onComplete: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [count, setCount]   = useState(0);
  const [glowing, setGlowing] = useState(false);

  // Typewriter tick
  useEffect(() => {
    if (count < LETTERS.length) {
      const t = setTimeout(() => setCount((c) => c + 1), TYPING_INTERVAL);
      return () => clearTimeout(t);
    }
    // All letters typed — glow, then trigger exit
    setGlowing(true);
    const t = setTimeout(onComplete, AFTER_TYPED_PAUSE);
    return () => clearTimeout(t);
  }, [count, onComplete]);

  const allTyped = count === LETTERS.length;

  return (
    <>
      {/* ── Dark backdrop — fades out on exit ── */}
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.65, ease: 'easeInOut' }}
      />

      {/* ── Logo — layoutId makes it fly to NavBar on exit ── */}
      <motion.div
        layoutId="frameshift-logo"
        className={styles.logoWrap}
        animate={glowing ? { filter: 'drop-shadow(0 0 28px rgba(245,158,11,0.7))' } : {}}
        transition={{ duration: 0.4 }}
      >
        {/* Letters */}
        {LETTERS.map((letter, i) => (
          <motion.span
            key={i}
            className={styles.letter}
            initial={{ opacity: 0, y: 22 }}
            animate={count > i ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            {letter}
          </motion.span>
        ))}

        {/* Blinking cursor */}
        <motion.span
          className={styles.cursor}
          animate={{ opacity: allTyped ? 0 : [1, 0] }}
          transition={
            allTyped
              ? { duration: 0.25 }
              : { repeat: Infinity, duration: 0.5 }
          }
        >
          |
        </motion.span>
      </motion.div>
    </>
  );
}
