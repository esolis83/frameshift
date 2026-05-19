import { useQuery } from '@tanstack/react-query';
import { fetchMovies, fetchMovieBySlug } from '../api/wordpress';

export function useMovies() {
  return useQuery({
    queryKey: ['movies'],
    queryFn: fetchMovies,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    retryDelay: 3000,
  });
}

export function useMovie(slug: string) {
  return useQuery({
    queryKey: ['movie', slug],
    queryFn: () => fetchMovieBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    retryDelay: 3000,
  });
}
