import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './NavBar.module.css';

interface NavBarProps {
  /** Set once intro is done so the logo becomes the layoutId target */
  logoLayoutId?: string;
}

export function NavBar({ logoLayoutId }: NavBarProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <nav className={styles.nav}>
      {/* layoutId is undefined during intro, set to "frameshift-logo" after — triggers fly animation */}
      <motion.div layoutId={logoLayoutId} className={styles.logoWrapper}>
        <Link to="/" className={styles.logo}>
          FRAMESHIFT
        </Link>
      </motion.div>

      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          className={styles.searchInput}
          type="search"
          placeholder="Search titles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </nav>
  );
}
