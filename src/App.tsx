import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { NavBar } from './components/NavBar/NavBar';
import { DetailModal } from './components/DetailModal/DetailModal';

const Browse = lazy(() => import('./pages/Browse'));
const MovieDetail = lazy(() => import('./pages/MovieDetail'));
const Search = lazy(() => import('./pages/Search'));

export default function App() {
  const location = useLocation();

  return (
    <>
      <NavBar />
      <AnimatePresence mode="wait">
        <Suspense fallback={null}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Browse />} />
            <Route path="/movie/:slug" element={<MovieDetail />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <DetailModal />
    </>
  );
}
