export interface Movie {
  id: number;
  title: string;
  slug: string;
  genre: string[];
  year: number;
  rating: number;
  duration: string;
  synopsis: string;
  posterUrl: string;
  backdropUrl: string;
  previewClipUrl: string;
  trailerUrl: string;
  cast: { name: string; role: string }[];
  isFeatured?: boolean;
}

export const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Inception',
    slug: 'inception',
    genre: ['Sci-Fi', 'Thriller'],
    year: 2010,
    rating: 8.8,
    duration: '2h 28m',
    synopsis: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    posterUrl: 'https://placehold.co/300x450/141420/9999aa?text=Inception',
    backdropUrl: 'https://placehold.co/1920x1080/0a0a0f/9999aa?text=Inception',
    previewClipUrl: '',
    trailerUrl: 'https://www.youtube.com/embed/YoHD9XEInc0',
    cast: [
      { name: 'Leonardo DiCaprio', role: 'Dom Cobb' },
      { name: 'Joseph Gordon-Levitt', role: 'Arthur' },
      { name: 'Elliot Page', role: 'Ariadne' },
    ],
    isFeatured: true,
  },
  {
    id: 2,
    title: 'The Dark Knight',
    slug: 'the-dark-knight',
    genre: ['Action', 'Crime'],
    year: 2008,
    rating: 9.0,
    duration: '2h 32m',
    synopsis: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
    posterUrl: 'https://placehold.co/300x450/141420/9999aa?text=Dark+Knight',
    backdropUrl: 'https://placehold.co/1920x1080/0a0a0f/9999aa?text=Dark+Knight',
    previewClipUrl: '',
    trailerUrl: 'https://www.youtube.com/embed/EXeTwQWrcwY',
    cast: [
      { name: 'Christian Bale', role: 'Bruce Wayne' },
      { name: 'Heath Ledger', role: 'The Joker' },
      { name: 'Aaron Eckhart', role: 'Harvey Dent' },
    ],
  },
  {
    id: 3,
    title: 'Interstellar',
    slug: 'interstellar',
    genre: ['Sci-Fi', 'Drama'],
    year: 2014,
    rating: 8.6,
    duration: '2h 49m',
    synopsis: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    posterUrl: 'https://placehold.co/300x450/141420/9999aa?text=Interstellar',
    backdropUrl: 'https://placehold.co/1920x1080/0a0a0f/9999aa?text=Interstellar',
    previewClipUrl: '',
    trailerUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E',
    cast: [
      { name: 'Matthew McConaughey', role: 'Cooper' },
      { name: 'Anne Hathaway', role: 'Brand' },
      { name: 'Jessica Chastain', role: 'Murph (adult)' },
    ],
  },
  {
    id: 4,
    title: 'Parasite',
    slug: 'parasite',
    genre: ['Drama', 'Thriller'],
    year: 2019,
    rating: 8.5,
    duration: '2h 12m',
    synopsis: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    posterUrl: 'https://placehold.co/300x450/141420/9999aa?text=Parasite',
    backdropUrl: 'https://placehold.co/1920x1080/0a0a0f/9999aa?text=Parasite',
    previewClipUrl: '',
    trailerUrl: 'https://www.youtube.com/embed/5xH0HfJHsaY',
    cast: [
      { name: 'Song Kang-ho', role: 'Ki-taek' },
      { name: 'Lee Sun-kyun', role: 'Park Dong-ik' },
      { name: 'Cho Yeo-jeong', role: 'Choi Yeon-gyo' },
    ],
  },
  {
    id: 5,
    title: 'The Matrix',
    slug: 'the-matrix',
    genre: ['Sci-Fi', 'Action'],
    year: 1999,
    rating: 8.7,
    duration: '2h 16m',
    synopsis: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    posterUrl: 'https://placehold.co/300x450/141420/9999aa?text=The+Matrix',
    backdropUrl: 'https://placehold.co/1920x1080/0a0a0f/9999aa?text=The+Matrix',
    previewClipUrl: '',
    trailerUrl: 'https://www.youtube.com/embed/vKQi3bBA1y8',
    cast: [
      { name: 'Keanu Reeves', role: 'Neo' },
      { name: 'Laurence Fishburne', role: 'Morpheus' },
      { name: 'Carrie-Anne Moss', role: 'Trinity' },
    ],
  },
  {
    id: 6,
    title: 'Blade Runner 2049',
    slug: 'blade-runner-2049',
    genre: ['Sci-Fi', 'Drama'],
    year: 2017,
    rating: 8.0,
    duration: '2h 44m',
    synopsis: "A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, missing for thirty years.",
    posterUrl: 'https://placehold.co/300x450/141420/9999aa?text=Blade+Runner+2049',
    backdropUrl: 'https://placehold.co/1920x1080/0a0a0f/9999aa?text=Blade+Runner+2049',
    previewClipUrl: '',
    trailerUrl: 'https://www.youtube.com/embed/gCcx85zbxz4',
    cast: [
      { name: 'Ryan Gosling', role: 'K' },
      { name: 'Harrison Ford', role: 'Rick Deckard' },
      { name: 'Ana de Armas', role: 'Joi' },
    ],
  },
  {
    id: 7,
    title: 'Mad Max: Fury Road',
    slug: 'mad-max-fury-road',
    genre: ['Action', 'Sci-Fi'],
    year: 2015,
    rating: 8.1,
    duration: '2h',
    synopsis: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the help of a group of female prisoners.',
    posterUrl: 'https://placehold.co/300x450/141420/9999aa?text=Mad+Max',
    backdropUrl: 'https://placehold.co/1920x1080/0a0a0f/9999aa?text=Mad+Max',
    previewClipUrl: '',
    trailerUrl: 'https://www.youtube.com/embed/hEJnMQG9ev8',
    cast: [
      { name: 'Tom Hardy', role: 'Max Rockatansky' },
      { name: 'Charlize Theron', role: 'Imperator Furiosa' },
      { name: 'Nicholas Hoult', role: 'Nux' },
    ],
  },
  {
    id: 8,
    title: 'Get Out',
    slug: 'get-out',
    genre: ['Horror', 'Thriller'],
    year: 2017,
    rating: 7.7,
    duration: '1h 44m',
    synopsis: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their overly accommodating behavior gives way to a terrifying climax.",
    posterUrl: 'https://placehold.co/300x450/141420/9999aa?text=Get+Out',
    backdropUrl: 'https://placehold.co/1920x1080/0a0a0f/9999aa?text=Get+Out',
    previewClipUrl: '',
    trailerUrl: 'https://www.youtube.com/embed/DzfpyUB60YY',
    cast: [
      { name: 'Daniel Kaluuya', role: 'Chris Washington' },
      { name: 'Allison Williams', role: 'Rose Armitage' },
      { name: 'Bradley Whitford', role: 'Dean Armitage' },
    ],
  },
  {
    id: 9,
    title: 'Pulp Fiction',
    slug: 'pulp-fiction',
    genre: ['Crime', 'Drama'],
    year: 1994,
    rating: 8.9,
    duration: '2h 34m',
    synopsis: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
    posterUrl: 'https://placehold.co/300x450/141420/9999aa?text=Pulp+Fiction',
    backdropUrl: 'https://placehold.co/1920x1080/0a0a0f/9999aa?text=Pulp+Fiction',
    previewClipUrl: '',
    trailerUrl: 'https://www.youtube.com/embed/s7EdQ4FqbkY',
    cast: [
      { name: 'John Travolta', role: 'Vincent Vega' },
      { name: 'Samuel L. Jackson', role: 'Jules Winnfield' },
      { name: 'Uma Thurman', role: 'Mia Wallace' },
    ],
  },
  {
    id: 10,
    title: 'Everything Everywhere All at Once',
    slug: 'everything-everywhere-all-at-once',
    genre: ['Comedy', 'Sci-Fi', 'Drama'],
    year: 2022,
    rating: 7.8,
    duration: '2h 19m',
    synopsis: 'A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes connecting with the lives she could have led.',
    posterUrl: 'https://placehold.co/300x450/141420/9999aa?text=EEAAO',
    backdropUrl: 'https://placehold.co/1920x1080/0a0a0f/9999aa?text=EEAAO',
    previewClipUrl: '',
    trailerUrl: 'https://www.youtube.com/embed/wxN1T1uxQ2g',
    cast: [
      { name: 'Michelle Yeoh', role: 'Evelyn Wang' },
      { name: 'Ke Huy Quan', role: 'Waymond Wang' },
      { name: 'Jamie Lee Curtis', role: 'Deirdre Beaubeirdre' },
    ],
  },
  {
    id: 11,
    title: 'The Godfather',
    slug: 'the-godfather',
    genre: ['Crime', 'Drama'],
    year: 1972,
    rating: 9.2,
    duration: '2h 55m',
    synopsis: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    posterUrl: 'https://placehold.co/300x450/141420/9999aa?text=The+Godfather',
    backdropUrl: 'https://placehold.co/1920x1080/0a0a0f/9999aa?text=The+Godfather',
    previewClipUrl: '',
    trailerUrl: 'https://www.youtube.com/embed/sY1S34973zA',
    cast: [
      { name: 'Marlon Brando', role: 'Vito Corleone' },
      { name: 'Al Pacino', role: 'Michael Corleone' },
      { name: 'James Caan', role: 'Sonny Corleone' },
    ],
  },
  {
    id: 12,
    title: 'Dune',
    slug: 'dune',
    genre: ['Sci-Fi', 'Drama'],
    year: 2021,
    rating: 8.0,
    duration: '2h 35m',
    synopsis: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.",
    posterUrl: 'https://placehold.co/300x450/141420/9999aa?text=Dune',
    backdropUrl: 'https://placehold.co/1920x1080/0a0a0f/9999aa?text=Dune',
    previewClipUrl: '',
    trailerUrl: 'https://www.youtube.com/embed/n9xhJrPXop4',
    cast: [
      { name: 'Timothée Chalamet', role: 'Paul Atreides' },
      { name: 'Zendaya', role: 'Chani' },
      { name: 'Rebecca Ferguson', role: 'Lady Jessica' },
    ],
  },
];

export const featuredMovie = mockMovies.find((m) => m.isFeatured) ?? mockMovies[0];

export const moviesByGenre = mockMovies.reduce<Record<string, Movie[]>>((acc, movie) => {
  movie.genre.forEach((g) => {
    if (!acc[g]) acc[g] = [];
    acc[g].push(movie);
  });
  return acc;
}, {});
