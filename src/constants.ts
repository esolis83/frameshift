/** sessionStorage key — set when the intro animation completes */
export const INTRO_SEEN_KEY = 'fs-intro-seen';

/** Minimum rating to show the "Top Rated" badge on a MovieCard */
export const TOP_RATED_THRESHOLD = 8.8;

/** Shared layoutId factory — MovieCard and DetailModal must use the same value */
export const cardLayoutId = (id: number) => `card-${id}`;
