import { lazy, Suspense, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { NavBar } from './components/NavBar/NavBar';
import { DetailModal } from './components/DetailModal/DetailModal';
import { IntroAnimation } from './components/IntroAnimation/IntroAnimation';

const Browse     = lazy(() => import('./pages/Browse'));
const MovieDetail = lazy(() => import('./pages/MovieDetail'));
const Search     = lazy(() => import('./pages/Search'));

// Only show the intro once per browser session
function shouldShowIntro() {
  if (typeof window === 'undefined') return false;
  return !sessionStorage.getItem('fs-intro-seen');
}

export default function App() {
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(shouldShowIntro);

  function handleIntroDone() {
    sessionStorage.setItem('fs-intro-seen', '1');
    setShowIntro(false);
  }

  return (
    <>
      {/* NavBar — logo gets layoutId only AFTER intro exits, which triggers the fly animation */}
      <NavBar logoLayoutId={showIntro ? undefined : 'frameshift-logo'} />

      {/* Intro overlay — AnimatePresence drives the exit + layoutId fly */}
      <AnimatePresence>
        {showIntro && (
          <IntroAnimation key="intro" onComplete={handleIntroDone} />
        )}
      </AnimatePresence>

      {/* Page routes */}
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
