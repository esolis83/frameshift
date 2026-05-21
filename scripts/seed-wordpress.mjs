/**
 * Frameshift — WordPress Movie Seeder
 * ─────────────────────────────────────────────────────────────────
 * POSTs 20 mock movies to your WordPress REST API using Application
 * Passwords (no plugins needed — just WP 5.6+).
 *
 * BEFORE YOU RUN:
 *  1. WP Admin → Users → Your Profile → Application Passwords
 *     → Add New:  name it "Seed Script", copy the generated password
 *  2. Make sure your ACF field group for "movies" has these genre
 *     options configured:  Action | Sci-Fi | Drama | Thriller | Horror | Crime | Comedy
 *  3. If poster_image / backdrop_image are ACF "Image" type fields,
 *     change them to "URL" or "Text" type so they accept a plain URL string.
 *     (If they're already URL/Text, ignore this step.)
 *
 * USAGE:
 *   WP_USER=yourusername WP_APP_PASSWORD="xxxx xxxx xxxx xxxx xxxx xxxx" npm run seed:wp
 *
 * Or export the vars first:
 *   export WP_USER=yourusername
 *   export WP_APP_PASSWORD="xxxx xxxx xxxx xxxx xxxx xxxx"
 *   npm run seed:wp
 */

const WP_BASE =
  process.env.WP_BASE_URL ||
  'https://frameshiftcms.enriquesolis.me/wp-json/wp/v2';

const WP_USER = process.env.WP_USER;
const WP_APP_PASSWORD = process.env.WP_APP_PASSWORD;

// ─── Movie Data ───────────────────────────────────────────────────
// poster:   300×450  (portrait)   — picsum seed keeps the image stable
// backdrop: 1280×720 (landscape)  — different seed suffix "-b"
// cast:     newline-separated "Name — Role" strings
// genre:    single value matching your ACF Select options

const movies = [
  {
    title: 'Inception',
    slug: 'inception',
    genre: 'sci-fi',
    year: 2010,
    rating: 8.8,
    duration: '2h 28m',
    synopsis:
      'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    posterUrl: 'https://picsum.photos/seed/inception/300/450',
    backdropUrl: 'https://picsum.photos/seed/inception-b/1280/720',
    trailerUrl: 'https://www.youtube.com/embed/YoHD9XEInc0',
    cast: 'Leonardo DiCaprio — Dom Cobb\nJoseph Gordon-Levitt — Arthur\nElliot Page — Ariadne\nTom Hardy — Eames',
    isFeatured: true,
  },
  {
    title: 'The Dark Knight',
    slug: 'the-dark-knight',
    genre: 'action',
    year: 2008,
    rating: 9.0,
    duration: '2h 32m',
    synopsis:
      'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    posterUrl: 'https://picsum.photos/seed/dark-knight/300/450',
    backdropUrl: 'https://picsum.photos/seed/dark-knight-b/1280/720',
    trailerUrl: 'https://www.youtube.com/embed/EXeTwQWrcwY',
    cast: 'Christian Bale — Bruce Wayne\nHeath Ledger — The Joker\nAaron Eckhart — Harvey Dent\nMichael Caine — Alfred',
  },
  {
    title: 'Interstellar',
    slug: 'interstellar',
    genre: 'sci-fi',
    year: 2014,
    rating: 8.6,
    duration: '2h 49m',
    synopsis:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival as Earth becomes uninhabitable.",
    posterUrl: 'https://picsum.photos/seed/interstellar/300/450',
    backdropUrl: 'https://picsum.photos/seed/interstellar-b/1280/720',
    trailerUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E',
    cast: 'Matthew McConaughey — Cooper\nAnne Hathaway — Brand\nJessica Chastain — Murph\nMichael Caine — Professor Brand',
  },
  {
    title: 'Parasite',
    slug: 'parasite',
    genre: 'thriller',
    year: 2019,
    rating: 8.5,
    duration: '2h 12m',
    synopsis:
      'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    posterUrl: 'https://picsum.photos/seed/parasite2019/300/450',
    backdropUrl: 'https://picsum.photos/seed/parasite2019-b/1280/720',
    trailerUrl: 'https://www.youtube.com/embed/5xH0HfJHsaY',
    cast: 'Song Kang-ho — Ki-taek\nLee Sun-kyun — Park Dong-ik\nCho Yeo-jeong — Choi Yeon-gyo\nChoi Woo-shik — Ki-woo',
  },
  {
    title: 'The Matrix',
    slug: 'the-matrix',
    genre: 'sci-fi',
    year: 1999,
    rating: 8.7,
    duration: '2h 16m',
    synopsis:
      'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    posterUrl: 'https://picsum.photos/seed/matrix1999/300/450',
    backdropUrl: 'https://picsum.photos/seed/matrix1999-b/1280/720',
    trailerUrl: 'https://www.youtube.com/embed/vKQi3bBA1y8',
    cast: 'Keanu Reeves — Neo\nLaurence Fishburne — Morpheus\nCarrie-Anne Moss — Trinity\nHugo Weaving — Agent Smith',
  },
  {
    title: 'Blade Runner 2049',
    slug: 'blade-runner-2049',
    genre: 'sci-fi',
    year: 2017,
    rating: 8.0,
    duration: '2h 44m',
    synopsis:
      "A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.",
    posterUrl: 'https://picsum.photos/seed/blade-runner/300/450',
    backdropUrl: 'https://picsum.photos/seed/blade-runner-b/1280/720',
    trailerUrl: 'https://www.youtube.com/embed/gCcx85zbxz4',
    cast: 'Ryan Gosling — K\nHarrison Ford — Rick Deckard\nAna de Armas — Joi\nRobin Wright — Lieutenant Joshi',
  },
  {
    title: 'Mad Max: Fury Road',
    slug: 'mad-max-fury-road',
    genre: 'action',
    year: 2015,
    rating: 8.1,
    duration: '2h 00m',
    synopsis:
      'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search of her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.',
    posterUrl: 'https://picsum.photos/seed/fury-road/300/450',
    backdropUrl: 'https://picsum.photos/seed/fury-road-b/1280/720',
    trailerUrl: 'https://www.youtube.com/embed/hEJnMQG9ev8',
    cast: 'Tom Hardy — Max Rockatansky\nCharlize Theron — Imperator Furiosa\nNicholas Hoult — Nux\nHugh Keays-Byrne — Immortan Joe',
  },
  {
    title: 'Get Out',
    slug: 'get-out',
    genre: 'horror',
    year: 2017,
    rating: 7.7,
    duration: '1h 44m',
    synopsis:
      "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their overly accommodating behavior gives way to a terrifying climax.",
    posterUrl: 'https://picsum.photos/seed/getout2017/300/450',
    backdropUrl: 'https://picsum.photos/seed/getout2017-b/1280/720',
    trailerUrl: 'https://www.youtube.com/embed/DzfpyUB60YY',
    cast: 'Daniel Kaluuya — Chris Washington\nAllison Williams — Rose Armitage\nBradley Whitford — Dean Armitage\nCaleb Landry Jones — Jeremy Armitage',
  },
  {
    title: 'Pulp Fiction',
    slug: 'pulp-fiction',
    genre: 'thriller',
    year: 1994,
    rating: 8.9,
    duration: '2h 34m',
    synopsis:
      'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    posterUrl: 'https://picsum.photos/seed/pulpfiction/300/450',
    backdropUrl: 'https://picsum.photos/seed/pulpfiction-b/1280/720',
    trailerUrl: 'https://www.youtube.com/embed/s7EdQ4FqbkY',
    cast: 'John Travolta — Vincent Vega\nSamuel L. Jackson — Jules Winnfield\nUma Thurman — Mia Wallace\nBruce Willis — Butch Coolidge',
  },
  {
    title: 'Everything Everywhere All at Once',
    slug: 'everything-everywhere-all-at-once',
    genre: 'comedy',
    year: 2022,
    rating: 7.8,
    duration: '2h 19m',
    synopsis:
      'A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have led.',
    posterUrl: 'https://picsum.photos/seed/eeaao2022/300/450',
    backdropUrl: 'https://picsum.photos/seed/eeaao2022-b/1280/720',
    trailerUrl: 'https://www.youtube.com/embed/wxN1T1uxQ2g',
    cast: 'Michelle Yeoh — Evelyn Wang\nKe Huy Quan — Waymond Wang\nJamie Lee Curtis — Deirdre Beaubeirdre\nStephanie Hsu — Joy Wang',
  },
  {
    title: 'The Godfather',
    slug: 'the-godfather',
    genre: 'drama',
    year: 1972,
    rating: 9.2,
    duration: '2h 55m',
    synopsis:
      'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant youngest son, who transforms from a war hero into a ruthless don.',
    posterUrl: 'https://picsum.photos/seed/godfather72/300/450',
    backdropUrl: 'https://picsum.photos/seed/godfather72-b/1280/720',
    trailerUrl: 'https://www.youtube.com/embed/sY1S34973zA',
    cast: 'Marlon Brando — Vito Corleone\nAl Pacino — Michael Corleone\nJames Caan — Sonny Corleone\nRobert Duvall — Tom Hagen',
  },
  {
    title: 'Dune',
    slug: 'dune',
    genre: 'sci-fi',
    year: 2021,
    rating: 8.0,
    duration: '2h 35m',
    synopsis:
      "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.",
    posterUrl: 'https://picsum.photos/seed/dune2021/300/450',
    backdropUrl: 'https://picsum.photos/seed/dune2021-b/1280/720',
    trailerUrl: 'https://www.youtube.com/embed/n9xhJrPXop4',
    cast: 'Timothée Chalamet — Paul Atreides\nZendaya — Chani\nRebecca Ferguson — Lady Jessica\nOscar Isaac — Duke Leto',
  },
  {
    title: 'Whiplash',
    slug: 'whiplash',
    genre: 'drama',
    year: 2014,
    rating: 8.5,
    duration: '1h 47m',
    synopsis:
      'A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored — and tortured — by an instructor who will stop at nothing to realize a student\'s potential.',
    posterUrl: 'https://picsum.photos/seed/whiplash2014/300/450',
    backdropUrl: 'https://picsum.photos/seed/whiplash2014-b/1280/720',
    trailerUrl: 'https://www.youtube.com/embed/7d_jQycdQGo',
    cast: 'Miles Teller — Andrew Neiman\nJ.K. Simmons — Terence Fletcher\nPaul Reiser — Jim Neiman\nMelissa Benoist — Nicole',
  },
  {
    title: 'Arrival',
    slug: 'arrival',
    genre: 'sci-fi',
    year: 2016,
    rating: 7.9,
    duration: '1h 56m',
    synopsis:
      'A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.',
    posterUrl: 'https://picsum.photos/seed/arrival2016/300/450',
    backdropUrl: 'https://picsum.photos/seed/arrival2016-b/1280/720',
    trailerUrl: 'https://www.youtube.com/embed/tFMo3UJ4B4g',
    cast: 'Amy Adams — Louise Banks\nJeremy Renner — Ian Donnelly\nForest Whitaker — Colonel Weber\nMichael Stuhlbarg — Agent Halpern',
  },
  {
    title: 'No Country for Old Men',
    slug: 'no-country-for-old-men',
    genre: 'thriller',
    year: 2007,
    rating: 8.2,
    duration: '2h 02m',
    synopsis:
      'Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash near the Rio Grande.',
    posterUrl: 'https://picsum.photos/seed/nocountry2007/300/450',
    backdropUrl: 'https://picsum.photos/seed/nocountry2007-b/1280/720',
    trailerUrl: 'https://www.youtube.com/embed/38A__WT3-o0',
    cast: 'Tommy Lee Jones — Sheriff Bell\nJavier Bardem — Anton Chigurh\nJosh Brolin — Llewelyn Moss\nKelly Macdonald — Carla Jean',
  },
  {
    title: 'The Shining',
    slug: 'the-shining',
    genre: 'horror',
    year: 1980,
    rating: 8.4,
    duration: '2h 26m',
    synopsis:
      'A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both the past and the future.',
    posterUrl: 'https://picsum.photos/seed/shining1980/300/450',
    backdropUrl: 'https://picsum.photos/seed/shining1980-b/1280/720',
    trailerUrl: 'https://www.youtube.com/embed/5Cb3ik6zP2I',
    cast: 'Jack Nicholson — Jack Torrance\nShelley Duvall — Wendy Torrance\nDanny Lloyd — Danny Torrance\nScatman Crothers — Dick Hallorann',
  },
  {
    title: 'Heat',
    slug: 'heat',
    genre: 'thriller',
    year: 1995,
    rating: 8.3,
    duration: '2h 50m',
    synopsis:
      'A group of high-end professional thieves start to feel the heat from a cop who will stop at nothing to bring them down.',
    posterUrl: 'https://picsum.photos/seed/heat1995/300/450',
    backdropUrl: 'https://picsum.photos/seed/heat1995-b/1280/720',
    trailerUrl: 'https://www.youtube.com/embed/hL1mHH6nXh0',
    cast: 'Al Pacino — Vincent Hanna\nRobert De Niro — Neil McCauley\nVal Kilmer — Chris Shiherlis\nJon Voight — Nate',
  },
  {
    title: 'Ex Machina',
    slug: 'ex-machina',
    genre: 'sci-fi',
    year: 2014,
    rating: 7.7,
    duration: '1h 48m',
    synopsis:
      'A programmer is selected to participate in a groundbreaking experiment in artificial intelligence by evaluating the human qualities of a highly advanced humanoid AI.',
    posterUrl: 'https://picsum.photos/seed/exmachina2014/300/450',
    backdropUrl: 'https://picsum.photos/seed/exmachina2014-b/1280/720',
    trailerUrl: 'https://www.youtube.com/embed/EoQuVnKhxaM',
    cast: 'Domhnall Gleeson — Caleb Smith\nAlicia Vikander — Ava\nOscar Isaac — Nathan Bateman\nSonoya Mizuno — Kyoko',
  },
  {
    title: 'Hereditary',
    slug: 'hereditary',
    genre: 'horror',
    year: 2018,
    rating: 7.3,
    duration: '2h 07m',
    synopsis:
      "A grieving family is haunted by tragic and disturbing occurrences. After the family matriarch passes away, a daughter and her family begin to unravel cryptic and terrifying secrets about their ancestry.",
    posterUrl: 'https://picsum.photos/seed/hereditary2018/300/450',
    backdropUrl: 'https://picsum.photos/seed/hereditary2018-b/1280/720',
    trailerUrl: 'https://www.youtube.com/embed/V6wWKNij_1M',
    cast: 'Toni Collette — Annie Graham\nAlex Wolff — Peter Graham\nMilly Shapiro — Charlie Graham\nGabriel Byrne — Steve Graham',
  },
  {
    title: 'Knives Out',
    slug: 'knives-out',
    genre: 'thriller',
    year: 2019,
    rating: 7.9,
    duration: '2h 10m',
    synopsis:
      'A detective investigates the death of a patriarch of an eccentric, combative family. When the family gathers for a weekend, suspicion falls on each member as secrets and lies are uncovered.',
    posterUrl: 'https://picsum.photos/seed/knivesout2019/300/450',
    backdropUrl: 'https://picsum.photos/seed/knivesout2019-b/1280/720',
    trailerUrl: 'https://www.youtube.com/embed/qGqiHJTsRkQ',
    cast: 'Daniel Craig — Benoit Blanc\nAna de Armas — Marta Cabrera\nChris Evans — Ransom Drysdale\nJamie Lee Curtis — Linda Drysdale',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function createMovie(movie, credentials) {
  const acfPayload = {
    genre: movie.genre,
    year: String(movie.year),
    rating: String(movie.rating),
    duration: movie.duration,
    synopsis: movie.synopsis,
    poster_image: movie.posterUrl,
    backdrop_image: movie.backdropUrl,
    preview_clip: null,
    trailer_url: movie.trailerUrl,
    cast: movie.cast,
  };

  const body = {
    title: movie.title,
    slug: movie.slug,
    status: 'publish',
    acf: acfPayload,
  };

  const res = await fetch(`${WP_BASE}/movies`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    // Try to parse WP error message
    try {
      const json = JSON.parse(text);
      throw new Error(json.message || text);
    } catch {
      throw new Error(`HTTP ${res.status} — ${text.slice(0, 200)}`);
    }
  }

  return await res.json();
}

// ─── Main ─────────────────────────────────────────────────────────

async function main() {
  // Validate env vars
  if (!WP_USER || !WP_APP_PASSWORD) {
    console.error('\n❌  Missing credentials.\n');
    console.error(
      '   Run with:  WP_USER=yourusername WP_APP_PASSWORD="xxxx xxxx xxxx xxxx xxxx xxxx" npm run seed:wp\n'
    );
    console.error(
      '   Generate an App Password at: WP Admin → Users → Your Profile → Application Passwords\n'
    );
    process.exit(1);
  }

  const credentials = Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString(
    'base64'
  );

  console.log('\n🎬  Frameshift — WordPress Movie Seeder');
  console.log(`📡  Target: ${WP_BASE}`);
  console.log(`📦  Movies to seed: ${movies.length}\n`);

  let success = 0;
  let failed = 0;
  const errors = [];

  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    const num = String(i + 1).padStart(2, ' ');
    process.stdout.write(`  [${num}/${movies.length}] ${movie.title}… `);

    try {
      const created = await createMovie(movie, credentials);
      console.log(`✓  (ID: ${created.id}, slug: ${created.slug})`);
      success++;
    } catch (err) {
      console.log(`✗  FAILED`);
      errors.push({ title: movie.title, error: err.message });
      failed++;
    }

    // Polite delay — don't hammer the server
    if (i < movies.length - 1) await sleep(400);
  }

  // Summary
  console.log('\n' + '─'.repeat(50));
  console.log(`✅  Created: ${success}  |  ❌  Failed: ${failed}`);

  if (errors.length > 0) {
    console.log('\nFailed movies:');
    errors.forEach(({ title, error }) => {
      console.log(`  • ${title}: ${error}`);
    });

    console.log('\n💡  Common fixes:');
    console.log('  • "rest_cannot_create" → check Application Password & username');
    console.log('  • "rest_invalid_param"  → genre value not in ACF Select options');
    console.log(
      '  • Images not saving    → change ACF poster_image / backdrop_image field type to "URL" or "Text"'
    );
  }

  console.log('');
}

main().catch((err) => {
  console.error('\n💥  Unexpected error:', err.message);
  process.exit(1);
});
