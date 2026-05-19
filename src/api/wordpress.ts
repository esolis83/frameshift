import { mockMovies, type Movie } from '../data/mockMovies';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';
const WP_BASE = import.meta.env.VITE_WP_BASE_URL as string;

interface WPMovie {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: {
    genre: string;
    year: string;
    rating: string;
    duration: string;
    synopsis: string;
    poster_image: string;
    backdrop_image: string;
    preview_clip: string | false;
    trailer_url: string;
    cast: string;
  };
}

function wpToMovie(wp: WPMovie): Movie {
  return {
    id: wp.id,
    title: wp.title.rendered,
    slug: wp.slug,
    genre: wp.acf.genre ? [wp.acf.genre] : [],
    year: Number(wp.acf.year),
    rating: parseFloat(wp.acf.rating),
    duration: wp.acf.duration,
    synopsis: wp.acf.synopsis?.trim() ?? '',
    posterUrl: wp.acf.poster_image ?? '',
    backdropUrl: wp.acf.backdrop_image ?? '',
    previewClipUrl: wp.acf.preview_clip || '',
    trailerUrl: wp.acf.trailer_url ?? '',
    cast: wp.acf.cast
      ? wp.acf.cast.split('\n').filter(Boolean).map(name => ({ name: name.trim(), role: '' }))
      : [],
  };
}

export async function fetchMovies(): Promise<Movie[]> {
  if (USE_MOCK) return mockMovies;

  const res = await fetch(`${WP_BASE}/movies?_embed&acf_format=standard&per_page=100`);
  if (!res.ok) throw new Error(`WP API error: ${res.status}`);
  const data: WPMovie[] = await res.json();
  return data.map(wpToMovie);
}

export async function fetchMovieBySlug(slug: string): Promise<Movie> {
  if (USE_MOCK) {
    const movie = mockMovies.find((m) => m.slug === slug);
    if (!movie) throw new Error(`Movie not found: ${slug}`);
    return movie;
  }

  const res = await fetch(`${WP_BASE}/movies?slug=${slug}&_embed&acf_format=standard`);
  if (!res.ok) throw new Error(`WP API error: ${res.status}`);
  const data: WPMovie[] = await res.json();
  if (!data[0]) throw new Error(`Movie not found: ${slug}`);
  return wpToMovie(data[0]);
}
