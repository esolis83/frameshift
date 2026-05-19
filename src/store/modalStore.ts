import { create } from 'zustand';
import type { Movie } from '../data/mockMovies';

interface ModalStore {
  activeMovie: Movie | null;
  openModal: (movie: Movie) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  activeMovie: null,
  openModal: (movie) => set({ activeMovie: movie }),
  closeModal: () => set({ activeMovie: null }),
}));
