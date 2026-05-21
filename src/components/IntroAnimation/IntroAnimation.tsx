import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './IntroAnimation.module.css';

const FRAME   = 'FRAME'.split('');
const SHIFT   = 'SHIFT'.split('');
const TOTAL   = FRAME.length + SHIFT.length; // 10
const MS      = 110;  // ms per letter
const GAP_PX  = 32;   // starting gap between the two words in px

type Phase = 'typing' | 'merging' | 'glowing';

interface Props { onComplete: () => void }

export function IntroAnimation({ onComplete }: Props) {
  const [count, setCount] = useState(0);   // 0–10 across both words
  const [phase, setPhase] = useState<Phase>('typing');

  // Single counter drives both words — reliable letter-by-letter
  useEffect(() => {
    if (phase !== 'typing') return;

    if (count < TOTAL) {
      // Extra pause between the two words
      const delay = count === FRAME.length ? 320 : MS;
      const t = setTimeout(() => setCount((c) => c + 1), delay);
      return () => clearTimeout(t);
    }

    // All letters visible — begin merge
    const t = setTimeout(() => setPhase('merging'), 240);
    return () => clearTimeout(t);
  }, [count, phase]);

  // After merge animation finishes, start glow
  useEffect(() => {
    if (phase !== 'merging') return;
    const t = setTimeout(() => setPhase('glowing'), 1300); // > merge duration
    return () => clearTimeout(t);
  }, [phase]);

  // After glow, trigger exit
  useEffect(() => {
    if (phase !== 'glowing') return;
    const t = setTimeout(onComplete, 900);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  const frameLetters = Math.min(count, FRAME.length);        // 0–5
  const shiftLetters = Math.max(0, count - FRAME.length);    // 0–5
  const merged       = phase === 'merging' || phase === 'glowing';
  const glowing      = phase === 'glowing';

  return (
    <>
      {/* Dark backdrop */}
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.65, ease: 'easeInOut' }}
      />

      {/* Logo — layoutId flies to NavBar on exit */}
      <motion.div
        layoutId="frameshift-logo"
        className={styles.logoWrap}
        // columnGap slides from GAP_PX → 0 during merge
        animate={{
          columnGap: merged ? 0 : GAP_PX,
          filter: glowing
            ? 'drop-shadow(0 0 30px rgba(245,158,11,0.75))'
            : 'drop-shadow(0 0 0px rgba(245,158,11,0))',
        }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      >
        {/* ── FRAME ── */}
        <span className={styles.word}>
          {FRAME.map((letter, i) => (
            <motion.span
              key={`f${i}`}
              className={styles.letter}
              initial={{ opacity: 0, y: 22 }}
              animate={
                frameLetters > i
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 22 }
              }
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {letter}
            </motion.span>
          ))}
        </span>

        {/* ── SHIFT ── */}
        <span className={styles.word}>
          {SHIFT.map((letter, i) => (
            <motion.span
              key={`s${i}`}
              className={styles.letter}
              initial={{ opacity: 0, y: 22 }}
              animate={
                shiftLetters > i
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 22 }
              }
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {letter}
            </motion.span>
          ))}
        </span>

        {/* Blinking cursor — hides when glowing */}
        {!glowing && (
          <motion.span
            className={styles.cursor}
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
          >
            |
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
