import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './IntroAnimation.module.css';

const FRAME  = 'FRAME'.split('');
const SHIFT  = 'SHIFT'.split('');
const TOTAL  = FRAME.length + SHIFT.length; // 10
const MS     = 110;  // ms per letter
const OFFSET = 32;   // px — each word offsets this far from centre before merging

// Gentle spring — slow start, organic deceleration, no crash
const MERGE_SPRING = { type: 'spring', stiffness: 22, damping: 14, mass: 1.3 } as const;

type Phase = 'typing' | 'merging' | 'glowing';

interface Props { onComplete: () => void }

export function IntroAnimation({ onComplete }: Props) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<Phase>('typing');

  // Single counter — drives both words letter by letter
  useEffect(() => {
    if (phase !== 'typing') return;
    if (count < TOTAL) {
      const delay = count === FRAME.length ? 320 : MS; // pause between words
      const t = setTimeout(() => setCount((c) => c + 1), delay);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase('merging'), 240);
    return () => clearTimeout(t);
  }, [count, phase]);

  // Wait for spring to fully settle, then glow
  useEffect(() => {
    if (phase !== 'merging') return;
    const t = setTimeout(() => setPhase('glowing'), 2500);
    return () => clearTimeout(t);
  }, [phase]);

  // Glow → exit
  useEffect(() => {
    if (phase !== 'glowing') return;
    const t = setTimeout(onComplete, 900);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  const frameLetters = Math.min(count, FRAME.length);
  const shiftLetters = Math.max(0, count - FRAME.length);
  const merged       = phase === 'merging' || phase === 'glowing';
  const glowing      = phase === 'glowing';

  return (
    <>
      {/* Dark backdrop — fades out on exit */}
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.65, ease: 'easeInOut' }}
      />

      {/* Logo wrapper — layoutId flies this to NavBar on exit */}
      <motion.div
        layoutId="frameshift-logo"
        className={styles.logoWrap}
        animate={{
          filter: glowing
            ? 'drop-shadow(0 0 30px rgba(245,158,11,0.75))'
            : 'drop-shadow(0 0 0px rgba(245,158,11,0))',
        }}
        transition={{ filter: { duration: 0.45 } }}
      >
        {/* FRAME — starts shifted LEFT, slides RIGHT to meet centre */}
        <motion.span
          className={styles.word}
          animate={{ x: merged ? 0 : -OFFSET }}
          transition={MERGE_SPRING}
        >
          {FRAME.map((letter, i) => (
            <motion.span
              key={`f${i}`}
              className={styles.letter}
              initial={{ opacity: 0, y: 22 }}
              animate={frameLetters > i ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>

        {/* SHIFT — starts shifted RIGHT, slides LEFT to meet centre */}
        <motion.span
          className={styles.word}
          animate={{ x: merged ? 0 : OFFSET }}
          transition={MERGE_SPRING}
        >
          {SHIFT.map((letter, i) => (
            <motion.span
              key={`s${i}`}
              className={styles.letter}
              initial={{ opacity: 0, y: 22 }}
              animate={shiftLetters > i ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>

        {/* Blinking cursor */}
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
