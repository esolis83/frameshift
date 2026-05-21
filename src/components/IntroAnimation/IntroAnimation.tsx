import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './IntroAnimation.module.css';

const FRAME = 'FRAME'.split('');
const SHIFT = 'SHIFT'.split('');
const TOTAL = FRAME.length + SHIFT.length; // 10
const MS    = 110; // ms per letter

type Phase = 'typing' | 'merging' | 'glowing';

interface Props { onComplete: () => void }

export function IntroAnimation({ onComplete }: Props) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<Phase>('typing');

  // Letter-by-letter counter
  useEffect(() => {
    if (phase !== 'typing') return;
    if (count < TOTAL) {
      const delay = count === FRAME.length ? 340 : MS; // pause between words
      const t = setTimeout(() => setCount((c) => c + 1), delay);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase('merging'), 260);
    return () => clearTimeout(t);
  }, [count, phase]);

  useEffect(() => {
    if (phase !== 'merging') return;
    const t = setTimeout(() => setPhase('glowing'), 2800);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'glowing') return;
    const t = setTimeout(onComplete, 900);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  const frameLetters = Math.min(count, FRAME.length);
  const shiftLetters = Math.max(0, count - FRAME.length);
  const merged  = phase === 'merging' || phase === 'glowing';
  const glowing = phase === 'glowing';

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
        animate={{
          filter: glowing
            ? 'drop-shadow(0 0 30px rgba(245,158,11,0.75))'
            : 'drop-shadow(0 0 0px rgba(245,158,11,0))',
        }}
        transition={{ filter: { duration: 0.45 } }}
      >
        {/* FRAME — types letter by letter */}
        {FRAME.map((letter, i) => (
          <motion.span
            key={`f${i}`}
            className={styles.letter}
            initial={{ opacity: 0, y: 20 }}
            animate={
              frameLetters > i
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            {letter}
          </motion.span>
        ))}

        {/* Gap spacer — holds FRAME and SHIFT apart, springs shut on merge */}
        <motion.span
          className={styles.spacer}
          animate={{ width: merged ? '0em' : '0.5em' }}
          transition={{ type: 'spring', stiffness: 20, damping: 13, mass: 1.4 }}
        />

        {/* SHIFT — types letter by letter */}
        {SHIFT.map((letter, i) => (
          <motion.span
            key={`s${i}`}
            className={styles.letter}
            initial={{ opacity: 0, y: 20 }}
            animate={
              shiftLetters > i
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            {letter}
          </motion.span>
        ))}

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
