import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './IntroAnimation.module.css';

const FRAME = 'FRAME'.split('');
const SHIFT = 'SHIFT'.split('');
const MS    = 105; // ms per letter

type Phase = 'typing-frame' | 'typing-shift' | 'merging' | 'glowing';

interface Props { onComplete: () => void }

export function IntroAnimation({ onComplete }: Props) {
  const [phase,       setPhase]      = useState<Phase>('typing-frame');
  const [frameCount,  setFrameCount] = useState(0);
  const [shiftCount,  setShiftCount] = useState(0);

  // ── 1. Type FRAME ────────────────────────────────
  useEffect(() => {
    if (phase !== 'typing-frame') return;
    if (frameCount < FRAME.length) {
      const t = setTimeout(() => setFrameCount((c) => c + 1), MS);
      return () => clearTimeout(t);
    }
    // FRAME done → short pause → start SHIFT
    const t = setTimeout(() => setPhase('typing-shift'), 280);
    return () => clearTimeout(t);
  }, [phase, frameCount]);

  // ── 2. Type SHIFT ────────────────────────────────
  useEffect(() => {
    if (phase !== 'typing-shift') return;
    if (shiftCount < SHIFT.length) {
      const t = setTimeout(() => setShiftCount((c) => c + 1), MS);
      return () => clearTimeout(t);
    }
    // SHIFT done → start merge
    const t = setTimeout(() => setPhase('merging'), 220);
    return () => clearTimeout(t);
  }, [phase, shiftCount]);

  // ── 3. Merge → glow ──────────────────────────────
  useEffect(() => {
    if (phase !== 'merging') return;
    const t = setTimeout(() => setPhase('glowing'), 1100); // wait for full slide
    return () => clearTimeout(t);
  }, [phase]);

  // ── 4. Glow → exit ───────────────────────────────
  useEffect(() => {
    if (phase !== 'glowing') return;
    const t = setTimeout(onComplete, 900);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  const merged  = phase === 'merging' || phase === 'glowing';
  const glowing = phase === 'glowing';
  const showCursor = phase !== 'glowing';

  return (
    <>
      {/* Dark backdrop — fades out on exit */}
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.65, ease: 'easeInOut' }}
      />

      {/* Logo — layoutId flies this to the NavBar on exit */}
      <motion.div
        layoutId="frameshift-logo"
        className={styles.logoWrap}
        animate={glowing
          ? { filter: 'drop-shadow(0 0 30px rgba(245,158,11,0.75))' }
          : { filter: 'drop-shadow(0 0 0px rgba(245,158,11,0))' }
        }
        transition={{ duration: 0.4 }}
      >
        {/* ── FRAME ── */}
        <span className={styles.word}>
          {FRAME.map((letter, i) => (
            <motion.span
              key={`f${i}`}
              className={styles.letter}
              initial={{ opacity: 0, y: 20 }}
              animate={frameCount > i ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.16, ease: 'easeOut' }}
            >
              {letter}
            </motion.span>
          ))}
        </span>

        {/* ── SHIFT — starts offset right, slides left to merge ── */}
        <motion.span
          className={styles.word}
          initial={{ x: '0.9em' }}
          animate={{ x: merged ? 0 : '0.9em' }}
          transition={{ duration: 1.0, ease: 'easeInOut' }}
        >
          {SHIFT.map((letter, i) => (
            <motion.span
              key={`s${i}`}
              className={styles.letter}
              initial={{ opacity: 0, y: 20 }}
              animate={shiftCount > i ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.16, ease: 'easeOut' }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>

        {/* Blinking cursor */}
        {showCursor && (
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
