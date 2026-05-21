import { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { NavBar } from './components/NavBar/NavBar';
import { DetailModal } from './components/DetailModal/DetailModal';
import { IntroAnimation } from './components/IntroAnimation/IntroAnimation';
import { useModalStore } from './store/modalStore';
import { INTRO_SEEN_KEY } from './constants';

const Browse      = lazy(() => import('./pages/Browse'));
const MovieDetail = lazy(() => import('./pages/MovieDetail'));
const Search      = lazy(() => import('./pages/Search'));

function shouldShowIntro() {
  if (typeof window === 'undefined') return false;
  return !sessionStorage.getItem(INTRO_SEEN_KEY);
}

export default function App() {
  const location  = useLocation();
  const [showIntro, setShowIntro] = useState(shouldShowIntro);
  const closeModal = useModalStore((s) => s.closeModal);

  // Close any open modal when the route changes so the layoutId return
  // animation doesn't try to morph back to a card on the exiting page
  useEffect(() => {
    closeModal();
  }, [location.pathname, closeModal]);

  function handleIntroDone() {
    sessionStorage.setItem(INTRO_SEEN_KEY, '1');
    setShowIntro(false);
  }

  return (
    <>
      <NavBar logoLayoutId={showIntro ? undefined : 'frameshift-logo'} />

      <AnimatePresence>
        {showIntro && (
          <IntroAnimation key="intro" onComplete={handleIntroDone} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <Suspense fallback={null}>
          <Routes location={location} key={location.pathname}>
            <Route path="/"            element={<Browse />} />
            <Route path="/movie/:slug" element={<MovieDetail />} />
            <Route path="/search"      element={<Search />} />
          </Routes>
        </Suspense>
      </AnimatePresence>

      <DetailModal />
    </>
  );
}
