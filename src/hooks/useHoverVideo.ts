import { useRef, useCallback, useEffect } from 'react';

const HOVER_DELAY_MS = 800;

export function useHoverVideo(clipUrl: string) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear pending timer on unmount to prevent calling play() on a dead element
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const onMouseEnter = useCallback(() => {
    if (!clipUrl) return;
    timerRef.current = setTimeout(() => {
      videoRef.current?.play().catch(() => {
        // autoplay blocked — silently ignore
      });
    }, HOVER_DELAY_MS);
  }, [clipUrl]);

  const onMouseLeave = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  return { videoRef, onMouseEnter, onMouseLeave };
}
