import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMovie } from '../hooks/useMovies';

export default function MovieDetail() {
  const { slug = '' } = useParams<{ slug: string }>();
  const { data: movie, isLoading, isError } = useMovie(slug);

  if (isLoading) return <div style={{ padding: '8rem 2rem', color: 'var(--text-muted)' }}>Loading…</div>;
  if (isError || !movie) return <div style={{ padding: '8rem 2rem', color: 'var(--accent)' }}>Movie not found. <Link to="/" style={{ color: 'var(--text-primary)' }}>Go back</Link></div>;

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ paddingTop: 'var(--nav-height)' }}
    >
      <div
        style={{
          position: 'relative',
          height: '60vh',
          backgroundImage: `url(${movie.backdropUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,15,0.3), var(--bg-primary))' }} />
      </div>

      <article style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}>
        <Link to="/" style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)', textDecoration: 'none' }}>
          ← Back
        </Link>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 900, margin: '1rem 0 0.5rem' }}>{movie.title}</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
          {movie.genre.join(' · ')} · {movie.year} · {movie.duration} · ★ {movie.rating.toFixed(1)}
        </p>
        <p style={{ lineHeight: 1.7, marginBottom: '2rem', maxWidth: 640 }}>{movie.synopsis}</p>

        <section>
          <h2 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-muted)' }}>Cast</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {movie.cast.map((c) => (
              <li key={c.name} style={{ background: 'var(--bg-card)', borderRadius: 4, padding: '0.5rem 0.75rem', fontSize: 'var(--font-size-sm)' }}>
                <strong>{c.name}</strong> <span style={{ color: 'var(--text-muted)' }}>as {c.role}</span>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </motion.main>
  );
}
