import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './IntroAnimation.module.css';

const FRAME  = 'FRAME'.split('');
const SHIFT  = 'SHIFT'.split('');
const TOTAL  = FRAME.length + SHIFT.length;
const MS     = 110;   // ms per letter
const OFFSET = 34;    // px — each word offsets this far before merging

type Phase = 'typing' | 'merging' | 'glowing';

interface Props { onComplete: () => void }

export function IntroAnimation({ onComplete }: Props) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<Phase>('typing');

  // Single counter drives all 10 letters
  useEffect(() => {
    if (phase !== 'typing') return;
    if (count < TOTAL) {
      const delay = count === FRAME.length ? 320 : MS;
      const t = setTimeout(() => setCount((c) => c + 1), delay);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase('merging'), 250);
    return () => clearTimeout(t);
  }, [count, phase]);

  useEffect(() => {
    if (phase !== 'merging') return;
    const t = setTimeout(() => setPhase('glowing'), 2600);
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

  // Per-property transition: letters pop in fast, x slides via spring
  const letterTransition = {
    opacity: { duration: 0.16, ease: 'easeOut' as const },
    y:       { duration: 0.16, ease: 'easeOut' as const },
    x:       { type: 'spring' as const, stiffness: 22, damping: 14, mass: 1.3 },
  };

  return (
    <>
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.65, ease: 'easeInOut' }}
      />

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
        {/* FRAME letters — offset LEFT, slide RIGHT to 0 on merge */}
        {FRAME.map((letter, i) => (
          <motion.span
            key={`f${i}`}
            className={styles.letter}
            initial={{ opacity: 0, y: 22, x: -OFFSET }}
            animate={
              frameLetters > i
                ? { opacity: 1, y: 0, x: merged ? 0 : -OFFSET }
                : { opacity: 0, y: 22, x: -OFFSET }
            }
            transition={letterTransition}
          >
            {letter}
          </motion.span>
        ))}

        {/* SHIFT letters — offset RIGHT, slide LEFT to 0 on merge */}
        {SHIFT.map((letter, i) => (
          <motion.span
            key={`s${i}`}
            className={styles.letter}
            initial={{ opacity: 0, y: 22, x: OFFSET }}
            animate={
              shiftLetters > i
                ? { opacity: 1, y: 0, x: merged ? 0 : OFFSET }
                : { opacity: 0, y: 22, x: OFFSET }
            }
            transition={letterTransition}
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
