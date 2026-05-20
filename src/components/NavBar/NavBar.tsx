import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './NavBar.module.css';

export function NavBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        FRAMESHIFTs
      </Link>
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
